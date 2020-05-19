import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { EpuReSupply } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    DaoService,
    EPurchaseSettingService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-resupply-list',
    templateUrl: './epu-resupply-list.component.html',
    styleUrls: ['./epu-resupply-list.component.less']
})
export class EpuReSupplyListComponent implements OnInit, OnDestroy {
    // Page_Base_SubscribeList
    subscriptions: Subscription[] = [];
    // Page_Base_IsShowSearchDialog
    public isShowSearchDialog = false;
    // Page_Base_ControlSize
    public controlSize: string;

    // epuReSupplyGrid_Grid
    @ViewChild('epuReSupplyGrid', { static: true }) epuReSupplyGrid: any;
    // epuReSupplyGrid_Selectlist
    public selectDataList: EpuReSupply[];
    // epuReSupplyGrid_ColDef
    public epuReSupplyGridCols: ColDef[];
    selectedBizIdString = '';

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
        this.epuReSupplyGrid.apiUrl = this.epuSetApi.ReSupplySearch;

        // init columns
        this.epuReSupplyGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '供应商编码', field: 'code', },
            { headerName: '供应商名称', field: 'supplierName' },
            { headerName: '材料类别', field: 'oneCategoryName' },
            { headerName: '供应组织全称', field: 'orgName', width: 260 },
            { headerName: '供应组织简称', field: 'orgSName' },
            { headerName: '备注', field: 'remark' },
            { headerName: '状态', field: 'state_display', resizable: true },
            { headerName: '创建人', field: 'createdByName' },
            { headerName: '创建时间', field: 'createdTime' },
            { headerName: '修改人', field: 'modifyByName' },
            { headerName: '修改时间', field: 'modifyTime' }
        ];
    }

    // on destroy
    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid 选择改变
    onEpuReSupplyGridSelectChange(params: any): void {
        this.selectDataList = params;
        this.selectedBizIdString = '';
        let i: number; i = 0;
        for (i; i < this.selectDataList.length; i++) {
            this.selectedBizIdString += this.selectDataList[i].bizId + ',';
        }
    }

    // 订阅按钮点击
    subscribeClick(clickType: string): void {
        switch (clickType) {
            case 'create':
                this.onBtnNewClick();
                break;
            case 'search':
                this.onBtnQueryClick();
                break;
            case 'delete':
                this.onBtnBatchDelClick();
                break;
            case 'resume':
                this.onBtnBatchRecClick();
                break;
            case 'export':
                this.onBtnBatchExpClick();
                break;
            default:
                this.messageService.error('未实现该功能');
                break;
        }
    }

    // 新增
    onBtnNewClick(): void {
        // this.router.navigate(['/sys/organizedetail'], { skipLocationChange: true });
        this.router.navigate(['/epu/resupplydetail']);
    }

    // 批量删除
    onBtnBatchDelClick(): void {
        this.modalService.confirm({
            nzTitle: '<i>' + `${this.globalSetApi.delConfirmText}` + '</i>',
            nzOkType: 'danger',
            nzOnOk: () => this.doDelete()
        });
    }

    // 点击批量恢复
    onBtnBatchRecClick(): void {
        this.modalService.confirm({
            nzTitle: '<i>' + `${this.globalSetApi.recConfirmText}` + '</i>',
            nzOkType: 'danger',
            nzOnOk: () => this.doBatchRec()
        });
    }

    // 点击导出
    onBtnBatchExpClick(): void {
        this.modalService.confirm({
            nzTitle: '<i>' + '您确认要导出吗？' + '</i>',
            nzOkType: 'primary',
            nzOnOk: () => this.doBatchExp()
        });
    }

    // 查询
    onBtnQueryClick(): void {
        this.isShowSearchDialog = true;
    }

    // 查询界面返回值
    searchDialogCallback(param: any) {
        this.isShowSearchDialog = false;
        if (param.clickOkBtn) {
            if (param && param.data) {
                this.epuReSupplyGrid.queryData.queryWhere = param.data;
                this.epuReSupplyGrid.queryData.queryOrder = 'supplierName';
            }
            this.epuReSupplyGrid.pageIndex = 1;
            this.epuReSupplyGrid.getDataList();
        }
    }

    // 执行删除
    doDelete(): void {
        if (this.selectDataList && this.selectDataList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.ReSupplyBatchDelete, this.selectDataList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuReSupplyGrid.queryData.queryOrder = 'supplierName';
                                this.epuReSupplyGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuReSupplyGrid.getDataList();
                            }
                        }
                    ));
        } else {
            this.messageService.warning('您未选择数据');
        }
    }

    // 执行批量恢复
    doBatchRec() {
        if (this.selectDataList && this.selectDataList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.ReSupplyBatchRecovery, this.selectDataList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuReSupplyGrid.queryData.queryOrder = 'supplierName';
                                this.epuReSupplyGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuReSupplyGrid.getDataList();
                            }
                        }
                    )
            );
        } else {
            this.messageService.warning('您未选择数据');
        }
    }

    // 执行导出
    doBatchExp() {
        if (this.selectedBizIdString !== null && this.selectedBizIdString !== '') {
            const postData = {
                queryFields: '',
                queryWhere: [
                    {
                        fieldName: 'bizId',
                        operator: 'in',
                        fieldValue: this.selectedBizIdString.substring(0, this.selectedBizIdString.length - 1),
                    }
                ],
                queryOrder: 'supplierName',
                pageIndex: 0,
                pageSize: 0
            };
            const id = this.messageService.loading(this.globalSetApi.exportingText, { nzDuration: 0 }).messageId;
            this.daoApi.doDownloadRequest(this.epuSetApi.ReSupplyExport, postData)
                .subscribe(data => {
                    this.messageService.remove(id);
                    const link = document.createElement('a');
                    const blob = new Blob([data.body], { type: 'text/csv' });
                    link.setAttribute('href', window.URL.createObjectURL(blob));
                    link.setAttribute('download', data.headers.get('Content-disposition').split('filename=')[1]);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    console.log(1);
                }, error => {
                    this.messageService.remove(id);
                });
        } else {
            this.messageService.warning('您未选择数据');
        }
    }
}
