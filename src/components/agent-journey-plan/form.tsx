import { lazy, useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { drawerLayout, DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import VisitHelper from "helper/VisitHelper";
import SalesAgentHelper from "helper/SalesAgentHelper";
import PartnerHelper from "helper/PartnerHelper";
// import Image from "components/file/components/image";
// import { FileProps } from "models";
const Detail = lazy(() => import("./detail"));

export default function AgentJourneyPlanForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const actionCode = id ? "update" : "create";

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        actionCode,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            VisitHelper.createupdate(values, values.id, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            visitId: ""
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    !!id ? "visitId|label.text=Nomor Kunjungan|label.icon=key|editorOptions.disabled=true" : null,
                    {
                        dataField: "salesAgent.id",
                        editorType: "select",
                        label: {
                            text: "Sales Agent",
                            icon: "tree"
                        },
                        editorOptions: {
                            allowClear: true,
                            mode: "popup",
                            helper: (data) => SalesAgentHelper.retrieve(data),
                            displayExpr: "salesName",
                            valueExpr: "id",
                            modalOptions: {
                                width: "85%"
                            },
                            tableOptions: {
                                showIndexing: true,
                                allowSearching: {
                                    fullWidth: true
                                },
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
                                        // template: ({ photoProfiles = [] }) => Children.toArray(photoProfiles.map((data: FileProps) => <Image {...data} showFull className="br-3" />))
                                    },
                                ]
                            },
                        },
                        validationRules: ["required"]
                    },
                    `subjectName|label.text=Subjek|validationRules=required`,
                    {
                        itemType: "group",
                        colCount: 3,
                        items: [
                            `datePlanIn|colSpan=2|label.text=Tanggal Rencana Awal|editorType=date|validationRules`,
                            `timePlanIn|label.text=Waktu Mulai|editorType=date|editorOptions.mode=time|validationRules`,
                        ]
                    },
                    {
                        itemType: "group",
                        colCount: 3,
                        items: [
                            `datePlanOut|colSpan=2|label.text=Tanggal Rencana Akhir|editorType=date|validationRules`,
                            `timePlanOut|label.text=Waktu Akhir|editorType=date|editorOptions.mode=time|validationRules`,
                        ]
                    },
                    {
                        dataField: "partner.id",
                        editorType: "select",
                        label: {
                            text: "Partner",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: data => PartnerHelper.retrieve(data),
                            displayExpr: "partnerName",
                            valueExpr: "partnerId",
                            search: "partnerName",
                            parameter: () => {
                                const { territory } = credential.storage.get("user") || {}

                                return {
                                    ...territory?.id && {
                                        filter: {
                                            "city.territory.id": territory.id
                                        }
                                    }
                                }
                            }
                        },
                        validationRules: ["required"]
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            VisitHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    const detail = () => {
        drawerLayout({
            render: (props) => <Detail
                title="Detail Rencana Kunjugan Sales"
                id={id}
                {...props}
            />
        })
    }

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{id ? "Ubah" : "Tambah"} <b>{title}</b></>}
            action={<>{id && <BgsButton
                actionType="menu"
                variant="icon"
                menuOptions={{
                    className: "br-3",
                    items: [{
                        actionCode: "delete",
                        className: "text-danger",
                        prefix: () => <i className="ri-delete-bin-line me-2"></i>,
                        text: "Delete",
                        actionType: "modal",
                        onClick: ({ loading, modalRef }) => {
                            loading(true)
                            VisitHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }, {
                        actionCode: "detail-----",
                        prefix: () => <i className="ri-information-line me-2"></i>,
                        text: "Detail",
                        onClick: detail
                    }]
                }}
            >
                <MoreHorizRoundedIcon />
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Batal</BgsButton>
                <BgsButton className="btn-save" actionCode={actionCode} loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}