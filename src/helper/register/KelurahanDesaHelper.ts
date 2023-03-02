import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "@andrydharmawan/bgs-component";

class UserHelper extends BaseHelper {
    static url = api.register.kelurahanDesa;

    // static getKelurahan(callback?: Callback) {
    //     return super.getBase(`${id}`+".json", callback, { showSuccess: false, showError: true, usingToken: true })
    // }

    static getKelurahan(callback?: Callback) {
        return super.getBase("8105012.json", callback, { showSuccess: false, showError: true, usingToken:false})
    }

}

export default UserHelper;