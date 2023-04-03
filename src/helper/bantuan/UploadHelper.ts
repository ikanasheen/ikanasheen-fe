
import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class FileHelper extends BaseHelper {
    static url = api.bantuan.upload;
}

export default FileHelper;