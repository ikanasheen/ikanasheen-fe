import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import PengaduanHelper from "helper/faq/PengaduanHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { credential } from "lib";
const Form = lazy(() => import("./form"));

export default function DaftarBantuanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);
    const userId = credential.storage.get("user")?.idUser;

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
        helper: (data) => PengaduanHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        temporaryParameter: [{
            propReq: "status",
            value: ['BELUM_TERJAWAB'],
            opt: "filter"
        },{
            propReq: "idUserNelayan",
            value: userId,
            opt: "filter"
        },{
            propReq: "tanggalPengaduan",
            value: "desc",
            opt: "sort"  
        }],
        allowSearching:true,
        allowSearchingOptions:true,
        onRowClick: ({ rowData }) => form(rowData.idPengaduan),
        columns: [
            {
                dataField: "idPengaduan",
                caption: "ID Pengaduan",
                width: 100,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => PengaduanHelper.retrieve(data),
                    displayExpr: "idPengaduan",
                    valueExpr: "idPengaduan",
                    allowSorting: false,
                    allowSearching: true,

                },
            },
            {
                dataField: "aduan",
                caption: "Pengaduan",
                width: 300,
                allowSorting: true,
                allowFiltering: {
                    helper: (data) => PengaduanHelper.retrieve(data),
                    displayExpr: "aduan",
                    valueExpr: "aduan",
                    allowSorting: false,
                    allowSearching: true,

                },
            },
            {
                dataField: "tanggalPengaduan",
                caption: "Tanggal Pengaduan",
                width: 190,
                dataType:"datetime",
                format: "YYYY-MM-DD HH:mm",
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
        <div className="mb-3 ms-3 me-3">
            <BreadcrumbLayout
                action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Ajukan Pengaduan</BgsButton>}
                {...props}
            >
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}