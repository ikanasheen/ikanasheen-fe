import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FaqHelper from "helper/faq/FaqHelper";
import { Grid } from "@mui/material";
// import TopikHelper from "helper/faq/TopikHelper";
const Form = lazy(() => import("./form"));
const FormTopik = lazy(() => import("./form-topik"));


export default function DaftarFaqList(props: MainLayoutProps) {
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
    const formTopik = () => {
        drawerLayout({
            render: (props) => <FormTopik
                title="Daftar Topik"
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
        allowSearching:true,
        allowSearchingOptions:true,
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
                    allowSearching: true,

                },
            },
            {
                dataField: "namaTopik",
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
                    valueExpr: "namaTopik",
                    allowSorting: false,
                    allowSearching: true,

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
                    allowSearching: true,

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
                action={<>
                    <Grid item xs={2.5} className="text-right d-flex justify-content-between">
                        <BgsButton className="hg-40 br-3 min-wt-140 bg-black me-3" onClick={() => formTopik()} actionCode="create"><AddIcon /> Tambah Topik</BgsButton>
                        <BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah FAQ</BgsButton>
                    </Grid>
                </>}
                {...props}

            >
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}