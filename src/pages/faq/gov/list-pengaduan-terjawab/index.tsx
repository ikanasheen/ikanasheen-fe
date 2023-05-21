import { MainLayoutProps } from "shared/layout/main-layout";
import { lazy } from "react";

import MainLayout from "shared/layout/main-layout";
const MainComponent = lazy(() => import("components/faq/gov/list-pengaduan-terjawab"));

const props: MainLayoutProps = {
    title: "Daftar Pengaduan Terjawab",
    mode: "index",
    menuCode: "list-pengaduan-terjawab-gov",
    actionCode: "list",
    usingContainer: false
}

export default function DaftarPengaduanView() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}