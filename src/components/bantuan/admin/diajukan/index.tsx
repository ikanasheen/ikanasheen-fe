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
        onRowClick: ({ rowData }) => form(rowData.idProposalBantuan),
        columns: [
            `idNelayan|caption=ID Nelayan|allowFiltering|width=180`,
            `namaNelayan|caption=Nama Nelayan|allowFiltering|width=180`,
            `namaBantuan|caption=Nama Bantuan|allowFiltering|width=180`,
            `jenisBantuan|caption=Jenis Bantuan|allowFiltering|width=180`,
            `tanggalDiajukan|caption=Tanggal Diajukan|width=190|dataType=date|allowFiltering`,
            // `tanggalDisetujui|caption=Tanggal Disetujui|width=190|dataType=datetime|allowFiltering`,
            // `tanggalDitolak|caption=Tanggal Ditolak|width=190|dataType=date|allowFiltering`,
            
            {
                dataField: "dokumen",
                caption: "Format Proposal",
                width: 190,
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
                allowFiltering: true
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