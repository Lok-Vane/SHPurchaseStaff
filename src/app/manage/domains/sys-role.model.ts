export interface SysRole {
    bizId: string;
    version?: number;
    code?: string;
    name: string;
    orgGroup_Id?: string;
    orgGroup_Code?: string;
    orgGroup_FName?: string;
    orgGroup_SName?: string;
    organize_Id?: string;
    organize_Code?: string;
    organize_FName?: string;
    organize_SName?: string;
    roleType?: number;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
