import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class SalesAgentHelper extends BaseHelper {
    static url = api.salesAgent;
}

export default SalesAgentHelper;