import { Column, ColumnConfig } from "@ant-design/plots";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import moment from "moment";
import {  useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";
import { credential } from "lib";

interface PartnerProps {
    tanggal:string;
    transaksiDiajukan: number;
    transaksiDiproses: number;
    transaksiSelesai: number;
}

interface ColumnDataProps {
    type: string;
    tgl: string;
    value: number;
}
interface ParamProps{
    idUser:string
    idRole:string
}

const TransaksiComponent = () => {
    const [data, setData] = useState<ColumnDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);    
    const [roleId, setRoleId] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        setLoading(true)
        DashboardHelper.transaksiTanggal(({ status, data }) => {
            setLoading(false)
            setRoleId(credential.storage.get("user")?.idRole)
            setUserId(credential.storage.get("user")?.idUser)
            let transaksiData: ColumnDataProps[] = [];
            let paramData: ParamProps
            if (status) (data as PartnerProps[]).forEach(({ transaksiDiajukan, transaksiDiproses, transaksiSelesai, tanggal }) => {
                transaksiData.push({
                    tgl: tanggal,
                    value: transaksiDiajukan,
                    type: "Transaksi Diajukan",
                })
                transaksiData.push({
                    tgl: tanggal,
                    value: transaksiDiproses,
                    type: "Transaksi Diproses"
                })
                transaksiData.push({
                    tgl: tanggal,
                    value: transaksiSelesai,
                    type: "Transaksi Selesai"
                })
                paramData.idRole,
                paramData.idUser
            })
            setData(transaksiData) 
            console.log(roleId)
            console.log(userId)
        })
    }, [])

    const config: ColumnConfig = {
        data,
        xField: "city",
        yField: "value",
        seriesField: "type",
        isGroup: true,
        height: 300,
        legend: {
            position: "bottom",
            offsetY: 10,
            itemValue: {
                formatter: (text, item) => {
                    const items = data.filter((d) => d.type === item.value);
                    return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : "-";
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
                <BgsTypography className="fs-14 text-base-alt3-color">{moment().format("DD MMM YYYY")} </BgsTypography>
            </Box>
        </Box>
        <Column {...config} data={data} loading={loading} />
    </Paper>;
};

export default TransaksiComponent;