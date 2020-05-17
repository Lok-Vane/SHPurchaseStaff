export interface EpuDictionary {
    bizId?: string;
    version?: number;
    code?: string;
    name?: string;
    remark?: string;
    isEnable?: boolean;
    isPrecut?: boolean;
    dictType_Id?: string;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
