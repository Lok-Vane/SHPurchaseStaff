import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EPurchaseSettingService {
    public readonly baseUrl = '/api/shepp/v1';

    // 一级分类
    public readonly FirCategorySearch = `${this.baseUrl}/categoryclassifiyfirst/search`;  // 查询
    public readonly FirCategoryCreateBef = `${this.baseUrl}/categoryclassifiyfirst/beforecreate`;  // 新增前
    public readonly FirCategoryCreate = `${this.baseUrl}/categoryclassifiyfirst/create`;  // 新增
    public readonly FirCategoryModifyBef = `${this.baseUrl}/categoryclassifiyfirst/beforemodify`;  // 修改前
    public readonly FirCategoryModify = `${this.baseUrl}/categoryclassifiyfirst/modify`;  // 修改
    public readonly FirCategoryDelete = `${this.baseUrl}/categoryclassifiyfirst/delete`;  // 删除
    public readonly FirCategoryBatchDelete = `${this.baseUrl}/categoryclassifiyfirst/batchdelete`;  // 批量删除
    public readonly FirCategoryRecovery = `${this.baseUrl}/categoryclassifiyfirst/recovery`;  // 恢复
    public readonly FirCategoryBatchRecovery = `${this.baseUrl}/categoryclassifiyfirst/batchrecovery`;  // 批量恢复
    public readonly FirCategoryByCode = `${this.baseUrl}/categoryclassifiyfirst/findbycode`;  // 根据Code查询

    // 二级分类
    public readonly SecCategorySearch = `${this.baseUrl}/categoryclassifiysecond/search`;  // 查询
    public readonly SecCategoryCreateBef = `${this.baseUrl}/categoryclassifiysecond/beforecreate`;  // 创建前
    public readonly SecCategoryCreate = `${this.baseUrl}/categoryclassifiysecond/create`;  // 创建
    public readonly SecCategoryModifyBef = `${this.baseUrl}/categoryclassifiysecond/beforemodify`;  // 修改前
    public readonly SecCategoryModify = `${this.baseUrl}/categoryclassifiysecond/modify`;  // 修改
    public readonly SecCategoryDelete = `${this.baseUrl}/categoryclassifiysecond/delete`;  // 删除
    public readonly SecCategoryBatchDelete = `${this.baseUrl}/categoryclassifiysecond/batchdelete`;  // 批量删除
    public readonly SecCategoryRecovery = `${this.baseUrl}/categoryclassifiysecond/recovery`;  // 恢复
    public readonly SecCategoryBatchRecovery = `${this.baseUrl}/categoryclassifiysecond/batchrecovery`;  // 批量恢复
    public readonly SecCategoryByCode = `${this.baseUrl}/categoryclassifiysecond/findbycode`;  // 根据Code查询

    // 数据字典
    public readonly DictionarySearch = `${this.baseUrl}/dictionary/search`;  // 查询
    public readonly DictionaryCreateBef = `${this.baseUrl}/dictionary/beforecreate`;  // 创建前
    public readonly DictionaryCreate = `${this.baseUrl}/dictionary/create`;  // 创建
    public readonly DictionaryModifyBef = `${this.baseUrl}/dictionary/beforemodify`;  // 修改前
    public readonly DictionaryModify = `${this.baseUrl}/dictionary/modify`;  // 修改
    public readonly DictionaryDelete = `${this.baseUrl}/dictionary/delete`;  // 删除
    public readonly DictionaryBatchDelete = `${this.baseUrl}/dictionary/batchdelete`;  // 批量删除
    public readonly DictionaryByCode = `${this.baseUrl}/dictionary/findbycode`;  // 根据Code查询

    // 供应商档案
    public readonly SupplierCreateBef = `${this.baseUrl}/supplierinfo/beforecreate`;  // 创建
    public readonly SupplierCreate = `${this.baseUrl}/supplierinfo/create`;  // 创建
    public readonly SupplierModifyBef = `${this.baseUrl}/supplierinfo/beforemodify`;  // 修改前
    public readonly SupplierModify = `${this.baseUrl}/supplierinfo/modifybystaff`;  // 修改
    public readonly SupplierDelete = `${this.baseUrl}/supplierinfo/delete`;  // 删除
    public readonly SupplierBatchDelete = `${this.baseUrl}/supplierinfo/batchdelete`;  // 批量删除
    public readonly SupplierRecovery = `${this.baseUrl}/supplierinfo/recovery`;  // 恢复
    public readonly SupplierBatchRecovery = `${this.baseUrl}/supplierinfo/batchrecovery`;  // 批量恢复
    public readonly SupplierSearch = `${this.baseUrl}/supplierinfo/search`;  // 查询

    // 材料档案
    public readonly MaterialCreateBef = `${this.baseUrl}/product/beforecreate`;  // 创建前
    public readonly MaterialCreate = `${this.baseUrl}/product/create`;  // 创建
    public readonly MaterialModifyBef = `${this.baseUrl}/product/beforemodify`;  // 修改前
    public readonly MaterialModify = `${this.baseUrl}/product/modify`;  // 修改
    public readonly MaterialDelete = `${this.baseUrl}/product/delete`;  // 删除
    public readonly MaterialBatchDelete = `${this.baseUrl}/product/batchdelete`;  // 批量删除
    public readonly MaterialRecovery = `${this.baseUrl}/product/recovery`;  // 恢复
    public readonly MaterialBatchRecovery = `${this.baseUrl}/product/batchrecovery`;  // 批量恢复
    public readonly MaterialSearch = `${this.baseUrl}/product/search`;  // 查询
    public readonly MaterialByCode = `${this.baseUrl}/product/findbycode`;  // 根据Code查询

    // 供应关系
    public readonly ReSupplyCreate = `${this.baseUrl}/supplierservices/createbystraff`;  // 新增
    public readonly ReSupplyBatchDelete = `${this.baseUrl}/supplierservices/batchdeletebystraff`;  // 批量删除
    public readonly ReSupplyDelete = `${this.baseUrl}/supplierservices/deletebystraff`;  // 删除
    public readonly ReSupplyRecovery = `${this.baseUrl}/supplierservices/recovery`;  // 恢复
    public readonly ReSupplyBatchRecovery = `${this.baseUrl}/supplierservices/batchrecovery`;  // 批量恢复
    public readonly ReSupplySearch = `${this.baseUrl}/supplierservices/search`;  // 查询

    // 竞价项目
    public readonly ViePriceCreateBef = `${this.baseUrl}/biddingproject/beforecreate`;  // 新增前
    public readonly ViePriceCreate = `${this.baseUrl}/biddingproject/create`;  // 新增
    public readonly ViePriceModifyBef = `${this.baseUrl}/biddingproject/beforemodify`;  // 修改
    public readonly ViePriceModify = `${this.baseUrl}/biddingproject/modify`;  // 修改
    public readonly ViePriceBatchDel = `${this.baseUrl}/biddingproject/batchdelete`;  // 批量删除
    public readonly ViePriceDelete = `${this.baseUrl}/biddingproject/delete`;  // 删除
    public readonly ViePriceSearch = `${this.baseUrl}/biddingproject/searchbymaster`;  // 查询
    public readonly ViePriceDetail = `${this.baseUrl}/biddingproject/search`;  // 详情

    public readonly EPurchaseNoticeSearch = `${this.baseUrl}/notice/search`;  // 查询公告
    public readonly EPurchaseBidSearch = `${this.baseUrl}/biddingproject/search`;  // 招标项目详情 内部
    public readonly EPurchaseBidSearchSup = `${this.baseUrl}/biddingproject/suppliersearch`;  // 招标项目详情 供应商
    public readonly EPurchaseBidModify = `${this.baseUrl}/biddingproject/modify`;  // 招标项目修改 内部
    public readonly EPurchaseBidCreate = `${this.baseUrl}/biddingproject/create`;  // 招标项目创建 内部

    public readonly EPurchaseProjCount = `${this.baseUrl}/partproject/getcount`;  // 获取出价人数
    public readonly EPurchaseProjSupPar = `${this.baseUrl}/partproject/suppliersearch`;  // 获取供应商已参与项目

    public readonly EPurchaseGetResult = `${this.baseUrl}/bcdistribution/getresult`;  // 获取项目竞价结果 内部
    public readonly EPurchaseGetResultSup = `${this.baseUrl}/bcdistribution/suppliersearch`;  // 获取项目竞价结果 供应商

    public readonly EPurchaseBidOffer = `${this.baseUrl}/biddingoffer/create`;  // 供应商新增报价
    public readonly EPurchaseBidRanking = `${this.baseUrl}/biddingoffer/ranking`;  // 供应商获取最新排名
    public readonly EPurchaseBidSupHistory = `${this.baseUrl}/biddingoffer/suppliersearch`;  // 供应商查询历史报价

}
