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
    selector: 'app-epu-settlementmode-mix',
    templateUrl: './epu-settlementmode-mix.component.html',
    styleUrls: ['./epu-settlementmode-mix.component.less']
})
export class EpuSettlementModeMixComponent implements OnInit, OnDestroy {
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
    public epuSettlementModeForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuSettlementModeGrid_Grid
    @ViewChild('epuSettlementModeGrid', { static: true }) epuSettlementModeGrid: any;
    // epuSettlementModeGrid_Selectlist
    selectEpuSettlementModeList: EpuDictionary[];
    // epuSettlementModeGrid_ColDef
    epuSettlementModeGridCols: ColDef[];

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
        this.epuSettlementModeGrid.apiUrl = this.epuSetApi.DictionarySearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuSettlementModeGridCols = [
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
        this.epuSettlementModeForm = this.fb.group({
            code: [null, [Validators.required]],
            value: [null, [Validators.required]],
            createdByName: [null, [Validators.required]],
            createdTime: [null, [Validators.required]],
            modifyByName: [null],
            modifyTime: [null],
            sysVersion: [null],
            bizId: [null]
        });
        // 监听编码输入框，格式化编码，必须以“JS”开头
        this.epuSettlementModeForm.valueChanges.subscribe((data: any) => {
            if (this.epuSettlementModeForm.value.code !== this.epuSettlementModeForm.value.code.replace(/\s+/g, '')) {
                this.epuSettlementModeForm.patchValue({
                    code: this.epuSettlementModeForm.value.code.replace(/\s+/g, '')
                });
            }
            let temp: string; temp = this.epuSettlementModeForm.value.code;
            if ((temp.substring(0, 2) !== 'JS')) {
                this.epuSettlementModeForm.patchValue({
                    code: 'JS'
                });
            }
        });
    }

    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid选择变化
    onEpuSettlementModeGridSelectChange(params: any) {
        this.selectEpuSettlementModeList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuSettlementModeList && this.selectEpuSettlementModeList.length > 0) {
            this.epuSettlementModeForm.patchValue(this.selectEpuSettlementModeList[0]);
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
        const waitSaveData = this.epuSettlementModeForm.value;
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
                        let createBefData: any; createBefData = res.data; createBefData.code = 'JS';
                        this.epuSettlementModeForm.patchValue(createBefData);
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.DictionaryModifyBef, this.epuSettlementModeForm.value.bizId).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = false;
                        this.epuSettlementModeForm.patchValue(res.data);
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

    // 点击查询
    onBtnQueryClick() {
        this.isShowSearchDialog = true;
    }

    // 查询界面回调
    searchDialogCallback(param: any) {
        this.isShowSearchDialog = false;
        if (param.clickOkBtn) {
            if (param && param.data) {
                this.epuSettlementModeGrid.queryData.queryWhere = param.data;
                this.epuSettlementModeGrid.queryData.queryWhere.push({
                    fieldName: 'classify',
                    operator: 'equal',
                    fieldValue: '1'
                });
                this.epuSettlementModeGrid.pageIndex = 1;
            }
            this.epuSettlementModeGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        waitSaveData.classify = 1;
        if (this.epuSettlementModeForm.value.code === 'JS'
            || this.epuSettlementModeForm.value.codesubstring(0, 2) !== 'JS') {
            this.messageApi.create('error', '编码格式错误，参考格式：<strong>JS001</strong>');
        } else {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.DictionaryCreate, waitSaveData).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuSettlementModeForm.patchValue(res.data);
                            this.isCreateMode = false;
                            this.isEditMode = false;
                            this.epuSettlementModeGrid.queryData.queryWhere = [];
                            this.epuSettlementModeGrid.queryData.queryWhere.push({
                                fieldName: 'classify',
                                operator: 'equal',
                                fieldValue: '1'
                            });
                            this.epuSettlementModeGrid.getDataList();
                        }
                    }
                )
            );
        }
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        waitSaveData.classify = 1;
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.DictionaryModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuSettlementModeForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuSettlementModeGrid.queryData.queryWhere = [];
                        this.epuSettlementModeGrid.queryData.queryWhere.push({
                            fieldName: 'classify',
                            operator: 'equal',
                            fieldValue: '1'
                        });
                        this.epuSettlementModeGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuSettlementModeList && this.selectEpuSettlementModeList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.DictionaryBatchDelete, this.selectEpuSettlementModeList).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuSettlementModeGrid.queryData.queryWhere = [];
                            this.epuSettlementModeGrid.queryData.queryWhere.push({
                                fieldName: 'classify',
                                operator: 'equal',
                                fieldValue: '1'
                            });
                            this.epuSettlementModeGrid.getDataList();
                        }
                    }
                )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }
}

