import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class PartnerHelper extends BaseHelper {
    static url = api.partner;
}

export default PartnerHelper;