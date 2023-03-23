import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class TransaksiHelper extends BaseHelper {
    static url = api.transaksi.transaksi;

    // static proses(data: any, callback?: Callback) {
    //     return super.postBase("proses", { parameter: { data: data} }, callback)
    // }
    static prosesTransaksi(data: any, callback?: Callback) {
        return super.postBase("proses", { parameter: { data:  data  } }, callback)
    }
    static batalkan(idTransaksi: any, callback?: Callback) {
        return super.postBase("cancel", { parameter: { data: { idTransaksi } } }, callback)
    }
    static terima(idTransaksi: any, callback?: Callback) {
        return super.postBase("complete", { parameter: { data: { idTransaksi } } }, callback)
    }
    static terimaNego(idTransaksi: any, callback?: Callback) {
        return super.postBase("approvalnego", { parameter: { data: { idTransaksi, isApprove:"Ya" } } }, callback)
    }
    static tolakNego(idTransaksi: any, callback?: Callback) {
        return super.postBase("approvalnego", { parameter: { data: { idTransaksi, isApprove:"Tidak" } } }, callback)
    }
    static diambil(idTransaksi: any, callback?: Callback) {
        return super.postBase("prosesSiapDiambil", { parameter: { data: { idTransaksi } } }, callback)
    }
    static dikirim(data: any, callback?: Callback) {
        return super.postBase("prosesDikirim", { parameter: { data: data } }, callback)
    }
}

export default TransaksiHelper;