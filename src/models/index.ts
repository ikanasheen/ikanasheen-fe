export type { default as Breadcrumb } from "./breadcrumb.model";
export type { default as ResponseModel } from "./response.model";
export type { default as MenuModel } from "./menu.model";
export type { default as DisplayValueStandardModel } from "./displayvaluestandard.model";
export type { default as ConfigurationRolesModel } from "./configuration-roles.model";
export type { default as CombinationTypeModel } from "./shortcut.model";
export * from "./file.model";
export type OnSubmit = ((data: any) => any);

interface PathCRUD {
    [x: string]: any;
    title: string;
    mode: "create" | "edit" | "detail";
    key: string | null;
}
export type CallbackMounted = (pt: PathCRUD) => any;