import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
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
        helper: (data) => TransaksiHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        showIndexing: {
            sticky: "left"
        },
        // onRowClick: ({ rowData }) => form(rowData.id),
        columns: [
            `idTransaksi|caption=ID Transaksi|width=180`,
            `namaIkan|caption=Nama Komoditi|width=180`,
            `ukuran|caption=Ukuran|width=180`,
            `jumlah|caption=Jumlah (Kg)|width=160`,
            `hargaAwal|caption=Harga Awal (per Kg)|dataType=number|width=230`,
            `hargaNego|caption=Harga Nego (per Kg)|dataType=number|width=200`,
            `hargaAkhir|caption=Harga Akhir|dataType=number|width=200`,
            `alamatPembeli|caption=Alamat Pembeli|width=250|className=text-break`,
            `namaPembeli|caption=Nama Pembeli|width=250`,
            `namaNelayan|caption=Nama Nelayan|width=250`,
            `tanggalDibutuhkan|caption=Tanggal Dibutuhkan|dataType=date|width=200`,
            `tanggalDiproses|caption=Tanggal Diproses|dataType=date|width=200`,
            `tanggalSelesai|caption=Tanggal Selesai|dataType=date|width=200`,
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