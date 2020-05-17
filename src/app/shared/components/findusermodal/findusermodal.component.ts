import { Component, OnInit } from '@angular/core';
import { DaoService } from 'src/app/core';

@Component({
  selector: 'app-findusermodal',
  templateUrl: './findusermodal.component.html',
  styleUrls: ['./findusermodal.component.less']
})
export class FindusermodalComponent implements OnInit {

  constructor(
    private daoservice: DaoService
  ) { }

  ngOnInit() {

  }

  onFindClick(){}
}
