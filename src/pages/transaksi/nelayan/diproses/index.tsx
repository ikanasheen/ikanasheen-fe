import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/transaksi/nelayan/diproses"));

const props: MainLayoutProps = {
    title: "Transaksi",
    mode: "index",
    menuCode: "transaksi-nelayan-diproses",
    actionCode: "list",
    usingContainer: false
}

export default function NelayanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}