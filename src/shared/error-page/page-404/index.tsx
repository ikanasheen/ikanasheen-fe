import { BgsButton, BgsTypography } from "@andrydharmawan/bgs-component"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { credential } from "lib"
import MainLayout from "shared/layout/main-layout"
import "./index.scss";

interface Error404Props {
    height?: string;
}

export default function Error404({ height = "calc(100vh - 165px)" }: Error404Props) {
    return <Box className="d-flex align-items-center justify-content-center flex-column w-100 p-3" style={{ height }}>
        <Grid container>
            <Grid item xs={5}>
                <BgsTypography className="title-404">Oops! Page Not Found</BgsTypography>
                <BgsTypography className="desc-404">Its Ok guys, we suggest you go to home page</BgsTypography>
                <BgsButton className="hg-65 pdl-30 pdr-30 mt-3 btn br-15" to="/">
                    Back to home
                </BgsButton>
            </Grid>
            <Grid item xs={7}>
                <Box className="d-flex align-items-center justify-content-end">
                    <img src="/assets/img/icon/4.png" height={190} />
                    <img src="/assets/img/icon/time.png" height={184} />
                    <img src="/assets/img/icon/4.png" height={190} />
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export function Page404() {
    const isLogin = !!credential.storage.get("token");
    return isLogin
        ? <MainLayout title="Error 404" menuCode="">
            <Paper className="shadow-none p-4 pb-3 br-19">
                <Error404 />
            </Paper>
        </MainLayout>
        : <Paper className="shadow-none p-5 br-19">
            <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO}`} height={50} />
            <Error404 height="calc(100vh - 100px)" />
        </Paper>
}