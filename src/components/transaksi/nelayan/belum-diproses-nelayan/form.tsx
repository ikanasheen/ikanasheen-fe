import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import NegoConst from "consts/isNego.const";

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiHelper.prosesTransaksi(values, ({ status }) => {
                setLoading(false);
                if (status)
                    onSuccess();
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
                            text: "Harga Awal (Per Kg)"
                        },
                        editorType: "number",
                        validationRules: ["maxLength.10", "pattern.number"],
                        editorOptions: {
                            disabled: true,
                        }
                    },
                    {
                        dataField: "isNego",
                        editorType: "radiobutton",
                        label: {
                            text: "Tawar Harga (Per Kg)"
                        },
                        editorOptions: {
                            dataSource: NegoConst,
                            displayExpr: "display",
                            valueExpr: "value",
                            onChange: ({ data }) => {
                                // switch (data) {
                                //     case data && NegoConst[0].value:
                                //         formRef.current?.itemOption("hargaNego").option("visible", true)
                                //         break;
                                //     default:
                                //         formRef.current?.itemOption("hargaNego").option("visible", false)
                                //         break;
                                // }
                                if(data && NegoConst[0].value) {
                                    formRef.current?.itemOption("hargaNego").option("visible", true)
                                }else if(data && NegoConst[1].value){
                                    formRef.current?.itemOption("hargaNego").option("visible", false)
                                }else{
                                    formRef.current?.itemOption("hargaNego").option("visible", false)
                                }
                            }
                        },
                    },
                    {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga Nego (Per Kg)"
                        },
                        editorType: "number",
                        visible: false,
                        validationRules: ["maxLength.10", 'min.1', "pattern.number"]
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

    // const prosesTransaksi = ({ loading }: { loading: Function }) => {
    //     loading(true);
    //     // const { idTransaksi };
    //     if (id) {
    //         loading(true)
    //         TransaksiHelper.proses(id, ({ status }) => {
    //             // formRef.current?.updateData(data);
    //             if (status) {
    //                 onSuccess();
    //             }
    //         })
    //     }
    // }

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{id ? "Proses" : "Tambah"} <b>{title}</b></>}
            // action={<>{id && <BgsButton
            //     actionType="menu"
            //     variant="icon"
            //     menuOptions={{
            //         className: "br-3",
            //         items: [{
            //             actionCode: "delete",
            //             className: "text-danger",
            //             prefix: () => <i className="ri-delete-bin-line me-2"></i>,
            //             text: "Delete",
            //             actionType: "modal",
            //             onClick: ({ loading, modalRef }) => {
            //                 loading(true)
            //                 TransaksiHelper.delete(id, ({ status }) => {
            //                     loading(false)
            //                     status && (modalRef.hide(), onSuccess())
            //                 })
            //             }
            //         }]
            //     }}
            // >
            // </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                <BgsButton className="btn-save" loading={loading} type="submit">Proses</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}