import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subscription, Subject } from 'rxjs';
import { EpuSecCategory, EpuFirCategory } from 'src/app/epurchase/domains';
import {
    GlobalSettingService,
    EPurchaseSettingService,
    DaoService,
    GlobalToolService
} from 'src/app/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-epu-seccategory-mix',
    templateUrl: './epu-seccategory-mix.component.html',
    styleUrls: ['./epu-seccategory-mix.component.less']
})
export class EpuSecCategoryMixComponent implements OnInit, OnDestroy {
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
    public epuSecCategoryForm: FormGroup;
    // Page_Base_ReferenceOtherMode

    // epuSecCategoryGrid_Grid
    @ViewChild('epuSecCategoryGrid', { static: true }) epuSecCategoryGrid: any;
    // epuSecCategoryGrid_Selectlist
    selectEpuSecCategoryList: EpuSecCategory[];
    // epuSecCategoryGrid_ColDef
    epuSecCategoryGridCols: ColDef[];

    categoryFirstList: EpuFirCategory[];

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
        this.epuSecCategoryGrid.apiUrl = this.epuSetApi.SecCategorySearch;
        this.controlSize = this.globalSetApi.controlSize;

        this.epuSecCategoryGridCols = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '编码', field: 'code' },
            { headerName: '名称', field: 'categoryName' },
            { headerName: '一级分类', field: 'firstCategoryName' },
            { headerName: '状态', field: 'state_display', resizable: true },
            { headerName: '创建人', field: 'createdByName' },
            { headerName: '创建时间', field: 'createdTime' },
            { headerName: '修改人', field: 'modifyByName' },
            { headerName: '修改时间', field: 'modifyTime' }
        ];

        // init form
        this.epuSecCategoryForm = this.fb.group({
            code: [null, [Validators.required]],
            firstCategoryName: [null, [Validators.required]],
            firstCode: [null, [Validators.required]],
            categoryName: [null, [Validators.required]],
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
                    this.FindCategoryFirst(keyword);
                }
            });
    }

    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // Grid选择变化
    onEpuSecCategoryGridSelectChange(params: any) {
        this.selectEpuSecCategoryList = params;
        this.isCreateMode = false;
        this.isEditMode = false;
        if (this.selectEpuSecCategoryList && this.selectEpuSecCategoryList.length > 0) {
            this.epuSecCategoryForm.patchValue(this.selectEpuSecCategoryList[0]);
            this.categoryFirstList = [];
            this.categoryFirstList.push({
                code: this.selectEpuSecCategoryList[0].firstCode,
                categoryFirName: this.selectEpuSecCategoryList[0].firstCategoryName
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
        const waitSaveData = this.epuSecCategoryForm.value;
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
            this.daoApi.doPostRequest(this.epuSetApi.SecCategoryCreateBef).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = true;
                        this.epuSecCategoryForm.patchValue(res.data);
                        this.categoryFirstList = [];
                        // this.FindCategoryFirst();
                    }
                }
            )
        );
    }

    // 点击修改
    onBtnEditClick(): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SecCategoryModifyBef, this.epuSecCategoryForm.value.bizId).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.isEditMode = true;
                        this.isCreateMode = false;
                        this.epuSecCategoryForm.patchValue(res.data);
                        this.categoryFirstList = [];
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
                this.epuSecCategoryGrid.queryData.queryWhere = param.data;
                this.epuSecCategoryGrid.pageIndex = 1;
            }
            this.epuSecCategoryGrid.getDataList();
        }
    }

    // 执行新增
    doCreate(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SecCategoryCreate, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuSecCategoryForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuSecCategoryGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuSecCategoryGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行修改
    doModify(waitSaveData: any): void {
        this.subscriptions.push(
            this.daoApi.doPostRequest(this.epuSetApi.SecCategoryModify, waitSaveData).subscribe(
                (res: any) => {
                    if (res.status && res.status === 1) {
                        this.epuSecCategoryForm.patchValue(res.data);
                        this.isCreateMode = false;
                        this.isEditMode = false;
                        this.epuSecCategoryGrid.queryData.queryWhere = [
                            { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                        ];
                        this.epuSecCategoryGrid.getDataList();
                    }
                }
            )
        );
    }

    // 执行批量删除
    doBatchDel() {
        if (this.selectEpuSecCategoryList && this.selectEpuSecCategoryList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.SecCategoryBatchDelete, this.selectEpuSecCategoryList).subscribe(
                    (res: any) => {
                        if (res.status && res.status === 1) {
                            this.epuSecCategoryGrid.queryData.queryWhere = [
                                { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                            ];
                            this.epuSecCategoryGrid.getDataList();
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
        if (this.selectEpuSecCategoryList && this.selectEpuSecCategoryList.length > 0) {
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.SecCategoryBatchRecovery, this.selectEpuSecCategoryList)
                    .subscribe(
                        (res: any) => {
                            if (res.status && res.status === 1) {
                                this.epuSecCategoryGrid.queryData.queryWhere = [
                                    { fieldName: 'state', operator: 'equal', fieldValue: 1 }
                                ];
                                this.epuSecCategoryGrid.getDataList();
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

    FindCategoryFirst(keyword: string) {
        this.categoryFirstList = [];
        const postData = {
            queryWhere: [
                {
                    fieldName: 'state',
                    operator: 'Equal',
                    fieldValue: 1
                },
                {
                    fieldName: 'categoryFirName',
                    operator: 'Like',
                    fieldValue: keyword
                }
            ],
            queryOrder: 'categoryFirName'
        };
        this.daoApi.doPostRequest(this.epuSetApi.FirCategorySearch, postData).subscribe((res: any) => {
            this.categoryFirstList = res.data.dataList;
        });
    }
}

