import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/daftar-ikan"));

const props: MainLayoutProps = {
    title: "Daftar Ikan",
    mode: "index",
    menuCode: "daftar-ikan",
    actionCode: "list",
    usingContainer: false
}

export default function HargaIkanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}