import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import StatusTransaksiConst from "consts/statusTransaksi.const";

export default function TransaksiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
        item: {
            main: {
                spacing: 3,
                items: [
                    `namaIkan|label.text=Nama Komoditi|editorOptions.disabled=true`,
                    `ukuran|label.text=Ukuran|editorOptions.disabled=true`,
                    {
                        dataField: "jumlah",
                        label: {
                            text: "Jumlah (Kg)"
                        },
                        validationRules: ['pattern.number', 'min.1', 'maxLength.255'],
                        editorOptions: {
                            disabled: true
                        }
                    },
                    {
                        dataField: "tanggalDibutuhkan",
                        label: {
                            text: "Tanggal Dibutuhkan"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        }
                    },
                    {
                        dataField: "tanggalDiproses",
                        label: {
                            text: "Tanggal Diproses"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        }
                    },
                    `catatan|label.text=Catatan|editoryType=textarea|validationRules=maxLength.255|editorOptions.disabled=true`,
                    `idTransaksi|label.text=ID Transaksi|editorOptions.disabled=true`,
                    `namaPembeli|label.text=Nama Pembeli|editorOptions.disabled=true`,
                    `alamatPembeli|label.text=Alamat Lengkap Pembeli|editoryType=textarea|editorOptions.disabled=true|validationRules=maxLength.255`,
                    `namaNelayan|label.text=Nama Nelayan|editorOptions.disabled=true`,
                    `kelurahanDesaNelayan|label.text=Kelurahan Nelayan|editorOptions.disabled=true`,
                    `kecamatanNelayan|label.text=Kecamatan Nelayan|editorOptions.disabled=true`,
                    `alamatNelayan|label.text=Alamat Nelayan|editorOptions.disabled=true`,
                    {
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
                    },
                    {
                        dataField: "hargaAwal",
                        label: {
                            text: "Harga Awal (Per Kg)"
                        },
                        editorType: "number",
                        validationRules: ["maxLength.255", 'min.1', "pattern.number"],
                        editorOptions: {
                            disabled: true
                        }
                    },
                    {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga Nego (Per Kg)"
                        },
                        editorType: "number",
                        validationRules: ["maxLength.255", 'min.1', "pattern.number"],
                        editorOptions: {
                            disabled: true
                        }
                    },
                    {
                        dataField: "hargaAkhir",
                        label: {
                            text: "Harga Akhir"
                        },
                        editorType: "number",
                        validationRules: ["maxLength.255", 'min.1', "pattern.number"],
                        editorOptions: {
                            disabled: true
                        }
                    },

                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            TransaksiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (data.status == "DIPROSES") formRef.current?.disabled(true)
                if (status) {
                    setStatus(data.status);
                    formRef.current?.updateData(data);
                }
            })
        }
    })
    const terimaTransaksi = ({ loading }: { loading: Function }) => {
        loading(true);
        // const { idTransaksi };
        if (id) {
            loading(true)
            TransaksiHelper.terima(id, ({ status }) => {
                if (status) {
                    // formRef.current?.updateData(data);
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
                {/* <MoreHorizRoundedIcon /> */}
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {id != null && status == "DIPROSES" ? // && status dalam proses
                    <BgsButton variant="contained" className="btn-terima" color="primary" loading={loading}
                        modalOptions={{
                            message: "Apakah Anda yakin untuk memproses transaksi ini?",
                            width: 350
                        }} onClick={e => terimaTransaksi(e)} >Terima Pemesanan</BgsButton>
                    : null
                }
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}