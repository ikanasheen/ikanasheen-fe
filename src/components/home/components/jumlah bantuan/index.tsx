import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import HandshakeIcon from '@mui/icons-material/Handshake';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { credential } from "lib";
import CachedIcon from '@mui/icons-material/Cached';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Link } from "react-router-dom";

interface StatisticProps {
    bantuanTersedia: number;
    bantuanDisetujui: number;
    bantuanDitolak: number;
    bantuanDiajukan: number;
    bantuanTerproses: number;
}

const initValue = {
    bantuanTersedia: 0,
    bantuanDisetujui: 0,
    bantuanDitolak: 0,
    bantuanDiajukan: 0,
    bantuanTerproses: 0,
}

const bantuanTersediaComponent = () => {
    const [statistic, setStatistic] = useState<StatisticProps>(initValue);
    const [loading, setLoading] = useState<boolean>(true);
    const roleId = credential.storage.get("user")?.idRole;
    const {
        idRole,
        idUser
    } = credential.storage.get("user") || {};

    useEffect(() => {
        setLoading(true)
        DashboardHelper.jumlahBantuan({
            idRole,
            idUser
        }, ({ status, data }) => {
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
                            <HandshakeIcon className="fs-18" />
                        </Box>
                        <Box>
                            {roleId == "1" ? <Link to="/bantuan/admin/tersedia">
                                <BgsTypography className="fs-14">Bantuan Tersedia</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.bantuanTersedia}</BgsTypography>
                            </Link> : roleId == "2" ? <Link to="/bantuan/gov/tersedia">
                                <BgsTypography className="fs-14">Bantuan Tersedia</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.bantuanTersedia}</BgsTypography>
                            </Link> : <Link to="/bantuan/nelayan/tersedia">
                                <BgsTypography className="fs-14">Bantuan Tersedia</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-25">{statistic.bantuanTersedia}</BgsTypography>
                            </Link>}

                        </Box>
                    </Grid>
                </Grid>
                {roleId == "3" ? <Grid container columns={2}>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                        <Box className="icon-dashboard">
                            <CheckIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Bantuan Diterima</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.bantuanDisetujui}</BgsTypography>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" >
                        <Box className="icon-dashboard">
                            <ClearIcon className="fs-18" />
                        </Box>
                        <Box>
                            <BgsTypography className="fs-14">Bantuan Ditolak</BgsTypography>
                            <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.bantuanDitolak}</BgsTypography>
                        </Box>
                    </Grid>
                </Grid>
                    : <Grid container columns={2}>
                        <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" borderRight="1px solid #dee3e8">
                            <Box className="icon-dashboard">
                                <TaskAltOutlinedIcon className="fs-18" />
                            </Box>
                            <Box>
                                <BgsTypography className="fs-14">Bantuan Diajukan</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.bantuanDiajukan}</BgsTypography>
                            </Box>
                        </Grid>
                        <Grid item md={1} xs={3} className="d-flex align-items-center pd-10" >
                            <Box className="icon-dashboard">
                                <CachedIcon className="fs-18" />
                            </Box>
                            <Box>
                                <BgsTypography className="fs-14">Bantuan Terproses</BgsTypography>
                                <BgsTypography loading={loading} className="fs-24 text-base-alt1-color lh-45">{statistic.bantuanTerproses}</BgsTypography>
                            </Box>
                        </Grid>
                    </Grid>}
            </Grid>
        </Grid>
    </Paper >
}

export default bantuanTersediaComponent;