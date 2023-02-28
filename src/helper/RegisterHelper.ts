import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
// import ResponseModel, { Callback } from "models/response.model";

class UserHelper extends BaseHelper {
    static url = api.register;

    // static registerNelayan(data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)),) {
    //     return super.createRegister("nelayan", { parameter: { data } }, callback)
    // }
}

export default UserHelper;