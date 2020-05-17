export interface SysMenu {
    bizId: string;
    version?: number;
    code?: string;
    name: string;
    link?: string;
    module_Id?: string;
    module_Code?: string;
    module_Name?: string;
    parent_Id?: string;
    parent_Code?: string;
    parent_Name?: string;
    isVirtualMenu?: boolean;
    isLeaf?: boolean;
    sort?: number;
    isEnable?: boolean;
    icon?: string;
    hierarchy?: number;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
