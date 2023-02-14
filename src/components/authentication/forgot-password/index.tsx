
import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { MainLayoutProps } from "shared/layout/main-layout";
import FormForgotPasswordComponent from "./components/form";
import "./index.scss"

const ForgotPasswordComponent = (props: MainLayoutProps) => {
    return <>
        <Box className="forgot-password-component">
            <BgsTypography className="title mgb-10">Lupa Password</BgsTypography>
            <BgsTypography className="text-center fs-14">Masukkan email yang terkait dengan akun Anda dan kami akan mengirimkan tautan pemulihan:</BgsTypography>
            <FormForgotPasswordComponent {...props} />
        </Box>
    </>
}

export default ForgotPasswordComponent;