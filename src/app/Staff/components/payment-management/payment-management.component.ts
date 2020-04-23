import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-payment-managementt',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {
  paymentList: any = [];

  constructor(private message: NzMessageService, public dao: DaoService, public SHPurchase: SHPurchaseSettinggService) { }

  paymentAdd: any = {
    code: null,
    value: null,
    remarks: null,
    classify: 2
  };
  paymentIDDelete: string = null;

  isSpinning = false;

  ngOnInit() {
    this.FindPaymentList();
  }

  resetList() {
    this.FindPaymentList();
  }

  cancel() {

  }

  // 查询结算方式列表
  FindPaymentList() {
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicSearch, {
      queryWhere: [
        {
          fieldName: 'classify',
          operator: 'Equal',
          fieldValue: 2
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ]
    }).subscribe((res: any) => {
      this.paymentList = res.data.dataList;
      // //console.log(res);
    }, (err: any) => {
      // console.log(err);
      // this.message.create('warning', err.error.message);
    });
  }

  doCreate() {
    this.isSpinning = true;
    if (this.paymentAdd.remarks === null || this.paymentAdd.remarks === '') {
      this.paymentAdd.remarks = '无';
    }
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicCreate, this.paymentAdd).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.FindPaymentList();
      this.isSpinning = false;
      // console.log(res);
      this.paymentAdd = {
        code: null,
        value: null,
        remarks: null,
        classify: 2
      };
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

  doDelete() {
    this.isSpinning = true;
    this.dao.doPostRequest(this.SHPurchase.PurchaseDicDelete, { bizid: this.paymentIDDelete }).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.FindPaymentList();
      this.isSpinning = false;
      this.paymentIDDelete = null;
      // console.log(res);
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

}
