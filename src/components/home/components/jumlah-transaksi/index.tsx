import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MediationIcon from '@mui/icons-material/Mediation';
import CachedIcon from '@mui/icons-material/Cached';
import DoneAllIcon from '@mui/icons-material/DoneAll';
interface StatisticProps {
    jumlahTransaksi: number;
    transaksiNego: number;
    transaksiDiproses: number;
    transaksiSelesai: number;
}

const initValue = {
    jumlahTransaksi: 0,
    transaksiNego: 0,
    transaksiDiproses: 0,
    transaksiSelesai: 0,
}

const JumlahNelayanComponent = () => {
    const [statistic, setStatistic] = useState<StatisticProps>(initValue);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.jumlahTransaksi(({ status, data }) => {
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
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10"  borderBottom="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <ReceiptLongIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Jumlah Transaksi</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.jumlahTransaksi}</BgsTypography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container columns={3}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <MediationIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Nego</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.transaksiNego}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <CachedIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Diproses</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.transaksiDiproses}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" >
                        <Box className="icon-dashboard">
                            <DoneAllIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Selesai</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.transaksiSelesai}</BgsTypography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper >
}

export default JumlahNelayanComponent;