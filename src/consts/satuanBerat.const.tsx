import { DisplayValueStandardModel } from "models";

export const SatuanBeratConst: DisplayValueStandardModel[] = [{
    display: "Kg",
    value: "Kg"
}, {
    display: "Kwintal",
    value: "Kwintal"
}, {
    display: "Ton",
    value: "Ton"
}]

interface SatuanBeratEnumModel {
    [x: string]: SatuanBerat;
}

export const SatuanBeratEnum: SatuanBeratEnumModel = {
    KG: "Kg",
    Kwintal: "Kwintal",
    Ton: "Ton"
}

export type SatuanBerat = "Kg" | "Kwintal" |"Ton";

export default SatuanBeratConst;