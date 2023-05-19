import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SosialisasiHelper from "helper/sosialisasi/SosialisasiHelper";
import Chip from "@mui/material/Chip";
const Form = lazy(() => import("./form"));

export default function SosialisasiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Sosialisasi"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => SosialisasiHelper.retrieve(data),
        allowFiltering: true,
        allowSorting: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idSosialisasi),
        columns: [
            {
                dataField: "judul",
                caption: "Judul",
                width: 160,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => SosialisasiHelper.retrieve(data),
                    displayExpr: "judul",
                    valueExpr: "judul",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "jenisKonten",
                caption: "Jenis Konten",
                width: 160,
                template: (data) => {
                    if (data.jenisKonten == "BERITA") {
                        return "Berita"
                    } else if (data.jenisKonten == "INFORMASI") {
                        return "Informasi"
                    } else {
                        return "Pengembangan Diri"
                    }

                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => SosialisasiHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.jenisKonten == "BERITA") {
                            return "Berita"
                        } else if (data.jenisKonten == "INFORMASI") {
                            return "Informasi"
                        } else {
                            return "Pengembangan Diri"
                        }
                    },
                    valueExpr: "status",
                    allowSorting: false,
                    allowSearching: false
                }
            },
            {
                dataField: "konten",
                caption: "Konten",
                width: 300,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => SosialisasiHelper.retrieve(data),
                    displayExpr: "konten",
                    valueExpr: "konten",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "penulis",
                caption: "Penulis",
                width: 160,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => SosialisasiHelper.retrieve(data),
                    displayExpr: "penulis",
                    valueExpr: "penulis",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            `tanggalDibuat|dataType=date|allowFiltering|width=180`,
            `tanggalDiubah|caption=Tanggal Disunting|dataType=date|allowFiltering|width=200`,
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => SosialisasiHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.status == "ACTIVE") {
                            return "Aktif"
                        } else {
                            return "Tidak Aktif"
                        }
                    },
                    valueExpr: "status",
                    allowSorting: false,
                    allowSearching: false
                },
                template: (data) => {
                    return <Chip className="chip-default" variant="outlined" color={data.status == "ACTIVE" ? "success" : "error"}
                        label={data.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"} />
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