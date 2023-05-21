import BaseHelper from "helper/BaseHelper";
import { api } from "config/index";

class FaqHelper extends BaseHelper {
    static url = api.faq.faq;
}

export default FaqHelper;