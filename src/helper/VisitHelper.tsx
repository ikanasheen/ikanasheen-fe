import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class VisitHelper extends BaseHelper {
    static url = api.visit;
}

export default VisitHelper;