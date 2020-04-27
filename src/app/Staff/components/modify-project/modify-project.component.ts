import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { DaoService, SHPurchaseSettinggService, SharedService } from 'src/app/core';

@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.scss']
})
export class ModifyProjectComponent implements OnInit {
  meteringCopy = '';

  constructor(
    private message: NzMessageService,
    public router: Router,
    public shared: SharedService,
    private activatedRoute: ActivatedRoute,
    public dao: DaoService,
    public SHPurchase: SHPurchaseSettinggService
  ) { }

  isSpinning = false;
  bizId: string = null;
  data: any = [];
  // 步骤
  step = 0;

  successData;
  settlementList = [];
  paymentList: any = [];

  endTimeList: any = [
    { Label: '30分钟后', Value: 30 },
    { Label: '45分钟后', Value: 45 },
    { Label: '60分钟后', Value: 60 },
    { Label: '90分钟后', Value: 90 },
    { Label: '120分钟后', Value: 120 },
  ];

  formatterPercent = (value: number) => `${(value * 100).toFixed(2)} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterPercentage(ind: number) {
    if (this.shared.Form2Copy[ind].reserve2 > 1) {
      this.shared.Form2Copy[ind].reserve2 = (this.shared.Form2Copy[ind].reserve2 / 100).toFixed(4);
    } else if (this.shared.Form2Copy[ind].reserve2 !== 0) {
      this.shared.Form2Copy[ind].reserve2 = this.shared.Form2Copy[ind].reserve2.toFixed(4);
    }
  }
  formatterPercentage2(ind: number) {
    if (this.shared.Form2Copy[ind].reserve4 > 1) {
      this.shared.Form2Copy[ind].reserve4 = (this.shared.Form2Copy[ind].reserve4 / 100).toFixed(4);
    } else if (this.shared.Form2Copy[ind].reserve4 !== 0) {
      this.shared.Form2Copy[ind].reserve4 = this.shared.Form2Copy[ind].reserve4.toFixed(4);
    }
  }

  formatterRMB = (value: number) => `${(value * 1).toFixed(2)} 元`;
  parserRMB = (value: string) => value.replace(' 元', '');

  formatterMetering = (value: number) => `${(value * 1).toFixed(2)} ` + this.meteringCopy;

  parserMetering = (value: string) => value.replace(' ' + this.meteringCopy, '');

  meteringChange(i: number) {
    if (this.shared.Form2Copy[i].metering !== null && this.shared.Form2Copy[i].metering !== '') {
      this.meteringCopy = this.shared.Form2Copy[i].metering;
    } else {
      this.meteringCopy = '';
    }
  }

  bindEndTime() {

    this.shared.Form1Copy.endTime = new Date(this.shared.Form1Copy.startTime).getTime();

    this.shared.Form1Copy.endTime = new Date(this.shared.Form1Copy.endTime);

    this.shared.Form1Copy.endTime.setMinutes(this.shared.Form1Copy.endTime.getMinutes() + Number(this.shared.TimeCopy));

    this.shared.Form1Copy.endTime = this.dateType(this.shared.Form1Copy.endTime, 1);

  }

  ngOnInit() {
    this.shared.Form1Copy = {
      orgCode: null,        // 采购组织编码
      category: null,       // 材料一级分类   code
      projectName: null,    // 项目名称
      releaseTime: null,    // 发布时间
      endTime: null,        // 截止时间
      // publishTime: null,
      startTime: null,        // 开始时间
      seedGoodsTime: null,    // 交货时间
      // reserve1: null          // 结算方式
      orgSName: null,
      orgName: null
    };
    this.shared.Form2Copy = [];
    this.shared.TimeCopy = null;
    this.shared.ifEndTimeCopy = false;

    this.isSpinning = true;
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.bizId = params.get('bizId');
    });
    const postData = {
      queryFields: '',
      queryWhere: [
        {
          fieldName: 'bizId',
          operator: 'Equal',
          fieldValue: this.bizId
        }
      ]
    };
    //  查询项目信息
    this.dao.doPostRequest(this.SHPurchase.PurchaseBidSearch, postData).subscribe((res: any) => {
      this.data = res.data.dataList[0];
      if (new Date(this.data.startTime).getTime() < new Date().getTime()) {
        alert('当前超出项目允许修改时间！');
        this.router.navigate(['project/info', this.data.bizId]);
      }
      // this.data.seedGoodsTime = this.data.seedGoodsTime.substring(0, 10);
      // console.log(this.data)
      this.isSpinning = false;
      this.shared.Form1Copy = {
        orgCode: this.data.orgCode,        // 采购组织编码
        category: this.data.category,       // 材料一级分类   code
        projectName: this.data.projectName,    // 项目名称
        endTime: this.data.endTime,        // 截止时间
        startTime: this.data.startTime,        // 开始时间
        seedGoodsTime: this.data.seedGoodsTime,    // 交货时间
        bizId: this.data.bizId,
        code: this.data.code,
        sysVersion: this.data.sysVersion,
        orgSName: this.data.orgSName,
        orgName: this.data.orgName
      };
      this.shared.TimeCopy = ((new Date(this.shared.Form1Copy.endTime).getTime()
        - new Date(this.shared.Form1Copy.startTime).getTime()) / 1000 / 60).toString();
      console.log(this.shared.TimeCopy);
      console.log(this.shared.Form1Copy);
      this.shared.Form2Copy = this.data.contentDtos;
      console.log(this.shared.Form2Copy);


      // 查询一级分类名称
      this.dao.doPostRequest(this.SHPurchase.PurchaseFirByCode, this.shared.Form1Copy.category).subscribe((res1: any) => {
        this.shared.Form1Copy.category = res1.data.categoryFirName;
        this.isSpinning = false;
      }, (err1: any) => {
        console.log(err1);
        this.isSpinning = false;
        // this.message.create('warning', err1.error.message);
      });

      this.FindPaymentList();

    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });

    // 查询结算方式列表
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
      this.isSpinning = false;
      this.settlementList = res.data.dataList;
      // //console.log(res1);
    }, (err: any) => {
      this.isSpinning = false;
      console.log(err);
      // this.message.create('warning', err.error.message);
    });

  }

  // 查询付款列表
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
      // //console.log(res1);
    }, (err: any) => {
      // console.log(err);
      // this.message.create('warning', err.error.message);
    });
  }

  // 日期格式化
  dateType(date: any, type: number) {
    // 返回年月日时分秒
    if (type === 1) {
      date = date.getFullYear() + '/'
        + (date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : 0 + (date.getMonth() + 1).toString()) + '/'
        + (date.getDate() > 9 ? date.getDate().toString() : 0 + date.getDate().toString()) + ' '
        + (date.getHours() > 9 ? date.getHours().toString() : 0 + date.getHours().toString()) + ':'
        + (date.getMinutes() > 9 ? date.getMinutes().toString() : 0 + date.getMinutes().toString()) + ':'
        + (date.getSeconds() > 9 ? date.getSeconds().toString() : 0 + date.getSeconds().toString());
      return date;
    }
    /// 返回年月日
    if (type === 2) {
      date = date.getFullYear() + '/'
        + (date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : 0 + (date.getMonth() + 1).toString()) + '/'
        + (date.getDate() > 9 ? date.getDate().toString() : 0 + date.getDate().toString());
      return date;
    }
  }

  enableEndTime() {
    this.shared.Form1Copy.endTime = null;
    this.shared.TimeCopy = null;
    if (this.shared.Form1Copy.startTime !== null && this.shared.Form1Copy.startTime !== ''
      && new Date(this.dateType(this.shared.Form1Copy.startTime, 1)).getTime() > new Date().getTime() + 20 * 60 * 1000) {
      this.shared.ifEndTimeCopy = false;
    } else {
      alert('项目开始时间必须大于当前时间二十分钟以上！');
      this.shared.ifEndTimeCopy = true;
    }
  }

  cancel() {

  }

  back() {
    this.router.navigate(['project/info', this.data.bizId]);
  }

  finish() {
    this.router.navigateByUrl('/index');
  }

  doModify() {
    this.isSpinning = true;
    this.shared.Form1Copy.startTime = this.dateType(new Date(this.shared.Form1Copy.startTime), 1).substring(0, 17) + '00';
    this.shared.Form1Copy.endTime = this.shared.Form1Copy.endTime.substring(0, 17) + '00';
    this.shared.Form1Copy.seedGoodsTime = this.dateType(new Date(this.shared.Form1Copy.seedGoodsTime), 1);
    const postData = this.shared.Form1Copy;
    postData.contentDtos = this.shared.Form2Copy;
    postData.releaseTime = this.dateType(new Date(), 1);
    let i: number;
    i = 0;
    for (i; i < this.shared.Form2Copy.length; i++) {
      this.shared.Form2Copy[i].reserve1 = (this.shared.Form2Copy[i].reserve1 === ''
        || this.shared.Form2Copy[i].reserve1 === null) ? '无' : this.shared.Form2Copy[i].reserve1;
      this.shared.Form2Copy[i].remark = (this.shared.Form2Copy[i].remark === '' ||
        this.shared.Form2Copy[i].remark === null) ? '无' : this.shared.Form2Copy[i].remark;
    }
    console.log(postData);

    this.dao.doPostRequest(this.SHPurchase.PurchaseBidModify, postData).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.successData = res.data;
      this.step++;
      this.isSpinning = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

}


