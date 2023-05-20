import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProposalHelper from "helper/bantuan/ProposalHelper";
import { credential } from "lib";
import CardFile from "components/file/components/card-file/card-file";
const Form = lazy(() => import("./form"));

export default function DaftarProposalList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);
    const userId = credential.storage.get("user")?.idUser;

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
        helper: (data) => ProposalHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        temporaryParameter: [{
            propReq: "idUserNelayan",
            value: [userId],
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idProposalBantuan),
        columns: [
            {
                dataField: "namaBantuan",
                caption: "Nama Bantuan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => ProposalHelper.retrieve(data),
                    displayExpr: "namaBantuan",
                    valueExpr: "namaBantuan",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    idUserNelayan: [userId]
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
                    helper: (data) => ProposalHelper.retrieve(data),
                    displayExpr: "jenisBantuan",
                    valueExpr: "jenisBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    idUserNelayan: [userId]
                                }
                            }
                        }
                    }
                },
            },
            `tanggalDiajukan|caption=Tanggal Diajukan|width=190|dataType=date|allowFiltering`,
            // `tanggalDisetujui|caption=Tanggal Disetujui|width=190|dataType=date|allowFiltering`,
            // `tanggalDitolak|caption=Tanggal Ditolak|width=190|dataType=date|allowFiltering`,
            {
                dataField: "dokumen",
                caption: "File Proposal",
                width: 230,
                className: "img-container",
                template: (data: any) => <CardFile attachment={data.dokumen}/>
            },
            {
                dataField: "statusProposal",
                caption: "Status",
                width: 160,
                template: (data) => {
                    if (data.statusProposal == "DIAJUKAN") {
                        return "Diajukan"
                    } else if (data.statusProposal == "DISETUJUI") {
                        return "Disetujui"
                    } else if (data.statusProposal == "DITOLAK") {
                        return "Ditolak"
                    } else {
                        return ""
                    }
                },
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => ProposalHelper.retrieve(data),
                    displayExpr: (data: any) => {
                        if (data.statusProposal == "DIAJUKAN") {
                            return "Diajukan"
                        } else if (data.statusProposal == "DISETUJUI") {
                            return "Disetujui"
                        } else if (data.statusProposal == "DITOLAK") {
                            return "Ditolak"
                        } else {
                            return ""
                        }
                    }, 
                    valueExpr: "statusProposal",
                    allowSorting: false,
                    allowSearching: false,
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    idUserNelayan: [userId]
                                }
                            }
                        }
                    },
                }
            },
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