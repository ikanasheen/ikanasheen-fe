import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import BantuanHelper from "helper/bantuan/BantuanHelper";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardFile from "components/file/components/card-file/card-file";
const Form = lazy(() => import("../diajukan/form-bantuan"));

export default function DaftarBantuanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Bantuan Tersedia"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => BantuanHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        temporaryParameter: [{
            propReq: "statusBantuan",
            value: ['ACTIVE','UNAVAILABLE'],
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idBantuan),
        columns: [
            {
                dataField: "idBantuan",
                caption: "Kode Bantuan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "idBantuan",
                    valueExpr: "idBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusBantuan: ['ACTIVE','UNAVAILABLE']
                                }
                            }
                        }
                    }
                },
            },
            {
                dataField: "namaBantuan",
                caption: "Nama Bantuan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "namaBantuan",
                    valueExpr: "namaBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusBantuan: ['ACTIVE','UNAVAILABLE']
                                }
                            }
                        }
                    }
                },
            },
            {
                dataField: "jenisBantuan",
                caption: "Jenis Bantuan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "jenisBantuan",
                    valueExpr: "jenisBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusBantuan: ['ACTIVE','UNAVAILABLE']
                                }
                            }
                        }
                    }
                },
            },
            
            {
                dataField: "kuotaTersisa",
                caption: "Kuota Tersisa",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "kuotaTersisa",
                    valueExpr: "kuotaTersisa",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusBantuan: ['ACTIVE','UNAVAILABLE']
                                }
                            }
                        }
                    }
                },
            },
            {
                dataField: "dokumen",
                caption: "Format Proposal",
                width: 230,
                className: "img-container",
                template: (data: any) => <CardFile attachment={data.dokumen}/>
            },
            {
                dataField: "statusBantuan",
                caption: "Status",
                width: 160,
                template: (data) => {
                    if (data.statusBantuan == "ACTIVE") {
                        return "Aktif"
                    } else if (data.statusBantuan == "INACTIVE") {
                        return "Tidak Aktif"
                    } else {
                        return "Kuota Habis"
                    }

                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.statusBantuan == "ACTIVE") {
                            return "Aktif"
                        } else if (data.statusBantuan == "INACTIVE") {
                            return "Tidak Aktif"
                        } else {
                            return "Kuota Habis"
                        }
                    }, //no capslock
                    valueExpr: "statusBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusBantuan: ['ACTIVE','UNAVAILABLE']
                                }
                            }
                        }
                    },
                }
            },{
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <AddCircleIcon className="fs-18" />

            }
        ],
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