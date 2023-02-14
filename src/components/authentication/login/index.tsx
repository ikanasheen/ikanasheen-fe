
import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { MainLayoutProps } from "shared/layout/main-layout";
import FormLoginComponent from "./components/form-login";
import "./index.scss"

const LoginComponent = (props: MainLayoutProps) => {
    return <>
        <Box className="login-component">
            <BgsTypography className="title-login">Sign In</BgsTypography>
            <FormLoginComponent {...props} />
        </Box>
    </>
}

export default LoginComponent;