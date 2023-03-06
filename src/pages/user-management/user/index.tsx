import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/user-management/user"));

const props: MainLayoutProps = {
    title: "User List",
    mode: "index",
    menuCode: "user-list",
    actionCode: "list",
    usingContainer: false
}

export default function UserManagementUserListPages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}