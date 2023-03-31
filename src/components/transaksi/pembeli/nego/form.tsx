import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import StatusTransaksiConst from "consts/statusTransaksi.const";
import OpsiPengirimanConst from "consts/opsiPengiriman.const";

export default function TransaksiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // const [status, setStatus] = useState();    
    const [opsiPengiriman, setOpsiPengiriman] = useState();


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
                    `idTransaksi|label.text=ID Transaksi|editorOptions.disabled=true` ,
                    `namaIkan|label.text=Nama Komoditi|editorOptions.disabled=true` ,
                    `ukuran|label.text=Ukuran|editorOptions.disabled=true` ,
                    {
                        dataField: "jumlah",
                        label: {
                            text: "Jumlah (Kg)"
                        },
                        validationRules: ['pattern.number', 'min.1', 'maxLength.255']
                    },
                    `catatan|label.text=Catatan|editoryType=textarea|validationRules=maxLength.255`,
                    // `namaPembeli|label.text=Nama Pembeli|editorOptions.disabled=true` ,
                    // `alamatPembeli|label.text=Alamat Lengkap Pembeli|editoryType=textarea|validationRules=maxLength.255`,
                    `namaNelayan|label.text=Nama Nelayan|editorOptions.disabled=true` ,
                    `kecamatanNelayan|label.text=Kecamatan Nelayan|editorOptions.disabled=true|visible=false` ,
                    `kelurahanDesaNelayan|label.text=Kelurahan Nelayan|editorOptions.disabled=true|visible=false` ,
                    `alamatNelayan|label.text=Alamat Nelayan|editorOptions.disabled=true|visible=false` ,

                    {
                        dataField: "tanggalDibutuhkan",
                        label: {
                            text: "Tanggal Dibutuhkan"
                        },
                        editorType: "date",
                        editorOptions:{
                            disabled:true
                        }
                    },
                    {
                        dataField: "opsiPengiriman",
                        editorType: "select",
                        label: {
                            text: "Opsi Pengiriman"
                        },
                        editorOptions: {
                            dataSource: OpsiPengirimanConst,
                            displayExpr: "display",
                            valueExpr: "value",
                            disabled:true
                        },
                    },
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
                        validationRules:["maxLength.255",'min.1', "pattern.number"],
                    },
                    {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga Nego (Per Kg)"
                        },
                        editorType: "number",
                        validationRules:["maxLength.255",'min.1', "pattern.number"],
                        editorOptions: {
                            disabled: true
                        }
                    },
                    {
                        dataField: "hargaAkumulasiNego",
                        label: {
                            text: "Harga Akumulasi Nego"
                        },
                        editorType: "number",
                        validationRules:["maxLength.255",'min.1', "pattern.number"],
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
                if (data.status == "NEGO") formRef.current?.disabled(true)
                if (status) {
                    setOpsiPengiriman(data.opsiPengiriman)
                    // setStatus(data.status);
                    formRef.current?.updateData(data);
                }
                if (data.opsiPengiriman === "ANTAR" && data.status === "DIPROSES") {
                    formRef.current?.itemOption("catatanPengiriman").option("visible", true);
                }
                if (data.status === "SIAP_DIAMBIL") formRef.current?.itemOption("tanggalSiapDiambil").option("visible", true);
                if(data.opsiPengiriman ==="AMBIL"){
                    formRef.current?.itemOption("alamatNelayan").option("visible", true);
                    formRef.current?.itemOption("kecamatanNelayan").option("visible", true);
                    formRef.current?.itemOption("kelurahanDesaNelayan").option("visible", true);
                }

                if (data.status === "DIKIRIM") formRef.current?.itemOption("tanggalDikirim").option("visible", true);
                if (data.status === "DIPROSES") formRef.current?.itemOption("tanggalDiproses").option("visible", true);
                if (data.status === "SELESAI") formRef.current?.itemOption("tanggalSelesai").option("visible", true);
                if (data.status === "SELESAI" && data.opsiPengiriman === "AMBIL") formRef.current?.itemOption("tanggalSiapDiambil").option("visible", true);
                if (data.status === "SELESAI" && data.opsiPengiriman === "ANTAR") formRef.current?.itemOption("tanggalDikirim").option("visible", true);
                if (data.opsiPengiriman === "ANTAR") formRef.current?.itemOption("catatanPengiriman").option("visible", true);
                console.log(opsiPengiriman)
            })
        }
    })

    const terimaNego = ({ loading }: { loading: Function }) => {
        loading(true);
        if (id) {
            loading(true)
            TransaksiHelper.terimaNego(id, ({ status }) => {
                if (status) {
                    onSuccess();
                }
            })
        }
    }
    const tolakNego = ({ loading }: { loading: Function }) => {
        loading(true);
        if (id) {
            loading(true)
            TransaksiHelper.tolakNego(id, ({ status }) => {
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
            title={<>{id ? "Approval" : "Tambah"} <b>{title}</b></>}
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
                <BgsButton variant="contained" className="btn-batalkan" loading={loading}
                    modalOptions={{
                        message: "Apakah Anda yakin untuk menolak negosiasi ini?",
                        width: 350
                    }} onClick={e => tolakNego(e)}>Tolak Tawaran</BgsButton>
                <BgsButton variant="contained" className="btn-terima" color="primary" loading={loading}
                    modalOptions={{
                        message: "Apakah Anda yakin untuk menerima negosiasi ini?",
                        width: 350
                    }} onClick={e => terimaNego(e)} >Terima Tawaran</BgsButton>

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}