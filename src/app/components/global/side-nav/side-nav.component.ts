import { Component, OnInit } from '@angular/core';
import { MemberInfos } from 'src/app/models/member-infos';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
