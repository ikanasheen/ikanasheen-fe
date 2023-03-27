import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Form = lazy(() => import("./form"));

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi Belum Diproses"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => TransaksiHelper.retrieve(data),
        showIndexing: {
            sticky: "left"
        },
        temporaryParameter: [{
            propReq: "status",
            value: ['DIAJUKAN'],
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idTransaksi),
        columns: [
            `idTransaksi|caption=ID Transaksi|allowFiltering|width=180`,
            `namaIkan|caption=Nama Komoditi|allowFiltering|width=180`,
            // `ukuran|caption=Ukuran|width=180`,
            // `jumlah|caption=Jumlah (Kg)|width=160`,
            // `hargaAwal|caption=Harga Awal (per Kg)|dataType=number|allowFiltering|width=230`,
            // `hargaNego|caption=Harga Nego (per Kg)|dataType=number|allowFiltering|width=200`,
            // `hargaAkhir|caption=Harga Akhir|dataType=number|allowFiltering|width=200`,
            // `alamatPembeli|caption=Alamat Pembeli|width=250|className=text-break`,
            // `namaPembeli|caption=Nama Pembeli|width=180`,
            // `namaNelayan|caption=Nama Nelayan|width=250`,
            `tanggalDibutuhkan|caption=Tanggal Dibutuhkan|dataType=date|allowFiltering|width=210`,
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
                    } else if (data.status == "SIAP_DIAMBIL") {
                        return "Siap Diambil"
                    } else if (data.status == "DIKIRIM") {
                        return "Sedang Dikirim"
                    } else {
                        return "Selesai"
                    }

                },
                allowSorting: true,
                allowFiltering: true
            },
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <ArrowForwardIcon className="fs-18" />
            }
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