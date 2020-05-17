import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { NzMessageService } from 'ng-zorro-antd';
import { SysOrganize } from 'src/app/manage/domains';
import { EpuFirCategory, EpuSupplier } from 'src/app/epurchase/domains';
import { Subscription } from 'rxjs';
import {
    GlobalSettingService,
    DaoService,
    EPurchaseSettingService,
    ManageSettingService,
    GlobalToolService
} from 'src/app/core';

@Component({
    selector: 'app-epu-resupply-detail',
    templateUrl: './epu-resupply-detail.component.html',
    styleUrls: ['./epu-resupply-detail.component.less']
})
export class EpuReSupplyDetailComponent implements OnInit, OnDestroy {
    // Subscribe List
    subscriptions: Subscription[] = [];
    // Page_Base_ControlSize
    public controlSize: string;
    // 职责Grid
    @ViewChild('supplierGrid', { static: true }) supplierGrid: any;
    // 菜单Grid
    @ViewChild('fircategoryGrid', { static: true }) fircategoryGrid: any;
    // 按钮Grid
    @ViewChild('organizeGrid', { static: true }) organizeGrid: any;

    // 供应商过滤值
    supplierFilterValue: string;
    // 一级分类过滤值
    fircategoryFilterValue: string;
    // 组织过滤值
    organizeFilterValue: string;

    // 待保存数据
    waitSaveList: any;
    // 选中供应商
    selectSupplierList: EpuSupplier[];
    // 选中一级分类
    selectFirCategoryList: EpuFirCategory[];
    // 选中组织
    selectOrganizeList: SysOrganize[];

    // 列定义
    supplierColDefs: ColDef[];
    fircategoryColDefs: ColDef[];
    organizeColDefs: ColDef[];

    // 查询条件
    supplierQueryWhere: any;
    fircategoryQueryWhere: any;
    organizeQueryWhere: any;

    // 构造函数
    constructor(
        private globalsetApi: GlobalSettingService,
        private messageApi: NzMessageService,
        private daoApi: DaoService,
        private epuSetApi: EPurchaseSettingService,
        private sysSetApi: ManageSettingService) {
    }

    // 初始化
    ngOnInit() {
        this.selectOrganizeList = [];
        this.selectSupplierList = [];
        this.selectFirCategoryList = [];
        this.controlSize = this.globalsetApi.controlSize;
        this.supplierGrid.apiUrl = this.epuSetApi.SupplierSearch;
        this.fircategoryGrid.apiUrl = this.epuSetApi.FirCategorySearch;
        this.organizeGrid.apiUrl = this.sysSetApi.organizesearch;

        // 供应商列定义
        this.supplierColDefs = [
            // { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '供应商编码', field: 'code', checkboxSelection: true },
            { headerName: '供应商名称', field: 'supplierName' }
        ];

        // 一级分类列定义
        this.fircategoryColDefs = [
            // { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '分类编码', field: 'code', checkboxSelection: true },
            { headerName: '分类名称', field: 'categoryFirName' }
        ];

        // 组织列定义
        this.organizeColDefs = [
            { headerName: '', width: 40, headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '标识', field: 'bizId', hide: true },
            { headerName: '组织编码', field: 'code', },
            { headerName: '组织全称', field: 'name' },
            { headerName: '组织简称', field: 'shortName' }
        ];
    }

    // 页面销毁
    ngOnDestroy() {
        GlobalToolService.autoUnSubscribe(this.subscriptions);
    }

    // 订阅按钮点击
    subscribeClick(clickType: string) {
        switch (clickType) {
            case 'save':
                this.doSave();
                break;
            default:
                this.messageApi.error('未实现该功能');
                break;
        }
    }

    // 执行保存
    doSave(): void {
        if (this.selectOrganizeList !== [] && this.selectOrganizeList.length > 0
            && this.selectSupplierList !== [] && this.selectSupplierList.length === 1
            && this.selectFirCategoryList !== [] && this.selectFirCategoryList.length === 1) {
            this.waitSaveList = {};
            this.waitSaveList.code = this.selectSupplierList[0].code;
            this.waitSaveList.supplierName = this.selectSupplierList[0].supplierName;
            this.waitSaveList.oneCategoryId = this.selectFirCategoryList[0].bizId;
            this.waitSaveList.oneCategoryCode = this.selectFirCategoryList[0].code;
            this.waitSaveList.oneCategoryName = this.selectFirCategoryList[0].categoryFirName;
            this.waitSaveList.orgInfos = [];
            let i: number; i = 0;
            for (i; i < this.selectOrganizeList.length; i++) {
                this.waitSaveList.orgInfos.push({
                    orgId: this.selectOrganizeList[i].bizId,
                    orgCode: this.selectOrganizeList[i].code,
                    orgSName: this.selectOrganizeList[i].shortName,
                    orgName: this.selectOrganizeList[i].name
                });
            }
            // 调用接口
            this.subscriptions.push(
                this.daoApi.doPostRequest(this.epuSetApi.ReSupplyCreate, this.waitSaveList).subscribe());
        } else {
            alert('请选定一个供应商、一个一级分类以及若干个供应组织！');
        }
    }

    // 供应商选择变化
    supplierSelectChange(params: any): void {
        this.selectSupplierList = params;
    }

    // 分类选择变化
    fircategorySelectChange(params: any): void {
        this.selectFirCategoryList = params;
    }

    // 组织选择变化
    organizeSelectChange(params: any): void {
        this.selectOrganizeList = params;
    }

    // 供应商过滤
    doFilterSupplier(): void {
        this.supplierGrid.queryData.queryWhere = [
            { fieldName: 'supplierName', operator: this.globalsetApi.like, fieldValue: this.supplierFilterValue },
            { fieldName: 'state', operator: this.globalsetApi.equal, fieldValue: 1 }
        ];
        this.supplierGrid.pageIndex = 1;
        this.supplierGrid.getDataList();
    }

    // 分类过滤
    doFilterFirCategory(): void {
        this.fircategoryGrid.queryData.queryWhere = [
            { fieldName: 'categoryFirName', operator: this.globalsetApi.like, fieldValue: this.fircategoryFilterValue },
            { fieldName: 'state', operator: this.globalsetApi.equal, fieldValue: 1 }
        ];
        this.fircategoryGrid.pageIndex = 1;
        this.fircategoryGrid.getDataList();
    }

    // 组织过滤
    doFilterOrganize(): void {
        this.organizeGrid.queryData.queryWhere = [
            { fieldName: 'name', operator: this.globalsetApi.like, fieldValue: this.organizeFilterValue },
            { fieldName: 'isLegacyOrg', operator: this.globalsetApi.equal, fieldValue: 'true' }
        ];
        this.organizeGrid.pageIndex = 1;
        this.organizeGrid.getDataList();
    }
}
