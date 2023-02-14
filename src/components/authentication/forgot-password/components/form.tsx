import { BgsGroupForm, FormGroupModel } from "@andrydharmawan/bgs-component";
import { useRef, useState } from "react";
import { FormRef, BgsForm, BgsButton } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import UserHelper from "helper/UserHelper";
import Alert from "@mui/material/Alert";

export default function FormForgotPasswordComponent({ }: MainLayoutProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const form: FormGroupModel = {
        apperance: "filled",
        onSubmit: (values, { reset }) => {
            setLoading(true)
            UserHelper.forgotPassword(values, ({ status, message }) => {
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
                items: [
                    `email|validationRules=required,email`
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
                {typeof status === "boolean" && <Alert sx={{ border: 0 }} className="br-3 mgb-20" severity={status ? "success" : "error"}>{message}</Alert>}
                {!status && <>
                    <BgsForm name="main" {...group} />
                    <BgsButton loading={loading} type="submit" visibleLoading={false} className="btn-sign mgt-30 d-flex align-items-center justify-content-center"><i className="ri-mail-send-fill fs-20 mgr-10"></i> Send recovery link</BgsButton>
                </>}
                <Box className="mgt-15 text-center">
                    <Link to="/login">Kembali ke login</Link>
                </Box>
            </>}
        />
    </>
}