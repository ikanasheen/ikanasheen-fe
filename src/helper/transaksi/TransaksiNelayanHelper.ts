import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class TransaksiNelayanHelper extends BaseHelper {
    static url = api.transaksi.transaksi;
}

export default TransaksiNelayanHelper;