import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class SalesCategoryHelper extends BaseHelper {
    static url = api.salesCategory;
}

export default SalesCategoryHelper;