import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import IkanHelper from "helper/daftar-ikan/IkanHelper"
import moment from "moment";
import StatusTransaksiConst from "consts/statusTransaksi.const";

export default function TransaksiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;
    const [statusTransaksi, setStatusTransaksi] = useState();
    const [date] = useState<string>(moment().format("YYYY-MM-DD"));

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
            idUserPembeli: userId
        },
        item: {
            main: {
                spacing: 3,
                items: [{
                    dataField: "idIkan",
                    label: {
                        text: "Nama Komoditi"
                    },
                    validationRules: ["required", "maxLength.255"],
                    editorType: "select",
                    editorOptions: {
                        mode: "popup",
                        helper: data => IkanHelper.retrieve(data),
                        displayExpr: ({ idIkan, namaIkan, hargaDasar }) => `${idIkan} - ${namaIkan} - Rp ${hargaDasar} /Kg`,
                        valueExpr: "idIkan",
                        tableOptions: {
                            mode: "popup",
                            showIndexing: true,
                            allowSearching: {
                                fullWidth: true
                            },
                            columns: [
                                "idIkan|caption=Id Ikan|width=160",
                                "namaIkan|caption=Nama Ikan|width=180|className=text-break",
                                "ukuran|caption=Ukuran|width=180",
                                `hargaDasar|caption=Harga Dasar(Per Kg)|dataType=number|width=150`,
                                `deskripsi|caption=Deskripsi|width=200|className=text-break`,
                            ]
                        },
                    }
                },
                // id ? `namaIkan|label.text=Nama Komoditi|editorOptions.disabled=true` : null,
                // id ? `ukuran|label.text=Ukuran|editorOptions.disabled=true` : null,
                {
                    dataField: "jumlah",
                    label: {
                        text: "Jumlah (Kg)"
                    },
                    validationRules: ["required"],
                },
                {
                    dataField: "tanggalDibutuhkan",
                    label: {
                        text: "Tanggal Dibutuhkan"
                    },
                    editorType: "date",
                    editorOptions: {
                        minDate: date,
                    },
                    validationRules: ["required"],
                },
                    `alamat|label.text=Alamat Lengkap|editoryType=textarea|validationRules=minLength.50,required`,
                    `catatan|label.text=Catatan|editoryType=textarea`,

                id ? `idTransaksi|label.text=ID Transaksi|editorOptions.disabled=true` : null,
                id ? {
                    dataField: "hargaAwal",
                    label: {
                        text: "Harga Awal (Per Kg)"
                    },
                    editorType: "number",
                    validationRules: ["maxLength.255", 'min.1', "pattern.number"],
                } : null,
                id ? `namaPembeli|label.text=Nama Pembeli|editorOptions.disabled=true` : null,
                id ? {
                    dataField: "status",
                    editorType: "select",
                    label: {
                        text: "Status"
                    },
                    editorOptions: {
                        dataSource: StatusTransaksiConst,
                        displayExpr: "display",
                        valueExpr: "value",
                        disabled: true
                    },
                } : null,

                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            TransaksiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (data.status == "DIAJUKAN") formRef.current?.disabled(true)
                if (status) {
                    setStatusTransaksi(data.status);
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    const batalkanTransaksi = ({ loading }: { loading: Function }) => {
        loading(true);
        // const { idTransaksi };
        if (id) {
            loading(true)
            TransaksiHelper.batalkan(id, ({ status }) => {
                if (status) {
                    onSuccess();
                }
            })
        }
    }

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
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {id != null && statusTransaksi == "DIAJUKAN" ? // && status diajukan
                    <BgsButton variant="contained" className="btn-batalkan"
                        modalOptions={{
                            message: "Apakah Anda yakin untuk memproses transaksi ini?",
                            width: 350
                        }} onClick={e => batalkanTransaksi(e)} >Batalkan Pemesanan</BgsButton>
                    : <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Ajukan</BgsButton>
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}