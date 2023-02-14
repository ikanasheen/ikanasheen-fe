
import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class FileHelper extends BaseHelper {
    static url = api.file;
}

export default FileHelper;