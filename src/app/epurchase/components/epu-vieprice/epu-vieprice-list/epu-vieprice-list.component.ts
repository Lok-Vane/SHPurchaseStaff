import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {
    GlobalSettingService,
    DaoService,
    EPurchaseSettingService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-vieprice-list',
    templateUrl: './epu-vieprice-list.component.html',
    styleUrls: ['./epu-vieprice-list.component.less']
})
export class EpuViePriceListComponent implements OnInit, OnDestroy {
    // Page_Base_SubscribeList
    subscriptions: Subscription[] = [];
    // Page_Base_IsShowSearchDialog
    public isShowSearchDialog = false;
    // Page_Base_ControlSize
    public controlSize: string;

    // epuViePriceGrid_Grid
    @ViewChild('epuViePriceGrid', { static: true }) epuViePriceGrid: any;
    // epuViePriceGrid_Selectlist
    public selectDataList: any;
    // epuViePriceGrid_ColDef
    public epuViePriceGridCols: ColDef[];

    // inject the services
    constructor(
        private modalService: NzModalService,
        public messageService: NzMessageService,
        public globalSetApi: GlobalSettingService,
        public daoApi: DaoService,
        public epuSetApi: EPurchaseSettingService,
        public router: Router
    ) { }

    ngOnInit() {
        this.controlSize = this.globalSetApi.controlSize;
        this.epuViePriceGrid.apiUrl = this.epuSetApi.ViePriceSearch;

        // init columns
        this.epuViePriceGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '项目编号', field: 'code', width: 150 },
            { headerName: '项目名称', field: 'projectName', width: 250 },
            { headerName: '项目状态', field: 'isSuccess_display', width: 150 },
            { headerName: '组织编码', field: 'orgCode', width: 100 },
            { headerName: '组织全称', field: 'orgName', width: 200 },
            { headerName: '组织简称', field: 'orgSName', width: 100 },
            // { headerName: '采购类别', field: 'category', width: 150 },
            { headerName: '发布时间', field: 'releaseTime', width: 150 },
            { headerName: '竞价开始时间', field: 'startTime', width: 150 },
            { headerName: '竞价截止时间', field: 'endTime', width: 150 },
            { headerName: '最晚发货时间', field: 'seedGoodsTime', width: 150 },
            { headerName: '实际截止时间', field: 'finalTime', width: 150 },
            { headerName: '总金额', field: 'totalAmount', width: 100 },
            { headerName: '材料编码', field: 'productCode', width: 150 },
            { headerName: '材料名称', field: 'productName', width: 150 },
            { headerName: '规格型号', field: 'specifications', width: 150 },
            { headerName: '计量单位', field: 'metering', width: 150 },
            { headerName: '采购数量', field: 'purchaseNum', width: 100 },
            { headerName: '降价阶梯', field: 'dropPrice', width: 100 },
            { headerName: '最高出价限制', field: 'highestLimit', width: 100 },
            { headerName: '第一名分配量', field: 'distribute1', width: 100 },
            { headerName: '第二名分配量', field: 'distribute2', width: 100 },
            { headerName: '第三名分配量', field: 'distribute3', width: 100 },
            { headerName: '材料税率', field: 'taxRate', valueFormatter: percentageValueFormat, width: 100 },
            { headerName: '结算方式', field: 'settlement', width: 150 },
            { headerName: '运费税率', field: 'freightTaxRate', valueFormatter: percentageValueFormat, width: 100 },
            { headerName: '付款方式', field: 'payment', width: 150 },
            { headerName: '备注', field: 'remark', width: 200 },
            { headerName: '创建人', field: 'createdByName', width: 150 },
            { headerName: '创建时间', field: 'createdTime', width: 150 },
            { headerName: '修改人', field: 'modifyByName', width: 150 },
            { headerName: '修改时间', field: 'modifyTime', width: 150 }
        ];
    }

    // on destroy
    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid 选择改变
    onEpuViePriceGridSelectChange(params: any): void {
        this.selectDataList = params;
    }

    // 订阅按钮点击
    subscribeClick(clickType: string): void {
        switch (clickType) {
            case 'create':
                this.onBtnNewClick();
                break;
            case 'modify':
                this.onBtnEditClick();
                break;
            case 'search':
                this.onBtnQueryClick();
                break;
            // case 'delete':
            //     this.onBtnBatchDelClick();
            //     break;
            case 'detail':
                this.onBtnDetailClick();
                break;
            case 'result':
                this.onBtnResultClick();
                break;
            default:
                this.messageService.error('未实现该功能');
                break;
        }
    }

    // 详情
    onBtnDetailClick(): void {
        if (this.selectDataList && this.selectDataList.length > 1) {
            this.messageService.error('详情只能选择一条数据');
        } else {
            this.router.navigate(['/epu/viepricedetail', this.selectDataList[0].bizId]);
        }
    }

    // 查看结果
    onBtnResultClick(): void {
        if (this.selectDataList && this.selectDataList.length > 1) {
            this.messageService.error('详情只能选择一条数据');
        } else {
            this.router.navigate(['/epu/viepriceresult', this.selectDataList[0].bizId]);
        }
    }

    // 新增
    onBtnNewClick(): void {
        // this.router.navigate(['/sys/organizedetail'], { skipLocationChange: true });
        this.router.navigate(['/epu/viepriceadd']);
    }

    // 修改
    onBtnEditClick(): void {
        this.router.navigate(['/epu/viepriceedit', this.selectDataList[0].bizId]);
    }

    // 批量删除
    // onBtnBatchDelClick(): void {
    //     this.modalService.confirm({
    //         nzTitle: '<i>' + `${this.globalSetApi.delConfirmText}` + '</i>',
    //         nzOkType: 'danger',
    //         nzOnOk: () => this.doDelete()
    //     });
    // }

    // 查询
    onBtnQueryClick(): void {
        this.isShowSearchDialog = true;
    }

    // 查询界面返回值
    searchDialogCallback(param: any) {
        this.isShowSearchDialog = false;
        if (param.clickOkBtn) {
            if (param && param.data) {
                this.epuViePriceGrid.queryData.queryWhere = param.data;
                this.epuViePriceGrid.queryData.queryOrder = 'releaseTime desc';
                // this.epuViePriceGrid.queryData.queryOrder = 'orgName,releaseTime desc';
            }
            this.epuViePriceGrid.pageIndex = 1;
            this.epuViePriceGrid.getDataList();
        }
    }

    // 执行删除
    // doDelete(): void {
    //     if (this.selectDataList && this.selectDataList.length > 0) {
    //         this.subscriptions.push(
    //             this.daoApi.doPostRequest(this.epuSetApi.ViePriceBatchDel, this.selectDataList)
    //                 .subscribe(
    //                     (res: any) => {
    //                         if (res.status && res.status === 1) {
    //                             this.epuViePriceGrid.queryData.queryOrder = 'orgName,releaseTime desc';
    //                             this.epuViePriceGrid.pageIndex = 1;
    //                             this.epuViePriceGrid.getDataList();
    //                         }
    //                     }
    //                 ));
    //     } else {
    //         this.messageService.warning('您未选择数据');
    //     }
    // }
}

// 百分比加工
function percentageValueFormat(params) {
    if (params.value === 0) {
        return '0%';
    } else {
        return params.value * 100 + '%';
    }
}
