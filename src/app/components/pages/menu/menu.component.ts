import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import { MemberService } from 'src/app/services/member.service';
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() pseudo: string = '';

  nav() {
    window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=579257697048985601&redirect_uri=https%3A%2F%2Fdevarea.fr%2Fdata%2Fauth&response_type=code&scope=identify';

  }

  constructor(private _router: Router, private _cookieService: CookieService, private _memberService: MemberService) {
  }

  ngOnInit(): void {
    if (this._router.url.startsWith('/?code=')) {
      this._cookieService.set('codeDiscord', this._router.url.substr(7, this._router.url.length - 7));
      this._memberService.loadInfos();
      this._router.navigate([], {
        queryParams: {
          'code': null
        },
        queryParamsHandling: 'merge'
      })
    }
  }
}
