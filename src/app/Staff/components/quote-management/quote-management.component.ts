import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DaoService, SHPurchaseSettinggService } from 'src/app/core';

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.scss']
})

export class QuoteManagementComponent implements OnInit {

  isSpinning = false;
  // 一级分类缓存列表
  categoryFirstList: any = [];
  // 产品档案(三级)缓存列表
  productList: any = [];
  // 二级分类缓存列表
  categorySecondList: any = [];


  // --------------------------------------------------------------一级分类 增删改 数据对象
  // 一级分类新增 对象
  FirstAdd: any = {
    categoryFirName: null,
    remarl: null
  };
  // 一级分类修改 对象
  FirstModify: any = {
    bizId: null,
    code: null,
    categoryFirName: null,
    remark: null,
  };
  // 一级分类删除 ID
  deleteCategoryFirBizId: string = null;
  // --------------------------------------------------------------一级分类 增删改 数据对象

  // --------------------------------------------------------------二级分类 增删改 数据对象
  // 二级分类新增 对象
  SecondAdd: any = {
    categoryName: null,
    firstCode: null,
    remark: null
  };
  // 二级分类修改 对象
  SecondModify: any = {
    bizId: null,
    categoryName: null,
    firstCode: null,
    remark: null,
    sysVersion: null
  };
  // 二级分类删除 对象
  SecondDelete: any = {
    bizId: null,
    firstCode: null,
  };
  // --------------------------------------------------------------二级分类 增删改 数据对象

  // --------------------------------------------------------------产品档案 增删改 数据对象
  // 采购产品档案新增 对象
  ProductAdd: any = {
    categoryFir_code: null,    // 一级code，不用post

    productName: null,
    categorySecCode: null,
    categorySecName: null,
    specifications: null,
    metering: null,
    productBrand: null,
    remark: null,
    // priceReduct: null           //减价阶梯 暂弃
  };
  // 采购产品档案修改 对象
  ProductModifyFristCode: string = null;     // 选定的一级分类id
  ProductModify: any = {
    bizId: null,
    productName: null,
    categorySecCode: null,
    categorySecName: null,
    specifications: null,       // 规格
    metering: null,       // 计量单位
    productBrand: null,       // 品牌
    remark: null,
    sysVersion: null
  };
  // 采购产品档案删除 对象
  ProductDelete: any = {
    firstCode: null,
    categorySecCode: null,
    bizId: null
  };
  // --------------------------------------------------------------产品档案 增删改 数据对象
  constructor(
    private message: NzMessageService,
    public dao: DaoService,
    public SHPurchase: SHPurchaseSettinggService
  ) { }

  ngOnInit() {
    this.FindCategoryFirst();
  }



