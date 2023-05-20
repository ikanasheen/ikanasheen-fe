import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/faq/nelayan/list-pengaduan"));

const props: MainLayoutProps = {
    title: "Daftar Pengaduan",
    mode: "index",
    menuCode: "list-pengaduan-nelayan",
    actionCode: "list",
    usingContainer: false
}

export default function DaftarPengaduanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}