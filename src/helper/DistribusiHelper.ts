import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class DistribusiHelper extends BaseHelper {
    static url = api.distribusi;
}

export default DistribusiHelper;