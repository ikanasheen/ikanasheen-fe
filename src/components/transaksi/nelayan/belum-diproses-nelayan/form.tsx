import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, {  DrawerRenderProps } from "shared/layout/drawer-layout";
import TransaksiHelper from "helper/transaksi/TransaksiHelper";
import NegoConst from "consts/isNego.const";
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import StatusTransaksiConst from "consts/statusTransaksi.const";
// const Detail = lazy(() => import("./detail"));

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;
    const actionCode = id ? "update" : "create";

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        actionCode,
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
            // isNego: NegoConst[1].value,
            idUserNelayan: userId,
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `idTransaksi|label.text=ID Transaksi|editorOptions.disabled=true`,
                    `namaIkan|label.text=Nama Komoditi|editorOptions.disabled=true`,
                    `ukuran|label.text=Ukuran|editorOptions.disabled=true`,
                    `jumlah|label.text=Jumlah|editorOptions.disabled=true`,
                    `hargaAwal|label.text=Harga Awal|editorOptions.disabled=true`,
                    `hargaNego|label.text=Harga Nego|editorOptions.disabled=true`,
                    `hargaAkhir|label.text=Harga Akhir|editorOptions.disabled=true`,
                    `alamatPembeli|label.text=Alamat Pembeli|editoryType=textarea|editorOptions.disabled=true`,
                    `namaPembeli|label.text=Nama Pembeli|editorOptions.disabled=true`,
                    `namaNelayan|label.text=Nama Nelayan|editorOptions.disabled=true`,
                    `tanggalDibutuhkan|label.text=Tanggal Dibutuhkan|editoryType=date|editorOptions.disabled=true`,
                    `tanggalDiproses|label.text=Tanggal Dibutuhkan|editoryType=date|editorOptions.disabled=true`,
                    `tanggalSelesai|label.text=Tanggal Dibutuhkan|editoryType=date|editorOptions.disabled=true`,
                    `catatan|label.text=Nama Pembeli|editoryType=textarea|editorOptions.disabled=true`,
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
                        dataField: "isNego",
                        editorType: "radiobutton",
                        label: {
                            text: "Tawar Harga (Per Kg)"
                        },
                        validationRules: ["required"],
                        editorOptions: {
                            dataSource: NegoConst,
                            displayExpr: "display",
                            valueExpr: "value",
                            onChange: ({ data }) => {
                                formRef.current?.itemOption("hargaNego").option("visible", data.value === NegoConst[0].value)

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
                        validationRules: ["required","maxLength.255", 'min.1', "pattern.number"]
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

    // const detail = () => {
    //     drawerLayout({
    //         render: (props) => <Detail
    //             title="Detail Transaksi"
    //             id={id}
    //             {...props}
    //         />
    //     })
    // }

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
                        actionCode: "detail",
                        prefix: () => <i className="ri-information-line me-2"></i>,
                        text: "Detail",
                        // onClick: detail
                    }]
                }}
            >
                {/* <MoreHorizRoundedIcon /> */}
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                <BgsButton className="btn-save" actionCode={actionCode} loading={loading} type="submit">Proses</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}