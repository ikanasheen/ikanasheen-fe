import { BgsTypography } from "@andrydharmawan/bgs-component";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { PropsWithChildren } from "react";
import { MainLayoutProps } from "shared/layout/main-layout";

interface HeaderComponentProps extends MainLayoutProps {

}

const HeaderComponent = ({ children }: PropsWithChildren<HeaderComponentProps>) => {
    return <>
        <Grid container columns={4}>
            <Grid item xs={1} className="d-flex align-items-center flex-column justify-content-center">
                <BgsTypography className="fs-16 fw-600">Cabang</BgsTypography>
                <BgsTypography className="fs-24 fw-600">AP. ROXY UJUNG</BgsTypography>
                <BgsTypography className="fs-16 fw-400 text-secondary">Jl. Raya Ujung Harapan Bekasi</BgsTypography>
                <BgsTypography className="fs-16 fw-400 text-secondary">Tekp: (021) 88381205</BgsTypography>
            </Grid>
            <Grid item xs={2} className="d-flex align-items-center flex-column justify-content-center">
                <BgsTypography className="fs-16 fw-700">{moment().format("dddd, DD MMMM YYYY")}</BgsTypography>
                {children}
            </Grid>
            <Grid item xs={1} className="d-flex align-items-center justify-content-end">
                <Grid container>
                    <Grid item xs={4}>
                        <BgsTypography className="fs-16 fw-600">Kasir</BgsTypography>
                    </Grid>
                    <Grid item xs={8}>
                        <BgsTypography className="fs-16 fw-400">: apotekroxy</BgsTypography>
                    </Grid>
                    <Grid item xs={4}>
                        <BgsTypography className="fs-16 fw-600">Shift</BgsTypography>
                    </Grid>
                    <Grid item xs={8}>
                        <BgsTypography className="fs-16 fw-400">: 1</BgsTypography>
                    </Grid>
                    <Grid item xs={4}>
                        <BgsTypography className="fs-16 fw-600">Kassa</BgsTypography>
                    </Grid>
                    <Grid item xs={8}>
                        <BgsTypography className="fs-16 fw-400">: -</BgsTypography>
                    </Grid>
                    <Grid item xs={4}>
                        <BgsTypography className="fs-16 fw-600">Tipe Jual</BgsTypography>
                    </Grid>
                    <Grid item xs={8}>
                        <BgsTypography className="fs-16 fw-400">: Swalayan</BgsTypography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Divider className="mgt-20 mgb-20" sx={{ borderColor: "#a8a5a5", borderWidth: 2 }} />
    </>
}

export default HeaderComponent;