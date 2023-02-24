import { CombinationTypeModel } from "models";

export default interface MenuModel {
    menuCode: string;
    menuName: string;
    menuPath?: string;
    menuParent?: string;
    menuIcon?: string;
    children?: MenuModel[];
    keyCode?: string | number;
    combination?: CombinationTypeModel | CombinationTypeModel[];
}

export interface MenuPermissionWrapper {
    menuCode: string;
    menuName: string;
    menuIcon?: string;
    menuParent?: string;
    menuPath?: string;
    details: string[];
    role: string[];
}

interface Details {
    functionCode: string;
    functionName: string;
}