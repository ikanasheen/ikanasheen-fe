import { BgsTypography } from "@andrydharmawan/bgs-component";
import { Column, ColumnConfig } from "@ant-design/plots";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DashboardHelper from "helper/DashboardHelper";
import moment from "moment";
import { useEffect, useState } from "react";

interface StatusProps {
    status: string;
    value: number;
}

const TransaksiComponent = () => {
    const [data, setData] = useState<StatusProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.transaksiTanggal(({ status, data }) => {
            setLoading(false)
            setData(status ? data : [])
        })
    }, [])

    const config: ColumnConfig = {
        data,
        xField: "status",
        yField: "value",
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        height: 300,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        color: "#0193B8"
    };

    return <Paper className="pdt-15 pdb-15 pdl-25 pdr-25 position-relative">
        <Box className="d-flex align-items-center justify-content-between mgb-20">
            <Box>
                <BgsTypography className="fs-18">Transaksi per Tanggal</BgsTypography>
                <BgsTypography className="fs-14 text-base-alt3-color">{moment().format("MMM YYYY")} </BgsTypography>
            </Box>
        </Box>
        <Column {...config} data={data} loading={loading} />
    </Paper>
};

export default TransaksiComponent;