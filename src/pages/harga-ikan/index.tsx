import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/harga-ikan"));

const props: MainLayoutProps = {
    title: "Daftar Harga Ikan",
    mode: "index",
    menuCode: "harga-ikan",
    actionCode: "list",
    usingContainer: false
}

export default function HargaIkanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}