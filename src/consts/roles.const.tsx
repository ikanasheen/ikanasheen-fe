import { DisplayValueStandardModel } from "models";

export const RolesConst: DisplayValueStandardModel[] = [{
    display: "Sales Coordinator",
    value: "sales-coordinator"
}, {
    display: "Sales Agent",
    value: "sales-agent"
}]

interface RolesEnumModel {
    [x: string]: Roles;
}

export const RolesEnum: RolesEnumModel = {
    SALES_COORDINATOR: "sales-coordinator",
    SALES_AGENT: "sales-agent"
}

export type Roles = "sales-coordinator" | "sales-agent";

export default RolesConst;