  // --------------------------------------------------------------一级分类post方法 增删改
  // 刷新一级分类
  FindCategoryFirst() {
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
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }
  // 查询单个一级分类详情
  FindFirstById(code: string) {
    // //console.log(code)
    this.isSpinning = true;
    this.dao.doPostRequest(this.SHPurchase.PurchaseFirByCode, code).subscribe((res: any) => {
      // console.log(res.data)
      this.FirstModify.bizId = res.data.bizId;
      this.FirstModify.categoryFirName = res.data.categoryFirName;
      this.FirstModify.remark = res.data.remark;
      this.isSpinning = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }
  // 新增一级分类
  categoryFirst_add() {
    this.isSpinning = true;
    if (this.FirstAdd.categoryFirName !== null && this.FirstAdd.categoryFirName !== '') {
      if (this.FirstAdd.remark === '' || this.FirstAdd.remark === null) {
        this.FirstAdd.remark = '无';
      }
      this.dao.doPostRequest(this.SHPurchase.PurchaseFirCreate, this.FirstAdd).subscribe((res: any) => {
        // this.message.create('success', res.message);
        this.FindCategoryFirst();   // 刷新一级分类列表
        // console.log(res);
        this.FirstAdd = {
          categoryFirName: null,
          remark: null
        };
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });

    } else {
      this.message.create('warning', '新增失败！');
      this.isSpinning = false;
    }
  }
  // 修改一级分类
  categoryFirst_modify() {
    this.isSpinning = true;
    if (this.FirstModify.categoryFirName !== null && this.FirstModify.categoryFirName
      !== '' && this.FirstModify.bizId !== null && this.FirstModify.bizId !== '') {
      if (this.FirstModify.remark === '' || this.FirstModify.remark === null) {
        this.FirstModify.remark = '无';
      }
      this.dao.doPostRequest(this.SHPurchase.PurchaseFirModify, this.FirstModify).subscribe((res: any) => {
        // this.message.create('success', res.message);
        this.FindCategoryFirst();   // 刷新一级分类列表
        // console.log(res);
        this.FirstModify = {
          bizId: null,
          code: null,
          categoryFirName: null,
          remark: null,
        };
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });
    } else {
      this.message.create('warning', '修改失败！');
      this.isSpinning = false;
    }
  }
  // 删除一级分类
  categoryFirst_delete() {
    // //console.log(this.deleteCategoryFirBizId)
    this.isSpinning = true;
    if (this.deleteCategoryFirBizId !== '' && this.deleteCategoryFirBizId !== null) {
      this.dao.doPostRequest(this.SHPurchase.PurchaseFirDelete, { bizId: this.deleteCategoryFirBizId }).subscribe((res: any) => {
        // this.message.create('success', res.message);
        this.FindCategoryFirst();   // 刷新一级分类列表
        // console.log(res);
        this.deleteCategoryFirBizId = null;
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });
    } else {
      this.message.create('warning', '删除失败！');
      this.isSpinning = false;
    }
  }
  // --------------------------------------------------------------一级分类post方法 增删改

  // --------------------------------------------------------------二级分类post方法 增删改
  // 新增二级分类
  categorySecond_add() {
    this.isSpinning = true;
    if (this.SecondAdd.categoryName !== '' && this.SecondAdd.categoryName
      !== null && this.SecondAdd.firstCode !== '' && this.SecondAdd.firstCode !== null) {
      if (this.SecondAdd.remark === '' || this.SecondAdd.remark === null) {
        this.SecondAdd.remark = '无';
      }
      this.dao.doPostRequest(this.SHPurchase.PurchaseSecCreate, this.SecondAdd).subscribe((res: any) => {
        // this.message.create('success', res.message);
        // console.log(res);
        this.SecondAdd = {
          categoryName: null,
          categoryFir_Id: null,
          remark: null
        };
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });

    } else {
      this.message.create('warning', '新增失败！');
      this.isSpinning = false;
    }
  }
  // 查询一级分类下属的二级分类
  FindCategory(firstCode: string) {
    this.isSpinning = true;
    const postData = {
      queryWhere: [
        {
          fieldName: 'firstCode',
          operator: 'Equal',
          fieldValue: firstCode
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ],
      queryOrder: 'categoryName'
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseSecSearch, postData).subscribe((res: any) => {
      this.categorySecondList = res.data.dataList;
      // console.log(this.categorySecondList);
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
    if (this.SecondModify.firstCode !== null && this.SecondModify.firstCode !== '') {
      this.SecondModify.bizId = null;
      this.SecondModify.categoryName = null;
      this.SecondModify.remark = null;
      this.SecondModify.sysVersion = null;
      this.isSpinning = false;
    }
    if (this.SecondDelete.firstCode !== null && this.SecondDelete.firstCode !== '') {
      this.SecondDelete.bizId = null;
      this.isSpinning = false;
    }
    if (this.ProductAdd.categoryFir_code !== null && this.ProductAdd.categoryFir_code !== '') {
      this.ProductAdd.productName = null;
      this.ProductAdd.categorySecCode = null;
      this.ProductAdd.categorySecName = null;
      this.ProductAdd.specifications = null;
      this.ProductAdd.metering = null;
      this.ProductAdd.productBrand = null;
      this.ProductAdd.remark = null;
      this.isSpinning = false;
    }
    if (this.ProductModifyFristCode !== null && this.ProductModifyFristCode !== '') {
      this.ProductModify = {
        bizId: null,
        productName: null,
        categorySecCode: null,
        categorySecName: null,
        specifications: null,       // 规格
        metering: null,       // 计量单位
        productBrand: null,       // 品牌
        remark: null,
        sysVersion: null
      };
      this.isSpinning = false;
    }
    if (this.ProductDelete.firstCode !== null && this.ProductDelete.firstCode !== '') {
      this.ProductDelete.bizId = null;
      this.ProductDelete.categorySecCode = null;
      this.isSpinning = false;
    }
  }
  // bizId查询单个二级分类
  FindCategorySecond(bizId: string) {
    const postData = {
      queryWhere: [
        {
          fieldName: 'bizId',
          operator: 'Equal',
          fieldValue: bizId
        }
      ]
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseSecSearch, postData).subscribe((res: any) => {
      // console.log(res);
      this.SecondModify.categoryName = res.data.dataList[0].categoryName;
      this.SecondModify.remark = res.data.dataList[0].remark;
      this.SecondModify.sysVersion = res.data.dataList[0].sysVersion;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }
  // 修改二级分类
  categorySecond_modify() {
    // console.log(this.SecondModify)
    this.isSpinning = true;
    if (this.SecondModify.firstCode !== null && this.SecondModify.firstCode
      !== '' && this.SecondModify.bizId !== null && this.SecondModify.bizId !== ''
      && this.SecondModify.categoryName !== null && this.SecondModify.categoryName !== '') {
      if (this.SecondModify.remark === '' || this.SecondModify.remark === null) {
        this.SecondModify.remark = '无';
      }
      this.dao.doPostRequest(this.SHPurchase.PurchaseSecModify, this.SecondModify).subscribe((res: any) => {
        // this.message.create('success', res.message);
        // console.log(res);
        this.categorySecondList = [];
        this.SecondModify = {
          bizId: null,
          categoryName: null,
          firstCode: null,
          remark: null
        };
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });
    } else {
      this.message.create('warning', '修改失败！');
      this.isSpinning = false;
    }
  }
  // 删除二级分类
  categorySecond_delete() {
    this.isSpinning = true;
    if (this.SecondDelete.firstCode !== null && this.SecondDelete.firstCode !== ''
      && this.SecondDelete.bizId !== null && this.SecondDelete.bizId !== '') {
      this.dao.doPostRequest(this.SHPurchase.PurchaseSecDelete, { bizId: this.SecondDelete.bizId }).subscribe((res: any) => {
        // console.log(res)
        // this.message.create('success', res.message);
        this.categorySecondList = [];
        this.SecondDelete = {
          bizId: null,
          firstCode: null,
        };
        this.isSpinning = false;
      }, (err: any) => {
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
        console.log(err);
      });
    } else {
      this.message.create('warning', '删除失败！');
      this.isSpinning = false;
      // //console.log(this.SecondDelete)
    }
  }
  // --------------------------------------------------------------二级分类post方法 增删改

  // --------------------------------------------------------------产品档案post方法 增删改
  // code绑定二级名称
  bindSecName(code: string) {
    let i: number;
    i = 0;
    for (i; i < this.categorySecondList.length; i++) {
      if (this.categorySecondList[i].code === code) {
        this.ProductAdd.categorySecName = this.categorySecondList[i].categoryName;
        break;
      }
    }
    // //console.log(this.ProductAdd)
    this.ProductAdd.productName = null;
    this.ProductAdd.specifications = null;
    this.ProductAdd.metering = null;
    this.ProductAdd.productBrand = null;
    this.ProductAdd.remark = null;
  }
  // 新增产品档案
  product_add() {
    this.isSpinning = true;
    if (this.ProductAdd.categoryFir_code !== null && this.ProductAdd.categoryFir_code !== ''
      && this.ProductAdd.categorySecCode !== null && this.ProductAdd.categorySecCode !== ''
      && this.ProductAdd.productName !== null && this.ProductAdd.productName !== ''
      && this.ProductAdd.metering !== null && this.ProductAdd.metering !== ''
      && this.ProductAdd.specifications !== null && this.ProductAdd.specifications !== '') {
      if (this.ProductAdd.remark === '' || this.ProductAdd.remark === null) {
        this.ProductAdd.remark = '无';
      }
      if (this.ProductAdd.productBrand === '' || this.ProductAdd.productBrand === null) {
        this.ProductAdd.productBrand = '无';
      }
      const ProductAdd = {
        productName: this.ProductAdd.productName,
        categorySecCode: this.ProductAdd.categorySecCode,
        categorySecName: this.ProductAdd.categorySecName,
        specifications: this.ProductAdd.specifications,
        metering: this.ProductAdd.metering,
        productBrand: this.ProductAdd.productBrand,
        remark: this.ProductAdd.remark,
      };

      this.dao.doPostRequest(this.SHPurchase.PurchaseProCreate, ProductAdd).subscribe((res: any) => {
        // this.message.create('success', res.message);
        // console.log(res);
        this.categorySecondList = [];
        this.ProductAdd = {
          categoryFir_code: null,    // 一级code，不用post

          productName: null,
          categorySecCode: null,
          categorySecName: null,
          specifications: null,
          metering: null,
          productBrand: null,
          remark: null,
          // priceReduct: null           //减价阶梯 暂弃
        };
        this.isSpinning = false;
      }, (err: any) => {
        console.log(err);
        // this.message.create('warning', err.error.message);
        this.isSpinning = false;
      });

    } else {
      this.message.create('warning', '新增失败！');
      this.isSpinning = false;
      // //console.log(this.Tab_3)
    }
  }
  // 查询二级分类下的产品列表
  FindProductList(code: string) {
    this.isSpinning = true;
    const postData = {
      queryFields: '',
      queryWhere: [
        {
          fieldName: 'categorySecCode',
          operator: 'Equal',
          fieldValue: code
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }
      ],
      queryOrder: 'productName',
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseProSearch, postData).subscribe((res: any) => {
      this.productList = res.data.dataList;
      // //console.log(res)
      this.isSpinning = false;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
    // ;选定的二级分类改变后，重置数据对象
    // if (this.ProductDelete.categoryID !== null && this.ProductDelete.categoryID !== '') {
    //   this.ProductDelete.productBizId = null
    // }
    if (this.ProductModify.categorySecCode !== null && this.ProductModify.categorySecCode !== '') {
      this.ProductModify.bizId = null;
      this.ProductModify.productName = null;
      this.ProductModify.specifications = null;
      this.ProductModify.metering = null;
      this.ProductModify.productBrand = null;
      this.ProductModify.remark = null;
      this.ProductModify.sysVersion = null;
      this.ProductModify.categorySecName = null;
      this.isSpinning = false;
    }
    if (this.ProductDelete.categorySecCode !== null && this.ProductDelete.categorySecCode !== '') {
      this.ProductDelete.bizId = null;
      this.isSpinning = false;
    }
  }
  // 查询单个产品信息
  FindProduct(bizid: any) {
    this.isSpinning = true;
    const postData = {
      queryFields: '',
      queryWhere: [
        {
          fieldName: 'bizId',
          operator: 'Equal',
          fieldValue: bizid
        },
        {
          fieldName: 'state',
          operator: 'Equal',
          fieldValue: 1
        }

      ],
      queryOrder: 'productName',
    };
    this.dao.doPostRequest(this.SHPurchase.PurchaseProSearch, postData).subscribe((res: any) => {
      this.isSpinning = false;
      // console.log(res.data.dataList[0]);
      this.ProductModify.productName = res.data.dataList[0].productName;
      this.ProductModify.categorySecCode = res.data.dataList[0].categorySecCode;
      this.ProductModify.categorySecName = res.data.dataList[0].categorySecName;
      this.ProductModify.specifications = res.data.dataList[0].specifications;
      this.ProductModify.metering = res.data.dataList[0].metering;
      this.ProductModify.productBrand = res.data.dataList[0].productBrand;
      this.ProductModify.remark = res.data.dataList[0].remark;
      this.ProductModify.sysVersion = res.data.dataList[0].sysVersion;
    }, (err: any) => {
      console.log(err);
      this.isSpinning = false;
      // this.message.create('warning', err.error.message);
    });
  }
  // 修改产品信息
  product_modif() {
    this.isSpinning = true;
    if (this.ProductModifyFristCode !== null && this.ProductModifyFristCode !== '') {
      if (this.ProductModify.categorySecCode !== null && this.ProductModify.categorySecCode !== '') {
        if (this.ProductModify.bizId !== null && this.ProductModify.bizId !== '') {
          if (this.ProductModify.productName !== null && this.ProductModify.productName !== '') {
            if (this.ProductModify.specifications !== null && this.ProductModify.specifications !== '') {
              if (this.ProductModify.metering !== null && this.ProductModify.metering !== '') {
                if (this.ProductModify.explain === null || this.ProductModify.explain === '') {
                  this.ProductModify.explain = '无';
                }
                if (this.ProductModify.productBrand === null || this.ProductModify.productBrand === '') {
                  this.ProductModify.productBrand = '无';
                }
                this.dao.doPostRequest(this.SHPurchase.PurchaseProModify, this.ProductModify).subscribe((res: any) => {
                  // this.message.create('success', res.message);
                  // post修改成功后数据重置
                  this.categorySecondList = [];
                  this.productList = [];
                  this.ProductModifyFristCode = null;
                  this.ProductModify = {
                    bizId: null,
                    productName: null,
                    categorySecCode: null,
                    categorySecName: null,
                    specifications: null,       // 规格
                    metering: null,       // 计量单位
                    productBrand: null,       // 品牌
                    remark: null,
                    sysVersion: null
                  };
                  // ;console.log(res)
                  this.isSpinning = false;
                }, (err: any) => {
                  // this.message.create('warning', err.error.message);
                  console.log(err);
                  this.isSpinning = false;
                });
              } else {
                this.message.create('warning', '修改失败！');
                this.isSpinning = false;
              }
            } else {
              this.message.create('warning', '修改失败！');
              this.isSpinning = false;
            }
          } else {
            this.message.create('warning', '修改失败！');
            this.isSpinning = false;
          }
        } else {
          this.message.create('warning', '修改失败！');
          this.isSpinning = false;
        }
      } else {
        this.message.create('warning', '修改失败！');
        this.isSpinning = false;
      }
    } else {
      this.message.create('warning', '修改失败！');
      this.isSpinning = false;
    }
  }
  // 删除产品档案
  product_delete() {
    this.isSpinning = true;
    this.dao.doPostRequest(this.SHPurchase.PurchaseProDelete, { bizId: this.ProductDelete.bizId }).subscribe((res: any) => {
      // console.log(res)
      // this.message.create('success', res.message);
      // 重置二级分类列表、产品列表
      this.categorySecondList = [];
      this.productList = [];
      this.ProductDelete = {
        firstCode: null,
        categorySecCode: null,
        bizId: null
      };
      this.isSpinning = false;
    }, (err: any) => {
      // this.message.create('warning', err.error.message);
      console.log(err);
      this.isSpinning = false;
    });
  }
  // --------------------------------------------------------------产品档案post方法 增删改

  // 页签变更 重置缓存列表
  resetList() {
    this.productList = [];
    this.categorySecondList = [];

    this.FirstAdd = {
      categoryFirName: null,
      remark: null
    };
    this.FirstModify = {
      bizId: null,
      code: null,
      categoryFirName: null,
      remark: null,
    };
    this.deleteCategoryFirBizId = null;

    this.SecondAdd = {
      categoryName: null,
      firstCode: null,
      remark: null
    };
    this.SecondModify = {
      bizId: null,
      categoryName: null,
      firstCode: null,
      remark: null,
      sysVersion: null
    };
    this.SecondDelete = {
      bizId: null,
      firstCode: null,
    };

    this.ProductAdd = {
      categoryFir_code: null,    // 一级code，不用post

      productName: null,
      categorySecCode: null,
      categorySecName: null,
      specifications: null,
      metering: null,
      productBrand: null,
      remark: null,
      // priceReduct: null           //减价阶梯 暂弃
    };

    this.ProductModifyFristCode = null;     // 选定的一级分类id
    this.ProductModify = {
      bizId: null,
      productName: null,
      categorySecCode: null,
      categorySecName: null,
      specifications: null,       // 规格
      metering: null,       // 计量单位
      productBrand: null,       // 品牌
      remark: null,
      sysVersion: null
    };
    this.ProductDelete = {
      firstCode: null,
      categorySecCode: null,
      bizId: null
    };

    // //console.log('DataList has already reset.')
  }
  cancel() {

  }

}
