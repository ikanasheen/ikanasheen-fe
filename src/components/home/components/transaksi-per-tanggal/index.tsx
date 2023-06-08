import { Column, ColumnConfig } from "@ant-design/plots";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import { credential } from "lib";
import moment from "moment";

interface PartnerProps {
    tanggal: string;
    transaksiDiajukan: number;
    transaksiDiproses: number;
    transaksiSelesai: number;
}

interface ColumnDataProps {
    type: string;
    tgl: string;
    value: number;
}

const TransaksiComponent = () => {
    const [data, setData] = useState<ColumnDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {
        idRole,
        idUser
    } = credential.storage.get("user") || {};

    useEffect(() => {
        setLoading(true)
        DashboardHelper.transaksiTanggal({
            idRole,
            idUser
        },({ status, data }) => {
            setLoading(false)
            let transaksiData: ColumnDataProps[] = [];
            if (status) (data as PartnerProps[]).forEach(({ transaksiDiajukan, transaksiDiproses, transaksiSelesai, tanggal }) => {
                transaksiData.push({
                    tgl: moment(tanggal).format("DD MMM YYYY"),
                    value: transaksiDiajukan,
                    type: "Transaksi Diajukan",
                })
                transaksiData.push({
                    tgl: moment(tanggal).format("DD MMM YYYY"),
                    value: transaksiDiproses,
                    type: "Transaksi Diproses"
                })
                transaksiData.push({
                    tgl: moment(tanggal).format("DD MMM YYYY"),
                    value: transaksiSelesai,
                    type: "Transaksi Selesai"
                })
            })
            setData(transaksiData)
            
        })
    },[])

    const config: ColumnConfig = {
        data,
        xField: "tgl",
        yField: "value",
        seriesField: "type",
        isGroup: true,
        height: 300,
        legend: {
            position: "bottom",
            offsetY: 10,
            itemValue: {
                formatter: () => {
                    return "";
                },
                style: {
                    opacity: 0.65,
                },
            },
        },
    };

    return <Paper className="pdt-15 pdb-15 pdl-25 pdr-25 position-relative">
        <Box className="d-flex align-items-center justify-content-between mgb-20">
            <Box>
                <BgsTypography className="fs-18">Transaksi Tujuh Hari Terakhir</BgsTypography>
                <BgsTypography className="fs-14 text-base-alt3-color">{moment().subtract(6,"days").format("DD MMM YYYY")} - {moment().format("DD MMM YYYY")}</BgsTypography>
            </Box>
        </Box>
        <Column {...config} data={data} loading={loading} />
    </Paper>;
};

export default TransaksiComponent;