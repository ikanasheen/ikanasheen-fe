import CryptoJS from "crypto-js";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { CallbackMounted, CombinationTypeModel } from "../models";
import { useRouter } from "@andrydharmawan/bgs-component";
import axios from "axios";
import versionJSON from "build-id.json"
import { storeDispatch } from "store";

type KeyType = "token" | "user" | "redirect" | "menu"
export const credential = {
    storage: {
        get: (key?: KeyType) => {
            let result: any = {};
            try {
                Object.keys(localStorage).forEach(keys => {
                    const available = ["token", "user", "redirect", "menu"];
                    if (available.includes(keys)) {
                        result[keys] = lockdata.decryptString(localStorage[keys]);
                    }
                })
            } catch (error) {
            }

            if (key) result = result[key];

            return result;
        },
        set: (key: KeyType, value: any): any => {
            localStorage.setItem(key, lockdata.encryptString(value))
        },
        delete: (key?: KeyType) => {
            if (!key) localStorage.clear();
            else {
                localStorage.removeItem(key);
            }
        }
    }
}


export function decryptJWT(token: any) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
}

export function jsonCopy(data: any) {
    return data ? JSON.parse(JSON.stringify(data)) : null;
}

export var cryptoJSAesJson = {
    stringify: function (cipherParams: any): any {
        try {
            var j: any = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };
            if (cipherParams.iv) j.iv = cipherParams.iv.toString();
            if (cipherParams.salt) j.s = cipherParams.salt.toString();
            return JSON.stringify(j);
        } catch (error) {
            return null;
        }
    },
    parse: function (jsonStr: any): any {
        try {
            var j = JSON.parse(jsonStr);
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(j.ct)
            });
            if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
            if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
            return cipherParams;
        } catch (e) {
            return null;
        }
    }
}

export var lockdata = {
    decrypt: (data: any) => {
        if (!data) return data;

        try {
            data = CryptoJS.AES.decrypt(data, "bgs", { format: cryptoJSAesJson }).toString(CryptoJS.enc.Utf8);
            return JSON.parse(data)
        } catch (error) {
            return data
        }
    },
    encrypt: (data: any) => {
        if (!data) return data;
        try {
            if (typeof data === "object") data = JSON.stringify(data);

            return CryptoJS.AES.encrypt(data, "bgs", { format: cryptoJSAesJson }).toString();
        } catch (error) {
            return data;
        }
    },
    decryptString: (data: any) => {
        if (!data) return data;

        data = CryptoJS.AES.decrypt(decodeURIComponent(data), "bgs").toString(CryptoJS.enc.Utf8);
        try {
            return JSON.parse(data)
        } catch (error) {
            return data
        }
    },
    encryptString: (data: any) => {
        if (!data) return data;
        try {
            if (typeof data === "object") data = JSON.stringify(data);
            if (typeof data === "number") data = data.toString();

            data = CryptoJS.AES.encrypt(data, "bgs").toString();
        } catch (error) {
            console.log(error)
        }
        return encodeURIComponent(data)
    }
}

export function getFieldValue(arr: any, str: any): any {
    if (!arr) return "";
    if (str.includes(".")) return getFieldValue(arr[str.substring(0, str.indexOf("."))], str.substring(str.indexOf(".") + 1));
    return arr ? arr[str] : null;
}

export function isArray(data: any, length?: any) {
    let result = false;
    if (data) {
        if (typeof data === "object") {
            if (Array.isArray(data)) {
                if (typeof length === "number") {
                    if (data.length > length) {
                        result = true;
                    }
                } else {
                    result = true;
                }
            }
        }
    }
    return result;
}

export var sorting = {
    desc: (data: any, field: any) => {
        return data.sort((a: any, b: any) => {
            const a1 = getFieldValue(a, field) ? getFieldValue(a, field) : "";
            const b1 = getFieldValue(b, field) ? getFieldValue(a, field) : "";
            return a1 < b1 ? 1 : -1;
        });
    },
    asc: (data: any, field: any) => {
        return data.sort((a: any, b: any) => {
            const a1 = getFieldValue(a, field) ? getFieldValue(a, field) : "";
            const b1 = getFieldValue(b, field) ? getFieldValue(b, field) : "";
            return a1 > b1 ? 1 : -1;
        })
    }
}

