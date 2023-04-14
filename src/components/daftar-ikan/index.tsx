import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IkanHelper from "helper/daftar-ikan/IkanHelper";
const Form = lazy(() => import("./form"));

export default function DaftarIkanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Komoditi"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => IkanHelper.retrieve(data),
        // allowSearching: {
        //     fullWidth: true
        // },
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idIkan),
        columns: [
            {
                dataField: "idIkan",
                caption: "Kode Komoditi",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => IkanHelper.retrieve(data),
                    displayExpr: "idIkan",
                    valueExpr: "idIkan",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "namaIkan",
                caption: "Nama Komoditi",
                width: 200,
                className: "text-break",
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => IkanHelper.retrieve(data),
                    displayExpr: "namaIkan",
                    valueExpr: "namaIkan",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "ukuran",
                caption: "Ukuran",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => IkanHelper.retrieve(data),
                    displayExpr: "ukuran",
                    valueExpr: "ukuran",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "hargaDasar",
                caption: "Harga Dasar",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => IkanHelper.retrieve(data),
                    displayExpr: "hargaDasar",
                    valueExpr: "hargaDasar",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "deskripsi",
                caption: "Deskripsi",
                className: "text-break",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => IkanHelper.retrieve(data),
                    displayExpr: "deskripsi",
                    valueExpr: "deskripsi",
                    allowSorting: false,
                    allowSearching: false
                },
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