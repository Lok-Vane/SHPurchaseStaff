export interface SysOrgGroup {
    bizId: string;
    version?: number;
    code?: string;
    name?: string;
    shortName?: string;
    parent_Id?: string;
    isEffective?: boolean;
    effectiveDate?: Date;
    disableDate?: Date;
    address?: string;
    telephone?: string;
    fax?: string;
    establishDate?: Date;
    remark?: string;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
