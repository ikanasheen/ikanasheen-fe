import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class NelayanHelper extends BaseHelper {
    static url = api.master.nelayan;
}

export default NelayanHelper;