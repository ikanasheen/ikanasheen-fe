import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import HargaIkanHelper from "helper/harga-ikan/HargaIkanHelper";
const Form = lazy(() => import("../harga-ikan/form"));

export default function HargaIkanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Harga Ikan"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => HargaIkanHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        showIcon: true,
        allowRefreshing: true,
        allowSearchingOptions: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.id),
        columns: [
            `nama|caption=Nama|allowFiltering|width=200`,
            `nama|caption=Aru Selatan|allowFiltering|width=200`,
            `nama|caption=Aru Selatan Timur|allowFiltering|width=250`,
            `nama|caption=Aru Selatan Utara|allowFiltering|width=250`,
            `nama|caption=Aru Tengah|allowFiltering|width=200`,
            `nama|caption=Aru Tengah Timur|allowFiltering|width=250`,
            `nama|caption=Aru Tengah Selatan|allowFiltering|width=250`,
            `nama|caption=Pulau-Pulau Aru|allowFiltering|width=250`,
            `nama|caption=Aru Utara|allowFiltering|width=200`,
            `nama|caption=Aru Utara Timur Batu Ley|allowFiltering|width=270`,
            `nama|caption=Sir-Sir|allowFiltering|width=200`
        ]
    }

    return <BreadcrumbLayout
        action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
        {...props}
    >
        <BgsTable ref={tableRef} {...table} />
    </BreadcrumbLayout>
}