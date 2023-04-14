import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import { credential } from "lib";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Form = lazy(() => import("./form"));

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);
    const userId = credential.storage.get("user")?.idUser;

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi Selesai"
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
            propReq: "idUserNelayan",
            value: [userId],
            opt: "filter"
        },{
            propReq: "status",
            value: ['SELESAI'],
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
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['SELESAI'],
                                    idUserNelayan: [userId]
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
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['SELESAI'],
                                    idUserNelayan: [userId]
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            `tanggalSelesai|caption=Tanggal Selesai|dataType=date|allowFiltering|width=200`,
            {
                dataField: "opsiPengiriman",
                caption: "Opsi Pengiriman",
                width: 200,
                template: (data) => {
                    if (data.opsiPengiriman == "AMBIL") {
                        return "Ambil Sendiri"
                    } else if (data.opsiPengiriman == "ANTAR") {
                        return "Dikirim"
                    } else {
                        return ""
                    }
                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.opsiPengiriman == "AMBIL") {
                            return "Ambil Sendiri"
                        } else if (data.opsiPengiriman == "ANTAR") {
                            return "Dikirim"
                        } else {
                            return ""
                        }
                    }, 
                    valueExpr: "opsiPengiriman",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status:  ['SELESAI'],
                                    idUserNelayan: [userId]
                                }
                            }
                        }
                    },
                }
            },
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
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['SELESAI'],
                                    idUserNelayan: [userId]
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