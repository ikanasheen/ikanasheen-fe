import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import HargaIkanHelper from "helper/harga-ikan/HargaIkanHelper";

export default function HargaIkanForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            HargaIkanHelper.createupdate(values, values.id, ({ status }) => {
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
                    `nama|label.text=Nama Ikan|validationRules=required`,
                    `harga|label.text=Harga di Aru Selatan|editorType=number`,
                    `harga|label.text=Harga di Aru Selatan Timur|editorType=number`,
                    `harga|label.text=Harga di Aru Selatan Utara|editorType=number`,
                    `harga|label.text=Harga di Aru Tengah|editorType=number`,
                    `harga|label.text=Harga di Aru Tengah Timur|editorType=number`,
                    `harga|label.text=Harga di Aru Tengah Selatan|editorType=number`,
                    `harga|label.text=Harga di Pulau-Pulau Aru|editorType=number`,
                    `harga|label.text=Harga di Aru Utara|editorType=number`,
                    `harga|label.text=Harga di Aru Utara Timur Batu Ley|editorType=number`,
                    `harga|label.text=Harga di Sir-Sir|editorType=number`,
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            HargaIkanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
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
                            HargaIkanHelper.delete(id, ({ status }) => {
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