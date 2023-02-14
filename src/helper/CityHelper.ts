import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class CityHelper extends BaseHelper {
    static url = api.city;
}

export default CityHelper;