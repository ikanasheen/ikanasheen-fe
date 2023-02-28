import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import NelayanHelper from "helper/nelayan/NelayanHelper";
const Form = lazy(() => import("../nelayan/form"));

export default function NelayanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Nelayan"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => NelayanHelper.retrieve(data),
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
            `nelayan|caption=ID|allowFiltering|width=200`,
            `nama|caption=Nama Lengkap|allowFiltering|width=250`,
            `jenisKelamin|caption=Jenis Kelamin|allowFiltering|width=200`,
            `date|caption=Tanggal Lahir|allowFiltering|dataType=date|width=200`,
            `alamat|caption=Alamat|allowFiltering|width=250`,
            `email|caption=Email|allowFiltering|width=200`,
            `status|caption=Status|allowFiltering|width=180`,
        ]
    }

    return <BreadcrumbLayout
        action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
        {...props}
    >
        <BgsTable ref={tableRef} {...table} />
    </BreadcrumbLayout>
}