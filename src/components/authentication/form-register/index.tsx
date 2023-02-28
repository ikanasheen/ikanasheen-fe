
import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
// import { MainLayoutProps } from "shared/layout/main-layout";
import FormFormRegisterComponent from "./components/nelayan";
import "./index.scss"

const FormRegisterComponent = ( ) => {
    return <>
        <Box className="forgot-password-component">
            <BgsTypography className="title mgb-10">Daftar Akun</BgsTypography>
            <FormFormRegisterComponent />
        </Box>
    </>
}
// 
export default FormRegisterComponent;