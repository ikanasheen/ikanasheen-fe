import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class IkanHelper extends BaseHelper {
    static url = api.master.ikan;
}

export default IkanHelper;