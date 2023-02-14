import { Column, ColumnConfig } from "@ant-design/plots";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { BgsTypography } from "@andrydharmawan/bgs-component";
import moment from "moment";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";

interface PartnerProps {
    territoryName: string;
    branch: number;
    hq: number;
}

interface ColumnDataProps {
    type: string;
    city: string;
    value: number;
}

const PartnerComponent = () => {
    const [data, setData] = useState<ColumnDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.salesAgentPartner(({ status, data }) => {
            setLoading(false)
            let partnerData: ColumnDataProps[] = [];
            if (status) (data as PartnerProps[]).forEach(({ territoryName, branch, hq }) => {
                partnerData.push({
                    type: "BRANCH",
                    city: territoryName,
                    value: branch
                })
                partnerData.push({
                    type: "HQ",
                    city: territoryName,
                    value: hq
                })
            })
            setData(partnerData)
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
                <BgsTypography className="fs-18">Partner</BgsTypography>
                <BgsTypography className="fs-14 text-base-alt3-color">{moment().format("DD MMM YYYY")}</BgsTypography>
            </Box>
        </Box>
        <Column {...config} data={data} loading={loading} />
    </Paper>;
};

export default PartnerComponent;