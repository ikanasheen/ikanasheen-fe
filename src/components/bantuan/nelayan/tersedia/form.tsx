import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import BantuanHelper from "helper/bantuan/BantuanHelper";
import ProposalHelper from "helper/bantuan/ProposalHelper";
import { ServiceNameUploadConst } from "consts/serviceNameUpload.const";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadHelper from "helper/bantuan/UploadHelper";

export default function HargaIkanForm({ id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const userId = credential.storage.get("user")?.idUser;
    const [namaBantuan, setNamaBantuan] = useState();
    const [idBantuan, setIdBantuan] = useState();

    mounted(() => {
        if (id) {
            setLoading(true)
            BantuanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                // if (roleId !== 1) formRef.current?.disabled(true)
                if (status) {
                    setNamaBantuan(data.namaBantuan)
                    setIdBantuan(data.idBantuan)
                    formRef.current?.updateData(data);
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
            ProposalHelper.createupdate(values, values.idProposalBantuan, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            idUserNelayan: userId,
            idBantuan: idBantuan
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "dokumen",
                        label: {
                            text: "File Proposal"
                        },
                        editorOptions: {
                            maxFile: 1,
                            accept: ".docx",
                            maxSize: 2,
                            helper: (data) => UploadHelper.upload(data),
                            beforeUpload: (file) => {
                                console.log(file, "filee before")
                                return {
                                    namaService: ServiceNameUploadConst.PROPOSAL
                                }
                            },
                            iconUpload: () => <AttachFileIcon sx={{ transform: "rotate(50deg)" }} />,
                            iconRemoveUpload: () => <i className="ri-delete-bin-line fs-16 mgl-2 mgr-2"></i>
                        },
                        editorType: "upload",
                        validationRules: ["required"]
                    },
                ],
            },
        }
    }

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{roleId == 3 ?
                id ? "Ajukan" : "Tambah"
                : "Detail"
            } <b>Bantuan {namaBantuan}</b></>}
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
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Kembali</BgsButton>
                {
                    roleId === 3 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">{id && " Ajukan"}</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}