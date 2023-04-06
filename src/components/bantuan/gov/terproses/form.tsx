import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import ProposalHelper from "helper/bantuan/ProposalHelper";
import StatusProposalConst from "consts/statusProposal.const";

export default function ProposalForm({ id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const [namaBantuan, setNamaBantuan] = useState();
    const [statusProposal, setStatusProposal] = useState();

    mounted(() => {
        if (id) {
            setLoading(true)
            ProposalHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId !== 1) formRef.current?.disabled(true)
                if (status) {
                    setNamaBantuan(data.namaBantuan)
                    setStatusProposal(data.statusProposal)
                    formRef.current?.updateData(data);
                }
                if (data.statusProposal === "DISETUJUI") formRef.current?.itemOption("tanggalDisetujui").option("visible", true);
                if (data.statusProposal === "DITOLAK") formRef.current?.itemOption("tanggalDitolak").option("visible", true);

            })
        }
    })
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
        item: {
            main: {
                spacing: 3,
                items: [
                    `idNelayan|label.text=ID Nelayan`,
                    `namaNelayan|label.text=Nama Nelayan`,
                    `jenisBantuan|label.text=Jenis Bantuan`,
                    `namaBantuan|label.text=Nama Bantuan`,
                    {
                        dataField: "tanggalDiajukan",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                    },
                    {
                        dataField: "tanggalDisetujui",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                        visible: false
                    },
                    {
                        dataField: "tanggalDitolak",
                        editorType: "date",
                        editorOptions: {
                            mode: "datetime",
                            format: {
                                value: "YYYY-MM-DDTHH:MM:SS"
                            }
                        },
                        visible: false
                    },                    
                    {
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
                    },
                ]
            },
        }
    }


    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{roleId == 2 ?
                id ? "Approval" : "Tambah"
                : "Detail"
            } <b>Bantuan {namaBantuan}</b></>}
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
                    roleId === 2  && statusProposal === "DIAJUKAN"? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">{id && " Approve"}</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}