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

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        // onSubmit: (values) => {
        //     setLoading(true);
        //     ProposalHelper.createupdate(values, values.idProposalBantuan, ({ status }) => {
        //         setLoading(false);
        //         if (status) onSuccess();
        //     })
        // },
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
                    `catatan|label.text=Catatan|editorOptions.disabled=false`,
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            ProposalHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                // if (roleId !== 1) formRef.current?.disabled(true)
                if (status) {
                    setNamaBantuan(data.namaBantuan)
                    formRef.current?.itemOption("statusProposal").option("editorOptions.disabled", true);
                    formRef.current?.itemOption("tanggalDiajukan").option("editorOptions.disabled", true);
                    formRef.current?.itemOption("namaBantuan").option("editorOptions.disabled", true);
                    formRef.current?.itemOption("jenisBantuan").option("editorOptions.disabled", true);
                    formRef.current?.itemOption("namaNelayan").option("editorOptions.disabled", true);
                    formRef.current?.itemOption("idNelayan").option("editorOptions.disabled", true);
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    const approveProposal = ({ loading }: { loading: Function }) => {
        loading(true);
        const data = {
            catatan: formRef.current?.getData("catatan"),
            isApprove: "Ya",
            idProposalBantuan: id
        };
        if (data) {
            loading(true)
            ProposalHelper.approve(data, ({ status }) => {
                if (status) {
                    onSuccess();
                }
            })
        }
        console.log(data, "dataas")
    }
    const rejectProposal = ({ loading }: { loading: Function }) => {
        loading(true);
        const data = {
            catatan: formRef.current?.getData("catatan"),
            isApprove: "Tidak",
            idProposalBantuan: id
        };
        if (data) {
            loading(true)
            ProposalHelper.reject(data, ({ status }) => {
                if (status) {
                    onSuccess();
                }
            })
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
                <BgsButton className="btn-batalkan" loading={loading} visibleLoading={false}
                    modalOptions={{
                        message: "Apakah Anda yakin untuk menolak proposal ini?",
                        width: 350
                    }} onClick={e => rejectProposal(e)} >Tolak</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading={false}
                    modalOptions={{
                        message: "Apakah Anda yakin untuk menyetujui proposal ini?",
                        width: 350
                    }} onClick={e => approveProposal(e)} >Setujui</BgsButton>

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}