import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MainLayoutProps } from "shared/layout/main-layout";
import "./index.scss"
import { credential } from "lib";
import TransaksiStatusComponent from "./components/transaksi-per-status";
import TransaksiKabupatenComponent from "./components/transaksi-per-kabupaten";
import TransaksiTanggalComponent from "./components/transaksi-per-tanggal";
// import CuacaComponent from "./components/cuaca";
import JumlahKomiditiComponent from "./components/jumlah-komoditi";
import JumlahNelayanComponent from "./components/jumlah-nelayan";
import JumlahTransaksiComponent from "./components/jumlah-transaksi";
import JumlahBantuanComponent from "./components/jumlah bantuan";
import JumlahSosialisasiComponent from "./components/jumlah-sosialisasi";
import { useEffect, useState } from "react";



const HomeComponent = ({ }: MainLayoutProps) => {
    const { idRole } = credential.storage.get("user") || {};
    const [roleId, setRoleId] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            setRoleId(idRole)
            setUserId(credential.storage.get("user")?.idUser)
        };
        fetchUser();
    }, [])

    return <Box className="home-component">
        <Grid container>
            <Grid item md={12} xs={12} className="left-content">
                <Grid container columns={1} spacing={1.4}>
                    <Grid item xs={1}>
                        <Box className="d-flex justify-content-between">
                            <BgsTypography className="title-page">Dashboard</BgsTypography>
                        </Box>
                    </Grid>
                    {idRole == "4" ?
                        <Grid item xs={1}>
                            <Grid container columns={1} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    {/* <CuacaComponent /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        : <Grid item xs={1}>
                            <Grid container columns={1} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    {/* <CuacaComponent /> */}
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <JumlahKomiditiComponent />
                                </Grid>
                            </Grid>
                        </Grid>}
                    {idRole == "3" ?
                        <Grid item xs={1}>
                            <Grid container columns={3} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    <JumlahTransaksiComponent userId={userId} roleId={roleId} />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <JumlahBantuanComponent />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <JumlahSosialisasiComponent />
                                </Grid>
                            </Grid>
                        </Grid>
                        : idRole == "4" ? <Grid item xs={1}>
                            <Grid container columns={1} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    <JumlahTransaksiComponent userId={userId} roleId={roleId} />
                                </Grid>
                            </Grid>
                        </Grid>
                            : <Grid item xs={1}>
                                <Grid container columns={4} spacing={1}>
                                    <Grid item md={1} xs={1}>
                                        <JumlahNelayanComponent />
                                    </Grid>
                                    <Grid item md={1} xs={2}>
                                        <JumlahTransaksiComponent userId={userId} roleId={roleId} />
                                    </Grid>

                                    <Grid item md={1} xs={2}>
                                        <JumlahBantuanComponent />
                                    </Grid>
                                    <Grid item md={1} xs={2}>
                                        <JumlahSosialisasiComponent />
                                    </Grid>
                                </Grid>
                            </Grid>}
                    {idRole == "3" || idRole == "4" ?
                        <>
                            <Grid item xs={1}>
                                <Grid container columns={2} spacing={1}>
                                    <Grid item xs={1}>
                                        <TransaksiStatusComponent />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TransaksiTanggalComponent />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                        : <>
                            <Grid item xs={1}>
                                <TransaksiKabupatenComponent />
                            </Grid>
                            <Grid item xs={1}>
                                <TransaksiTanggalComponent />
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default HomeComponent;