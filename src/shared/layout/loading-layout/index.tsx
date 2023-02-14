


import Box from "@mui/material/Box";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

const LoadingLayout = () => {
    return <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", alignItems: "center", justifyContent: "center", position: "fixed", zIndex: 9999, top: 0, bgcolor: "#fff" }}>
        <div className="position-relative wt-430 hg-70">
            <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO}`} alt="CRESA" className="img-full" />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-2">
            <Box sx={{ position: 'relative', display: "flex", alignItems: "center", marginTop: "3px" }} className="me-2 fs-12">
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={35}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                            stroke: "currentColor",
                            strokeDasharray: "80px,200px",
                            strokeDashoffset: 0
                        },
                    }}
                    size={35}
                    thickness={4}
                />
            </Box>
            Loading...
        </div>
    </Box>
}

export default LoadingLayout;