import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import PengaduanHelper from "helper/faq/PengaduanHelper";

export default function PengaduanForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    mounted(() => {
        if (id) {
            setLoading(true)
            PengaduanHelper.detail(id, ({ status, data }) => {
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
            PengaduanHelper.createupdate(values, values.idPengaduan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `idPengaduan|label.text=ID Pengaduan|editorOptions.disabled=true`,
                    `idNelayan|label.text=ID Nelayan|editorOptions.disabled=true`,
                    `nelayan.namaLengkap|label.text=Nama Nelayan|editorOptions.disabled=true`,
                    // {
                    //     dataField: "nelayan.namaLengkap",
                    //     label: {
                    //         text: "Nama Nelayan",
                    //     },
                    //     editorOptions: {
                    //         helper: data => NelayanHelper.retrieve(data),
                    //         displayExpr: "namaLengkap",
                    //         valueExpr: "idNelayan",
                    //     }
                    // },
                    `email|label.text=Email|editorOptions.disabled=true`,
                    `noTelepon|label.text=No. Telepon|editorOptions.disabled=true`,
                    {
                        dataField: "aduan",
                        label: {
                            text: "Pengaduan"
                        },
                        editorType: "textarea",
                        editorOptions:{
                            disabled:true
                        }
                    },
                ],
            },
        }
    }



    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{ id ? "Ubah" : "Tambah"
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
                    roleId === 1 && id ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Balas</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}