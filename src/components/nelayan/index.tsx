import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import NelayanHelper from "helper/nelayan/NelayanHelper";
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
        allowSearching: {
            fullWidth: true
        },
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        // onRowClick: ({ rowData }) => form(rowData.idNelayan),
        columns: [
            `idNelayan|caption=ID|width=160`,
            `namaLengkap|caption=Nama Lengkap|width=250`,
            {
                dataField: "gender",
                caption: "Jenis Kelamin",
                width: 180,
                template: (data) => {
                    return data.gender == "PEREMPUAN" ? "Perempuan" : "Laki-laki"
                },
                allowSorting: true,
            },
            `tanggalLahir|caption=Tanggal Lahir|dataType=date|width=180`,
            `kecamatan|caption=Kecamatan|width=200`,
            `kelurahanDesa|caption=Kelurahan|width=200`,
            `alamat|caption=Alamat|width=300`,
            `noTelepon|caption=No Telepon|width=180`,
            `email|caption=Email|width=180`,
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                template: (data) => {
                    return data.user.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"
                },
                allowSorting: true,
            },
        ]
    }

    return <BreadcrumbLayout
        action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
        {...props}
    >
        <BgsTable ref={tableRef} {...table} />
    </BreadcrumbLayout>
}