import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import NelayanHelper from "helper/nelayan/NelayanHelper";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Form = lazy(() => import("../nelayan/form"));

export default function NelayanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Nelayan"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => NelayanHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idNelayan),
        columns: [
            {
                dataField: "idNelayan",
                caption: "ID Nelayan",
                width: 160,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "idNelayan",
                    valueExpr: "idNelayan",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "namaLengkap",
                caption: "Nama Lengkap",
                className: "text-break",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "namaLengkap",
                    valueExpr: "namaLengkap",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "kecamatan",
                caption: "Kecamatan",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "kecamatan",
                    valueExpr: "kecamatan",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "kelurahanDesa",
                caption: "Kelurahan",
                width: 200,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "kelurahanDesa",
                    valueExpr: "kelurahanDesa",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "alamat",
                caption: "Alamat",
                className: "text-break",
                width: 300,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "alamat",
                    valueExpr: "alamat",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "noTelepon",
                caption: "No Telepon",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: "noTelepon",
                    valueExpr: "noTelepon",
                    allowSorting: false,
                    allowSearching: false
                },
            },
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                template: (data) => {
                    return <Chip className="chip-default" variant="outlined" color={data.user.status == "ACTIVE" ? "success" : "error"}
                        label={data.user.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"} />
                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => NelayanHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.user.status == "ACTIVE") {
                            return "Aktif"
                        } else {
                            return "Tidak Aktif"
                        }
                    },
                    valueExpr: "status",
                    allowSorting: false,
                    allowSearching: false
                }
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
                {/* <h2 className="mgl-100">Nelayan</h2> */}
                <BgsTable ref={tableRef} {...table} />

            </BreadcrumbLayout>
        </div>
    </>
}