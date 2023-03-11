import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/transaksi/nelayan/transaksi-saya"));

const props: MainLayoutProps = {
    title: "Transaksi saya",
    mode: "index",
    menuCode: "transaksi-saya",
    actionCode: "list",
    usingContainer: false
}

export default function NelayanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}