import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import configureStore, { ConfigureStore } from "store";

interface FooterProps {
    white?: boolean;
}

export default function Footer({ white = true }: FooterProps) {
    const { sidebarOpen }: ConfigureStore = configureStore.getState()
    return <Box className="d-flex flex-column align-items-center justify-content-center p-3 hg-51 max-hg-51" sx={{ overflow: "hidden", bgcolor: "transparent" }}>
        {(sidebarOpen || !white) && <Typography className="fs-12 fw-300" align="center" sx={{ fontFamily: "Source Sans Pro" }}>
            ©2022 {process.env.REACT_APP_NAME} - All rights reserved.
        </Typography>}
        <Box className="d-flex align-items-center">
            {(sidebarOpen || !white) && <Typography className="fs-12 me-1 fw-300" align="center" sx={{ fontFamily: "Source Sans Pro" }}>
                {/* Powered by */}
            </Typography>}
            {/* <img src={`/assets/img/logo/asyst${white ? "-white" : ""}.png`} alt="CRESA" width={60} height={17} /> */}
        </Box>
    </Box>
}