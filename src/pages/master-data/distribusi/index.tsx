import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/master-data/distribusi"));

const props: MainLayoutProps = {
    title: "Daftar Distribusi",
    mode: "index",
    menuCode: "distribusi",
    actionCode: "list",
    usingContainer: false
}

export default function MasterDataDistribusiView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}