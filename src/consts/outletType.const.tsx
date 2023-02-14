import { DisplayValueStandardModel } from "models";

export const OutletTypeConst: DisplayValueStandardModel[] = [{
    display: "BRANCH",
    value: "BRANCH"
}, {
    display: "HQ",
    value: "HQ"
}]

interface OutletTypeEnumModel {
    [x: string]: OutletType;
}

export const OutletTypeEnum: OutletTypeEnumModel = {
    BRANCH: "BRANCH",
    HQ: "HQ"
}

export type OutletType = "BRANCH" | "HQ";

export default OutletTypeConst;