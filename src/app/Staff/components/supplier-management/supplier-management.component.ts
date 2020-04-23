import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  isSpinning = false;

  supplierInfoAdd: any = {
    supplierName: null,
    orgLicenseNo: null,
    businessLicense: null,
    address_Sup: null,
    email: null,
    phone: null,
    password_Sup: null,
    remark: null,
    SupplierservicesCreates: []
  };

  readonly supplierInfoFeld: any = {
    supplierName: '供应商名称',
    orgLicenseNo: '组织机构代码证号',
    businessLicense: '营业执照',
    address_Sup: '地址',
    email: '邮箱',
    phone: '手机号码',
    password_Sup: '初始密码',
    remark: '备注'
  };

  ifCreateSupplierservices = false;

  categoryFirstList: any = [];
  orgList: any = [];

  SupplierservicesCreates: any = [{
    supplierName: null,
    oneCategoryId: null,
    oneCategoryCode: null,
    oneCategoryName: null,
    orgInfos: null
  }];

  sub() {
    if (this.SupplierservicesCreates.length !== 1) {
      this.SupplierservicesCreates.pop();
    }
  }

  add() {
    this.SupplierservicesCreates.push({
      supplierName: null,
      oneCategoryId: null,
      oneCategoryCode: null,
      oneCategoryName: null,
      orgInfos: null
    });
  }

  constructor(private message: NzMessageService, public dao: DaoService, public SHPurchase: SHPurchaseSettinggService) { }

  ngOnInit() {
    this.FindCategoryFirst();
    this.FindOrgList();
  }

  // 查询组织列表
  FindOrgList() {
    this.isSpinning = true;
    const postData = {
      queryFields: '',
      queryOrder: 'shortName',
      queryWhere: [
        {
          fieldName: 'isLegacyOrg',
          operator: 'equal',
          fieldValue: 'true'
        }
      ],
      pageIndex: 0,
      pageSize: 0
    };
    // const tokenCopy = sessionStorage.getItem('token');
    // sessionStorage.removeItem('token');
    //  {
    //   headers: { Authorization: this.SHPurchase.orgApiToken }
    // }
    this.dao.doPostRequest(this.SHPurchase.OrgSearch, postData).subscribe((res: any) => {
      // //console.log(res.data.dataList);
      this.orgList = [];
      let i: number;
      i = 0;
      for (i; i < res.data.dataList.length; i++) {
        this.orgList.push({
          orgId: res.data.dataList[i].bizId,
          orgCode: res.data.dataList[i].code,
          orgSName: res.data.dataList[i].shortName,
          orgName: res.data.dataList[i].name
        });
      }
      // console.log(this.orgList)
      this.isSpinning = false;
      // sessionStorage.setItem('token', tokenCopy);
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
      // sessionStorage.setItem('token', tokenCopy);
    });
  }

  // 刷新一级分类
  FindCategoryFirst() {
    this.isSpinning = true;
    const postData = {
      queryWhere: [
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ],
      queryOrder: 'categoryFirName'
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseFirSearch, postData).subscribe((res: any) => {
      this.categoryFirstList = res.data.dataList;
      // console.log(this.categoryFirstList);
      this.isSpinning = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }

  cancel() {
    // console.log('cancel');
  }

  bindOneCategory(j: number) {
    let i: number;
    i = 0;
    for (i; i < this.categoryFirstList.length; i++) {
      if (this.categoryFirstList[i].bizId === this.SupplierservicesCreates[j].oneCategoryId) {
        this.SupplierservicesCreates[j].oneCategoryCode = this.categoryFirstList[i].code;
        this.SupplierservicesCreates[j].oneCategoryName = this.categoryFirstList[i].categoryFirName;
      }
    }
    // this.SupplierservicesCreates[j].orgInfos = null;
    // console.log(this.SupplierservicesCreates)
  }

  supplier_add() {
    this.isSpinning = true;
    for (const item in this.supplierInfoAdd) {
      if ((this.supplierInfoAdd[item] === null || this.supplierInfoAdd[item] === '') && item !== 'remark'
        && item !== 'businessLicense' && item !== 'orgLicenseNo' && item !== 'address_Sup') {
        this.message.create('warning', this.supplierInfoFeld[item] + '不得为空！');
        this.isSpinning = false;
        break;
      } else if (item === 'remark') {
        this.supplierInfoAdd[item] = (this.supplierInfoAdd[item] === null ||
          this.supplierInfoAdd[item] === '') ? '无' : this.supplierInfoAdd[item];
        // console.log(this.supplierInfoAdd);
        if (this.ifCreateSupplierservices === true) {
          for (let i = 0; i < this.SupplierservicesCreates.length; i++) {
            if (this.SupplierservicesCreates[i].oneCategoryId === null ||
              this.SupplierservicesCreates[i].orgInfos === null && this.SupplierservicesCreates.length !== 1) {
              this.SupplierservicesCreates.splice(i, 1);
              i--;
            } else {
              this.SupplierservicesCreates[i].supplierName = this.supplierInfoAdd.supplierName;
            }
          }
          this.supplierInfoAdd.SupplierservicesCreates = this.SupplierservicesCreates;
        }

        // console.log(this.supplierInfoAdd);

        this.dao.doPostRequest(this.SHPurchase.PurchaseSupCreate, this.supplierInfoAdd).subscribe((res: any) => {
          // this.message.create('success', res.message);
          this.isSpinning = false;
          this.supplierInfoAdd = {
            supplierName: null,
            orgLicenseNo: null,
            businessLicense: null,
            address_Sup: null,
            email: null,
            phone: null,
            password_Sup: null,
            remark: null,
            SupplierservicesCreates: []
          };
          this.SupplierservicesCreates = [{
            supplierName: null,
            oneCategoryId: null,
            oneCategoryCode: null,
            oneCategoryName: null,
            orgInfos: null
          }];
          // console.log(res)
        }, (err: any) => {
          console.log(err);
          this.isSpinning = false;
          // this.message.create('warning', err.error.message);
        });
      }
    }
  }

}
