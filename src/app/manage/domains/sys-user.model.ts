export interface SysUser {
    bizId: string;
    version?: number;
    code?: string;
    name: string;
    password?: string;
    salt?: string;
    mobile?: string;
    email?: string;
    identityType?: number;
    identityName?: string;
    isEffective?: boolean;
    effectiveDate?: Date;
    disableDate?: Date;
    userType?: number;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
