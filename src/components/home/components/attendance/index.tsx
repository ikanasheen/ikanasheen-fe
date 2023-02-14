import { BgsTypography } from "@andrydharmawan/bgs-component";
import { Pie, PieConfig } from '@ant-design/plots';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import DashboardHelper from "helper/DashboardHelper";

interface AttendanceProps {
    attendance: number;
    salesAgentId: string;
}

const AttendanceComponent = () => {
    const [data, setData] = useState<AttendanceProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        DashboardHelper.salesAgentAttendance(({ status, data }) => {
            setLoading(false)
            setData(status ? data : [])
        })
    }, [])

    const config: PieConfig = {
        appendPadding: 10,
        data,
        angleField: 'attendance',
        colorField: 'salesAgentId',
        radius: 0.8,
        height: 200,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return <Paper className="pdt-15 pdb-15 pdl-25 pdr-25 position-relative">
        <Box className="d-flex align-items-center justify-content-between mgb-20">
            <BgsTypography className="fs-18">Attendance</BgsTypography>
        </Box>
        <Pie {...config} data={data} loading={loading} />
    </Paper>
};

export default AttendanceComponent;