import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class TransaksiHelper extends BaseHelper {
    static url = api.transaksi.transaksi;

    static proses(idTransaksi: any, idUserNelayan:any, isNego:any, hargaNego: any, callback?: Callback) {
        return super.postBase("", { parameter: { data: { idTransaksi, idUserNelayan, isNego, hargaNego } } }, callback)
    }
}

export default TransaksiHelper;