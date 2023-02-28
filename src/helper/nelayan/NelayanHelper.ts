import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class NelayanHelper extends BaseHelper {
    static url = api.nelayan;
}

export default NelayanHelper;