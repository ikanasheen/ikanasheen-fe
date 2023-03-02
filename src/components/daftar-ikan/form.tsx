import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import {  mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import IkanHelper from "helper/daftar-ikan/IkanHelper";

export default function HargaIkanForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            IkanHelper.createupdate(values, values.idIkan, ({ status }) => {
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
                    `namaIkan|label.text=Nama Ikan|validationRules=required`,
                    `deskripsi|label.text=Deskripsi|editorType=textarea`,                    
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            IkanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
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
                            IkanHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }]
                }}
            >
                <MoreHorizRoundedIcon />
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                <BgsButton className="btn-save" color="info" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}