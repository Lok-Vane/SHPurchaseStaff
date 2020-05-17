import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-querymodal',
  templateUrl: './querymodal.component.html',
  styleUrls: ['./querymodal.component.less']
})
export class QueryModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() queryFormTitle: string;
  @Input() queryFormGroup: FormGroup;
  @Input() queryFormItems: any;

  @Output() queryformClick = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  handleOk(): void {
    this.queryformClick.emit(this.queryFormGroup.value);
  }

  handleCancel(): void {
    this.queryformClick.emit({ isVisible: false });
  }
}
