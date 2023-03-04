import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/sosialisasi/informasi"));

const props: MainLayoutProps = {
    title: "Daftar Sosialisasi - Informasi",
    mode: "index",
    menuCode: "sosialisasi-informasi",
    actionCode: "list",
    usingContainer: false
}

export default function SosialisasiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}