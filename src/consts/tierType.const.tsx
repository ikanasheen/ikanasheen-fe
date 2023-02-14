import { DisplayValueStandardModel } from "models";

export const TierTypeConst: DisplayValueStandardModel[] = [{
    display: "T1",
    value: "T1"
}, {
    display: "T2",
    value: "T2"
}, {
    display: "T3",
    value: "T3"
}]

interface TierTypeEnumModel {
    [x: string]: TierType;
}

export const TierTypeEnum: TierTypeEnumModel = {
    T1: "T1",
    T2: "T2",
    T3: "T3"
}

export type TierType = "T1" | "T2" | "T3";

export default TierTypeConst;