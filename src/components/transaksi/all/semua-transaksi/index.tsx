import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TransaksiNelayanHelper from "helper/transaksi/TransaksiNelayanHelper";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Form = lazy(() => import("./form"));

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Semua Transaksi"
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
        showIndexing: {
            sticky: "left"
        },
        // onRowClick: ({ rowData }) => form(rowData.id),
        columns: [
            `nama|caption=Nama Ikan|width=180`,
            `jumlah|caption=Jumlah (Kg)|width=160`,
            `hargaDiajukan|caption=Harga Diajukan (per Kg)|width=230`,
            `hargaNego|caption=Harga Nego (per Kg)|width=200`,
            `hargaAkhir|caption=Harga Akhir (per Kg)|width=200`,
            `alamatPembeli|caption=Alamat Pembeli|width=250|className=text-break`,
            `alamatNelayan|caption=Alamat Nelayan|width=250|className=text-break`,
            `tanggalDibutuhkan|caption=Tanggal Dibutuhkan|dataType=date|width=200`,
            `catatan|caption=Catatan|width=250|className=text-break`,
            {
                dataField: "status",
                caption: "Status",
                width: 160,
                template: (data) => {
                    if (data.status == "DIAJUKAN") {
                        return "Diajukan"
                    } else if (data.status == "DIPROSES") {
                        return "Diproses"
                    } else if (data.status == "DIBATALKAN") {
                        return "Dibatalkan"
                    } else if (data.status == "NEGO") {
                        return "Nego"
                    } else {
                        return "Selesai"
                    }

                },
                allowSorting: true,
            },
            // {
            //     sticky: "right",
            //     icon: false,
            //     width: 60,
            //     template: () => <CheckCircleIcon className="fs-18" />
            //     // visible: ({ data }) => data.requestStatus == "Requested" || data.requestStatus == "Approved" //hide when status 
            // }
        ]
    }

    return <>
        <div className="mb-3">
            <BreadcrumbLayout
                action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
                {...props}
            >
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}