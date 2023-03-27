import { DisplayValueStandardModel } from "models";

export const StatusConst: DisplayValueStandardModel[] = [{
    display: "Aktif",
    value: "ACTIVE"
}, {
    display: "Tidak Aktif",
    value: "INACTIVE"
}]

// interface StatusEnumModel {
//     [x: string]: Status;
// }

// export const StatusEnum: StatusEnumModel = {
//     ACTIVE: "ACTIVE",
//     INACTIVE: "INACTIVE",
// }

// export type Status = "ACTIVE" | "INACTIVE";
export default StatusConst;