import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { QueryEntity } from 'src/app/domains';
import { NzMessageService } from 'ng-zorro-antd';
import {
  GlobalSettingService,
  DaoService,
  GlobalToolService
} from 'src/app/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-routine-grid',
  templateUrl: './routine-grid.component.html',
  styleUrls: ['./routine-grid.component.less']
})
export class RoutineGridComponent implements OnInit, OnDestroy {
  // Subscribe List
  subscriptions: Subscription[] = [];

  // 输出选择项
  @Output()
  sendSelectChange = new EventEmitter();

  // 后台接口
  public apiUrl: string;

  // 查询参数
  public queryData: QueryEntity = {};
  public pageIndex: number;
  public pageSize: number;

  // row data and column definitions
  public dataScource: any;
  @Input()
  public columnDefs: ColDef[];
  @Input()
  public rowSelectType = 'multiple';

  // gridApi and columnApi
  public gridApi: GridApi;
  public columnApi: ColumnApi;
  defaultColDef: any;
  public localeText = this.globalSetApi.getAGGridLocaleText();

  // pagination definitions
  public pageSizeOptions: number[];
  public totalCount: number;

  constructor(
    private messageApi: NzMessageService,
    private globalSetApi: GlobalSettingService,
    private daoApi: DaoService
  ) { }

  ngOnInit() {
    // init pagination
    this.pageSizeOptions = this.globalSetApi.getPageSizeOptions();
    this.pageIndex = 1;
    this.pageSize = 20;
    this.totalCount = 0;

    this.defaultColDef = {
      resizable: true, // 开启调整列大小，允许拖动改变列大小
      sortable: true, // 开启排序
      filter: true,  // 开启筛选
      // enableRangeSelection: true // 范围选择
    };

    // init datasource
    this.dataScource = [];
  }

  ngOnDestroy() {
    GlobalToolService.autoUnSubscribe(this.subscriptions);
  }

  // AGGrid完成初始化
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // console.log(params);
  }

  // Grid 选择改变
  onGridSelectionChanged() {
    this.sendSelectChange.emit(this.gridApi.getSelectedRows());
    // console.log(this.gridApi.getSelectedRows());
  }

  // 页码发生改变时
  onPageIndexChange(params: any): void {
    this.getDataList();
  }

  // 每页条数改变时
  onPageSizeChange(params: any): void {
    this.getDataList();
  }

  // 调用后台接口
  getDataList() {
    this.queryData.pageIndex = this.pageIndex;
    this.queryData.pageSize = this.pageSize;
    const id = this.messageApi.loading(this.globalSetApi.loadingText, { nzDuration: 0 }).messageId;
    // console.log(this.queryData);

    this.subscriptions.push(
      this.daoApi.doPostRequest(this.apiUrl, this.queryData)
        .subscribe(
          (res: any) => {
            this.messageApi.remove(id);
            if (res.status && res.status === 1) {
              this.dataScource = res.data.dataList;
              this.totalCount = res.data.totalCount;
            }
          }, error => {
            this.messageApi.remove(id);
          }
        ));
  }
}
