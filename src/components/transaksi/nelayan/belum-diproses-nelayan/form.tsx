import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential,  mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import NegoConst from "consts/isNego.const";
import { kMaxLength } from "buffer";

export default function TransaksiForm({ title, mode,id, idUserNelayan, hargaNego, isNego,hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiHelper.createupdate(values, values.idTransaksi, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            isNego: NegoConst[1].value,
            idUserNelayan: userId,
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "hargaAwal",
                        label: {
                            text: "Harga Awal"
                        },
                        editorType: "number",
                        validationRules:["maxLength.10"],
                        editorOptions: {
                            disabled: true,
                        }
                    },
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
                                    formRef.current?.itemOption("hargaNego").option("editorOptions.disabled", false)
                                }
                            }
                        },
                    },
                    {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga Nego"
                        },
                        validationRules:["maxLength.10"],
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
            TransaksiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    const prosesTransaksi = ({ loading }: { loading: Function }) => {
        loading(true);
        // const { idTransaksi };
        if (id) {
            loading(true)
            TransaksiHelper.proses(id, idUserNelayan, hargaNego, isNego, ({ data }) => {
                formRef.current?.updateData(data);
            })
        }
    }

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
                            TransaksiHelper.delete(id, ({ status }) => {
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
                <BgsButton className="btn-save" actionType="modal" loading={loading}
                    modalOptions={{
                        message: "Apakah Anda yakin untuk memproses transaksi ini?",
                        width: 350
                    }} onClick={e => prosesTransaksi(e)}>Proses</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}