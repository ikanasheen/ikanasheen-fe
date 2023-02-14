import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/user-management/menu"));

const props: MainLayoutProps = {
    title: "Menu List",
    mode: "index",
    menuCode: "menu",
    actionCode: "list"
}

export default function UserManagementMenuView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}