import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/sosialisasi"));

const props: MainLayoutProps = {
    title: "Daftar Sosialisasi",
    mode: "index",
    menuCode: "sosialisasi",
    actionCode: "list",
    usingContainer: false
}

export default function SosialisasiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}