import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import NelayanHelper from "helper/nelayan/NelayanHelper";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Form = lazy(() => import("../nelayan/form"));

export default function NelayanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Nelayan"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => NelayanHelper.retrieve(data),
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idNelayan),
        columns: [
            `idNelayan|caption=ID Nelayan|allowFiltering|width=160`,
            `namaLengkap|caption=Nama Lengkap|allowFiltering|className=text-break|width=180`,
            `kecamatan|caption=Kecamatan|allowFiltering|width=200`,
            `kelurahanDesa|caption=Kelurahan|allowFiltering|width=200`,
            `alamat|caption=Alamat|allowFiltering|className=text-break|width=300`,
            `noTelepon|caption=No Telepon|allowFiltering|width=180`,
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                template: ( data ) => {
                return <Chip className="chip-default" variant="outlined" color={data.user.status == "ACTIVE" ? "success" : "error"} 
                label={data.user.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"} />},
                allowSorting: true,
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
                {/* <h2 className="mgl-100">Nelayan</h2> */}
                <BgsTable ref={tableRef} {...table} />

            </BreadcrumbLayout>
        </div>
    </>
}