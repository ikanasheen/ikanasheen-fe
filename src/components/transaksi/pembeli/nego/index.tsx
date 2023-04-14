import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import { credential } from "lib";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Form = lazy(() => import("./form"))

export default function TransaksiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);
    const userId = credential.storage.get("user")?.idUser;

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Transaksi Nego"
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
            propReq: "idUserPembeli",
            value: [userId],
            opt: "filter"
        }, {
            propReq: "status",
            value: ['NEGO'],
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
                                    status: ['NEGO'],
                                    idUserPembeli: [userId]
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
                                    status: ['NEGO'],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            {
                dataField: "jumlah",
                caption: "Jumlah (Kg)",
                width: 160,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "jumlah",
                    valueExpr: "jumlah",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['NEGO'],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            {
                dataField: "hargaAwal",
                caption: "Harga Awal (per Kg)",
                width: 230,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "hargaAwal",
                    valueExpr: "hargaAwal",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['NEGO'],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            {
                dataField: "hargaNego",
                caption: "Harga Nego (per Kg)",
                width: 210,
                allowFiltering: {
                    helper: (data) => TransaksiHelper.retrieve(data),
                    displayExpr: "hargaAwal",
                    valueExpr: "hargaAwal",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ['NEGO'],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    }
                },
                allowSorting: true,
            },
            {
                dataField: "opsiPengiriman",
                caption: "Opsi Pengiriman",
                width: 190,
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
                                    status: ["NEGO"],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    }
                }
            },
            {
                dataField: "status",
                caption: "Status",
                width: 130,
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
                        } else {
                            return "Selesai"
                        }
                    },
                    valueExpr: "status",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    status: ["NEGO"],
                                    idUserPembeli: [userId]
                                }
                            }
                        }
                    },
                    allowSorting: false,
                    allowSearching: false
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