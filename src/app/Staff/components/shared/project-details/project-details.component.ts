import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  bizId: string = null;
  isSpinning = false;
  data: any = [];

  NOW: any = null;
  countDown: any;
  countDown2: any;     // 刷新竞价人数
  countDown3: any;     // 刷新finaltime
  buttonMsg = '当前竞价人数';

  NumOfBidders = 0;
  tipsTitle = 'Tips(10秒自动刷新)';
  ifDo = true;
  showMsg: any;

  ifClick = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private notification: NzNotificationService,
    public dao: DaoService,
    public SHPurchase: SHPurchaseSettinggService) { }

  ngOnInit() {
    const that = this;

    this.countDown = setInterval(() => {
      that.NOW = new Date().getTime();
      if (that.ifClick === true) {
        if (that.showMsg.onClose.isStopped === true) { // 用户手动点击关闭按钮
          clearInterval(that.countDown2);
        }
      }
      // console.log(that.showMsg.onClose.isStopped)
    }, 100);   // 每秒执行10次

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


    this.dao.doPostRequest(this.SHPurchase.PurchaseBidSearch, postData).subscribe((res: any) => {
      this.data = res.data.dataList[0];
      this.data.seedGoodsTime = this.data.seedGoodsTime.substring(0, 10);
      if (this.data.totalAmount !== null) {
        this.data.totalAmount = Number(this.data.totalAmount).toFixed(2).toString();
      }
      // console.log(this.data);
      this.getCategoryFirName();
      this.isSpinning = false;
      // this.FindOrgName();

      this.getTIME();

    }, (err: any) => {
      console.log(err);
      that.isSpinning = false;
      // this.message.create('warning', err.error.message);
      this.isSpinning = false;
    });
  }

  ngOnDestroy() {
    clearInterval(this.countDown);
    clearInterval(this.countDown2);
    clearInterval(this.countDown3);
    this.close();
    this.ifDo = false;
  }

  getTimeStamp(time: any) {
    return new Date(time).getTime();
  }

  toResult() {
    this.router.navigate(['result/info', this.data.bizId]);
  }

  getCategoryFirName() {
    this.dao.doPostRequest(this.SHPurchase.PurchaseFirByCode, this.data.category).subscribe((res: any) => {
      // //console.log(res.data.categoryFirName);
      this.data.category = res.data.categoryFirName;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

  // 获取出价人数
  getNumOfBidders() {
    const postData = {
      projectID: this.bizId,
      partType: 2
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseProjCount, postData).subscribe((res: any) => {
      // console.log(res)
      this.NumOfBidders = res.data.partCount;
      // console.log(this.NumOfBidders);
      this.ShowNumOfBidders();
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });

  }

  ShowNumOfBidders(): void {
    this.notification.config({
      nzPlacement: 'bottomLeft'
    });
    this.showMsg = this.notification.create(
      'info',
      this.tipsTitle,
      '当前项目已有' + '<strong>' + this.NumOfBidders + '</strong>' + '个供应商参与竞价',
      {
        nzDuration: 0, nzKey: this.bizId,
        nzStyle: {
          // 'background-color': '#efefef',
          border: '0.5px solid #efefef',
          // 'box-shadow': '10px 10px 10px #ddd',
          'margin-bottom': '160px',
          'margin-left': '50px',
          width: '350px',
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-o-user-select': 'none',
          'user-select': 'none'
        },
      },
    );
  }

  showOrNot() {

    this.ifClick = true;
    this.buttonMsg = '当前竞价人数';
    this.close();
    this.getALL();
  }

  close() {
    clearInterval(this.countDown2);
    this.notification.remove();
  }

  getALL() {
    const that = this;
    that.getNumOfBidders();
    this.countDown2 = setInterval(() => {

      if (that.getTimeStamp(that.data.finalTime) >= that.NOW) {
        that.getNumOfBidders();
        // console.log('1')
      } else {
        // console.log('2')
      }

    }, 10000);   // 每10秒执行1次

  }

  getTIME() {
    const that = this;
    const postData = {
      queryFields: 'finalTime',
      queryWhere: [
        {
          fieldName: 'bizId',
          operator: 'Equal',
          fieldValue: that.bizId
        }
      ],
      queryOrder: '',
      pageIndex: 0,
      pageSize: 0
    };

    this.countDown3 = setInterval(() => {


      if (that.getTimeStamp(that.data.finalTime) >= that.NOW) {
        that.dao.doPostRequest(that.SHPurchase.PurchaseBidSearch, postData).subscribe((res: any) => {

          // 更新最终时间
          that.data.finalTime = res.data.dataList[0].finalTime;
          that.isSpinning = false;

        }, (err: any) => {
          that.isSpinning = false;
          // that.message.create('warning', err.error.message);
        });
        // console.log('1')
      } else {
        // console.log('2')
      }

    }, 5000);    // 每5秒刷新finalTime

  }

  cancel() {

  }

  delete() {
    this.dao.doPostRequest(this.SHPurchase.PurchaseFirByCode, { bizId: this.data.bizId }).subscribe((res: any) => {
      // this.message.create('success', res.message);
      this.router.navigateByUrl('/index');
    }, (err: any) => {
      // this.message.create('warning', err.error.message);
    });
  }

  toModify() {
    this.router.navigate(['modify/project', this.data.bizId]);
  }

  getTotalAmountTips() {
    if (this.data.totalAmount === '0.00') {
      return '项目已截止，无合格报价';
    } else if (this.data.totalAmount === null) {
      return '项目未截止，暂无数据';
    } else {
      return Number(this.data.totalAmount).toFixed(2).toString() + ' 元';
    }
  }

}
