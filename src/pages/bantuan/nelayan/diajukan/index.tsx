import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/bantuan/nelayan/diajukan"));

const props: MainLayoutProps = {
    title: "Daftar Bantuan",
    mode: "index",
    menuCode: "bantuan-diajukan-nelayan",
    actionCode: "list",
    usingContainer: false
}

export default function DaftarBantuanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}