import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import RoleHelper from "helper/RoleHelper";
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
        showIndexing: {
            sticky: "left"
        },
        keyData: "code",
        onRowClick: ({ rowData }) => form(rowData.idRole),
        columns: [
            {
                dataField: "idRole",
                caption: "ID Role",
                width: 130,
                allowFiltering: {
                    helper: (data) => RoleHelper.retrieve(data),
                    displayExpr: "idRole",
                    valueExpr: "idRole",
                    allowSorting: false,
                    allowSearching: false
                },
                allowSorting: true,
            },
            {
                dataField: "namaRole",
                caption: "Nama Role",
                width: 200,
                allowFiltering: {
                    helper: (data) => RoleHelper.retrieve(data),
                    displayExpr: "namaRole",
                    valueExpr: "namaRole",
                    allowSorting: false,
                    allowSearching: false
                },
                allowSorting: true,
            },
            {
                dataField: "deskripsi",
                caption: "Deskripsi",
                width: 200,
                allowFiltering: {
                    helper: (data) => RoleHelper.retrieve(data),
                    displayExpr: "deskripsi",
                    valueExpr: "deskripsi",
                    allowSorting: false,
                    allowSearching: false
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