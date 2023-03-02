import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MainLayoutProps } from "shared/layout/main-layout";
import "./index.scss"
import ReportSalesComponent from "./components/report-sales";
// import PartnerComponent from "./components/partner";
// import CurrentStatsComponents from "./components/current-stats";
// import AttendanceComponent from "./components/attendance";

const HomeComponent = ({ }: MainLayoutProps) => {
    return <Box className="home-component">
        <Grid container>
            <Grid item md={12} xs={12} className="left-content">
                <Grid container columns={1} spacing={1.4}>
                    <Grid item xs={1}>
                        <Box className="d-flex justify-content-between">
                            <BgsTypography className="title-page">Dashboard cihuyyyy</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={2}>
                        <ReportSalesComponent />
                    </Grid>
                    {/* <Grid item xs={1}>
                        <CurrentStatsComponents />
                    </Grid>
                    <Grid item xs={1}>
                        <Grid container columns={2} spacing={1.4}>
                            <Grid item md={1} xs={2}>
                                <ReportSalesComponent />
                            </Grid>
                            <Grid item md={1} xs={2}>
                                <AttendanceComponent />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <PartnerComponent />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default HomeComponent;