import LoadingPage from "shared/loading-page";
import { Suspense, useEffect } from "react";
import BgsLayout, { BgsLayoutProps } from "..";
import { PropsWithChildren } from "react";
import "./index.scss";
import Grid from "@mui/material/Grid";
import { checkVersion, useInterval } from "lib";
import store from "store";
import { connect } from "react-redux";
import Box from "@mui/material/Box";

const AuthLayout = ({ title, menuCode, children }: PropsWithChildren<BgsLayoutProps>) => {
    const { isNewVersion = false } = store.getState();

    useInterval(
        async () => {
            if (!isNewVersion) checkVersion()
        },
        { interval: 30000 },
    );

    useEffect(() => {
        if (isNewVersion) window.location.reload()
    }, [isNewVersion])

    return <BgsLayout
        title={title}
        menuCode={menuCode}
        render={() => <>
            <Grid container className="auth-layout context" alignItems="center" justifyContent="center">
                <Grid item md={6} lg={3.6} xl={4} xs={10}>
                    <Box className="text-center">
                        <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO}`} alt={process.env.REACT_APP_NAME} className="logo-login" />
                    </Box>
                    <Suspense fallback={<LoadingPage height="calc(100vh - 60px)" />}>
                        {children}
                    </Suspense>
                </Grid>
            </Grid>
            {/* <Box className="design-1" />
            <Box className="design-2" />
            <Box className="design-3" />
            <Box className="design-4" /> */}
            <Box className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </Box >
        </>}
    />
}
export default connect(state => state)(AuthLayout);