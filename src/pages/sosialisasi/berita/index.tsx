import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/sosialisasi/berita"));

const props: MainLayoutProps = {
    title: "Daftar Sosialisasi - Berita",
    mode: "index",
    menuCode: "sosialisasi-berita",
    actionCode: "list",
    usingContainer: false
}

export default function SosialisasiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}