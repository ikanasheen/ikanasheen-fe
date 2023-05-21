import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PengaduanHelper from "helper/faq/PengaduanHelper";
const Form = lazy(() => import("./form"));

export default function PengaduanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Penanganan Pengaduan"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => PengaduanHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        allowSearching: {
            fullWidth: true
        },
        onRowClick: ({ rowData }) => form(rowData.idPengaduan),
        columns: [
            {
                dataField: "idPengaduan",
                caption: "ID Pengaduan",
                width: 150,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => PengaduanHelper.retrieve(data),
                    displayExpr: "idPengaduan",
                    valueExpr: "idPengaduan",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            {
                dataField: "namaNelayan",
                caption: "Nama Nelayan",
                width: 150,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => PengaduanHelper.retrieve(data),
                    displayExpr: "namaNelayan",
                    valueExpr: "namaNelayan",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            {
                dataField: "pengaduan",
                caption: "Pengaduan",
                width: 300,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => PengaduanHelper.retrieve(data),
                    displayExpr: "pengaduan",
                    valueExpr: "pengaduan",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            `tanggalPengaduan|caption=Tanggal Pengaduan|width=190|dataType=datetime|allowFiltering`,
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <ArrowForwardIcon className="fs-18" />

            }
        ],
    }

    return <>
        <div className="mb-3 ms-3 me-3">
            <BreadcrumbLayout
                action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
                {...props}
            >
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}