import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class MenuHelper extends BaseHelper {
    static url = api.menu;
}

export default MenuHelper;