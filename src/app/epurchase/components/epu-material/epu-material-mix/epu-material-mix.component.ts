import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subscription, Subject } from 'rxjs';
import { EpuMaterial, EpuSecCategory } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    EPurchaseSettingService,
    DaoService,
    GlobalToolService
} from 'src/app/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-epu-material-mix',
    templateUrl: './epu-material-mix.component.html',
    styleUrls: ['./epu-material-mix.component.less']
})
export class EpuMaterialMixComponent implements OnInit, OnDestroy {
    // 可观察对象 上级类型输入框
    parentCodeText: Subject<string> = new Subject<string>();
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
    public epuMaterialForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuMaterialGrid_Grid
    @ViewChild('epuMaterialGrid', { static: true }) epuMaterialGrid: any;
    // epuMaterialGrid_Selectlist
    selectEpuMaterialList: EpuMaterial[];
    // epuMaterialGrid_ColDef
    epuMaterialGridCols: ColDef[];

    categorySecondList: EpuSecCategory[];

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
        this.epuMaterialGrid.apiUrl = this.epuSetApi.MaterialSearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuMaterialGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '上级分类', field: 'categorySecName', width: 120 },
            { headerName: '编码', field: 'code', width: 120 },
            { headerName: '名称', field: 'productName', width: 120 },
            { headerName: '规格型号', field: 'specifications', width: 120 },
            { headerName: '计量单位', field: 'metering', width: 120 },
            { headerName: '品牌', field: 'productBrand', width: 120 },
            { headerName: '备注', field: 'remark', width: 120 },
            { headerName: '状态', field: 'state_display', resizable: true },
            { headerName: '创建人', field: 'createdByName', width: 120 },
            { headerName: '创建时间', field: 'createdTime', width: 120 },
            { headerName: '修改人', field: 'modifyByName', width: 120 },
            { headerName: '修改时间', field: 'modifyTime', width: 120 },
        ];

        // init form
        this.epuMaterialForm = this.fb.group({
            code: [null, [Validators.required]],
            productName: [null, [Validators.required]],
            specifications: [null],
            metering: [null],
            productBrand: [null],
            remark: [null],
            categorySecName: [null, [Validators.required]],
            categorySecCode: [null, [Validators.required]],
            createdByName: [null, [Validators.required]],
            createdTime: [null, [Validators.required]],
            modifyByName: [null],
            modifyTime: [null],
            sysVersion: [null],
            bizId: [null]
        });

        this.parentCodeText
            .pipe(debounceTime(this.globalSetApi.delayMillisecond))
            .pipe(distinctUntilChanged())
            .subscribe(keyword => {
                if (keyword !== null && keyword !== '') {
                    this.FindCategorySecond(keyword);
                }
            });
    }

    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid选择变化
    onEpuMaterialGridSelectChange(params: any) {
        this.selectEpuMaterialList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuMaterialList && this.selectEpuMaterialList.length > 0) {
            this.epuMaterialForm.patchValue(this.selectEpuMaterialList[0]);
            this.categorySecondList = [];
            this.categorySecondList.push({
                code: this.selectEpuMaterialList[0].categorySecCode,
                categoryName: this.selectEpuMaterialList[0].categorySecName
            });
        }
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
        const waitSaveData = this.epuMaterialForm.value;
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
            this.daoApi.doPostRequest(this.epuSetApi.MaterialCreateBef).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = true;
                        this.epuMaterialForm.patchValue(res.data);
                        this.categorySecondList = [];
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.MaterialModifyBef, this.epuMaterialForm.value.bizId).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = false;
                        this.epuMaterialForm.patchValue(res.data);
                        this.categorySecondList = [];
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
                this.epuMaterialGrid.queryData.queryWhere = param.data;
                this.epuMaterialGrid.pageIndex = 1;
            }
            this.epuMaterialGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.MaterialCreate, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuMaterialForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuMaterialGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuMaterialGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.MaterialModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuMaterialForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuMaterialGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuMaterialGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuMaterialList && this.selectEpuMaterialList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.MaterialBatchDelete, this.selectEpuMaterialList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuMaterialGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuMaterialGrid.getDataList();
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
        if (this.selectEpuMaterialList && this.selectEpuMaterialList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.MaterialBatchRecovery, this.selectEpuMaterialList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuMaterialGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuMaterialGrid.getDataList();
                            }
                        }
                    )
            );
        } else {
            this.messageApi.warning('您未选择数据');
        }
    }

    getParentList(params: any) {
        const key = params.replace(/\s+/g, '');
        this.parentCodeText.next(key);
    }

    FindCategorySecond(keyword: string) {
        this.categorySecondList = [];
        const postData = {
            queryWhere: [
                {
                    fieldName: 'state',
                    operator: 'Equal',
                    fieldValue: 1
                },
                {
                    fieldName: 'categoryName',
                    operator: 'Like',
                    fieldValue: keyword
                }
            ],
            queryOrder: 'categoryName'
        };
        this.daoApi.doPostRequest(this.epuSetApi.SecCategorySearch, postData).subscribe((res: any) => {
            this.categorySecondList = res.data.dataList;
        });
    }
}

