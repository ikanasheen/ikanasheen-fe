import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class DashboardHelper extends BaseHelper {
    static url = api.dashboard.dashboard;

    static cuaca(callback?: Callback) {
        return super.postBase("dashboard", {}, callback, { showError: false, showSuccess: false })
    }
    static jumlahIkan(callback?: Callback) {
        return super.postBase("ikan", {}, callback, { showError: false, showSuccess: false })
    }
    static jumlahNelayan(callback?: Callback) {
        return super.postBase("nelayan", {}, callback, { showError: false, showSuccess: false })
    }

    static transaksiTanggal(data: any, callback?: Callback) {
        return super.postBase("transaksi/weekly", {parameter: { data }}, callback, { showError: false, showSuccess: false })
    }
    static transaksiStatus(data: any,callback?: Callback) {
        return super.postBase("transaksi/daily", {parameter: { data } }, callback, { showError: false, showSuccess: false })
    }
    static transaksiKecamatan(callback?: Callback) {
        return super.postBase("transaksi/kecamatan", {}, callback, { showError: false, showSuccess: false })
    }

    static jumlahTransaksi(data: any, callback?: Callback) {
        return super.postBase("transaksi", { parameter: { data } }, callback, { showError: false, showSuccess: false })
    }

    static jumlahBantuan(data: any, callback?: Callback) {
        return super.postBase("bantuan", {parameter: { data } }, callback, { showError: false, showSuccess: false })
    }
    
    static jumlahSosialisasi(callback?: Callback) {
        return super.postBase("sosialisasi", {}, callback, { showError: false, showSuccess: false })
    }
}

export default DashboardHelper;