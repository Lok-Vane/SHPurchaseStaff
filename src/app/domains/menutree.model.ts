export interface MenuTree {
    key: string;
    title: string;
    icon: string;
    isLeaf: boolean;
    checked?: boolean;
    selected?: boolean;
    selectable?: boolean;
    disabled: boolean;
    disablecheckbox?: boolean;
    children?: MenuTree[];
}
