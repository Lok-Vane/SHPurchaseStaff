import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SysBtnCategory } from '../../../manage/domains';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {
  // 按钮列表
  buttonCategorys: SysBtnCategory[] = [];
  @Output() sendClick = new EventEmitter<string>();

  constructor(
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    // init buttons
    this.routeInfo.data.subscribe((data: any) => {
      this.buttonCategorys = data.buttonCategorys;
    });
  }

  doClick(flag?: string) {
    this.sendClick.emit(flag);
  }
}
