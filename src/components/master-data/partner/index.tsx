import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { Children, lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import PartnerHelper from "helper/PartnerHelper";
import Image from "components/file/components/image";
import { FileProps } from "models";
import Chip from "@mui/material/Chip";
const Form = lazy(() => import("./form"));

export default function PartnerList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Partner"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => PartnerHelper.retrieve(data),
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
            {
                dataField: "partnerId",
                caption: "Partner ID",
                width: 160,
                icon: "key",
                allowFiltering: true,
                template: ({ partnerId }) => <Chip className="chip-default" variant="outlined" label={partnerId} />
            },
            `outletType|caption=Tipe Outlet|allowFiltering|width=175|icon=list`,
            `partnerName|caption=Nama|allowFiltering|width=200`,
            `partnerTier|caption=Tier|allowFiltering|width=140|icon=list`,
            `partnerAddress|caption=Alamat|allowFiltering|width=200`,
            {
                icon: "image",
                caption: "Foto",
                width: 140,
                className: "img-container",
                template: ({ partnerPhotos = [] }) => Children.toArray(partnerPhotos.map((data: FileProps) => <Image {...data} showFull className="br-3" />))
            },
            `partnerCategory|caption=Kategori|allowFiltering|width=180|icon=list`,
            `partnerEmail|caption=Email|allowFiltering|width=180|icon=mail`,
            `partnerPhoneNumber|icon=phone|caption=Nomor Telepon|allowFiltering|width=200`,
            `city.cityName|caption=Kota|allowFiltering|width=200|icon=tree`,
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