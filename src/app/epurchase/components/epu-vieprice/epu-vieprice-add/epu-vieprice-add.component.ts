import { Component, OnInit } from '@angular/core';
import { NzMessageService, timeUnits } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {
    DaoService,
    EPurchaseSettingService,
    ManageSettingService,
    SharedService
} from 'src/app/core';

@Component({
    selector: 'app-epu-vieprice-add',
    templateUrl: './epu-vieprice-add.component.html',
    styleUrls: ['./epu-vieprice-add.component.less']
})
export class EpuViePriceAddComponent implements OnInit {

    constructor(
        private message: NzMessageService,
        public router: Router,
        public shared: SharedService,
        public dao: DaoService,
        private sysSetApi: ManageSettingService,
        public SHPurchase: EPurchaseSettingService
    ) { }
    // 组织列表
    orgList: any = [];
    // 一级分类列表
    categoryFirstList: any = [];

    // 步骤
    step = 0;

    indeterminate = false;
    checkedAll = false;

    isSpinning = false;
    meteringCopy = '';

    successData: any;
    settlementList: any = [];
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
        if (this.shared.Form2[ind].reserve2 > 1) {
            this.shared.Form2[ind].reserve2 = (this.shared.Form2[ind].reserve2 / 100).toFixed(4);
        } else if (this.shared.Form2[ind].reserve2 !== 0) {
            this.shared.Form2[ind].reserve2 = this.shared.Form2[ind].reserve2.toFixed(4);
        }
    }
    formatterPercentage2(ind: number) {

        if (this.shared.Form2[ind].reserve4 > 1) {
            this.shared.Form2[ind].reserve4 = (this.shared.Form2[ind].reserve4 / 100).toFixed(4);
        } else if (this.shared.Form2[ind].reserve4 !== 0) {
            this.shared.Form2[ind].reserve4 = this.shared.Form2[ind].reserve4.toFixed(4);
        }
    }

    formatterRMB = (value: number) => `${(value * 1).toFixed(2)} 元`;
    parserRMB = (value: string) => value.replace(' 元', '');

    formatterMetering = (value: number) => `${(value * 1).toFixed(2)} ` + this.meteringCopy;

    parserMetering = (value: string) => value.replace(' ' + this.meteringCopy, '');

    meteringChange(i: number) {
        if (this.shared.Form2[i].metering !== null && this.shared.Form2[i].metering !== '') {
            this.meteringCopy = this.shared.Form2[i].metering;
        } else {
            this.meteringCopy = '';
        }
    }

    bindEndTime() {

        this.shared.Form1.endTime = new Date(this.dateType(this.shared.Form1.startTime, 1)).getTime();

        this.shared.Form1.endTime = new Date(this.shared.Form1.endTime);

        // console.log(this.shared.Form1.endTime)

        this.shared.Form1.endTime.setMinutes(this.shared.Form1.endTime.getMinutes() + Number(this.shared.Time));

        // console.log(this.shared.Form1.endTime)

    }

    enableEndTime() {
        this.shared.Form1.endTime = null;
        this.shared.Time = null;
        if (this.shared.Form1.startTime !== null && this.shared.Form1.startTime !== ''
            && new Date(this.dateType(this.shared.Form1.startTime, 1)).getTime() > new Date().getTime() + 20 * 60 * 1000) {
            this.shared.ifEndTime = false;
        } else {
            // this.message.create('warning', '项目开始时间必须大于当前时间二十分钟以上！');
            alert('项目开始时间必须大于当前时间二十分钟以上！');
            this.shared.ifEndTime = true;
        }
    }

    ngOnInit() {
        this.FindCategoryFirst();
        this.FindOrgList();
        this.FindSettlementList();
        this.FindPaymentList();
        this.onCheckedChange2();
    }

    createProjectName() {
        this.shared.Form1.projectName = '';
        let i: number;
        i = 0;
        let j: number;
        j = 0;
        for (i; i < this.orgList.length; i++) {
            if (this.shared.Form1.orgCode === this.orgList[i].code) {
                this.shared.Form1.orgId = this.orgList[i].bizId;
                this.shared.Form1.orgName = this.orgList[i].name;
                this.shared.Form1.orgSName = this.orgList[i].shortName;
                this.shared.Form1.projectName += this.orgList[i].shortName;
                break;
            }
        }
        for (j; j < this.categoryFirstList.length; j++) {
            if (this.shared.Form1.category === this.categoryFirstList[j].code) {
                this.shared.Form1.projectName += this.categoryFirstList[j].categoryFirName;
                this.shared.Form1.projectName += '竞价项目';
                this.shared.Form1.projectName += (new Date().getFullYear().toString()
                    + (new Date().getMonth() + 1 > 9 ? (new Date().getMonth() + 1).toString() : 0 + (new Date().getMonth() + 1).toString())
                    + (new Date().getDate() > 9 ? new Date().getDate().toString() : 0 + new Date().getDate().toString()));
                break;
            }
        }
    }

    bindCategorySelect() {
        this.createProjectName();
        if (this.shared.Form1.category !== null && this.shared.Form1.category !== '') {
            this.FindCategorySecond(this.shared.Form1.category);
        } else {
            this.message.create('warning', '材料分类为空！');
            this.shared.categorySecondList = [];
            for (let i = 0; i < this.shared.Form2.length; i++) {
                this.shared.Form2[i] = {
                    checked: false,
                    secCode: null,
                    productList: [],
                    productCode: null,
                    productName: null,
                    specifications: null,
                    metering: null,
                    purchaseNum: 0,
                    dropPrice: 0,
                    highestLimit: 0,
                    distribute1: 0,
                    distribute2: 0,
                    distribute3: 0,
                    // errorLimit: 0,
                    reserve1: null,
                    reserve2: null,
                    reserve3: null,
                    reserve4: null,
                    reserve5: null,
                    remark: null
                };
            }
        }
    }

    // 查询组织列表
    FindOrgList() {
        this.isSpinning = true;
        const postData = {
            queryFields: '',
            queryOrder: 'shortName',
            queryWhere: [
                {
                    fieldName: 'isLegacyOrg',
                    operator: 'equal',
                    fieldValue: 'true'
                }
            ],
            pageIndex: 0,
            pageSize: 0
        };
        // const tokenCopy = sessionStorage.getItem('token');
        // sessionStorage.removeItem('token');
        //  {
        //   headers: { Authorization: this.SHPurchase.orgApiToken }
        // }
        this.dao.doPostRequest(this.sysSetApi.organizesearch, postData).subscribe((res: any) => {
            // //console.log(res.data.dataList);
            this.orgList = res.data.dataList;
            this.isSpinning = false;
            // sessionStorage.setItem('token', tokenCopy);
        }, (err: any) => {
            console.log(err);
            this.isSpinning = false;
            // this.message.create('warning', err.error.message);
            // sessionStorage.setItem('token', tokenCopy);
        });
    }

    // 刷新一级分类
    FindCategoryFirst() {
        this.isSpinning = true;
        const postData = {
            queryWhere: [
                {
                    fieldName: 'state',
                    operator: 'Equal',
                    fieldValue: 1
                }
            ],
            queryOrder: 'categoryFirName'
        };
        this.dao.doPostRequest(this.SHPurchase.FirCategorySearch, postData).subscribe((res: any) => {
            this.categoryFirstList = res.data.dataList;
            // console.log(this.categoryFirstList);
            this.isSpinning = false;
        }, (err: any) => {
            console.log(err);
            this.isSpinning = false;
            // this.message.create('warning', err.error.message);
        });
    }

    // 查询结算方式列表
    FindSettlementList() {
        this.dao.doPostRequest(this.SHPurchase.DictionarySearch, {
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
            // //console.log(res1);
        }, (err: any) => {
            // console.log(err);
            // this.message.create('warning', err.error.message);
        });
    }

    // 查询付款列表
    FindPaymentList() {
        this.dao.doPostRequest(this.SHPurchase.DictionarySearch, {
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

    // 查询一级的下属二级
    FindCategorySecond(firstCode: string) {
        this.isSpinning = true;
        const postData = {
            queryWhere: [
                {
                    fieldName: 'firstCode',
                    operator: 'Equal',
                    fieldValue: firstCode
                },
                {
                    fieldName: 'state',
                    operator: 'Equal',
                    fieldValue: 1
                }
            ],
            queryOrder: 'categoryName'
        };
        this.dao.doPostRequest(this.SHPurchase.SecCategorySearch, postData).subscribe((res: any) => {
            this.shared.categorySecondList = res.data.dataList;
            // console.log(this.shared.categorySecondList);
            this.isSpinning = false;
            for (let i = 0; i < this.shared.Form2.length; i++) {
                this.shared.Form2[i] = {
                    checked: false,
                    secCode: null,
                    productList: [],
                    productCode: null,
                    productName: null,
                    specifications: null,
                    metering: null,
                    purchaseNum: 0,
                    dropPrice: 0,
                    highestLimit: 0,
                    distribute1: 0,
                    distribute2: 0,
                    distribute3: 0,
                    // errorLimit: 0,
                    reserve1: null,
                    reserve2: null,
                    reserve3: null,
                    reserve4: null,
                    reserve5: null,
                    remark: null
                };
            }
        }, (err: any) => {
            console.log(err);
            this.isSpinning = false;
            // this.message.create('warning', err.error.message);
        });
    }

    // 查询二级的下属产品
    FindProductList(index: number) {
        if (this.shared.Form2[index].secCode !== null && this.shared.Form2[index].secCode !== '') {
            this.isSpinning = true;
            const postData = {
                queryFields: '',
                queryWhere: [
                    {
                        fieldName: 'categorySecCode',
                        operator: 'Equal',
                        fieldValue: this.shared.Form2[index].secCode
                    },
                    {
                        fieldName: 'state',
                        operator: 'Equal',
                        fieldValue: 1
                    }
                ],
                queryOrder: 'productName',
            };
            this.dao.doPostRequest(this.SHPurchase.MaterialSearch, postData).subscribe((res: any) => {
                this.shared.Form2[index].productList = res.data.dataList;
                this.isSpinning = false;
            }, (err: any) => {
                console.log(err);
                this.isSpinning = false;
            });
        } else {
            this.shared.Form2[index].productList = [];
        }
        this.shared.Form2[index].checked = false;
        this.shared.Form2[index].productCode = null;
        this.shared.Form2[index].productName = null;
        this.shared.Form2[index].specifications = null;
        this.shared.Form2[index].metering = null;
        this.shared.Form2[index].purchaseNum = 0;
        this.shared.Form2[index].dropPrice = 0;
        this.shared.Form2[index].highestLimit = 0;
        this.shared.Form2[index].distribute1 = 0;
        this.shared.Form2[index].distribute2 = 0;
        this.shared.Form2[index].distribute3 = 0;
        // this.shared.Form2[index].errorLimit = 0;
        this.shared.Form2[index].remark = null;
        this.shared.Form2[index].reserve1 = null;
        this.shared.Form2[index].reserve2 = null;
        this.shared.Form2[index].reserve3 = null;
        this.shared.Form2[index].reserve4 = null;
        this.shared.Form2[index].reserve5 = null;

    }

    // 查询单个产品
    FindProduct(index: string) {
        if (this.shared.Form2[index].productCode !== null && this.shared.Form2[index].productCode !== '') {
            this.isSpinning = true;
            const postData = {
                queryFields: '',
                queryWhere: [
                    {
                        fieldName: 'code',
                        operator: 'Equal',
                        fieldValue: this.shared.Form2[index].productCode
                    },
                    {
                        fieldName: 'state',
                        operator: 'Equal',
                        fieldValue: 1
                    }
                ],
                queryOrder: 'productName',
            };
            this.dao.doPostRequest(this.SHPurchase.MaterialSearch, postData).subscribe((res: any) => {
                this.isSpinning = false;
                this.shared.Form2[index].checked = false;
                this.shared.Form2[index].specifications = res.data.dataList[0].specifications;
                this.shared.Form2[index].metering = res.data.dataList[0].metering;
                this.shared.Form2[index].productName = res.data.dataList[0].productName;
                this.shared.Form2[index].reserve1 = null;
                this.shared.Form2[index].reserve2 = null;
                this.shared.Form2[index].reserve3 = null;
                this.shared.Form2[index].reserve4 = null;
                this.shared.Form2[index].reserve5 = null;
            }, (err: any) => {
                console.log(err);
                this.isSpinning = false;
            });
        } else {
            this.shared.Form2[index].checked = false;
            this.shared.Form2[index].specifications = null;
            this.shared.Form2[index].metering = null;
            this.shared.Form2[index].productName = null;
            this.shared.Form2[index].reserve1 = null;
            this.shared.Form2[index].reserve2 = null;
            this.shared.Form2[index].reserve3 = null;
            this.shared.Form2[index].reserve4 = null;
            this.shared.Form2[index].reserve5 = null;
        }

    }

    cancel() {

    }

    add() {
        this.shared.Form2.push({
            checked: false,
            ecCode: null,
            productList: [],
            productCode: null,
            productName: null,
            specifications: null,
            metering: null,
            purchaseNum: 0,
            dropPrice: 0,
            highestLimit: 0,
            distribute1: 0,
            distribute2: 0,
            distribute3: 0,
            // errorLimit: 0,
            reserve1: null,
            reserve2: null,
            reserve3: null,
            reserve4: null,    // 运费税率
            reserve5: null,
            remark: null
        });
    }

    sub() {
        this.indeterminate = false;
        let i: number; i = 0;
        const tempLength = this.shared.Form2.length;
        for (i; i < this.shared.Form2.length; i++) {
            if (this.shared.Form2[i].checked === true) {
                this.shared.Form2.splice(i, 1);
                i--;
            }
        }
        if (this.shared.Form2.length === 0) {
            this.checkedAll = false;
        } else if (this.shared.Form2.length === tempLength) {
            this.message.create('warning', '未选中数据！');
        }
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

    POST() {
        if (this.shared.Form1.orgCode === null || this.shared.Form1.orgCode === '') {
            this.message.create('warning', '采购组织不得为空！');
        } else if (this.shared.Form1.category === null || this.shared.Form1.category === '') {
            this.message.create('warning', '材料分类不得为空！');
        } else if (this.shared.Form1.projectName === null || this.shared.Form1.projectName === '') {
            this.message.create('warning', '项目名称不得为空！');
        } else if (this.shared.Form1.startTime === null || this.shared.Form1.startTime === '') {
            this.message.create('warning', '开始时间不得为空！');
        } else if (this.shared.Form1.endTime === null || this.shared.Form1.endTime === '') {
            this.message.create('warning', '截止时间不得为空！');
        } else if (this.shared.Form1.seedGoodsTime === null || this.shared.Form1.seedGoodsTime === '') {
            this.message.create('warning', '交货时间不得为空！');
        } else {
            // 清除无效数据
            let j: number;
            j = 0;
            this.isSpinning = true;
            for (j; j < this.shared.Form2.length; j++) {
                if (this.shared.Form2[j].remark === '' || this.shared.Form2[j].remark === null) {
                    this.shared.Form2[j].remark = '无';
                }
                if (this.shared.Form2[j].reserve1 === '' || this.shared.Form2[j].reserve1 === null) {
                    this.shared.Form2[j].reserve1 = '无';
                }
                if ((this.shared.Form2[j].secCode === '' || this.shared.Form2[j].secCode === null) && this.shared.Form2.length !== 1) {
                    this.shared.Form2.splice(j, 1);
                    j--;
                    // console.log('1')
                }
            }
            // 格式化数据
            const contentDtos = [];
            let i: number;
            i = 0;
            for (i; i < this.shared.Form2.length; i++) {
                contentDtos.push({
                    productCode: this.shared.Form2[i].productCode,
                    productName: this.shared.Form2[i].productName,
                    specifications: this.shared.Form2[i].specifications,
                    metering: this.shared.Form2[i].metering,
                    dropPrice: this.shared.Form2[i].dropPrice.toFixed(2),
                    purchaseNum: this.shared.Form2[i].purchaseNum.toFixed(2),
                    highestLimit: this.shared.Form2[i].highestLimit.toFixed(2),
                    // errorLimit: this.shared.Form2[i].errorLimit.toFixed(2),
                    distribute1: this.shared.Form2[i].distribute1.toFixed(2),
                    distribute2: this.shared.Form2[i].distribute2.toFixed(2),
                    distribute3: this.shared.Form2[i].distribute3.toFixed(2),
                    remark: this.shared.Form2[i].remark,
                    reserve1: this.shared.Form2[i].reserve1,
                    reserve2: this.shared.Form2[i].reserve2 === 0 ? 0 : this.shared.Form2[i].reserve2,
                    reserve3: this.shared.Form2[i].reserve3,
                    reserve5: this.shared.Form2[i].reserve5,
                    reserve4: this.shared.Form2[i].reserve4 === 0 ? 0 : this.shared.Form2[i].reserve4,
                });
            }
            const postData = {
                orgCode: this.shared.Form1.orgCode,        // 采购组织编码
                orgId: this.shared.Form1.orgId,
                orgName: this.shared.Form1.orgName,
                orgSName: this.shared.Form1.orgSName,
                category: this.shared.Form1.category,       // 材料一级分类   code
                projectName: this.shared.Form1.projectName,    // 项目名称
                releaseTime: this.dateType(new Date(), 1),    // 发布时间
                // endTime: this.shared.Form1.endTime,        // 截止时间
                endTime: this.dateType(this.shared.Form1.endTime, 1).substring(0, 17) + '00',        // 截止时间
                startTime: this.dateType(this.shared.Form1.startTime, 1).substring(0, 17) + '00',        // 开始时间
                seedGoodsTime: this.dateType(this.shared.Form1.seedGoodsTime, 2) + ' 00:00:00',    // 交货完成时间
                finalTime: this.dateType(new Date(), 1),
                contentDtos
            };
            // console.log(postData);
            this.dao.doPostRequest(this.SHPurchase.ViePriceCreate, postData).subscribe((res: any) => {
                this.successData = res.data;
                this.step++;
                this.emptyFormData();
                this.isSpinning = false;
            }, (err: any) => {
                console.log(err);
                this.isSpinning = false;
            });
        }
    }

    // 清空填写缓存
    emptyFormData() {
        this.shared.categorySecondList = [];
        this.shared.Form1 = {
            orgCode: null,        // 采购组织编码
            orgSName: null,
            orgName: null,
            orgId: null,
            categoryName: null,
            category: null,       // 材料一级分类   code
            projectName: null,    // 项目名称
            // releaseTime: null,    //发布时间
            endTime: null,        // 截止时间
            // publishTime: null,
            startTime: null,        // 开始时间
            seedGoodsTime: null,    // 交货完成时间
            // reserve1: null          //结算方式
            bizId: null,
            code: null
        };
        let i: number; i = 0;
        this.shared.Form2 = [];
        for (i; i < 3; i++) {
            this.add();
        }
    }

    finish() {
        this.router.navigateByUrl('/epu/viepricelist');
    }

    onCheckedChange1() {
        this.indeterminate = false;
        if (this.checkedAll === true) {
            let i: number; i = 0;
            for (i; i < this.shared.Form2.length; i++) {
                this.shared.Form2[i].checked = true;
            }
        } else if (this.checkedAll === false) {
            let i: number; i = 0;
            for (i; i < this.shared.Form2.length; i++) {
                this.shared.Form2[i].checked = false;
            }
        }
    }

    onCheckedChange2() {
        let j: number; j = 0;
        let T: number; T = 0;
        let F: number; F = 0;
        for (j; j < this.shared.Form2.length; j++) {
            if (this.shared.Form2[j].checked === true) {
                T++;
            } else if (this.shared.Form2[j].checked === false) {
                F++;
            }
        }
        if (T === this.shared.Form2.length) {
            this.indeterminate = false;
            this.checkedAll = true;
        } else if (F === this.shared.Form2.length) {
            this.indeterminate = false;
            this.checkedAll = false;
        } else {
            this.indeterminate = true;

        }
    }

    lineClick(index: number) {
        // this.shared.Form2[index].checked = !this.shared.Form2[index].checked;
        let i: number; i = 0;
        for (i; i < this.shared.Form2.length; i++) {
            this.shared.Form2[i].checked = false;
        }
        this.shared.Form2[index].checked = true;
        this.onCheckedChange2();
    }

}
