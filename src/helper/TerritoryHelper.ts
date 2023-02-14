import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class TerritoryHelper extends BaseHelper {
    static url = api.territory;
}

export default TerritoryHelper;