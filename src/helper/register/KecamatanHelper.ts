import BaseHelper from "helper/BaseHelper";
import { Callback } from "models/response.model";
import axios from "axios";

class KecamatanHelper extends BaseHelper {
    static async retrieveDistrict(param: any, callback?: Callback) {
        param;
        const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/8105.json`)
        const res = {
            status: true,
            data,
            message: "",
            description: "",
            code: "200"
        }
        if (callback) callback(res)
        else return res
    }

    static async retrieveVillages({ parameter }: any = {}, callback?: Callback) {
        const { id } = parameter.filter
        const { data } = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
        const res = {
            status: true,
            data,
            message: "",
            description: "",
            code: "200"
        }
        if (callback) callback(res)
        else return res
    }
}

export default KecamatanHelper;