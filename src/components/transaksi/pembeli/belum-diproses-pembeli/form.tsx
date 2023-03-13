import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import IkanHelper from "helper/daftar-ikan/IkanHelper"

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;
    const [status, setStatus] = useState();

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiHelper.createupdate(values, values.id, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            idUserPembeli: userId
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "idIkan",
                        label: {
                            text: "Nama Komoditi"
                        },
                        validationRules: ["required"],
                        editorType: "select",
                        editorOptions: {
                            mode: "popup",
                            helper: data => IkanHelper.retrieve(data),
                            displayExpr: ({ namaIkan, hargaDasar }) => `${namaIkan} - Rp ${hargaDasar} /Kg`,
                            valueExpr: "idIkan",
                            tableOptions: {
                                mode: "popup",
                                showIndexing: true,
                                allowSearching: {
                                    fullWidth: true
                                },
                                columns: [
                                    "idIkan|caption=Id Ikan|width=150",
                                    "namaIkan|caption=Nama Ikan|width=150",
                                    "ukuran|caption=Ukuran|width=150",
                                    `hargaDasar|caption=Harga Dasar|dataType=number|width=150`,
                                    `deskripsi|caption=Deskripsi|width=200|className=text-break`,
                                ]
                            },
                            // onChange: ({ data }) => {
                            //     if (data) {
                            //         formRef.current?.updateData({
                            //             hargaDasar: data.hargaDasar
                            //         })
                            //         formRef.current?.itemOption("hargaDasar").option("editorOptions.disabled", true);
                            //     }
                            // }
                        }
                    },
                    // {
                    //     dataField: "hargaDasar",
                    //     label: {
                    //         text: "Harga Normal"
                    //     },
                    //     editorOptions:{
                    //         disabled:true
                    //     }
                    // },
                    `jumlah|label.text=Jumlah (Kg)|validationRules=required`,
                    {
                        dataField: "tanggalDibutuhkan",
                        label: {
                            text: "Tanggal Dibutuhkan"
                        },
                        editorType: "date"
                    },
                    `alamat|label.text=Alamat Lengkap|editoryType=textarea|validationRules=required`,
                    `catatan|label.text=Catatan|editoryType=textarea|validationRules=required`,

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
                    setStatus(data.status);
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
                            TransaksiHelper.delete(id, ({ status }) => {
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
                {id != null && status == "DIAJUKAN"? // && status diajukan
                    <BgsButton variant="contained" className="btn-batalkan" loading={loading} visibleLoading={false} >Batalkan Pemesanan</BgsButton>
                    : null
                }
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}