import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class UserManagementHelper extends BaseHelper {
    static url = api.userManagement.userList;
}

export default UserManagementHelper;