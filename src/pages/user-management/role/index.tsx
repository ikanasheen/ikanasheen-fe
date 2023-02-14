import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/user-management/role"));

const props: MainLayoutProps = {
    title: "Role List",
    mode: "index",
    menuCode: "role",
    actionCode: "list",
    usingContainer: false
}

export default function UserManagementRoleView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}