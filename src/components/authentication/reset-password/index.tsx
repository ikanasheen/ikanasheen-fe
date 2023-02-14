
import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { MainLayoutProps } from "shared/layout/main-layout";
import FormForgotPasswordComponent from "./components/form";
import "./index.scss"

const ForgotPasswordComponent = (props: MainLayoutProps) => {
    return <>
        <Box className="reset-password-component">
            <BgsTypography className="title">Reset Password</BgsTypography>
            <FormForgotPasswordComponent {...props} />
        </Box>
    </>
}

export default ForgotPasswordComponent;