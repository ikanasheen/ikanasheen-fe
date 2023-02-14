import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/master-data/sales-profile"));

const props: MainLayoutProps = {
    title: "Sales Profile List",
    mode: "index",
    menuCode: "sales-profile",
    actionCode: "list",
    usingContainer: false
}

export default function SalesProfilePages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}