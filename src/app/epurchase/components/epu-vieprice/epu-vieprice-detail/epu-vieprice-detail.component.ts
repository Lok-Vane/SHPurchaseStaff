import { Component, OnInit, TemplateRef, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DaoService, EPurchaseSettingService, GlobalToolService } from 'src/app/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-epu-vieprice-detail',
  templateUrl: './epu-vieprice-detail.component.html',
  styleUrls: ['./epu-vieprice-detail.component.less']
})
export class EpuViePriceDetailsComponent implements OnInit, OnDestroy {
  // Page_Base_SubscribeList
  subscriptions: Subscription[] = [];

  bizId: string = null;
  isSpinning = false;
  data: any = [];

  NOW: any = null;
  countDown: any;
  countDown2: any;     // 刷新竞价人数
  countDown3: any;     // 刷新finaltime
  buttonMsg = '实时查看';

  NumOfBidders: number = null;
  tipsTitle = 'Tips(10秒自动刷新)';
  showbtn = true;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private notification: NzNotificationService,
    public dao: DaoService,
    private eleRef: ElementRef,
    public SHPurchase: EPurchaseSettingService
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          // 取消事件的订阅
          GlobalToolService.autoUnSubscribe(this.subscriptions);

          // 清除定时器
          clearInterval(this.countDown);
          clearInterval(this.countDown2);
          clearInterval(this.countDown3);
          this.close();
        }
      }
    );
  }

  ngOnInit() {
    const that = this;
    this.countDown = setInterval(() => {
      that.NOW = new Date().getTime();
    }, 100);   // 每秒执行10次

    this.isSpinning = true;
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.bizId = params.get('bizid');
      const postData = {
        queryFields: '',
        queryWhere: [
          {
            fieldName: 'bizid',
            operator: 'Equal',
            fieldValue: this.bizId
          }
        ]
      };
      this.subscriptions.push(
        this.dao.doPostRequest(this.SHPurchase.ViePriceDetail, postData).subscribe(
          (res: any) => {
            this.data = res.data.dataList[0];
            this.data.seedGoodsTime = this.data.seedGoodsTime.substring(0, 10);
            if (this.data.totalAmount !== null) {
              this.data.totalAmount = Number(this.data.totalAmount).toFixed(2).toString();
            }
            this.getCategoryFirName();
            this.getNumOfBidders();
            this.isSpinning = false;

          }, (err: any) => {
            console.log(err);
            that.isSpinning = false;
            this.isSpinning = false;
          }));
    });
  }

  ngOnDestroy() {
    clearInterval(this.countDown);
    clearInterval(this.countDown2);
    clearInterval(this.countDown3);
    this.close();
  }

  getTimeStamp(time: any) {
    return new Date(time).getTime();
  }

  toResult() {
    this.router.navigate(['epu/viepriceresult', this.data.bizId]);
  }

  getCategoryFirName() {
    this.subscriptions.push(
      this.dao.doPostRequest(this.SHPurchase.FirCategoryByCode, this.data.category).subscribe(
        (res: any) => {
          this.data.category = res.data.categoryFirName;
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
        }
      )
    );
  }

  // 获取出价人数
  getNumOfBidders() {
    const postData = {
      projectID: this.bizId,
      partType: 2
    };
    this.subscriptions.push(
      this.dao.doPostRequest(this.SHPurchase.EPurchaseProjCount, postData).subscribe(
        (res: any) => {
          this.NumOfBidders = res.data.partCount;
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
        }
      )
    );

  }

  SHOW() {

    // this.ifClick = true;
    this.showbtn = false;
    this.close();
    this.getNUM(); // 人数
    this.getTIME();  // 截止时间
  }

  close() {
    clearInterval(this.countDown2);
  }

  getNUM() {
    const that = this;
    that.getNumOfBidders();
    this.countDown2 = setInterval(() => {
      if (that.getTimeStamp(that.data.finalTime) >= that.NOW) {
        that.getNumOfBidders();
      } else {
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
        this.subscriptions.push(
          that.dao.doPostRequest(that.SHPurchase.EPurchaseBidSearch, postData).subscribe(
            (res: any) => {

              // 更新最终时间
              that.data.finalTime = res.data.dataList[0].finalTime;
              that.isSpinning = false;

            }, (err: any) => {
              that.isSpinning = false;
            }
          )
        );
      } else {
      }

    }, 5000);    // 每5秒刷新finalTime

  }

  cancel() {

  }

  delete() {
    this.subscriptions.push(
      this.dao.doPostRequest(this.SHPurchase.ViePriceDelete, { bizId: this.data.bizId }).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/epu/viepricelist');
        }
      )
    );
  }

  toModify() {
    this.router.navigate(['/epu/viepriceedit', this.data.bizId]);
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
