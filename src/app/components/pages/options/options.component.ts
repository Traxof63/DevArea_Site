import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../../app.component";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import { MemberService } from 'src/app/services/member.service';
import { lastValueFrom } from 'rxjs';
import { MemberInfos } from 'src/app/models/member-infos';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  public own_missions = "true";
  memberInfos: MemberInfos | undefined;

  constructor(private _memberService: MemberService, private _httpClient: HttpClient, private _cookie: CookieService, private _router: Router,) {
  }

  async ngOnInit() {
    if (await lastValueFrom(this._memberService.connected$) == "not_connected"){
      this._router.navigate(['/', 'menu'])
    }

    this.memberInfos =  await lastValueFrom(this._memberService.memberInfos$);
  }


  private is_sending = false;
  public text_button_create = "Nouvelle mission";

  newMission(): void {
    if (!this.is_sending)
      if (this._cookie.get("codeDiscord")) {
        this.is_sending = true;
        this.text_button_create = "Envois..";
        this._httpClient
          .get<string[]>("/data/global/send_message_by_discord/?message_id=" + "455" + "&code=" + this._cookie.get("codeDiscord"))
          .subscribe(
            (response) => {
              if (response[0] == "send")
                this.text_button_create = "Envois -> MP";
              else if (response[0] == "send_error")
                this.text_button_create = "Un problème est survenu lors de l'envois. (Ouvrez vos MP)";
              else if (response[0] == "couldown")
                this.text_button_create = "Vous devez attendre 5s entre chaque envois.";
              else if (response[0] == "wrong_code")
                this.text_button_create = "L'authentification n'a pas pu être effectué.";
              (async () => {
                await delay(4000);
                this.is_sending = false;
                this.text_button_create = "Nouvelle mission";
              })();
            },
            (error) => {
              console.log('Error : ', error);
            }
          )
      } else {
        this.text_button_create = "Vous devez vous connecté à votre compte discord.";
      }
  }


}
