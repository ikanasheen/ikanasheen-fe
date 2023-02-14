import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { Children, lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import SalesAgentHelper from "helper/SalesAgentHelper";
import Image from "components/file/components/image";
import { FileProps } from "models";
const Form = lazy(() => import("./form"));

export default function SalesProfileList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Profile Sales"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => SalesAgentHelper.retrieve(data),
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
            `salesName|caption=Nama Sales|allowFiltering|width=160|icon=user`,
            `salesCategory.salesCategoryName|caption=Kategori Sales|allowFiltering|width=160|icon=tree`,
            `phoneNumber|icon=phone|caption=Nomor Telepon|allowFiltering|width=160`,
            `email|caption=Email|allowFiltering|width=160|icon=mail`,
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