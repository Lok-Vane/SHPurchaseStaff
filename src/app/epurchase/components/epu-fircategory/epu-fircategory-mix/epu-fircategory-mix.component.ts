import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { EpuFirCategory } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    EPurchaseSettingService,
    DaoService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-fircategory-mix',
    templateUrl: './epu-fircategory-mix.component.html',
    styleUrls: ['./epu-fircategory-mix.component.less']
})
export class EpuFirCategoryMixComponent implements OnInit, OnDestroy {
    // Page_Base_SubscribeList
    subscriptions: Subscription[] = [];
    // Page_Base_IsShowSearchDialog
    public isShowSearchDialog = false;
    // Page_Base_ControlSize
    public controlSize: string;
    // Page_Base_IsEditMode
    public isEditMode = false;
    // Page_Base_IsCreateMode
    public isCreateMode = false;
    // Page_Base_FormGroup
    public epuFirCategoryForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuFirCategoryGrid_Grid
    @ViewChild('epuFirCategoryGrid', { static: true }) epuFirCategoryGrid: any;
    // epuFirCategoryGrid_Selectlist
    selectEpuFirCategoryList: EpuFirCategory[] = [];
    // epuFirCategoryGrid_ColDef
    epuFirCategoryGridCols: ColDef[];

    constructor(
        private messageApi: NzMessageService,
        private modalService: NzModalService,
        private globalSetApi: GlobalSettingService,
        private epuSetApi: EPurchaseSettingService,
        private daoApi: DaoService,
        private fb: FormBuilder
    ) { }

    // 初始化
    ngOnInit() {
        this.epuFirCategoryGrid.apiUrl = this.epuSetApi.FirCategorySearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuFirCategoryGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '编码', field: 'code', resizable: true },
            { headerName: '名称', field: 'categoryFirName', resizable: true },
            { headerName: '状态', field: 'state_display', resizable: true },
            { headerName: '创建人', field: 'createdByName', resizable: true },
            { headerName: '创建时间', field: 'createdTime', resizable: true },
            { headerName: '修改人', field: 'modifyByName', resizable: true },
            { headerName: '修改时间', field: 'modifyTime', resizable: true }
        ];

        // init form
        this.epuFirCategoryForm = this.fb.group({
            code: [null, [Validators.required]],
            categoryFirName: [null, [Validators.required]],
            createdByName: [null, [Validators.required]],
            createdTime: [null, [Validators.required]],
            modifyByName: [null],
            modifyTime: [null],
            sysVersion: [null],
            bizId: [null]
        });
    }

    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid选择变化
    onEpuFirCategoryGridSelectChange(params: any) {
        this.selectEpuFirCategoryList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuFirCategoryList && this.selectEpuFirCategoryList.length > 0) {
            this.epuFirCategoryForm.patchValue(this.selectEpuFirCategoryList[0]);
        }
    }

    getParentList(params: any) {

    }

    // 订阅按钮点击
    subscribeClick(clickType: string) {
        switch (clickType) {
            case 'create':
                this.onBtnNewClick();
                break;
            case 'modify':
                this.onBtnEditClick();
                break;
            case 'save':
                this.onBtnSaveClick();
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
            default:
                this.messageApi.error('未实现该功能');
                break;
        }
    }

    // 点击保存
    onBtnSaveClick() {
        const waitSaveData = this.epuFirCategoryForm.value;
        if (this.isCreateMode === true) {
            this.doCreate(waitSaveData);
        } else if (this.isEditMode === true) {
            this.doModify(waitSaveData);
        } else {
            this.messageApi.warning('没有需要保存的数据');
        }
    }

    // 点击新增
    onBtnNewClick(): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.FirCategoryCreateBef).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = true;
                        this.epuFirCategoryForm.patchValue(res.data);
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        if (this.selectEpuFirCategoryList.length !== 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.FirCategoryModifyBef, this.epuFirCategoryForm.value.bizId).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.isEditMode = true;
                            this.isCreateMode = false;
                            this.epuFirCategoryForm.patchValue(res.data);
                        }
                    }
                )
            );
        } else {
            this.messageApi.create('warning', '未选中需要修改的数据！');
        }
    }

    // 点击批量删除
    onBtnBatchDelClick(): void {
        this.modalService.confirm({
            nzTitle: '<i>' + `${this.globalSetApi.delConfirmText}` + '</i>',
            nzOkType: 'danger',
            nzOnOk: () => this.doBatchDel()
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

    // 点击查询
    onBtnQueryClick() {
        this.isShowSearchDialog = true;
    }

    // 查询界面回调
    searchDialogCallback(param: any) {
        this.isShowSearchDialog = false;
        if (param.clickOkBtn) {
            if (param && param.data) {
                this.epuFirCategoryGrid.queryData.queryWhere = param.data;
                this.epuFirCategoryGrid.pageIndex = 1;
            }
            this.epuFirCategoryGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.FirCategoryCreate, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuFirCategoryForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuFirCategoryGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuFirCategoryGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.FirCategoryModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuFirCategoryForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuFirCategoryGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuFirCategoryGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuFirCategoryList && this.selectEpuFirCategoryList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.FirCategoryBatchDelete, this.selectEpuFirCategoryList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuFirCategoryGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuFirCategoryGrid.getDataList();
                            }
                        }
                    )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }

    // 执行批量恢复
    doBatchRec() {
        if (this.selectEpuFirCategoryList && this.selectEpuFirCategoryList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.FirCategoryBatchRecovery, this.selectEpuFirCategoryList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuFirCategoryGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuFirCategoryGrid.getDataList();
                            }
                        }
                    )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }
}

