import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BantuanHelper from "helper/bantuan/BantuanHelper";
import CardFile from "components/file/components/card-file/card-file";
const Form = lazy(() => import("./form"));

export default function DaftarBantuanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Pengaduan"
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
        onRowClick: ({ rowData }) => form(rowData.idBantuan),
        columns: [
            {
                dataField: "idBantuan",
                caption: "Kode Bantuan",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "jenisBantuan",
                    valueExpr: "jenisBantuan",
                    allowSorting: false,
                    allowSearching: false,
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
                    allowSorting: false,
                    allowSearching: false,
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
                    allowSorting: false,
                    allowSearching: false,
                    
                },
            },
            {
                dataField: "kuota",
                caption: "Kuota",
                width: 180,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => BantuanHelper.retrieve(data),
                    displayExpr: "kuota",
                    valueExpr: "kuota",
                    allowSorting: false,
                    allowSearching: false,
                    
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
                    allowSorting: false,
                    allowSearching: false,
                    
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
                    }, 
                    valueExpr: "statusProposal",
                    allowSorting: false,
                    allowSearching: false,
                }
            },{
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