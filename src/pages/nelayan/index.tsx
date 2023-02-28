import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/nelayan"));

const props: MainLayoutProps = {
    title: "Daftar Nelayan",
    mode: "index",
    menuCode: "nelayan",
    actionCode: "list",
    usingContainer: false
}

export default function NelayanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}