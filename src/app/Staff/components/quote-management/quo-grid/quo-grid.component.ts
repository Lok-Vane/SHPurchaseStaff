import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Fir, Sec, Pro } from 'src/app/Staff/domains/quote.domain';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-quo-grid',
  templateUrl: './quo-grid.component.html',
  styleUrls: ['./quo-grid.component.scss']
})
export class QuoGridComponent implements OnInit {

  constructor(
    private message: NzMessageService,
    public router: Router,
    public dao: DaoService,
    public SHPurchase: SHPurchaseSettinggService,
    private eleRef: ElementRef
  ) { }


  keyFirName: string = null;
  keySecName: string = null;
  keyProName: string = null;
  keyProSpec: string = null;

  @ViewChild('Fir', { static: true }) Fir: AgGridAngular;
  @ViewChild('Sec', { static: true }) Sec: AgGridAngular;
  @ViewChild('Pro', { static: true }) Pro: AgGridAngular;

  isSpinning = false;

  columnDefsFir: any = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: '编码', field: 'code', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '名称', field: 'categoryFirName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建人', field: 'createdByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建时间', field: 'createdTime', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改人', field: 'modifyByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改时间', field: 'modifyTime', sortable: true, filter: true, resizable: true, width: 120 },
  ];
  categoryFirstList: Fir[] = [];

  columnDefsSec: any = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: '上级分类', field: 'firstCategoryName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '编码', field: 'code', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '名称', field: 'categoryName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建人', field: 'createdByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建时间', field: 'createdTime', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改人', field: 'modifyByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改时间', field: 'modifyTime', sortable: true, filter: true, resizable: true, width: 120 },
  ];
  categorySecondList: Sec[] = [];

  columnDefsPro: any = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: '上级分类', field: 'categorySecName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '编码', field: 'code', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '名称', field: 'productName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '规格', field: 'specifications', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '单位', field: 'metering', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '品牌', field: 'productBrand', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '备注', field: 'remark', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建人', field: 'createdByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '创建时间', field: 'createdTime', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改人', field: 'modifyByName', sortable: true, filter: true, resizable: true, width: 120 },
    { headerName: '修改时间', field: 'modifyTime', sortable: true, filter: true, resizable: true, width: 120 },
  ];
  productList: Pro[] = [];

  // 步骤
  step = 0;

  ind1 = 1;
  totalCount1: number;
  isVisible1 = false;

  ind2 = 1;
  totalCount2: number;
  isVisible2 = false;

  ind3 = 1;
  totalCount3: number;
  isVisible3 = false;


  ngOnInit() {
  }

  // ngOnDestroy() {

  // }

  // 刷新一级分类
  FindCategoryFirst(pageSize: number, pageIndex: number) {
    this.isSpinning = true;
    this.categoryFirstList = [];
    const postData = {
      queryFields: '',
      queryWhere: [
        {
          fieldName: 'categoryFirName',
          operator: 'Like',
          fieldValue: this.keyFirName
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ],
      queryOrder: 'categoryFirName',
      pageSize,
      pageIndex
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseFirSearch, postData).subscribe((res: any) => {
      this.categoryFirstList = res.data.dataList;
      this.totalCount1 = res.data.totalCount;
      // console.log(res);
      this.isSpinning = false;
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isVisible3 = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isVisible3 = false;
      // this.message.create('warning', err.error.message);
    });
  }

  // 查询的二级分类
  FindCategory(type: number, pageSize: number, pageIndex: number) {
    this.isSpinning = true;
    this.categorySecondList = [];
    if (type === 1) {
      const selectedNodes = this.Fir.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      if (selectedData.length === 0) {
        this.message.create('warning', '请选定一条数据！');
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
      } else if (selectedData.length > 1) {
        this.message.create('warning', '仅可查询一条数据！');
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
      } else {
        const postData = {
          queryFields: '',
          queryWhere: [
            {
              fieldName: 'firstCode',
              operator: 'Equal',
              fieldValue: selectedData[0].code
            },
            {
              fieldName: 'state',
              operator: 'Equal',
              fieldValue: 1
            }
          ],
          queryOrder: 'firstCode,categoryName',
          pageSize,
          pageIndex
        };
        this.dao.doPostRequest(this.SHPurchase.PurchaseSecSearch, postData).subscribe((res: any) => {
          this.categorySecondList = res.data.dataList;
          // console.log(this.categorySecondList);
          this.totalCount2 = res.data.totalCount;
          this.isSpinning = false;
          this.isVisible1 = false;
          this.isVisible2 = false;
          this.isVisible3 = false;
          this.onIndexChange(1);
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
          this.isVisible1 = false;
          this.isVisible2 = false;
          this.isVisible3 = false;
          // this.message.create('warning', err.error.message);
        });
      }
    } else if (type === 2) {
      const postData = {
        queryFields: '',
        queryWhere: [
          {
            fieldName: 'categoryName',
            operator: 'Like',
            fieldValue: this.keySecName
          },
          {
            fieldName: 'state',
            operator: 'Equal',
            fieldValue: 1
          }
        ],
        queryOrder: 'firstCode,categoryName',
        pageSize,
        pageIndex
      };
      this.dao.doPostRequest(this.SHPurchase.PurchaseSecSearch, postData).subscribe((res: any) => {
        this.categorySecondList = res.data.dataList;
        // console.log(this.categorySecondList);
        this.totalCount2 = res.data.totalCount;
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
        this.onIndexChange(1);
      }, (err: any) => {
        console.log(err);
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
        // this.message.create('warning', err.error.message);
      });
    }
  }

  // 查询产品列表
  FindProduct(type: number, pageSize: number, pageIndex: number) {
    this.isSpinning = true;
    this.productList = [];

    if (type === 1) {
      const selectedNodes = this.Sec.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      if (selectedData.length === 0) {
        this.message.create('warning', '请选定一条数据！');
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
      } else if (selectedData.length > 1) {
        this.message.create('warning', '仅可查询一条数据！');
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
      } else {
        const postData = {
          queryFields: '',
          queryWhere: [
            {
              fieldName: 'categorySecCode',
              operator: 'Equal',
              fieldValue: selectedData[0].code
            },
            {
              fieldName: 'state',
              operator: 'Equal',
              fieldValue: 1
            }
          ],
          queryOrder: 'categorySecCode,productName',
          pageSize,
          pageIndex
        };
        this.dao.doPostRequest(this.SHPurchase.PurchaseProSearch, postData).subscribe((res: any) => {
          this.productList = res.data.dataList;
          // console.log(res)
          this.totalCount3 = res.data.totalCount;
          this.isSpinning = false;
          this.isVisible1 = false;
          this.isVisible2 = false;
          this.isVisible3 = false;
          this.onIndexChange(2);
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
          this.isVisible1 = false;
          this.isVisible2 = false;
          this.isVisible3 = false;
          // this.message.create('warning', err.error.message);
        });
      }

    } else if (type === 2) {
      const postData = {
        queryFields: '',
        queryWhere: [
          {
            fieldName: 'productName',
            operator: 'Like',
            fieldValue: this.keyProName
          },
          {
            fieldName: 'specifications',
            operator: 'Like',
            fieldValue: this.keyProSpec
          },
          {
            fieldName: 'state',
            operator: 'Equal',
            fieldValue: 1
          }
        ],
        queryOrder: 'categorySecCode,productName',
        pageSize,
        pageIndex
      };
      this.dao.doPostRequest(this.SHPurchase.PurchaseProSearch, postData).subscribe((res: any) => {
        this.productList = res.data.dataList;
        // console.log(res)
        this.totalCount3 = res.data.totalCount;
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
        this.onIndexChange(2);
      }, (err: any) => {
        console.log(err);
        this.isSpinning = false;
        this.isVisible1 = false;
        this.isVisible2 = false;
        this.isVisible3 = false;
        // this.message.create('warning', err.error.message);
      });
    }

  }

  IndexChange1() {
    setTimeout(() => {
      this.FindCategoryFirst(10, this.ind1);
    }, 100);
  }


  onIndexChange(e: any) {
    this.step = e;
    if (this.step === 0) {
      this.eleRef.nativeElement.querySelector('#Fir').style.display = 'block';
      this.eleRef.nativeElement.querySelector('#Sec').style.display = 'none';
      this.eleRef.nativeElement.querySelector('#Pro').style.display = 'none';
    } else if (this.step === 1) {
      this.eleRef.nativeElement.querySelector('#Fir').style.display = 'none';
      this.eleRef.nativeElement.querySelector('#Sec').style.display = 'block';
      this.eleRef.nativeElement.querySelector('#Pro').style.display = 'none';
    } else if (this.step === 2) {
      this.eleRef.nativeElement.querySelector('#Fir').style.display = 'none';
      this.eleRef.nativeElement.querySelector('#Sec').style.display = 'none';
      this.eleRef.nativeElement.querySelector('#Pro').style.display = 'block';
    }
  }

  cancel() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
  }

  search1() {
    this.isVisible1 = true;
  }

  search2() {
    this.isVisible2 = true;
  }

  search3() {
    this.isVisible3 = true;
  }

  toFir() {
    this.FindCategoryFirst(10, 1);
  }

  toSec(type: number) {
    this.FindCategory(type, 0, 0);
  }

  toPro(type: number) {
    this.FindProduct(type, 0, 0);
  }

  Enter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.isVisible1 === true) {
        this.toFir();
      } else if (this.isVisible2 === true) {
        this.toSec(2);
      } else if (this.isVisible3 === true) {
        this.toPro(2);
      }
    }
  }

}
