export interface SysNavMenu {
    level: number;
    title: string;
    icon?: string;
    open: boolean;
    selected: boolean;
    disabled: boolean;
    link?: string;
    children?: SysNavMenu[];
}