import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/daftar-ikan"));

const props: MainLayoutProps = {
    title: "Daftar Komoditi",
    mode: "index",
    menuCode: "daftar-komoditi",
    actionCode: "list",
    usingContainer: false
}

export default function HargaKomoditiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}