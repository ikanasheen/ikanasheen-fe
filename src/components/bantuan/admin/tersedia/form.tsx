import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import BantuanHelper from "helper/bantuan/BantuanHelper";
import StatusBantuanConst from "consts/statusBantuan.const";

export default function HargaIkanForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            BantuanHelper.createupdate(values, values.idBantuan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            statusBantuan: StatusBantuanConst[0].value
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `namaBantuan|label.text=Nama Bantuan|validationRules=required,maxLength.255`,
                    `jenisBantuan|label.text=Jenis Bantuan|validationRules=required,maxLength.255`,
                    // `kuota|label.text=Kuota|editorType=number|validationRules=required,maxLength.255,pattern.number,min.1`,
                    {
                        dataField: "kuota",
                        label: {
                            text: "Kuota"
                        },
                        editorType: "number",
                        validationRules: ["required"]
                        // editorOptions: {
                        //     mode:"number"
                        // },
                    },
                    `formatProposal|label.text=Format Proposal|validationRules=required`,
                    id?{
                        dataField: "statusBantuan",
                        label: {
                            text: "Status"
                        },
                        editorType: "select",
                        editorOptions: {
                            dataSource: StatusBantuanConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    }:null
                ],
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            BantuanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId !== 1) formRef.current?.disabled(true)
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
            title={<>{roleId == 1 ?
                id ? "Ubah" : "Tambah"
                : "Detail"
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
                            BantuanHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }]
                }}
            >
                {roleId === 1 ? <MoreHorizRoundedIcon /> : null}
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