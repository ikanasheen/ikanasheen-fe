import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
// import ResponseModel, { Callback } from "models/response.model";

class UserHelper extends BaseHelper {
    static url = api.register.registerNelayan;

}

export default UserHelper;