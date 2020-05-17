export interface EpuSupplier {
    bizId?: string;
    code?: string;
    supplierName?: string;
    phone?: string;
    email?: string;
    address_Sup?: string;
    jurisdiction?: number;
    orgLicenseNo?: string;
    businessLicense?: string;
    reserve1?: string;
    reserve2?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
    checker?: string;
    checkTime?: Date;
    state?: number;
    sysVersion?: number;
    remark?: string;
}
