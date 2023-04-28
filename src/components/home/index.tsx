import { BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MainLayoutProps } from "shared/layout/main-layout";
import "./index.scss"
import { credential } from "lib";
// import TransaksiStatusComponent from "./components/transaksi-per-status";
// import TransaksiKabupatenComponent from "./components/transaksi-per-kabupaten";
// import TransaksiTanggalComponent from "./components/transaksi-per-tanggal";
// import CuacaComponent from "./components/cuaca";
import JumlahKomiditiComponent from "./components/jumlah-komoditi";
import JumlahNelayanComponent from "./components/jumlah-nelayan";
import JumlahTransaksiComponent from "./components/jumlah-transaksi";
import JumlahBantuanComponent from "./components/jumlah bantuan";
import JumlahSosialisasiComponent from "./components/jumlah-sosialisasi";
// import { useEffect } from "react";



const HomeComponent = ({ }: MainLayoutProps) => {
    // const roleName = credential.storage.get("user")?.role.namaRole;
    const roleId = credential.storage.get("user")?.idRole;

    // useEffect(() => {

    // }, [])
    return <Box className="home-component">
        <Grid container>
            <Grid item md={12} xs={12} className="left-content">
                <Grid container columns={1} spacing={1.4}>
                    <Grid item xs={1}>
                        <Box className="d-flex justify-content-between">
                            <BgsTypography className="title-page">Dashboard</BgsTypography>
                        </Box>
                    </Grid>
                    {roleId == "4" ?
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
                    {roleId == "3" ?
                        <Grid item xs={1}>
                            <Grid container columns={3} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    <JumlahTransaksiComponent />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <JumlahBantuanComponent />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <JumlahSosialisasiComponent />
                                </Grid>
                            </Grid>
                        </Grid>
                        : roleId == "4" ? <Grid item xs={1}>
                            <Grid container columns={1} spacing={1}>
                                <Grid item md={1} xs={2}>
                                    <JumlahTransaksiComponent />
                                </Grid>
                            </Grid>
                        </Grid>
                            : <Grid item xs={1}>
                                <Grid container columns={4} spacing={1}>
                                    <Grid item md={1} xs={1}>
                                        <JumlahNelayanComponent />
                                    </Grid>
                                    <Grid item md={1} xs={2}>
                                        <JumlahTransaksiComponent />
                                    </Grid>

                                    <Grid item md={1} xs={2}>
                                        <JumlahBantuanComponent />
                                    </Grid>
                                    <Grid item md={1} xs={2}>
                                        <JumlahSosialisasiComponent />
                                    </Grid>
                                </Grid>
                            </Grid>}
                    {roleId == "3" || roleId == "4" ?
                        <Grid item xs={1}>
                            <Grid container columns={2} spacing={1}>
                                {/* <Grid item md={1} xs={2}>
                                    <TransaksiStatusComponent />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <TransaksiTanggalComponent />
                                </Grid> */}
                            </Grid>
                        </Grid>
                        : <Grid item xs={1}>
                            <Grid container columns={2} spacing={1}>
                                {/* <Grid item md={1} xs={2}>
                                    <TransaksiKabupatenComponent />
                                </Grid>
                                <Grid item md={1} xs={2}>
                                    <TransaksiTanggalComponent />
                                </Grid> */}
                            </Grid>
                        </Grid>}
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default HomeComponent;