import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/master-data/partner"));

const props: MainLayoutProps = {
    title: "Partner List",
    mode: "index",
    menuCode: "partner",
    actionCode: "list",
    usingContainer: false
}

export default function PartnerPages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}