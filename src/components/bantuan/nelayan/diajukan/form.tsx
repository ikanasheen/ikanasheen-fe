import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import ProposalHelper from "helper/bantuan/ProposalHelper";
import StatusProposalConst from "consts/statusProposal.const";

export default function ProposalForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const userId = credential.storage.get("user")?.idUser;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            ProposalHelper.createupdate(values, values.idProposalBantuan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData:{
            idNelayan : userId
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `jenisBantuan|label.text=Jenis Bantuan`,
                    `namaBantuan|label.text=Nama Bantuan`,
                    id?{
                        dataField: "tanggalDiajukan",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                    }:null,
                    id?{
                        dataField: "tanggalDisetujui",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                    }:null,
                    id?{
                        dataField: "tanggalDitolak",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                    }:null,
                    id? {
                        dataField: "statusProposal",
                        label: {
                            text: "Status"
                        },
                        editorType: "select",
                        editorOptions: {
                            dataSource: StatusProposalConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    }:null,
                    `file|label.text=File`,
                    // {
                    //     dataField: "photoProfiles",
                    //     label: {
                    //         text: "Foto"
                    //     },
                    //     editorOptions: {
                    //         maxFile: 1,
                    //         accept: ".jpg, .jpeg, .png",
                    //         maxSize: 2,
                    //         helper: (data) => FileHelper.upload(data),
                    //         beforeUpload: () => {
                    //             return {
                    //                 serviceName: ServiceNameUploadConst.SALES_AGENT
                    //             }
                    //         },
                    //         iconUpload: (data) => <Image showFull {...data} size="lg" />,
                    //         iconRemoveUpload: () => <i className="ri-delete-bin-line fs-16 mgl-2 mgr-2"></i>
                    //     },
                    //     editorType: "upload",
                    //     validationRules: ["required"]
                    // },
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            ProposalHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (id) formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{roleId == 3 ?
                id ? "Ubah" : "Tambah"
                : "Detail"
            } <b>{title}</b></>}
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
                            ProposalHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }]
                }}
            >
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {
                    roleId !== 3 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Ajukan</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}