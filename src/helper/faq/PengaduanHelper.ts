import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class PengaduanHelper extends BaseHelper {
    static url = api.faq.pengaduan;

    static penanganan(data: any, callback?: Callback) {
        return super.postBase("penanganan", { parameter: { data } }, callback)
    }
}

export default PengaduanHelper;