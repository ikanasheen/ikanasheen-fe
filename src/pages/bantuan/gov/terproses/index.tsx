import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/bantuan/gov/terproses"));

const props: MainLayoutProps = {
    title: "Daftar Proposal",
    mode: "index",
    menuCode: "bantuan-terproses-gov",
    actionCode: "list",
    usingContainer: false
}

export default function DaftarBantuanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}