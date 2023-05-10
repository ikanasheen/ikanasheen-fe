import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InfoIcon from '@mui/icons-material/Info';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Link } from "react-router-dom";
import { credential } from "lib";

interface StatisticProps {
    jumlahSosialisasi: number;
    berita: number;
    informasi: number;
    pengembanganDiri: number;
}

const initValue = {
    jumlahSosialisasi: 0,
    berita: 0,
    informasi: 0,
    pengembanganDiri: 0,
}

const jumlahSosialisasiComponent = () => {
    const [statistic, setStatistic] = useState<StatisticProps>(initValue);
    const [loading, setLoading] = useState<boolean>(true);
    const {
        idRole
    } = credential.storage.get("user") || {};
    useEffect(() => {
        setLoading(true)
        DashboardHelper.jumlahSosialisasi(({ status, data }) => {
            setLoading(false)
            setStatistic(status ? data : initValue)
        })
    }, [])

    return <Paper >
        {/* <Box className="justify-content-between align-items-center p-2 pdl-20">
            <BgsTypography className="fs-18">Nelayan</BgsTypography>
        </Box> */}

        <Grid container>
            <Grid item md={12} xs={12}>
                <Grid container columns={1}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderBottom="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <TipsAndUpdatesIcon className="fs-18" />
                        </Box>
                        <Box>
                            {idRole == "1"? <Link to="/sosialisasi">
                                <BgsTypography className="fs-14">Sosialisasi</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.jumlahSosialisasi}</BgsTypography>
                            </Link> : <Link to="/sosialisasi/berita">
                                <BgsTypography className="fs-14">Sosialisasi</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.jumlahSosialisasi}</BgsTypography>
                            </Link>}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container columns={4}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <NewspaperIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Berita</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.berita}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-12 me-4">
                        <Box className="icon-dashboard">
                            <InfoIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14 me-2">Informasi</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.informasi}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderLeft="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <PsychologyIcon className="fs-18" />
                        </Box>
                        <Box >
                            <BgsTypography className="fs-14">Pengembangan Diri</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.pengembanganDiri}</BgsTypography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper >
}

export default jumlahSosialisasiComponent;