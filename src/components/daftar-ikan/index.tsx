import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IkanHelper from "helper/daftar-ikan/IkanHelper";
const Form = lazy(() => import("./form"));

export default function DaftarIkanList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Daftar Komoditi"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => IkanHelper.retrieve(data),
        // allowSearching: {
        //     fullWidth: true
        // },
        allowFiltering: true,
        showIndexing: {
            sticky: "left"
        },
        onRowClick: ({ rowData }) => form(rowData.idIkan),
        columns: [
            `idIkan|caption=Kode Komoditi|allowFiltering|width=200`,
            `namaIkan|caption=Nama Komoditi|allowFiltering|width=200|className=text-break`,
            `ukuran|caption=Ukuran|allowFiltering|width=180`,
            `hargaDasar|caption=Harga Dasar (Per Kg)|dataType=number|allowFiltering|width=220`,
            `deskripsi|caption=Deskripsi|width=250|allowFiltering|className=text-break`,
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