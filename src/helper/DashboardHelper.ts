import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";
import { Callback } from "models/response.model";

class DashboardHelper extends BaseHelper {
    static url = api.user;

    static salesAgentStatus(callback?: Callback) {
        return super.postBase("dashboard", {  }, callback, { showError: false, showSuccess: false })
    }

    // static salesAgentStatistic(callback?: Callback) {
    //     return super.postBase("sales-agent/statistic", {  }, callback, { showError: false, showSuccess: false })
    // }

    // static salesAgentPartner(callback?: Callback) {
    //     return super.postBase("sales-agent/partner", {  }, callback, { showError: false, showSuccess: false })
    // }

    // static salesAgentAttendance(callback?: Callback) {
    //     return super.postBase("sales-agent/attendance", {  }, callback, { showError: false, showSuccess: false })
    // }
}

export default DashboardHelper;