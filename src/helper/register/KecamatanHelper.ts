import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";
// import ResponseModel, { Callback } from "models/response.model";

class UserHelper extends BaseHelper {
    static url = api.register.kecamatan;

    static getKecamatan(callback?: Callback) {
        return super.getBase(`8105.json`, callback, { showSuccess: false, showError: true, usingToken: true })
    }
}

export default UserHelper;