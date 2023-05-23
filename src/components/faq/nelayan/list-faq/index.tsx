import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FaqHelper from "helper/faq/FaqHelper";
const Form = lazy(() => import("./form"));

export default function FaqlList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar FAQ"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => FaqHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        allowSearching: {
            fullWidth: true
        },
        onRowClick: ({ rowData }) => form(rowData.idFaq),
        columns: [
            {
                dataField: "idFaq",
                caption: "ID FAQ",
                width: 100,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => FaqHelper.retrieve(data),
                    displayExpr: "idFaq",
                    valueExpr: "idFaq",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            {
                dataField: "idTopik",
                caption: "Topik",
                width: 150,
                allowSorting: true,
                template: (data) => {
                    return data.topik.namaTopik
                },
                allowFiltering: {
                    helper: (data) => FaqHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        return data.topik.namaTopik
                    },
                    valueExpr: "idTopik",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            {
                dataField: "pertanyaan",
                caption: "Pertanyaan",
                width: 300,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => FaqHelper.retrieve(data),
                    displayExpr: "pertanyaan",
                    valueExpr: "pertanyaan",
                    allowSorting: false,
                    allowSearching: false,

                },
            },
            `tanggalDibuat|caption=Tanggal Penambahan|width=190|dataType=datetime|allowFiltering`,
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