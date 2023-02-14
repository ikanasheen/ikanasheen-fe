import { BgsTypography } from "@andrydharmawan/bgs-component";
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingPageProps {
    height?: number | string;
    className?: string;
}

export default function LoadingPage({ height = "100vh", className = "" }: LoadingPageProps) {
    return <div style={{ height }} className={`d-flex align-items-center justify-content-center flex-column ${className}`}>
        <CircularProgress />
        <BgsTypography className="mt-3 fs-20">Loading...</BgsTypography>
    </div>
}