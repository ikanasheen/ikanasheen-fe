import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/home"));

const props: MainLayoutProps = {
    title: "Dashboard",
    mode: "index",
    menuCode: "dashboard",
    actionCode: "view",
    usingContainer: false
}

export default function DashboardPages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}