export const textTransform = {
    camelCase: (value: string = "") => {
        value = value.split(".").map(val => {
            val = val.charAt(0).toUpperCase() + val.slice(1)
            return val
        }).join(" ")
        value = value.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    snakeCase: (value: string = "") => {
        value = value.toLocaleLowerCase();
        const n = value.split("_");
        let result = []

        for (let index = 0; index < n.length; index++) {
            result.push(n[index].charAt(0).toUpperCase() + n[index].slice(1));
        }

        return result.join(" ")
    },
    emailEncode: (value: string = "") => {
        try {
            var i = value.indexOf("@");
            var startIndex = i * .2 | 0;
            var endIndex = i * .9 | 0;
            return value.slice(0, startIndex) +
                value.slice(startIndex, endIndex).replace(/./g, "*") +
                value.slice(endIndex);
        } catch (error) {
            return value;
        }
    }
}

export const overrideValue = (obj: any, is: string | any[], value: any = undefined): any => {
    if (typeof is == "string") {
        return overrideValue(obj, is.split("."), value);
    }
    else if (is.length == 1 && value !== undefined) {
        return obj[is[0]] = value;
    }
    else if (is.length == 0) {
        return obj;
    }
    else {
        return overrideValue(obj[is[0]], is.slice(1), value);
    }
}

interface PathCRUD {
    title: string;
    mode: "create" | "edit" | "detail";
    key: string | null;
}

export function pathCRUD(router: any): PathCRUD {
    const { form = [] } = router.query || {};
    let title = form.length ? textTransform.camelCase(form[0] === "create" ? "createNew" : form[0]) : "",
        mode = form.length ? form[0] as any : "create",
        key = form.length >= 1 ? form[1] : null;

    return {
        title,
        mode,
        key,
    }
}

export function mounted(callback: CallbackMounted, param: any = []) {
    try {
        const router = useRouter();

        useEffect(() => {
            setTimeout(() => {
                const { key, mode, title } = pathCRUD(router);
                callback({ key, mode, title, ...router.query })
            }, 100)
        }, [...param])
    } catch (error) {
        console.log(error, "error")
    }
}

interface DateDiff {
    format: string;
    now: string;
    then: string;
}

export function dateDiff({ now, then, format }: DateDiff) {
    var diff = moment.duration(moment(then, format).diff(moment(now, format)));
    var days = parseInt(diff.asDays() as any); //84

    var hours = parseInt(diff.asHours() as any); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

    hours = hours - days * 24;  // 23 hours

    var minutes = parseInt(diff.asMinutes() as any); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

    minutes = minutes - (days * 24 * 60 + hours * 60); //20 minutes.

    return `${days ? days + "day " : ""}${hours ? hours + "hr " : ""} ${minutes ? minutes + "min" : ""}`
}

export function formatCurrency(value: number | string = 0) {
    value = typeof value === "number" ? value.toString() : value;

    var dpos = value.indexOf(",");
    var nStrEnd = "";

    if (dpos !== -1) {
        nStrEnd = "," + value.substring(dpos + 1, value.length);
        value = value.substring(0, dpos);
    }

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(value)) {
        value = value.replace(rgx, "$1,$2");
    }
    return `${value}${nStrEnd}`;
}

export function summary(data: any[], field: string, isAmount: boolean = false) {
    const result = data ? (data.length > 0 ? data.map(item => {
        return getFieldValue(item, field);
    }).reduce((total, num) => {
        return total + num;
    }) : 0) : 0;

    return isAmount ? formatCurrency(result) : result;
}

export function useInterval<P extends Function>(
    callback: P,
    { interval, lead }: { interval: number; lead?: boolean },
): void {
    let savedCallback = useRef<any>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect((): any => {
        const tick = (): void => savedCallback.current();

        lead && tick();

        if (interval !== null) {
            const id = setInterval(tick, interval);

            return () => clearInterval(id);
        }
    }, [interval]);
}

export function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function useKeyPress(targetKey: string | number, combination?: CombinationTypeModel | CombinationTypeModel[]) {
    //https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/

    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const condition = (key: string, keyCode: number) => {
        if (typeof targetKey === "string" && key === targetKey) return true;
        if (typeof targetKey === "number" && keyCode === targetKey) return true;

        return false
    }

    const downHandler = (props: KeyboardEvent) => {
        const { key, keyCode } = props;
        if (combination) {
            if (typeof combination === "string") {
                if (condition(key, keyCode) && props[`${combination}Key`]) props.preventDefault(), setKeyPressed(!keyPressed);
            }
            else {
                if (condition(key, keyCode) && combination.filter(x => props[`${x}Key`]).length === combination.length) props.preventDefault(), setKeyPressed(!keyPressed);
            }
        }
        else {
            if (typeof targetKey === "string" && condition(key, keyCode)) props.preventDefault(), setKeyPressed(!keyPressed);
            if (typeof targetKey === "number" && condition(key, keyCode)) props.preventDefault(), setKeyPressed(!keyPressed);
        }

    }

    const upHandler = ({ key, keyCode }: KeyboardEvent) => {
        if (condition(key, keyCode)) setKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        // return () => {
        //     window.removeEventListener("keydown", downHandler);
        //     window.removeEventListener("keyup", upHandler);
        // };
    }, []);

    return keyPressed;
}

export async function checkVersion() {
    try {
        const { version }: any = (await axios.get(`/build-id.json?v=${generateUUID()}`)).data || {};
        if (versionJSON.version && version && versionJSON.version !== version) storeDispatch({ isNewVersion: true })
    } catch (error) {
        error && true
    }
}