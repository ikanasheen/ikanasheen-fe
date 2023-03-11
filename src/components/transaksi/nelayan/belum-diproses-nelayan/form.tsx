import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiNelayanHelper from "helper/transaksi/TransaksiNelayanHelper";
import NegoConst from "consts/isNego.const";

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiNelayanHelper.createupdate(values, values.idTransaksi, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            isNego: NegoConst[1].value,
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "isNego",
                        editorType: "radiobutton",
                        label: {
                            text: "Tawar Harga"
                        },
                        editorOptions: {
                            dataSource: NegoConst,
                            displayExpr: "display",
                            valueExpr: "value",
                            onChange: ({ data }) => {
                                if (data && NegoConst[0].value) {
                                    formRef.current?.itemOption("hargaDitawarkan").option("editorOptions.disabled", false)
                                }
                            }
                        },
                    },
                    {
                        dataField: "hargaDitawarkan",
                        label: {
                            text: "Harga Yang Ditawarkan"
                        },
                        editorOptions: {
                            disabled: true,
                        }
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            TransaksiNelayanHelper.detail(id, ({ status, data }) => {
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
            title={<>{id ? "Proses" : "Tambah"} <b>{title}</b></>}
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
                            TransaksiNelayanHelper.delete(id, ({ status }) => {
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
                <BgsButton className="btn-save" loading={loading} actionType="modal"
                    modalOptions={{
                        message: "Apakah Anda yakin untuk memproses transaksi ini?",
                        width: 350
                    }} type="submit">Proses</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}