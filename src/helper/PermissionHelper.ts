import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class PermissionHelper extends BaseHelper {
    static url = api.permission;
}

export default PermissionHelper;