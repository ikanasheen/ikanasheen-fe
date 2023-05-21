import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import FaqHelper from "helper/faq/FaqHelper";
import StatusProposalConst from "consts/statusProposal.const";

export default function FaqForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    mounted(() => {
        if (id) {
            setLoading(true)
            FaqHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId === 2) formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            FaqHelper.createupdate(values, values.idFaq, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "topik",
                        label: {
                            text: "Topik"
                        },
                        editorType: "select",
                        editorOptions: {
                            dataSource: StatusProposalConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    },
                    `pertanyaan|label.text=Pertanyaan`,
                    `jawaban|label.text=Jawaban|editorType=textarea|editorOptions.rows=5`,
                ]
            },
        }
    }


    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{
                roleId == 2 && id ? "Detail"
                    : "Tambah"
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
                            FaqHelper.delete(id, ({ status }) => {
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
                    roleId === 1 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}