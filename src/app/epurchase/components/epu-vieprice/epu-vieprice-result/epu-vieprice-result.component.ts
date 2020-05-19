import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ColDef } from 'ag-grid-community';
import { ResultPrice, ProductInfo } from 'src/app/epurchase/domains';
import { DaoService, EPurchaseSettingService } from 'src/app/core';

@Component({
    selector: 'app-epu-vieprice-result',
    templateUrl: './epu-vieprice-result.component.html',
    styleUrls: ['./epu-vieprice-result.component.less']
})
export class EpuViePriceResultComponent implements OnInit {

    bizId: string = null;
    isSpinning = false;
    resultPrice: ResultPrice[][] = [];
    productInfoList: ProductInfo[][] = [];
    Form1: any = {};
    resultList: any = [];

    productColumnDefs: ColDef[] = [
        // { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
        { headerName: '材料名称', field: 'producName', sortable: true, filter: true, resizable: true, width: 210 },
        { headerName: '规格/型号', field: 'specifications', sortable: true, filter: true, resizable: true, width: 210 },
        { headerName: '计量单位', field: 'metering', sortable: true, filter: true, resizable: true, width: 210 },
        // { headerName: '送货允许误差', field: 'errorLimit', sortable: true, filter: true, resizable: true, width: 210 },
        { headerName: '购买数量', field: 'purchaseNum', sortable: true, filter: true, resizable: true, width: 210 },
        { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 210 },
    ];

