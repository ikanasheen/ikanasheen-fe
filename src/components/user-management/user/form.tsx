import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import {  mounted } from "lib";
import UserManagementHelper from "helper/user-management/UserManagementHelper";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import StatusConst from "consts/status.const";

export default function UserManagementUserForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // const idRole = useState<string>("");
    const [idRole, setIdRole] = useState();

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            UserManagementHelper.createupdate(values, values.idUser, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "idUser",
                        editorOptions: {
                            disabled: true
                        },
                        label: {
                            text: "ID Pengguna"
                        },
                    },
                    {
                        dataField: "status",
                        label: {
                            text: "Status"
                        },
                        editorType: "select",
                        editorOptions: {
                            dataSource: StatusConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    },
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            UserManagementHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
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
                        onClick: ({ loading }) => {
                            loading(true)
                            UserManagementHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && onSuccess()
                            })
                        }
                    }]
                }}
            >
                {/* <MoreHorizRoundedIcon /> */}
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