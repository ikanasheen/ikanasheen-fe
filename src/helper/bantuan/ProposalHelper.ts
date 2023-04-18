import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class ProposalHelper extends BaseHelper {
    static url = api.bantuan.proposal;

    static approve(data: any, callback?: Callback) {
        return super.postBase("approval", { parameter: { data } }, callback)
    }
    static reject(data: any, callback?: Callback) {
        return super.postBase("approval", { parameter: { data } }, callback)
    }
}

export default ProposalHelper;