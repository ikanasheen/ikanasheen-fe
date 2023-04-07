import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class RoleHelper extends BaseHelper {
    static url = api.userManagement.roleList;
}

export default RoleHelper;