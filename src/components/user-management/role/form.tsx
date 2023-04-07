import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton, } from "@andrydharmawan/bgs-component";
import RoleHelper from "helper/RoleHelper";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";

export default function UserManagementMenuForm({ title, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [idRole, setIdRole] = useState();

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values, { loading }) => {
            loading(true)
            RoleHelper.createupdate(values, id, ({ status }) => {
                loading(false)
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "idRole"
                    },
                    `namaRole`,
                    `deskripsi|editorType=textarea`
                ]
            }
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            RoleHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (idRole == 1) formRef.current?.disabled(true)
                if (status) {
                    setIdRole(data.idRole)
                    formRef.current?.updateData(data);
                    
                }
            })
        }
    })

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{id ? "Detail" : "Tambah"} <b>{title}</b></>}
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
                        onClick: ({ loading }) => {
                            loading(true)
                            RoleHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && onSuccess()
                            })
                        }
                    }]
                }}
            >
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {idRole !== 1 ? <BgsButton className="btn-save" loading={loading} visibleLoading type="submit">Simpan {id && " Perubahan"}</BgsButton> :null}
                
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}