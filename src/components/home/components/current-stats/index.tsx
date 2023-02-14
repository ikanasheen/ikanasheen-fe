import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";

interface StatisticProps {
    salesAgent: number;
    partner: number;
    attendanceVisit: number;
    city: number;
    territory: number;
    salesCoordinator: number;
}

const initValue = {
    salesAgent: 0,
    partner: 0,
    attendanceVisit: 0,
    city: 0,
    territory: 0,
    salesCoordinator: 0,
}

const CurrentStatsComponents = () => {
    const [statistic, setStatistic] = useState<StatisticProps>(initValue);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.salesAgentStatistic(({ status, data }) => {
            setLoading(false)
            setStatistic(status ? data : initValue)
        })
    }, [])

    return <Paper className="position-relative">
        <Box className="d-flex justify-content-between align-items-center p-2 pdl-20">
            <BgsTypography className="fs-18">Statistik saat ini</BgsTypography>
        </Box>

        <Grid container borderTop="1px solid #dee3e8">
            <Grid item md={12} xs={12}>
                <Grid container columns={3}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8" borderBottom="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/total-sales-staff.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total Sales</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.salesAgent}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8" borderBottom="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/total-revenue.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total Sales Coordinator</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.salesCoordinator}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderBottom="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/average-visit.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total Kunjungan</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.attendanceVisit}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/total-agents.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total Partner</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.partner}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/total-lead.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total Territory</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.territory}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10">
                        <Box className="icon-dashboard">
                            <img src="/assets/img/icon/total-campaign.svg" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Total City</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.city}</BgsTypography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}

export default CurrentStatsComponents;