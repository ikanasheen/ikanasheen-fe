import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/master-data/city"));

const props: MainLayoutProps = {
    title: "City List",
    mode: "index",
    menuCode: "city",
    actionCode: "list",
    usingContainer: false
}

export default function MasterDataCityView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}