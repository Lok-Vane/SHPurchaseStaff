import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { EpuDictionary } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    EPurchaseSettingService,
    DaoService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-paymentmode-mix',
    templateUrl: './epu-paymentmode-mix.component.html',
    styleUrls: ['./epu-paymentmode-mix.component.less']
})
export class EpuPaymentModeMixComponent implements OnInit, OnDestroy {
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
    public epuPaymentModeForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuPaymentModeGrid_Grid
    @ViewChild('epuPaymentModeGrid', { static: true }) epuPaymentModeGrid: any;
    // epuPaymentModeGrid_Selectlist
    selectEpuPaymentModeList: EpuDictionary[] = [];
    // epuPaymentModeGrid_ColDef
    epuPaymentModeGridCols: ColDef[];

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
        this.epuPaymentModeGrid.apiUrl = this.epuSetApi.DictionarySearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuPaymentModeGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '编码', field: 'code', resizable: true },
            { headerName: '名称', field: 'value', resizable: true },
            { headerName: '创建人', field: 'createdByName', resizable: true },
            { headerName: '创建时间', field: 'createdTime', resizable: true },
            { headerName: '修改人', field: 'modifyByName', resizable: true },
            { headerName: '修改时间', field: 'modifyTime', resizable: true }
        ];

        // init form
        this.epuPaymentModeForm = this.fb.group({
            code: [null, [Validators.required]],
            value: [null, [Validators.required]],
            createdByName: [null, [Validators.required]],
            createdTime: [null, [Validators.required]],
            modifyByName: [null],
            modifyTime: [null],
            sysVersion: [null],
            bizId: [null]
        });

        // 监听编码输入框，格式化编码，必须以“FK”开头
        this.epuPaymentModeForm.valueChanges.subscribe((data: any) => {
            if (this.epuPaymentModeForm.value.code !== this.epuPaymentModeForm.value.code.replace(/\s+/g, '')) {
                this.epuPaymentModeForm.patchValue({
                    code: this.epuPaymentModeForm.value.code.replace(/\s+/g, '')
                });
            }
            let temp: string; temp = this.epuPaymentModeForm.value.code;
            if ((temp.substring(0, 2) !== 'FK')) {
                this.epuPaymentModeForm.patchValue({
                    code: 'FK'
                });
            }
        });
    }

    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid选择变化
    onEpuPaymentModeGridSelectChange(params: any) {
        this.selectEpuPaymentModeList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuPaymentModeList && this.selectEpuPaymentModeList.length > 0) {
            this.epuPaymentModeForm.patchValue(this.selectEpuPaymentModeList[0]);
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
            default:
                this.messageApi.error('未实现该功能');
                break;
        }
    }

    // 点击保存
    onBtnSaveClick() {
        const waitSaveData = this.epuPaymentModeForm.value;
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
            this.daoApi.doPostRequest(this.epuSetApi.DictionaryCreateBef).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = true;
                        let createBefData: any; createBefData = res.data; createBefData.code = 'FK';
                        this.epuPaymentModeForm.patchValue(createBefData);
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        if (this.selectEpuPaymentModeList.length !== 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.DictionaryModifyBef, this.epuPaymentModeForm.value.bizId).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.isEditMode = true;
                            this.isCreateMode = false;
                            this.epuPaymentModeForm.patchValue(res.data);
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

    // 点击查询
    onBtnQueryClick() {
        this.isShowSearchDialog = true;
    }

    // 查询界面回调
    searchDialogCallback(param: any) {
        this.isShowSearchDialog = false;
        if (param.clickOkBtn) {
            if (param && param.data) {
                this.epuPaymentModeGrid.queryData.queryWhere = param.data;
                this.epuPaymentModeGrid.queryData.queryWhere.push({
                    fieldName: 'classify',
                    operator: 'equal',
                    fieldValue: '2'
                });
                this.epuPaymentModeGrid.pageIndex = 1;
            }
            this.epuPaymentModeGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        waitSaveData.classify = 2;
        if (this.epuPaymentModeForm.value.code === 'FK'
            || this.epuPaymentModeForm.value.codesubstring(0, 2) !== 'FK') {
            this.messageApi.create('error', '编码格式错误，参考格式：<strong>FK001</strong>');
        } else {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.DictionaryCreate, waitSaveData).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuPaymentModeForm.patchValue(res.data);
                            this.isCreateMode = false;
                            this.isEditMode = false;
                            this.epuPaymentModeGrid.queryData.queryWhere = [];
                            this.epuPaymentModeGrid.queryData.queryWhere.push({
                                fieldName: 'classify',
                                operator: 'equal',
                                fieldValue: '2'
                            });
                            this.epuPaymentModeGrid.getDataList();
                        }
                    }
                )
            );
        }
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        waitSaveData.classify = 2;
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.DictionaryModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuPaymentModeForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuPaymentModeGrid.queryData.queryWhere = [];
                        this.epuPaymentModeGrid.queryData.queryWhere.push({
                            fieldName: 'classify',
                            operator: 'equal',
                            fieldValue: '2'
                        });
                        this.epuPaymentModeGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuPaymentModeList && this.selectEpuPaymentModeList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.DictionaryBatchDelete, this.selectEpuPaymentModeList).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuPaymentModeGrid.queryData.queryWhere = [];
                            this.epuPaymentModeGrid.queryData.queryWhere.push({
                                fieldName: 'classify',
                                operator: 'equal',
                                fieldValue: '2'
                            });
                            this.epuPaymentModeGrid.getDataList();
                        }
                    }
                )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }
}

