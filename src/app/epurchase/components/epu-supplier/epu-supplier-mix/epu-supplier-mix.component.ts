import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { EpuSupplier } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    EPurchaseSettingService,
    DaoService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-supplier-mix',
    templateUrl: './epu-supplier-mix.component.html',
    styleUrls: ['./epu-supplier-mix.component.less']
})
export class EpuSupplierMixComponent implements OnInit, OnDestroy {
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
    public epuSupplierForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuSupplierGrid_Grid
    @ViewChild('epuSupplierGrid', { static: true }) epuSupplierGrid: any;
    // epuSupplierGrid_Selectlist
    selectEpuSupplierList: EpuSupplier[];
    // epuSupplierGrid_ColDef
    epuSupplierGridCols: ColDef[];

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
        this.epuSupplierGrid.apiUrl = this.epuSetApi.SupplierSearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuSupplierGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '编码', field: 'code' },
            { headerName: '名称', field: 'supplierName' },
            { headerName: '地址', field: 'address_Sup', width: 120 },
            { headerName: '组织机构代码证号', field: 'orgLicenseNo', width: 120 },
            { headerName: '营业执照', field: 'businessLicense', width: 120 },
            { headerName: '手机号码', field: 'phone', width: 120 },
            { headerName: '邮箱', field: 'email', width: 120 },
            { headerName: '备注', field: 'remark', width: 120 },
            { headerName: '状态', field: 'state_display', resizable: true },
            { headerName: '创建人', field: 'createdByName', width: 120 },
            { headerName: '创建时间', field: 'createdTime', width: 120 },
            { headerName: '修改人', field: 'modifyByName', width: 120 },
            { headerName: '修改时间', field: 'modifyTime', width: 120 },
        ];

        // init form
        this.epuSupplierForm = this.fb.group({
            code: [null, [Validators.required]],
            supplierName: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password_Sup: [null, [Validators.required]],
            address_Sup: [null],
            orgLicenseNo: [null],
            businessLicense: [null],
            remark: [null],
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
    onEpuSupplierGridSelectChange(params: any) {
        this.selectEpuSupplierList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuSupplierList && this.selectEpuSupplierList.length > 0) {
            this.epuSupplierForm.patchValue(this.selectEpuSupplierList[0]);
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
        const waitSaveData = this.epuSupplierForm.value;
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
            this.daoApi.doPostRequest(this.epuSetApi.SupplierCreateBef).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = true;
                        this.epuSupplierForm.patchValue(res.data);
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        const bizId = this.epuSupplierForm.value.bizId;
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SupplierModifyBef, bizId).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = false;
                        this.epuSupplierForm.patchValue(res.data);
                    }
                }
            )
        );
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
                this.epuSupplierGrid.queryData.queryWhere = param.data;
                this.epuSupplierGrid.pageIndex = 1;
            }
            this.epuSupplierGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        waitSaveData.SupplierservicesCreates = [];
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SupplierCreate, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuSupplierForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuSupplierGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuSupplierGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SupplierModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuSupplierForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuSupplierGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuSupplierGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuSupplierList && this.selectEpuSupplierList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.SupplierBatchDelete, this.selectEpuSupplierList).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuSupplierGrid.queryData.queryWhere = [
                                { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                            ];
                            this.epuSupplierGrid.getDataList();
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
        if (this.selectEpuSupplierList && this.selectEpuSupplierList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.SupplierBatchRecovery, this.selectEpuSupplierList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuSupplierGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuSupplierGrid.getDataList();
                            }
                        }
                    )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }
}