    priceColumnDefs: ColDef[] = [
        // { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
        { headerName: '排名', field: 'ranking', sortable: true, filter: true, resizable: true, width: 70 },
        { headerName: '供应商名称', field: 'supplierName', sortable: true, filter: true, resizable: true, width: 200 },
        {
            headerName: '税后总报价', field: 'quotedPrice', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
        {
            headerName: '税后料品报价', field: 'offerPrice', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
        {
            headerName: '料品税率', field: 'quotedPriceTax', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: percentageValueFormat
        },
        {
            headerName: '税前料品报价', field: 'price', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
        { headerName: '票制', field: 'isOneVote', sortable: true, filter: true, resizable: true, width: 70 },
        {
            headerName: '税后运费', field: 'freightQuotedPrice', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
        {
            headerName: '运费税率', field: 'freightQuotedTax', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: percentageValueFormat
        },
        {
            headerName: '税前运费', field: 'freightPrice', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
        { headerName: '结算方式', field: 'settlement', sortable: true, filter: true, resizable: true, width: 120 },
        { headerName: '分配量', field: 'distributionNum', sortable: true, filter: true, resizable: true, width: 120 },
        {
            headerName: '总金额', field: 'amountMoney', sortable: true, filter: true, resizable: true, width: 120,
            valueFormatter: RMBValueFormat
        },
    ];
    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private message: NzMessageService,
        public dao: DaoService,
        public SHPurchase: EPurchaseSettingService
    ) { }

    ngOnInit() {
        this.isSpinning = true;
        this.activatedRoute.paramMap.subscribe((params: any) => {
            this.bizId = params.get('bizid');
            const postData = {
                queryWhere: [
                    {
                        fieldName: 'bizid',
                        operator: 'Equal',
                        fieldValue: this.bizId
                    }
                ],
            };
            this.dao.doPostRequest(this.SHPurchase.ViePriceDetail, postData).subscribe((res: any) => {
                // //console.log(res);
                // this.contentDtos = res.data.dataList[0].contentDtos
                this.Form1 = res.data.dataList[0];
                this.Form1.seedGoodsTime = this.Form1.seedGoodsTime.substring(0, 10);
                if (this.Form1.totalAmount !== null) {
                    this.Form1.totalAmount = Number(this.Form1.totalAmount).toFixed(2).toString();
                }
                this.getCategoryFirName();
                // this.FindOrgName();

                this.dao.doPostRequest(this.SHPurchase.EPurchaseGetResult, this.bizId).subscribe((res1: any) => {
                    this.resultList = res1.data;
                    // console.log(this.resultList);
                    this.productInfoList = [];
                    this.resultPrice = [];
                    this.isSpinning = false;


                    // 加载grid数据
                    for (let i = 0; i < this.Form1.contentDtos.length; i++) {

                        // 产品采购内容   productInfoList[i]为第i+1条采购内容
                        this.productInfoList.push([]);
                        this.productInfoList[i].push({
                            producName: this.getProduct(this.Form1.contentDtos[i].bizId, 1),
                            specifications: this.getProduct(this.Form1.contentDtos[i].bizId, 2),
                            metering: this.getProduct(this.Form1.contentDtos[i].bizId, 3),
                            purchaseNum: this.getProduct(this.Form1.contentDtos[i].bizId, 5),
                            remark: this.getProduct(this.Form1.contentDtos[i].bizId, 6),
                        });

                        // 供应商最终出价详情   resultPrice[i][j]为第i+1条采购内容，第j+1名的出价
                        let temp: any; temp = [];
                        this.resultPrice.push([]);
                        const compare = (obj1: ResultPrice, obj2: ResultPrice) => {
                            const val1 = obj1.quotedPrice;
                            const val2 = obj2.quotedPrice;
                            if (val1 < val2) {
                                return -1;
                            } else if (val1 > val2) {
                                return 1;
                            } else {
                                return 0;
                            }
                        };
                        let j: number;
                        j = 0;
                        let k: number;
                        k = 0;
                        for (k; k < this.resultList.length; k++) {
                            if (this.resultList[k].bcId === this.getProduct(this.Form1.contentDtos[i].bizId, 7)) {
                                temp.push(this.resultList[k]);
                                // console.log(this.resultList[k].bcId)
                            }
                        }
                        // console.log(temp)
                        temp.sort(compare);
                        // console.log(temp)
                        for (j; j < temp.length; j++) {
                            this.resultPrice[i].push(temp[j]);
                            this.resultPrice[i][j].ranking = j + 1;
                            // this.resultPrice[i][j].isOneVote = temp[j].isOneVote;
                            // this.resultPrice[i][j].freightPrice = temp[j].freightPrice;
                            // this.resultPrice[i][j].supplierName = temp[j].supplierName;
                            // this.resultPrice[i][j].price = temp[j].price;
                            // this.resultPrice[i][j].quotedPriceTax = temp[j].quotedPriceTax;
                            // this.resultPrice[i][j].quotedPrice = temp[j].quotedPrice;
                            // this.resultPrice[i][j].distributionNum = temp[j].distributionNum;
                            // this.resultPrice[i][j].amountMoney = temp[j].amountMoney;
                            // this.resultPrice[i][j].settlement = temp[j].settlement;
                            // this.resultPrice[i][j].offerPrice = temp[j].offerPrice;
                            // this.resultPrice[i][j].freightQuotedTax = temp[j].freightQuotedTax;
                            // this.resultPrice[i][j].freightQuotedPrice = temp[j].freightQuotedPrice;
                        }

                    }
                    // console.log(this.productInfoList);
                    // console.log(this.resultPrice);

                }, (err1: any) => {
                    // console.log(err1);
                    this.isSpinning = false;
                    // this.message.create('warning', err1.error.message);
                });

            }, (err: any) => {
                console.log(err);
                this.isSpinning = false;
                // this.message.create('warning', err.error.message);
            });
        });
        // console.log(this.bizId);



    }




    getProduct(bcId: string, field: number): string {
        let i: number;
        i = 0;
        for (i; i < this.Form1.contentDtos.length; i++) {
            if (bcId === this.Form1.contentDtos[i].bizId) {
                if (field === 1) {
                    return this.Form1.contentDtos[i].productName;
                }
                if (field === 2) {
                    return this.Form1.contentDtos[i].specifications;
                }
                if (field === 3) {
                    return this.Form1.contentDtos[i].metering;
                }
                // if (field === 4) {
                //   return this.Form1.contentDtos[i].errorLimit;
                // }
                if (field === 5) {
                    return this.Form1.contentDtos[i].purchaseNum;
                }
                if (field === 6) {
                    return this.Form1.contentDtos[i].remark;
                }
                if (field === 7) {
                    return this.Form1.contentDtos[i].bizId;
                }
            }
        }
    }

    getCategoryFirName() {
        this.dao.doPostRequest(this.SHPurchase.FirCategoryByCode, this.Form1.category).subscribe((res: any) => {
            // console.log(res.data.categoryFirName);
            this.Form1.category = res.data.categoryFirName;
        }, (err: any) => {
            console.log(err);
            this.isSpinning = false;
            // this.message.create('warning', err.error.message);
        });
    }

    getTotalAmountTips() {
        if (this.Form1.totalAmount === '0.00') {
            return '项目已截止，无合格报价';
        } else if (this.Form1.totalAmountt === null) {
            return '项目未截止，暂无数据';
        } else {
            return Number(this.Form1.totalAmount).toFixed(2).toString() + ' 元';
        }
    }

    exportToPdf() {
        alert('未实现该功能！');
    }

}

// 百分比加工
function percentageValueFormat(params) {
    if (params.value === 0) {
        return '0%';
    } else {
        return (params.value * 100).toFixed(2).toString() + '%';
    }
}

// 金额加工
function RMBValueFormat(params) {
    if (params.value === 0) {
        return '0元';
    } else {
        return params.value.toFixed(2).toString() + '元';
    }
}

