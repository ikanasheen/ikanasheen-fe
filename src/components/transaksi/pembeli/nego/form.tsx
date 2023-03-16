import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TransaksiHelper from "helper/transaksi/TransaksiHelper";

export default function TransaksiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // const [status, setStatus] = useState();

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
                        dataField: "hargaNego",
                        label: {
                            text: "Harga yang Ditawarkan (Per Kg)"
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
                    // setStatus(data.status);
                    formRef.current?.updateData(data);
                }
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