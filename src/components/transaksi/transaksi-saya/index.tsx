import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TransaksiNelayanHelper from "helper/transaksi/TransaksiNelayanHelper";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Form = lazy(() => import("../transaksi-saya/form"));

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => TransaksiNelayanHelper.retrieve(data),
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
            `nama|caption=Nama Ikan|allowFiltering|width=200`,
            `jumlah|caption=Jumlah|allowFiltering|width=250`,
            `alamatPembeli|caption=Alamat Pembeli|allowFiltering|width=250`,
            `namaPembeli|caption=Nama Pembeli|allowFiltering|width=200`,
            `ekspedisi|caption=Ekspedisi|allowFiltering|width=200`,
            `date|caption=Tanggal Pembelian|allowFiltering|dataType=date|width=200`,
            `catatan|caption=Catatan|allowFiltering|width=250`,
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <CheckCircleIcon className="fs-18" />
                // visible: ({ data }) => data.requestStatus == "Requested" || data.requestStatus == "Approved" //hide when status 

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