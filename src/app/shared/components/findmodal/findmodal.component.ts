import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { GlobalSettingService } from 'src/app/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SysUser } from 'src/app/manage/domains';

@Component({
  selector: 'app-findmodal',
  templateUrl: './findmodal.component.html',
  styleUrls: ['./findmodal.component.less']
})
export class FindModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() findFormTitle: string;
  @Input() findFormSelectOptions: any;
  @Input() findFormColumns: ColDef[];
  @Input() findFormRowDatas: any;
  @Input() findFormTotalCount: number;
  @Input() findFormPageSIzeList: number[];
  @Input() findFormGroup: FormGroup;

  @Output() sendFindFormlick = new EventEmitter();

  public findFormCurrentPageIndex: number;
  public findFormCurrentPageSize: number;

  // row data and column definitions
  public rowData: SysUser[];
  public columnDefs: ColDef[];

  // gridApi and columnApi
  public gridApi: GridApi;
  public columnApi: ColumnApi;
  public localeText = this.globalsetapi.getAGGridLocaleText();

  public curSelectOption: any;

  constructor(
    public globalsetapi: GlobalSettingService,
    public messageapi: NzMessageService
  ) { }

  ngOnInit() {

    // init columns
    this.columnDefs = [
      { headerName: '用户编码', field: 'code', headerCheckboxSelection: true, checkboxSelection: true },
      { headerName: '用户名称', field: 'name' },
      { headerName: '身份类型编码', field: 'identitype_code', hide: true },
      // { headerName: '身份类型', field: 'identitype_name', valueGetter: (params) => params.data.identitype.name },
      { headerName: '手机号码', field: 'mobile' },
      { headerName: '邮箱地址', field: 'email' },
      { headerName: '是否生效', field: 'iseffecitve' },
      { headerName: '生效日期', field: 'effecitvedate' },
      { headerName: '失效日期', field: 'disabledate' },
      { headerName: '创建人', field: 'createdbyname' },
      { headerName: '创建时间', field: 'createdtime' },
      { headerName: '修改人', field: 'modifytime' },
      { headerName: '修改时间', field: 'modifytime' }
    ];
    // init rowdata
    this.rowData = [];

    this.curSelectOption = 'code';
  }

  // AGGrid完成初始化
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    // this.gridApi.sizeColumnsToFit();
  }

  handleOk(): void {
    this.sendFindFormlick.emit({ status: 1 });
    // this.isVisible = false;
  }

  handleCancel(): void {
    this.sendFindFormlick.emit({ status: 2 });
    // this.isVisible = false;
  }

  provinceChange(e) {
    console.log(e);

  }
}
