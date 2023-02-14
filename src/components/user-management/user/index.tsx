import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import Chip from "@mui/material/Chip";
import UserHelper from "helper/UserHelper";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { Children, lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import Image from "components/file/components/image";
import { FileProps } from "models";
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
        helper: (data) => UserHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        showIcon: true,
        allowRefreshing: true,
        allowSearchingOptions: true,
        allowSortingOptions: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.id),
        columns: [
            `fullname|caption=Nama Lengkap|width=250|allowFiltering|icon=user`,
            `email|allowFiltering|width=180|icon=mail`,
            `salesCategory.salesCategoryName|caption=Kategori Sales|allowFiltering|width=190|icon=tree`,
            `phoneNumber|icon=phone|caption=Nomor Telepon|allowFiltering|width=200`,
            `territory.territoryName|caption=Territory|allowFiltering|width=160|icon=tree`,
            {
                dataField: "roles",
                caption: "Role",
                icon: "tree",
                width: 160,
                allowSearching: false,
                allowSorting: false,
                template: ({ roles = [] }) => roles.map(({ description = "" }: any, index: number) => !!description && <Chip key={index} className="chip-default" variant="outlined" color="default" label={description} />)
            },
            {
                dataField: "status",
                width: 120,
                icon: "boolean",
                allowSearching: false,
                template: ({ enabled }) => <Chip className="chip-default" variant="outlined" color={enabled ? "success" : "error"} label={enabled ? "Active" : "Inactive"} />
            },
            {
                icon: "image",
                caption: "Foto",
                width: 140,
                className: "img-container",
                template: ({ photoProfiles = [] }) => Children.toArray(photoProfiles.map((data: FileProps) => <Image {...data} showFull className="br-3" />))
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