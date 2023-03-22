import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Form = lazy(() => import("./form"));

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi yang Diajukan Pembeli"
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
        defaultParameter: [{
            propReq: "status",
            value: ['DIAJUKAN'],
            opt: "filter"
        }],
        
        onRowClick: ({ rowData }) => form(rowData.idTransaksi),
        columns: [
            // `idTransaksi|caption=ID Transaksi|allowFiltering|width=180`,
            {
                dataField: "idTransaksi",
                caption: "ID Transaksi",
                width: 180,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "status",
                    valueExpr: "idTransaksi",
                    parameter: () => {
                        return {
                            filter: {
                                status: ["DIAJUKAN"]
                            }
                        }
                    }
                },
            },
            {
                dataField: "namaIkan",
                caption: "Nama Komoditi",
                width: 180,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "status",
                    valueExpr: "idTransaksi",
                    parameter: () => {
                        return {
                            filter: {
                                status: ["DIAJUKAN"]
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            `tanggalDibutuhkan|caption=Tanggal Dibutuhkan|dataType=date|allowFiltering|width=210`,
            {
                dataField: "opsiPengiriman",
                caption: "Opsi Pengiriman",
                width: 200,
                template: (data) => {
                    if (data.opsiPengiriman == "AMBIL") {
                        return "Ambil Sendiri"
                    } else if (data.opsiPengiriman == "ANTAR"){
                        return "Diantar"
                    } else{
                        return ""
                    }

                },
                allowSorting: true,
                allowFiltering: true
            },{
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
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "status", //no capslock
                    valueExpr: "idTransaksi",
                    parameter: () => {
                        return {
                            filter: {
                                status: ["DIAJUKAN"]
                            }
                        }
                    }
                }
            },
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <CheckCircleIcon className="fs-18" />
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