import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class PengaduanHelper extends BaseHelper {
    static url = api.faq.pengaduan;
}

export default PengaduanHelper;