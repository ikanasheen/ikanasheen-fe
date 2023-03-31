import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import StatusTransaksiConst from "consts/statusTransaksi.const";
import OpsiPengirimanConst from "consts/opsiPengiriman.const";

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const [statusTransaksi, setStatusTransaksi] = useState();
    const [opsiPengiriman, setOpsiPengiriman] = useState();

    mounted(() => {
        if (id) {
            setLoading(true)
            TransaksiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    setStatusTransaksi(data.status)
                    setOpsiPengiriman(data.opsiPengiriman)
                    formRef.current?.updateData(data);
                }
                if (data.opsiPengiriman === "ANTAR" && data.status === "DIPROSES") {
                    formRef.current?.itemOption("catatanPengiriman").option("visible", true);
                }
                if(data.opsiPengiriman ==="AMBIL"){
                    formRef.current?.itemOption("kecamatanNelayan").option("visible", true);
                    formRef.current?.itemOption("kelurahanDesaNelayan").option("visible", true);
                    formRef.current?.itemOption("alamatNelayan").option("visible", true);
                }
                if (data.status === "SIAP_DIAMBIL") formRef.current?.itemOption("tanggalSiapDiambil").option("visible", true);
                if (data.status === "DIKIRIM") formRef.current?.itemOption("tanggalDikirim").option("visible", true);
                if (data.status === "DIPROSES") formRef.current?.itemOption("tanggalDiproses").option("visible", true);
                if (data.status === "SELESAI") formRef.current?.itemOption("tanggalSelesai").option("visible", true);
                if (data.status === "SELESAI" && data.opsiPengiriman === "AMBIL") formRef.current?.itemOption("tanggalSiapDiambil").option("visible", true);
                if (data.status === "SELESAI" && data.opsiPengiriman === "ANTAR") formRef.current?.itemOption("tanggalDikirim").option("visible", true);
                if (data.opsiPengiriman === "ANTAR") formRef.current?.itemOption("catatanPengiriman").option("visible", true);
                
                console.log(statusTransaksi)
                console.log(opsiPengiriman)
            })
        }
    })

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiHelper.createupdate(values, values.id, ({ status }) => {
                setLoading(false);
                if (status) {
                    onSuccess();
                }
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `idTransaksi|label.text=ID Transaksi|editorOptions.disabled=true`,
                    `namaIkan|label.text=Nama Komoditi|editorOptions.disabled=true`,
                    `ukuran|label.text=Ukuran|editorOptions.disabled=true`,
                    `jumlah|label.text=Jumlah|editorOptions.disabled=true`,
                    {
                        dataField: "hargaAwal",
                        label: {
                            text: "Harga Awal (Per Kg)"
                        },
                        editorType: "number",
                        editorOptions: {
                            disabled: true
                        },
                        validationRules: ["pattern.number"]
                    }, {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga Nego (Per Kg)"
                        },
                        editorType: "number",
                        editorOptions: {
                            disabled: true
                        },
                        validationRules: ["pattern.number"]
                    }, {
                        dataField: "hargaAkhir",
                        label: {
                            text: "Harga Akhir"
                        },
                        editorType: "number",
                        editorOptions: {
                            disabled: true
                        },
                        validationRules: ["pattern.number"]
                    },
                    `catatan|label.text=Catatan|editoryType=textarea|editorOptions.disabled=true`,
                    
                    `alamatPembeli|label.text=Alamat Pembeli|editoryType=textarea|editorOptions.disabled=true`,
                    `namaNelayan|label.text=Nama Nelayan|editorOptions.disabled=true`,
                    `kelurahanDesaNelayan|label.text=Kelurahan Nelayan|editorOptions.disabled=true|visible=false`,
                    `kecamatanNelayan|label.text=Kecamatan Nelayan|editorOptions.disabled=true|visible=false`,
                    `alamatNelayan|label.text=Alamat Nelayan|editorOptions.disabled=true|visible=false`,
                    {
                        dataField: "tanggalDibutuhkan",
                        label: {
                            text: "Tanggal Dibutuhkan"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        },
                    }, {
                        dataField: "tanggalDiproses",
                        label: {
                            text: "Tanggal Diproses"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        },
                        visible: false
                        
                    }, 
                    {
                        dataField: "tanggalSiapDiambil",
                        label: {
                            text: "Tanggal Siap Diambil"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        },
                        visible: false
                    },
                    {
                        dataField: "tanggalDikirim",
                        label: {
                            text: "Tanggal Dikirim"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        },
                        visible: false
                    },{
                        dataField: "tanggalSelesai",
                        label: {
                            text: "Tanggal Selesai"
                        },
                        editorType: "date",
                        editorOptions: {
                            disabled: true
                        },
                        visible: false
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
                        dataField: "catatanPengiriman",
                        label: {
                            text: "Catatan Pengiriman"
                        },
                        editorOptions: {
                            disabled:true
                        },
                        visible: false
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
                ]
            },
        }
    }



    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{id ? "Detail" : "Tambah"} <b>{title}</b></>}
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
                {
                    roleId === 3 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
                        : null
                }
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}