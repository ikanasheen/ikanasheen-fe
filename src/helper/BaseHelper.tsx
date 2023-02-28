import axios from "axios";
import { credential } from "lib";
import { ResponseModel } from "models";
// import modalLogin from "components/authentication/login/components/modal";
import RequestModel from "models/request.model";
import { bgsSnackbar } from "@andrydharmawan/bgs-component";
import Alert from "@mui/material/Alert";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from "@mui/material/IconButton";

export interface Config {
    showSuccess?: boolean,
    showError?: boolean,
    usingToken?: boolean,
    headers?: any,
    onUploadProgress?: (e: any) => any
}

type Method =
    | "get" | "GET"
    | "delete" | "DELETE"
    | "head" | "HEAD"
    | "options" | "OPTIONS"
    | "post" | "POST"
    | "put" | "PUT"
    | "patch" | "PATCH"
    | "purge" | "PURGE"
    | "link" | "LINK"
    | "unlink" | "UNLINK";

interface ResponseProps<T = any> {
    status: boolean;
    code: string;
    data: T;
    message: string;
    paging?: {
        totalPage: number | null;
        totalRecord: number | null;
        totalpage: number | null;
        totalrecord: number | null;
    }
    description: string;
}

class BaseHelper {
    static url = "";

    static async handleResponse(response: any, callback?: Function, config?: Config, err?: any): Promise<any> {
        const { status, result = null, error, paging } = response?.data || {};

        const responseData: ResponseProps = {
            code: status?.responseCode || (error ? status : "400"),
            status: status?.responseCode === "200",
            data: result,
            message: status?.responseDesc || (error || err?.message),
            description: status?.responseDesc || (error || err?.message),
            paging: {
                ...paging,
                totalpage: paging?.totalPage,
                totalrecord: paging?.totalRecord
            }
        }

        if (([401, 9911].includes(status) || ["9912", "9900", "9911"].includes(responseData.code)) && config?.usingToken && !window.location.pathname.includes("login")) {
            // const data = jsonCopy(credential.storage.get("user"));
            credential.storage.delete();
            // modalLogin({ data })
        }

        if (config?.showSuccess && responseData.status) bgsSnackbar({
            vertical: "bottom",
            horizontal: "center",
            render: ({ hide }) => <Alert action={<IconButton onClick={() => hide()}><CloseRoundedIcon /></IconButton>} severity="success" className="min-wt-450 hg-54 shadow d-flex align-items-center">{responseData.description}</Alert>
        })

        if (config?.showError && !responseData.status) bgsSnackbar({
            vertical: "bottom",
            horizontal: "center",
            render: ({ hide }) => <Alert action={<IconButton onClick={() => hide()}><CloseRoundedIcon /></IconButton>} severity={responseData.code === "999" ? "warning" : "error"} className="min-wt-450 hg-54 shadow d-flex align-items-center">{responseData.description}</Alert>
        })

        if (callback) callback(responseData)
        else return responseData;
    }

    static async request(method: Method, url: string, data: any, callback?: Function, config: Config = { showSuccess: true, showError: true, usingToken: true, headers: {}, onUploadProgress: (): any => { } }): Promise<any> {
        let {
            headers = {},
            onUploadProgress = (): any => { }
        } = config;

        headers = {
            "Content-Type": "application/json",
            ...headers
        }

        config = {
            showSuccess: true,
            showError: true,
            usingToken: true,
            ...config
        }

        // if (config.usingToken && credential.storage.get("token")) headers.Authorization = `Bearer ${credential.storage.get("token")}`;

        const client = axios.create({ baseURL: url, onUploadProgress: (e: any) => onUploadProgress(e) });

        return client({ method, data, headers, responseType: "json", })
            .then(async response => this.handleResponse(response, callback, config))
            .catch(async err => this.handleResponse(err.response, callback, config, err));

    }

    static postBase(url: string, data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.request("POST", `${this.url}${url}`, data, callback, config)
    }

    static putBase(url: string, data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.request("PUT", `${this.url}${url}`, data, callback, config)
    }

    static patchBase(url: string, data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.request("PATCH", `${this.url}${url}`, data, callback, config)
    }

    static deleteBase(url: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.request("DELETE", `${this.url}${url}`, null, callback, config)
    }

    static getBase(url: string, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.request("GET", `${this.url}${url}`, null, callback, config)
    }

    static create(data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.putBase("", { parameter: { data } }, callback, config)
    }

    static update(data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.patchBase("", { parameter: { data } }, callback, config)
    }

    static upload(data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.uploadBase("", data, callback, config)
    }

    static uploadBase(url: string = "", data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        let formData = new FormData();
        Object.keys(data).forEach(item => formData.append(item, data[item]))
        return this.request("POST", this.url + url, formData, callback, { showSuccess: false, showError: false, ...config, headers: { "Content-Type": `multipart/form-data` } })
    }

    static createupdate(data: any, id: any, callback?: ((response: ResponseModel) => (any | ResponseModel))) {
        return this[id ? "update" : "create"](data, callback)
    }

    static detail(id: any, callback?: ((response: ResponseModel) => (any | ResponseModel))): ResponseModel {
        return this.getBase(`${id}`, callback, { showSuccess: false, showError: true }) as any
    }

    static delete(id: any, callback?: ((response: ResponseModel) => (any | ResponseModel))): ResponseModel {
        return this.deleteBase(`${id}`, callback) as any
    }

    static retrieve(data?: RequestModel, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.list("", data, callback, config)
    }

    static list(url: string, reqBody?: RequestModel, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        let { columns = [], sort = {}, criteria = {}, criteriaType = "OR", filter = {}, data, between = {}, isDistinct = false } = reqBody?.parameter || {};

        reqBody = {
            parameter: { columns, sort, criteria, criteriaType, filter, data, between, isDistinct },
            paging: { page: 1, limit: 10, ...reqBody?.paging }
        }
        return this.postBase(url, reqBody, callback, { showSuccess: false, showError: false, ...config })
    }
    static createRegister(data: any, callback?: ((response: ResponseModel) => (any | ResponseModel)), config?: Config) {
        return this.putBase("", { parameter: { data } }, callback, config)
    }
}

export default BaseHelper;
