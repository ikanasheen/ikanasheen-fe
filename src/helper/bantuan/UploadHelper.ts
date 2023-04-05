
import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class UploadHelper extends BaseHelper {
    static url = api.bantuan.upload;
}

export default UploadHelper;