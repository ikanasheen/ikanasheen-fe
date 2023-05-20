import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/faq/nelayan/list-faq"));

const props: MainLayoutProps = {
    title: "Daftar FAQ",
    mode: "index",
    menuCode: "list-faq-nelayan",
    actionCode: "list",
    usingContainer: false
}

export default function DaftarPengaduanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}