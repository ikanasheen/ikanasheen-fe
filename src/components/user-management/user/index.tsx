import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
// import Chip from "@mui/material/Chip";
import UserManagementHelper from "helper/user-management/UserManagementHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
const Form = lazy(() => import("./form"));

export default function UserManagementUserList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="User"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => UserManagementHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idUser),
        columns: [
            `idUser|caption=ID Pengguna|width=250`,
            `username|caption=Username|width=250`,
            {
                dataField: "idRole",
                caption: "Role",
                width: 160,
                allowSearching: false,
                allowSorting: true,
            },
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                template: (data) => {
                    return data.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"
                },
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

    return <BreadcrumbLayout
        action={<BgsButton className="hg-40 br-3 min-wt-140 bg-black" onClick={() => form()} actionCode="create"><AddIcon /> Tambah Baru</BgsButton>}
        {...props}
    >
        <BgsTable ref={tableRef} {...table} />
    </BreadcrumbLayout>
}