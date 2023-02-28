import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BgsGroupForm, FormGroupModel, useRouter } from "@andrydharmawan/bgs-component";
import { credential, textTransform } from "lib";
import { useRef, useState } from "react";
import { FormRef, BgsForm, BgsButton, BgsTypography } from "@andrydharmawan/bgs-component";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { storeDispatch } from "store";
import { MainLayoutProps } from "shared/layout/main-layout";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import UserHelper from "helper/UserHelper";

// import menuPermissionWrapper from "json/menu.json";

interface LoginFormProps extends MainLayoutProps {
    accessFrom?: "default" | "session-expired";
    onSuccess?: Function;
    data?: any;
}

export default function FormLoginComponent({ data, accessFrom = "default", onSuccess = () => { } }: LoginFormProps) {
    let showPassword: boolean = false;
    const formRef = useRef<FormRef>(null);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    const form: FormGroupModel = {
        apperance: "filled",
        onSubmit: (values, { reset }) => {
            setLoading(true)
            UserHelper.login(values, ({ status, data }) => {
                setLoading(false)
                if (status) {
                    credential.storage.set("user", data);

                    storeDispatch({ reLogin: false })
                    onSuccess()
                    router.push("/")
                }
                else false && reset("password")
            })
        },
        // formData: {
        //     ...accessFrom === "session-expired" && data?.username ? { username: data?.username } : null
        // },
        item: {
            main: {
                spacing: 2,
                items: [
                    ...accessFrom === "session-expired" && data?.username ? [{
                        name: "session",
                        template: () => {
                            return <div>
                                <div className="text-center" onClick={() => {
                                    formRef.current?.itemOption("session").option("visible", false)
                                    formRef.current?.itemOption("username").option("visible", true)
                                    formRef.current?.reset()
                                }}>
                                    <Chip sx={{ cursor: "pointer" }} className="fs-14" avatar={<Avatar className="fs-14">{data?.fullName?.substring(0, 1)}</Avatar>} label={<span><span className="pdr-10">{textTransform.emailEncode(data?.email)}</span> <KeyboardArrowDownRoundedIcon className="text-secondary" /></span>} />
                                </div>
                                <BgsTypography className="text-secondary w-100 mt-2 fs-12">To continue, first verify that it"s you</BgsTypography>
                            </div>
                        }
                    }] : [],
                    `username|validationRules`, //|visible=${!(accessFrom === "session-expired" && data?.username)}
                    {
                        dataField: "password",
                        editorOptions: {
                            type: "password",
                            suffix: () => <InputAdornment position="end" >
                                <BgsButton
                                    variant="icon"
                                    onClick={() => {
                                        showPassword = !showPassword;
                                        formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </BgsButton>
                            </InputAdornment>
                        },
                        validationRules: ["required"]
                    }
                ]
            }
        }
    }

    return <>
        <BgsGroupForm
            ref={formRef}
            {...form}
            className="mgt-30"
            render={group => <>
                <BgsForm name="main" {...group} />
                <Box className="mgt-5">
                    <Link to="/forgot-password">Lupa password?</Link>
                </Box>
                <BgsButton loading={loading} type="submit" visibleLoading={false} className="btn-sign mgt-30 d-flex align-items-center justify-content-center">Masuk</BgsButton>
                <Box className="mgt-5">
                    <Link  to="/form-register" className="btn-register mgt-30 d-flex align-items-center justify-content-center">Buat Akun</Link>
                </Box>
            </>}
        />
    </>
}