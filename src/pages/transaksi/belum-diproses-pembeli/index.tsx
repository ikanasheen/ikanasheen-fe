import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/transaksi/belum-diproses-pembeli"));
const props: MainLayoutProps = {
    title: "Daftar Transaksi",
    mode: "index",
    menuCode: "transaksi-belum-diproses-pembeli",
    actionCode: "list",
    usingContainer: false
}

export default function TransaksiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}