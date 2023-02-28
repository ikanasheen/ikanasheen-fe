import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class TransaksiHelper extends BaseHelper {
    static url = api.transaksi;
}

export default TransaksiHelper;