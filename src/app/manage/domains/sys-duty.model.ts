export interface SysDuty {
    bizId: string;
    version: number;
    code: string;
    name: string;
    type: number;
    typeName: string;
    createdById: string;
    createdByCode: string;
    createdByName: string;
    createdTime: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
