export interface SysMetadata {
    bizId: string;
    version?: number;
    module_Id?: string;
    function_Id?: string;
    name: string;
    displayName?: string;
    isFixedLength?: boolean;
    description?: string;
    isEnable?: boolean;
    keyAttribute?: string;
    length?: number;
    maxValue?: number;
    minValue?: number;
    precise?: number;
    createdById?: string;
    createdByCode?: string;
    createdByName?: string;
    createdTime?: Date;
    modifyById?: string;
    modifyByCode?: string;
    modifyByName?: string;
    modifyTime?: Date;
}
