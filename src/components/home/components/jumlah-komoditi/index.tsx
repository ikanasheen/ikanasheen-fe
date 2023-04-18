import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from "react-router-dom";

interface StatisticProps {
    jumlahIkan: number;
}

const initValue = {
    jumlahIkan: 0,
}

const JumlahKomoditiComponent = () => {
    const [ikan, setStatistic] = useState<StatisticProps>(initValue);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.jumlahIkan(({ status, data }) => {
            setLoading(false)
            setStatistic(status ? data : initValue)
            console.log(ikan, "ikaan")
        })
    }, [])

    return <Paper >
        {/* <Box className="justify-content-between align-items-center p-2 pdl-20">
            <BgsTypography className="fs-18">Komoditi</BgsTypography>
        </Box> */}

        <Grid container>
            {/* borderTop="1px solid #dee3e8" */}
            <Grid item md={12} xs={12}>
                <Grid container columns={1}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10">
                        <Box className="icon-dashboard">
                            <ContactsIcon className="fs-18" />
                        </Box>
                        <Box>
                            <Link to="/daftar-komoditi">
                                <BgsTypography className="fs-14">Jumlah Komoditi</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{ikan.jumlahIkan}</BgsTypography>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper >
}

export default JumlahKomoditiComponent;