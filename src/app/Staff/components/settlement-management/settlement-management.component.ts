import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-settlement-management',
  templateUrl: './settlement-management.component.html',
  styleUrls: ['./settlement-management.component.scss']
})
export class SettlementManagementComponent implements OnInit {
  settlementList: any = [];

  constructor(private message: NzMessageService, public dao: DaoService, public SHPurchase: SHPurchaseSettinggService) { }

  settlementAdd: any = {
    code: null,
    value: null,
    remarks: null,
    classify: 1
  };
  settlementIDDelete: string = null;

  isSpinning = false;

  ngOnInit() {
    this.FindSettlementList();
  }

  resetList() {
    this.FindSettlementList();
  }

  cancel() {

  }

  // 查询结算方式列表
  FindSettlementList() {
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicSearch, {
      queryWhere: [
        {
          fieldName: 'classify',
          operator: 'Equal',
          fieldValue: 1
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ]
    }).subscribe((res: any) => {
      this.settlementList = res.data.dataList;
      // //console.log(res);
    }, (err: any) => {
      // console.log(err);
      // this.message.create('warning', err.error.message);
    });
  }

  doCreate() {
    this.isSpinning = true;
    if (this.settlementAdd.remarks === null || this.settlementAdd.remarks === '') {
      this.settlementAdd.remarks = '无';
    }
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicCreate, this.settlementAdd).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.FindSettlementList();
      this.isSpinning = false;
      // console.log(res);
      this.settlementAdd = {
        code: null,
        value: null,
        remarks: null,
        classify: 1
      };
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

  doDelete() {
    this.isSpinning = true;
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicDelete, { bizid: this.settlementIDDelete }).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.FindSettlementList();
      this.isSpinning = false;
      this.settlementIDDelete = null;
      // console.log(res);
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

}
