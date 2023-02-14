import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/master-data/territory"));

const props: MainLayoutProps = {
    title: "Territory List",
    mode: "index",
    menuCode: "territory",
    actionCode: "list",
    usingContainer: false
}

export default function MasterDataTerritoryView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}