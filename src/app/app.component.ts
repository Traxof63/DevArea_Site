import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-service';
import { MemberService } from './services/member.service';
import { MemberInfos } from './models/member-infos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  memberInfos: MemberInfos | undefined;
  connected: any;

  constructor(private _memberService: MemberService) {
  }


  ngOnInit(): void {
    this._memberService.memberInfos$.subscribe({
      next: (memberInfos) => this.memberInfos = memberInfos
    })

    this._memberService.connected$.subscribe({
      next: (connected) => this.connected = connected
    })
  }
}
