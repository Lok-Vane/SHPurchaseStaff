export interface SysRule {
    bizId: string;
    resourceperm_id: string;
    metadata_id: string;
    opersymbol: number;
    opervalue: string;
    valuetype: number;
    createdbyid: string;
    createdbycode: string;
    createdbyname: string;
    createdtime: Date;
    modifybyid?: string;
    modifybycode?: string;
    modifybyname?: string;
    modifytime?: Date;
}
