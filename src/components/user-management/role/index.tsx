import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import RoleHelper from "helper/RoleHelper";
import Chip from "@mui/material/Chip";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
const Form = lazy(() => import("./form"));
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function UserManagementRoleList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Role"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }
    
    const table: TableModel = {
        helper: data => RoleHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        allowRefreshing: true,
        allowSearchingOptions: true,
        allowSortingOptions: true,
        allowSelection: {
            sticky: "left"
        },
        showIndexing: {
            sticky: "left"
        },
        keyData: "code",
        onRowClick: ({ rowData }) => form(rowData.code),
        columns: [
            `code|allowFiltering|width=130|icon=key`,
            `description|allowFiltering|width=230`,
            {
                dataField: "status",
                caption: "Status",
                icon: "boolean",
                width: 100,
                allowSearching: false,
                template: ({ status = false }) => <Chip className="chip-default" variant="outlined" color={status ? "success" : "error"} label={status ? "Active" : "Inactive"} />
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
        <BgsTable {...table} />
    </BreadcrumbLayout>
}