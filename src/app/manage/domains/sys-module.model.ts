export interface SysModule {
    bizId?: string;
    version?: number;
    code?: string;
    name?: string;
    isDiscernOrg?: boolean;
    isDiscernOrg_DName?: string;
    moduleCategory_Id?: string;
    moduleCategory_Code?: string;
    moduleCategory_Name?: string;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
