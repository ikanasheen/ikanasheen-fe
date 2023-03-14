import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";

export default function TransaksiForm({ title, mode, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
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
                    {
                        dataField: "namaNelayan",
                        label: {
                            text: "Nama Nelayan"
                        },
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
                        validationRules:["maxLength.10", "pattern.number"],
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
                if (mode === "detail") formRef.current?.disabled(true)
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
                <MoreHorizRoundedIcon />
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