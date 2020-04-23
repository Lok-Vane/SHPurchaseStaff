import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-sup-grid',
  templateUrl: './sup-grid.component.html',
  styleUrls: ['./sup-grid.component.scss']
})
export class SupGridComponent implements OnInit {


  /*
   * *ngIf和ngSwitch指令会杀死控件组件,ViewChild无法引用子组件
   * 操作DOM元素document.getElementById('XXX').style.display === 'none'可实现
   * private eleRef: ElementRef
   * this.eleRef.nativeElement.querySelector('#XXX')
   */

  @ViewChild('SupplierAgrid', { static: true }) SupplierAgrid: AgGridAngular;
  @ViewChild('ServicesAgrid', { static: true }) ServicesAgrid: AgGridAngular;

  // 步骤
  step = 0;

  ind = 1;
  totalCount: number;
  isVisible = false;

  ind2 = 1;
  totalCount2: number;
  isVisible2 = false;

  supplierList: any = [];
  servicesList: any = [];

  isSpinning = false;

  keySupplierName: string = null;
  keyAddress: string = null;
  keyOrgName: string = null;
  keyOrgSName: string = null;
  keyFirName: string = null;


  columnDefsSup: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: '编码', field: 'code', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '供应商名称', field: 'supplierName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '地址', field: 'address_Sup', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '组织机构代码证号', field: 'orgLicenseNo', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '营业执照', field: 'businessLicense', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '手机号码', field: 'phone', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '邮箱', field: 'email', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建人', field: 'createdByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建时间', field: 'createdTime', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改人', field: 'modifyByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改时间', field: 'modifyTime', sortable: true, filter: true, resizable: true, width: 120 },
  ];

  columnDefsSer: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: '编码', field: 'code', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '供应商名称', field: 'supplierName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '供应料品类别', field: 'oneCategoryName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '供应组织名称', field: 'orgName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '供应组织简称', field: 'orgSName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建人', field: 'createdByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建时间', field: 'createdTime', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改人', field: 'modifyByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改时间', field: 'modifyTime', sortable: true, filter: true, resizable: true, width: 120 },
  ];

  constructor(
    private message: NzMessageService,
    public router: Router,
    public dao: DaoService,
    public SHPurchase: SHPurchaseSettinggService,
    private eleRef: ElementRef
  ) { }

  ngOnInit() {
  }


  search() {
    this.isVisible = true;
  }

  search2() {
    this.isVisible2 = true;
  }

  IndexChange() {
    setTimeout(() => {
      this.searchSupplierList(10, this.ind);
    }, 100);
  }

  // IndexChange2() {
  //   setTimeout(() => {
  //     // this.searchSupplierList(10, this.ind);
  //   }, 100);
  // }

  searchSupplierList(pageSize: number, pageIndex: number) {
    this.isSpinning = true;
    const postDate = {
      queryOrder: 'supplierName',
      queryWhere: [
        {
          fieldName: 'supplierName',
          operator: 'Like',
          fieldValue: this.keySupplierName
        },
        {
          fieldName: 'address_Sup',
          operator: 'Like',
          fieldValue: this.keyAddress
        }
      ],
      pageIndex,
      pageSize
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseSupSearch, postDate).subscribe((res: any) => {
      this.supplierList = res.data.dataList;
      // console.log(res);
      this.totalCount = res.data.totalCount;
      this.isSpinning = false;
      this.isVisible = false;
      this.isVisible2 = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      this.isVisible = false;
      this.isVisible2 = false;
      // this.message.create('warning', err.error.message);
    });
    // console.log(postDate)
  }

  searchServicesList(type: number, pageSize: number, pageIndex: number) {
    this.isSpinning = true;
    if (type === 1) {
      const selectedNodes = this.SupplierAgrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      let selectedCode = null;
      if (selectedData.length === 0) {
        this.message.create('warning', '请选定一条数据！');
        this.isSpinning = false;
        this.isVisible = false;
        this.isVisible2 = false;
      } else if (selectedData.length > 1) {
        this.message.create('warning', '仅可查询一条数据！');
        this.isSpinning = false;
        this.isVisible = false;
        this.isVisible2 = false;
      } else {
        selectedCode = selectedData[0].code;
        // console.log(selectedCode);
        const postDate = {
          queryFields: '',
          queryWhere: [
            {
              fieldName: 'code',
              operator: 'Equal',
              fieldValue: selectedCode
            },
            {
              fieldName: 'state',
              operator: 'Equal',
              fieldValue: 1
            }
          ],
          queryOrder: 'supplierName,orgSName',
          pageIndex,
          pageSize
        };
        this.dao.doPostRequest(this.SHPurchase.PurchaseSupServicesSearch, postDate).subscribe((res: any) => {
          this.isSpinning = false;
          this.isVisible = false;
          this.isVisible2 = false;
          // console.log(res);
          this.servicesList = res.data.dataList;
          this.totalCount2 = res.data.totalCount;
          // this.step++;
          this.onIndexChange(0);
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
          this.isVisible = false;
          this.isVisible2 = false;
          // this.message.create('warning', err.error.message);
        });
      }
    } else if (type === 2) {
      const postDate = {
        queryFields: '',
        queryWhere: [
          {
            fieldName: 'supplierName',
            operator: 'Like',
            fieldValue: this.keySupplierName
          },
          {
            fieldName: 'orgSName',
            operator: 'Like',
            fieldValue: this.keyOrgSName
          },
          {
            fieldName: 'orgName',
            operator: 'Like',
            fieldValue: this.keyOrgName
          },
          {
            fieldName: 'oneCategoryName',
            operator: 'Like',
            fieldValue: this.keyFirName
          },
          {
            fieldName: 'state',
            operator: 'Equal',
            fieldValue: 1
          }
        ],
        queryOrder: 'supplierName,orgSName',
        pageIndex,
        pageSize
      };
      this.dao.doPostRequest(this.SHPurchase.PurchaseSupServicesSearch, postDate).subscribe((res: any) => {
        this.isSpinning = false;
        this.isVisible = false;
        this.isVisible2 = false;
        // console.log(res);
        this.servicesList = res.data.dataList;
        this.totalCount2 = res.data.totalCount;
        // this.step++;
        this.onIndexChange(0);
      }, (err: any) => {
        console.log(err);
        this.isSpinning = false;
        this.isVisible = false;
        this.isVisible2 = false;
        // this.message.create('warning', err.error.message);
      });
    }
  }

  toSupplier() {
    this.searchSupplierList(10, 1);
  }

  toServices(type: number) {
    this.searchServicesList(type, 0, 0);
  }

  cancel() {
    this.isVisible = false;
    this.isVisible2 = false;
  }

  onIndexChange(step: number) {
    if (step === 0) {
      this.eleRef.nativeElement.querySelector('#SupplierAgrid').style.display = 'none';
      this.eleRef.nativeElement.querySelector('#ServicesAgrid').style.display = 'block';
      this.step = 1;
    } else if (step === 1) {
      this.eleRef.nativeElement.querySelector('#SupplierAgrid').style.display = 'block';
      this.eleRef.nativeElement.querySelector('#ServicesAgrid').style.display = 'none';
      this.step = 0;
    }

  }

  Enter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.isVisible === true) {
        this.toSupplier();
      } else if (this.isVisible2 === true) {
        this.toServices(2);
      }
    }
  }

}
