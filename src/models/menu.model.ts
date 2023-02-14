import { CombinationTypeModel } from "models";

export default interface MenuModel {
    menuCode: string;
    menuName: string;
    menuPath?: string;
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
    menuSort: number;
    details: Details[];
    keyCode: string | number;
    combination?: CombinationTypeModel | CombinationTypeModel[];
    titleContent?: string;
    titlePage?: string;
}

interface Details {
    functionCode: string;
    functionName: string;
}