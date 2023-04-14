import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class DashboardHelper extends BaseHelper {
    static url = api.dashboard.dashboard;

    static cuaca(callback?: Callback) {
        return super.postBase("dashboard", {  }, callback, { showError: false, showSuccess: false })
    }
    static jumlahKomoditi(callback?: Callback) {
        return super.postBase("komoditi", {  }, callback, { showError: false, showSuccess: false })
    }
    static jumlahNelayan(callback?: Callback) {
        return super.postBase("nelayan", {  }, callback, { showError: false, showSuccess: false })
    }
    static transaksiTanggal(callback?: Callback) {
        return super.postBase("transaksi", {  }, callback, { showError: false, showSuccess: false })
    }
    static transaksiKabupaten(callback?: Callback) {
        return super.postBase("transaksi", {  }, callback, { showError: false, showSuccess: false })
    }
    static jumlahTransaksi(callback?: Callback) {
        return super.postBase("transaksi", {  }, callback, { showError: false, showSuccess: false })
    }
    static jumlahBantuan(callback?: Callback) {
        return super.postBase("bantuan", {  }, callback, { showError: false, showSuccess: false })
    }
    static jumlahSosialisasi(callback?: Callback) {
        return super.postBase("sosialisasi", {  }, callback, { showError: false, showSuccess: false })
    }
    static salesAgentPartner(callback?: Callback) {
        return super.postBase("sales-agent/partner", {  }, callback, { showError: false, showSuccess: false })
    }
}

export default DashboardHelper;