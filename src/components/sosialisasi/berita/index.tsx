import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SosialisasiHelper from "helper/sosialisasi/SosialisasiHelper";
const Form = lazy(() => import("./form"));

export default function SosialisasiList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Sosialisasi - Berita"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => SosialisasiHelper.retrieve(data),
        allowSearching: {
            fullWidth: true
        },
        showIcon: true,
        allowRefreshing: true,
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        temporaryParameter: [{
            propReq: "status",
            value: 'ACTIVE',
            opt: "filter"
        },{
            propReq: "jenisKonten",
            value: 'BERITA',
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idSosialisasi),
        columns: [
            `judul|caption=Judul|width=160`,
            // `jenisKonten|caption=Jenis Konten|width=160`,
            {
                dataField: "jenisKonten",
                caption: "Jenis Konten",
                width: 130,
                template: (data) => {                      
                    if (data.jenisKonten=="BERITA"){
                        return "Berita"
                    }else if (data.jenisKonten=="INFORMASI"){
                        return "Informasi"
                    }else{
                        return "Pengembangan Diri"
                    }
                    
                }
            },
            `konten|caption=Konten|width=300`,
            {
                dataField: "status",
                caption: "Status",
                width: 130,
                template: (data) => {
                    return data.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"
                }
            },
            // `deskripsi|width=160`,
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