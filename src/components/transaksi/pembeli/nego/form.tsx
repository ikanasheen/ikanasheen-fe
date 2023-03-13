import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import {  mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiPembeliHelper from "helper/transaksi/TransaksiPembeliHelper";

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
            TransaksiPembeliHelper.createupdate(values, values.id, ({ status }) => {
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
                        editorOptions:{
                            disabled:true
                        }
                    },
                    {
                        dataField: "hargaNego",
                        label: {
                            text: "Harga yang Ditawarkan"
                        },
                        editorOptions:{
                            disabled:true
                        }
                    },

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
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {id != null && status == "NEGO" ? // && status nego
                    <BgsButton variant="contained" className="btn-batalkan" loading={loading} visibleLoading={false} >Tolak Tawaran</BgsButton>
                    : id != null && status == "DIPROSES" ? // && status dalam proses
                        <BgsButton variant="contained" className="btn-terima" color="primary" loading={loading} visibleLoading={false} >Terima Pemesanan</BgsButton>
                        : null
                }
                
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}