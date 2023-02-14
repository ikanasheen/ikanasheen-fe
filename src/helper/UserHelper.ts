import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class UserHelper extends BaseHelper {
    static url = api.user;

    static login(data: any, callback?: Callback) {
        return super.postBase("login", { parameter: { data } }, callback, { usingToken: false })
    }

    static logout(callback?: Callback) {
        return super.postBase("logout", {}, callback)
    }

    static forgotPassword(data: any, callback?: Callback) {
        return super.postBase("forgotpassword", { parameter: { data } }, callback, { showError: false, showSuccess: false })
    }

    static resetPassword(signature: string, data: any, callback?: Callback) {
        return super.postBase(`resetpassword?signature=${signature}`, { parameter: { data } }, callback, { showError: false, showSuccess: false })
    }

    static changePassword(data: any, callback?: Callback) {
        return super.postBase(`changepassword`, data, callback)
    }
}

export default UserHelper;