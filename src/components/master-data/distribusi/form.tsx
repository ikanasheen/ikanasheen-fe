import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DistribusiHelper from "helper/DistribusiHelper";

export default function DistribusiForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            DistribusiHelper.createupdate(values, values.id, ({ status }) => {
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
                    `date|label.text=Tanggal|editorType=date|validationRules=required`,
                    `nama|label.text=Nelayan|validationRules=required`,
                    `tujuan|label.text=Tujuan|validationRules=required`,
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            DistribusiHelper.detail(id, ({ status, data }) => {
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
                            DistribusiHelper.delete(id, ({ status }) => {
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
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Batal</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}