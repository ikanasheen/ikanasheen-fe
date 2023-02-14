import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import SalesCategoryHelper from "helper/SalesCategoryHelper";
const Form = lazy(() => import("./form"));

export default function SalesCategoryList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Kategori Sales"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => SalesCategoryHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        showIcon: true,
        allowRefreshing: true,
        allowSearchingOptions: true,
        allowSortingOptions: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.id),
        columns: [
            `salesCategoryName|caption=Nama Kategori Sales|allowFiltering|width=250`,
            `description|caption=Deskripsi|allowFiltering|width=250`,
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <ArrowForwardIcon className="fs-18" />
            }
        ]
    }

    return <BreadcrumbLayout
        action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
        {...props}
    >
        <BgsTable ref={tableRef} {...table} />
    </BreadcrumbLayout>
}