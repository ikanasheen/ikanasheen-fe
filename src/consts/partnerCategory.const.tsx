import { DisplayValueStandardModel } from "models";

export const PartnerCategoryConst: DisplayValueStandardModel[] = [{
    display: "HYBRID",
    value: "HYBRID"
}, {
    display: "PRINT",
    value: "PRINT"
}, {
    display: "PC",
    value: "PC"
}]

interface PartnerCategoryEnumModel {
    [x: string]: PartnerCategoryType;
}

export const PartnerCategoryEnum: PartnerCategoryEnumModel = {
    HYBRID: "HYBRID",
    PRINT: "PRINT",
    PC: "PC"
}

export type PartnerCategoryType = "HYBRID" | "PRINT" | "PC";

export default PartnerCategoryConst;