import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import BantuanHelper from "helper/bantuan/BantuanHelper";
import StatusBantuanConst from "consts/statusBantuan.const";
import { ServiceNameUploadConst } from "consts/serviceNameUpload.const";
import UploadHelper from "helper/bantuan/UploadHelper";
import Image from "components/file/components/image";

export default function HargaIkanForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const [kuotaTersisa, setKuotaTersisa] = useState();

    mounted(() => {
        if (id) {
            setLoading(true)
            BantuanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId !== 1) formRef.current?.disabled(true)
                if (status) {
                    setKuotaTersisa(data.kuotaTersisa)
                    formRef.current?.updateData(data);
                }
                if (id) {
                    formRef.current?.itemOption("kuotaTersisa").option("visible", true);
                    formRef.current?.itemOption("statusBantuan").option("visible", true);
                }

            })
        }
    })

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            BantuanHelper.createupdate(values, values.idBantuan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            statusBantuan: StatusBantuanConst[0].value,
            kuotaTersisa: kuotaTersisa
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `namaBantuan|label.text=Nama Bantuan|validationRules=required,maxLength.255`,
                    `jenisBantuan|label.text=Jenis Bantuan|validationRules=required,maxLength.255`,
                    // `kuota|label.text=Kuota|editorType=number|validationRules=required,maxLength.255,pattern.number,min.1`,
                    {
                        dataField: "kuota",
                        label: {
                            text: "Kuota Tersedia"
                        },
                        editorType: "number",
                        validationRules: ["required","min.1","pattern.number"]
                    },
                    {
                        dataField: "kuotaTersisa",
                        label: {
                            text: "Kuota Tersisa"
                        },
                        editorType: "number",
                        editorOptions:{disabled:true},
                        visible:false
                    },
                    // `formatProposal|label.text=Format Proposal|validationRules=required`,
                    {
                        dataField: "dokumen",
                        label: {
                            text: "Format Proposal"
                        },
                        editorOptions: {
                            maxFile: 1,
                            accept: ".docx",
                            maxSize: 2,
                            helper: (data) => UploadHelper.upload(data),
                            beforeUpload: () => {
                                return {
                                    namaService: ServiceNameUploadConst.BANTUAN
                                }
                            },
                            iconUpload: (data) => <Image showFull {...data} size="lg" />,
                            iconRemoveUpload: () => <i className="ri-delete-bin-line fs-16 mgl-2 mgr-2"></i>
                        },
                        editorType: "upload",
                        validationRules: ["required"]
                    },
                    {
                        dataField: "statusBantuan",
                        label: {
                            text: "Status"
                        },
                        editorType: "select",
                        editorOptions: {
                            dataSource: StatusBantuanConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                        visible:false
                    }
                ],
            },
        }
    }

    

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{roleId == 1 ?
                id ? "Ubah" : "Tambah"
                : "Detail"
            } <b>{title}</b></>}
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
                            BantuanHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && (modalRef.hide(), onSuccess())
                            })
                        }
                    }]
                }}
            >
                {roleId === 1 ? <MoreHorizRoundedIcon /> : null}
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {
                    roleId === 1 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}