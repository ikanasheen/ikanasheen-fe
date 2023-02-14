import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/master-data/sales-category"));

const props: MainLayoutProps = {
    title: "Sales Category List",
    mode: "index",
    menuCode: "sales-category",
    actionCode: "list",
    usingContainer: false
}

export default function MasterDataSalesCategoryPages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}