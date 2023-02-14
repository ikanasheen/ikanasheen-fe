import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class RoleHelper extends BaseHelper {
    static url = api.role;
}

export default RoleHelper;