import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class IkanHelper extends BaseHelper {
    static url = api.bantuan.proposal;

    static approve(idProposalBantuan: any, callback?: Callback) {
        return super.postBase("approval", { parameter: { data:  { idProposalBantuan, isApprove:"Ya" }  } }, callback)
    }
    static reject(idProposalBantuan: any, callback?: Callback) {
        return super.postBase("approval", { parameter: { data:  { idProposalBantuan, isApprove:"Tidak" }  } }, callback)
    }
}

export default IkanHelper;