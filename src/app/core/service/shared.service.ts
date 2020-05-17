import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  keyWordSearch: string = null;

  // 二级分类列表
  categorySecondList: any = [];

  Time: any = null;
  ifEndTime = true;

  TimeCopy: any = null;
  ifEndTimeCopy = false;

  public Form1: any = {
    orgCode: null,        // 采购组织编码
    orgSName: null,
    orgName: null,
    orgId: null,
    categoryName: null,
    category: null,       // 材料一级分类   code
    projectName: null,    // 项目名称
    // releaseTime: null,    //发布时间
    endTime: null,        // 截止时间
    // publishTime: null,
    startTime: null,        // 开始时间
    seedGoodsTime: null,    // 交货完成时间
    // reserve1: null          //结算方式
    bizId: null,
    code: null
  };

  public Form2: any = [
    {
      checked: false,
      secCode: null,
      productList: [],
      productCode: null,
      productName: null,
      specifications: null,
      metering: null,
      purchaseNum: 0,
      dropPrice: 0,
      highestLimit: 0,
      distribute1: 0,
      distribute2: 0,
      distribute3: 0,
      // errorLimit: 0,
      reserve1: null,    // 品牌或产地
      reserve2: null,    // 税率
      reserve3: null,    // 结算方式
      reserve4: null,    // 运费税率
      reserve5: null,
      remark: null
    },
    {
      checked: false,
      secCode: null,
      productList: [],
      productCode: null,
      productName: null,
      specifications: null,
      metering: null,
      purchaseNum: 0,
      dropPrice: 0,
      highestLimit: 0,
      distribute1: 0,
      distribute2: 0,
      distribute3: 0,
      // errorLimit: 0,
      reserve1: null,    // 品牌或产地
      reserve2: null,    // 税率
      reserve3: null,    // 结算方式
      reserve4: null,    // 运费税率
      reserve5: null,
      remark: null
    },
    {
      checked: false,
      secCode: null,
      productList: [],
      productCode: null,
      productName: null,
      specifications: null,
      metering: null,
      purchaseNum: 0,
      dropPrice: 0,
      highestLimit: 0,
      distribute1: 0,
      distribute2: 0,
      distribute3: 0,
      // errorLimit: 0,
      reserve1: null,    // 品牌或产地
      reserve2: null,    // 税率
      reserve3: null,    // 结算方式
      reserve4: null,    // 运费税率
      reserve5: null,
      remark: null
    }
  ];

  public Form1Copy: any = {
    orgCode: null,        // 采购组织编码
    category: null,       // 材料一级分类   code
    projectName: null,    // 项目名称
    releaseTime: null,    // 发布时间
    endTime: null,        // 截止时间
    // publishTime: null,
    startTime: null,        // 开始时间
    seedGoodsTime: null,    // 交货完成时间
    // reserve1: null          //结算方式
    sysVersion: null
  };

  public Form2Copy: any = [];

}
