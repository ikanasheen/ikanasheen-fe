import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import PengaduanHelper from "helper/faq/PengaduanHelper";

export default function HargaIkanForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const userId = credential.storage.get("user")?.idUser;

    mounted(() => {
        if (id) {
            setLoading(true)
            PengaduanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId === 3) formRef.current?.disabled(true)
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
            PengaduanHelper.createupdate(values, values.idPengaduan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            idUserNelayan: userId,
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `email|label.text=Email|validationRules=email`,
                    {
                        dataField: "noTelepon",
                        label: {
                            text: "No Telepon"
                        },
                        validationRules: ["maxLength.15","pattern.phonenumber"],
                        editorOptions:{
                            placeholder: "08...",
                        }
                    },
                    {
                        dataField: "aduan",
                        label: {
                            text: "Pengaduan"
                        },
                        editorType: "textarea",
                        validationRules:["required"]
                    },
                ],
            },
        }
    }

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{ id ? "Detail" : "Ajukan"
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
                            PengaduanHelper.delete(id, ({ status }) => {
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
                    !id ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Ajukan Pengaduan</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}