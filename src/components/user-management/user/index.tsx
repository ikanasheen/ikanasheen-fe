import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import UserManagementHelper from "helper/user-management/UserManagementHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import Chip from "@mui/material/Chip";

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
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idUser),
        columns: [
            `idUser|caption=ID Pengguna|allowFiltering|width=250`,
            `username|caption=Username|allowFiltering|width=250`,
            {
                dataField: "idRole",
                caption: "Role",
                width: 160,
                allowSorting: true,
                allowFiltering: true,
                template: (data) => {
                    return data.role.namaRole
                },
            },
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                allowSorting: true,
                allowFiltering: true,
                template: (data) => {
                    return <Chip className="chip-default" variant="outlined" color={data.status == "ACTIVE" ? "success" : "error"}
                        label={data.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"} />
                },
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
                <BgsTable ref={tableRef} {...table} />
            </BreadcrumbLayout>
        </div>
    </>
}