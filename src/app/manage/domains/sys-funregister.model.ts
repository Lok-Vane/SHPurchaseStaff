export interface SysFunRegister {
    bizId: string;
    version: number;
    code: string;
    name: string;
    parent_Id: string;
    isEnable: boolean;
    isEnableDataAuth: boolean;
    isFuncType: boolean;
    module_Id: string;
    createdById: string;
    createdByCode: string;
    createdByName: string;
    createdTime: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
