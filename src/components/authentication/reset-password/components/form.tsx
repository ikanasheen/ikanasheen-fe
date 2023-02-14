import { BgsGroupForm, FormGroupModel, useRouter } from "@andrydharmawan/bgs-component";
import { useRef, useState } from "react";
import { FormRef, BgsForm, BgsButton } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import UserHelper from "helper/UserHelper";
import Alert from "@mui/material/Alert";

export default function FormForgotPasswordComponent({ }: MainLayoutProps) {
    let showPassword: boolean = false;
    const router = useRouter();
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const form: FormGroupModel = {
        apperance: "filled",
        onSubmit: (values, { reset }) => {
            setLoading(true)
            UserHelper.resetPassword(router.query.signature as string, values, ({ status, message }) => {
                setLoading(false)
                setStatus(status)
                setMessage(message)
                if (status) reset("email")
            })
        },
        showLabelShrink: true,
        item: {
            main: {
                spacing: 2,
                items: [{
                    dataField: "password",
                    label: {
                        icon: "key",
                        text: "Password Baru"
                    },
                    editorOptions: {
                        autoComplete: "new-user-street-address",
                        type: "password"
                    },
                    validationRules: ["required", "minLength.8", {
                        message: "Password must have at least 8 characters with number, lowercase, uppercase and one special character",
                        validation: value => /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)
                    }]
                }, {
                    dataField: "confirmPassword",
                    label: {
                        icon: "key",
                        text: "Konfirmasi Password"
                    },
                    editorOptions: {
                        autoComplete: "new-password",
                        type: "password"
                    },
                    validationRules: ["required", "match.password"]
                }, {
                    colSpan: 2,
                    template: () => <div style={{marginTop: -20}} className="fs-12 text-secondary d-flex align-items-center"><i className="ri-information-line mgr-5"></i> Password must have at least 8 characters with number, lowercase, uppercase and one special character</div>
                }, {
                    dataField: "showPassword",
                    editorOptions: {
                        onChange: () => {
                            showPassword = !showPassword;
                            formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                            formRef.current?.itemOption("confirmPassword").option("editorOptions.type", showPassword ? "text" : "password")
                        }
                    },
                    editorType: "checkbox"
                }]
            }
        }
    }

    return <>
        <BgsGroupForm
            ref={formRef}
            {...form}
            className="mgt-30"
            render={group => <>
                {typeof status === "boolean" && <Alert sx={{ border: 0 }} className="br-3 mgb-20" severity={status ? "success" : "error"}>{message}</Alert>}
                {!status && <>
                    <BgsForm name="main" {...group} />
                    <BgsButton loading={loading} type="submit" visibleLoading={false} className="btn-sign mgt-30 d-flex align-items-center justify-content-center"><i className="ri-key-fill fs-20 mgr-10"></i> Ubah Password</BgsButton>
                </>}
                <Box className="mgt-15 text-center">
                    <Link to="/login">Kembali ke login</Link>
                </Box>
            </>}
        />
    </>
}