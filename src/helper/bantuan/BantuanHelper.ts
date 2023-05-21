import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class BantuanHelper extends BaseHelper {
    static url = api.bantuan.bantuan;
}

export default BantuanHelper;