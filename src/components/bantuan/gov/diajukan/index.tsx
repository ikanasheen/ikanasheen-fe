import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProposalHelper from "helper/bantuan/ProposalHelper";
import CardFile from "components/file/components/card-file/card-file";
const Form = lazy(() => import("./form"));

export default function DaftarProposalList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Proposal Diajukan"
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
            propReq: "statusProposal",
            value: ['DIAJUKAN'],
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idProposalBantuan),
        columns: [
            {
                dataField: "namaNelayan",
                caption: "Nama Nelayan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => ProposalHelper.retrieve(data),
                    displayExpr: "namaNelayan",
                    valueExpr: "namaNelayan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusProposal: ['DIAJUKAN']
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
                    helper: (data) => ProposalHelper.retrieve(data),
                    displayExpr: "namaBantuan",
                    valueExpr: "namaBantuan",
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusProposal: ['DIAJUKAN']
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
                                    statusProposal: ['DIAJUKAN']
                                }
                            }
                        }
                    }
                },
            },
            `tanggalDiajukan|caption=Tanggal Diajukan|width=190|dataType=date|allowFiltering`,
            {
                dataField: "dokumen",
                caption: "File Proposal",
                width: 230,
                className: "img-container",
                template: (data: any) => <CardFile attachment={data.dokumen} />
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
                    parameter: () => {
                        return {
                            parameter: {
                                filter: {
                                    statusProposal: ['DIAJUKAN']
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