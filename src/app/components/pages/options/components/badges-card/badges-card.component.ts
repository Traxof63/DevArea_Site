import { Component, OnInit } from '@angular/core';
import { MemberInfos } from 'src/app/models/member-infos';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-badges-card',
  templateUrl: './badges-card.component.html',
  styleUrls: ['./badges-card.component.scss']
})
export class BadgesCardComponent implements OnInit {

  memberInfos: MemberInfos | undefined;

  constructor(private _memberService: MemberService) {
  }

  ngOnInit(): void {
    this._memberService.memberInfos$.subscribe({
      next: (memberInfos) => this.memberInfos = memberInfos
    })
  }

}
