import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiPembeliHelper from "helper/transaksi/TransaksiPembeliHelper";
import { SatuanBeratConst } from "consts";

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            TransaksiPembeliHelper.createupdate(values, values.id, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `namaIkan|label.text=Nama Komoditi|validationRules=required`,
                    `jumlah|label.text=Jumlah|validationRules=required`,
                    {
                        dataField: "satuan",
                        editorType: "select",
                        label: {
                            text: ""
                        },
                        editorOptions: {
                            dataSource: SatuanBeratConst,
                            displayExpr: "display",
                            valueExpr: "value"
                        },
                    },
                    `namaIkan|label.text=Nama Pembeli|editoryType=textarea|validationRules=required`,
                    {
                        dataField: "ekspedisi",
                        editorType: "select",
                        label: {
                            text: "Ekspedisi"
                        },
                        editorOptions: {
                            dataSource: SatuanBeratConst,
                            displayExpr: "display",
                            valueExpr: "value"
                        },
                    },
                    `tanggal|label.text=Tanggal Pembelian|editoryType=date`,
                    `catatan|label.text=Catatan|editoryType=textarea`,
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            TransaksiPembeliHelper.detail(id, ({ status, data }) => {
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
                            TransaksiPembeliHelper.delete(id, ({ status }) => {
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
                {id != null ? // && status diajukan
                    <BgsButton variant="contained" className="btn-batalkan" loading={loading} visibleLoading={false} >Batalkan Pemesanan</BgsButton>
                    : id != null ? // && status dalam proses
                        <BgsButton variant="contained" className="btn-terima" color="primary" loading={loading} visibleLoading={false} >Terima Pemesanan</BgsButton>
                        : null
                }
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}