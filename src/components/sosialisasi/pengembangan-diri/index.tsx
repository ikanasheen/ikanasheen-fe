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
                title="Daftar Sosialisasi - Pengembangan Diri"
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
            value: 'PENGEMBANGAN_DIRI',
            opt: "filter"
        }],
        onRowClick: ({ rowData }) => form(rowData.idSosialisasi),
        columns: [
            `judul|caption=Judul|allowFiltering|width=160`,
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
                    
                },
                allowSorting: true,
                allowFiltering:true
            },
            `konten|caption=Konten|allowFiltering|width=300`,
            `penulis|allowFiltering|width=160`,
            `tanggalDibuat|dataType=date|allowFiltering|width=180`,
            `tanggalDiubah|caption=Tanggal Disunting|dataType=date|allowFiltering|width=200`,
            
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