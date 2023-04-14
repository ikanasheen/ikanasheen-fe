import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Form = lazy(() => import("./form"))

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi Sudah Diproses"
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
            value: ['DIPROSES','DIBATALKAN','NEGO','SELESAI','SIAP_DIAMBIL','DIKIRIM'],
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idTransaksi),
        columns: [
            {
                dataField: "idTransaksi",
                caption: "ID Transaksi",
                width: 180,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "idTransaksi",
                    valueExpr: "idTransaksi",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['DIPROSES','DIBATALKAN','NEGO','SELESAI','SIAP_DIAMBIL','DIKIRIM']
                                }
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
                    displayExpr: "namaIkan",
                    valueExpr: "namaIkan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['DIPROSES','DIBATALKAN','NEGO','SELESAI','SIAP_DIAMBIL','DIKIRIM']
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            `tanggalDibutuhkan|caption=Tanggal Dibutuhkan|dataType=date|allowFiltering|width=200`,
            `tanggalDiproses|caption=Tanggal Diproses|dataType=date|allowFiltering|width=200`,
            `tanggalSelesai|caption=Tanggal Selesai|dataType=date|allowFiltering|width=200`,
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
                    }else if (data.status == "DIKIRIM") {
                        return "Sedang Dikirim"
                    }else {
                        return "Selesai"
                    }

                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: (data: any) => {
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
                    valueExpr: "status",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['DIPROSES','DIBATALKAN','NEGO','SELESAI','SIAP_DIAMBIL','DIKIRIM']
                                }
                            }
                        }
                    }
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
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}