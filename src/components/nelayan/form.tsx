import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import NelayanHelper from "helper/nelayan/NelayanHelper";
// import StatusConst from "consts/status.const";
import GenderConst from "consts/gender.consts";

export default function NelayanForm({ title, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            NelayanHelper.createupdate(values, values.idNelayan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            isActive: true
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `namaLengkap|label.text=Nama Nelayan|validationRules=maxLength.255`,
                    {
                        dataField: "gender",
                        label: {
                            text: "Jenis Kelamin"
                        },
                        editorOptions: {
                            dataSource: GenderConst,
                            displayExpr: "text",
                            valueExpr: "value"
                        },
                        editorType: "radiobutton",
                    },
                    `tanggalLahir|label.text=Tanggal Lahir`,
                    `kecamatan|label.text=Kecamatan`,
                    `kelurahanDesa|label.text=Kelurahan`,
                    `alamat|label.text=Alamat|editorType=textarea|validationRules=maxLength.255`,
                    `noTelepon|label.text=No Telepon`,
                    `email|label.text=Email`,
                    {
                        dataField: "user.status",
                        label: {
                            text: "Status"
                        },
                        // editorType: "radiobutton",
                        // editorOptions: {
                        //     dataSource: StatusConst,
                        //     displayExpr: "display",
                        //     valueExpr: "value",
                        // },
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            NelayanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                formRef.current?.disabled(true)
                if (status) {
                    if (isArray(data.roles, 0)) data.roles = data.roles[0].code;

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
                        actionType: "modal",
                        onClick: ({ loading, modalRef }) => {
                            loading(true)
                            NelayanHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }]
                }}
            >
                {/* <MoreHorizRoundedIcon /> */}
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                
                {
                    roleId === 3 ||roleId ===4 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
                        : null
                }
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}