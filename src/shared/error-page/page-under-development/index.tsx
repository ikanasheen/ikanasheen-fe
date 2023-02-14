import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MainLayout from "shared/layout/main-layout"
import "./index.scss";

interface UnderDevelopmentProps {
    height?: string;
}

export default function UnderDevelopment({ height = "100vh" }: UnderDevelopmentProps) {
    return <Box className="d-flex align-items-center justify-content-center flex-column w-100 p-3" style={{ height }}>
        <img src="/assets/img/background/under-construction.webp" className="full-width" />
    </Box>
}

export function Page404() {
    return <MainLayout title="Error 404" menuCode="">
        <Paper className="shadow-none p-4 pb-3 br-19">
            <UnderDevelopment />
        </Paper>
    </MainLayout>
}