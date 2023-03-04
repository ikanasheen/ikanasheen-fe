import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/sosialisasi/pengembangan-diri"));

const props: MainLayoutProps = {
    title: "Daftar Sosialisasi - Pengembangan Diri",
    mode: "index",
    menuCode: "sosialisasi-pengembangan-diri",
    actionCode: "list",
    usingContainer: false
}

export default function SosialisasiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}