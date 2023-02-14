export default interface ConfigurationRolesModel {
    menuCode: string;
    permissions?: ConfigurationPermissionsModel;
}

export interface ConfigurationPermissionsModel {
    [x: string]: any;
    create?: string;
    edit?: string;
    view?: string;
    delete?: string;
    detail?: string;
}