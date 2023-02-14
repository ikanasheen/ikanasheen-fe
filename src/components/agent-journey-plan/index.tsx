import AddIcon from "@mui/icons-material/Add";
import { BgsButton, TableModel, BgsTable, TableRef/**, bgsMenu */ } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BreadcrumbLayout from "shared/layout/breadcrumb-layout";
import { lazy, useRef } from "react";
import { drawerLayout } from "shared/layout/drawer-layout";
import VisitHelper from "helper/VisitHelper";
import moment from "moment";
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Chip from "@mui/material/Chip";
// import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const Form = lazy(() => import("./form"));

export default function AgentJourneyList(props: MainLayoutProps) {
    const tableRef = useRef<TableRef>(null);

    const form = (id?: string) => {
        drawerLayout({
            render: (props) => <Form
                title="Rencana Kunjugan Sales"
                id={id}
                {...props}
            />,
            onSuccess: () => tableRef.current?.refresh()
        })
    }

    const table: TableModel = {
        helper: (data) => VisitHelper.retrieve(data),
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
                dataField: "visitId",
                caption: "Nomor Kunjungan",
                width: 220,
                icon: "key",
                allowFiltering: true,
                template: ({ visitId }) => <Chip className="chip-default" variant="outlined" label={visitId} />
            },
            `subjectName|caption=Subjek|allowFiltering|width=150`,
            `salesAgent.salesName|caption=Sales Agent|allowFiltering|width=180|icon=tree`,
            `salesAgent.salesCategory.salesCategoryName|caption=Sales Kategori|allowFiltering|width=200|icon=tree`,
            `partner.partnerName|caption=Partner|allowFiltering|width=150|icon=tree`,
            `partner.city.cityName|caption=Kota|allowFiltering|width=150|icon=tree`,
            `status|caption=Status|allowFiltering|width=150`,
            {
                dataField: "datePlanIn",
                caption: "Waktu Rencana Awal",
                icon: "date",
                allowFiltering: true,
                allowSearching: false,
                allowSorting: true,
                dataType: "date",
                width: 240,
                template: (data) => <>
                    {moment(data.datePlanIn).format("DD MMM YYYY")} {data.timePlanIn}
                </>
            },
            `checkin|dataType=time|icon=time|allowSearching=false|format=HH:mm|width=150`,
            {
                dataField: "datePlanOut",
                caption: "Waktu Rencana Akhir",
                icon: "date",
                allowFiltering: true,
                allowSearching: false,
                allowSorting: true,
                dataType: "date",
                width: 240,
                template: (data) => <>{moment(data.datePlanOut).format("DD MMM YYYY")} {data.timePlanOut}</>
            },
            `checkout|dataType=time|icon=time|allowSearching=false|format=HH:mm|width=150`,
            {
                sticky: "right",
                icon: false,
                width: 60,
                template: () => <ArrowForwardIcon className="fs-18" />,
                actionCode: "update",
                // onClick: ({ rowData, event }) => {
                //     const menuRef = bgsMenu({
                //         anchorEl: event.currentTarget,
                //         width: 120,
                //         className: "pt-2 pb-2",
                //         items: [{
                //             prefix: () => <BorderColorRoundedIcon fontSize="small" />,
                //             onClick: () => (menuRef.hide(), form(rowData.id)),
                //             actionCode: "update",
                //             text: "Edit"
                //         }, {
                //             actionCode: "delete",
                //             prefix: () => <DeleteOutlineRoundedIcon color="error" fontSize="small" />,
                //             text: "Delete",
                //             className: "text-danger",
                //             actionType: "modal",
                //             onClick: ({ loading, modalRef }) => {
                //                 menuRef.hide()
                //                 loading(true)
                //                 VisitHelper.delete(rowData.id, ({ status }) => {
                //                     loading(false)
                //                     status && (modalRef.hide(), tableRef.current?.refresh())
                //                 })
                //             }
                //         }]
                //     })
                // }
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