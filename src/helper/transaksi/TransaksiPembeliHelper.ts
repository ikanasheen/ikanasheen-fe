import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class TransaksiPembeliHelper extends BaseHelper {
    static url = api.transaksi.transaksi;
}

export default TransaksiPembeliHelper;