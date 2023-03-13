import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class TransaksiHelper extends BaseHelper {
    static url = api.transaksi.transaksi;

    static proses(idTransaksi: any, idUserNelayan:any, isNego:any, hargaNego: any, callback?: Callback) {
        return super.postBase("proses", { parameter: { data: { idTransaksi, idUserNelayan, isNego, hargaNego } } }, callback)
    }

    static batalkan(idTransaksi: any, callback?: Callback) {
        return super.postBase("cancel", { parameter: { data: { idTransaksi} } }, callback)
    }
    static terima(idTransaksi: any, callback?: Callback) {
        return super.postBase("complete", { parameter: { data: { idTransaksi} } }, callback)
    }
}

export default TransaksiHelper;