import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import ProposalHelper from "helper/bantuan/ProposalHelper";
import UploadHelper from "helper/bantuan/UploadHelper";
import { ServiceNameUploadConst } from "consts";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BantuanHelper from "helper/bantuan/BantuanHelper";

export default function ProposalForm({ id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const userId = credential.storage.get("user")?.idUser;
    const [namaBantuan, setNamaBantuan] = useState<string>();
    const [idBantuan, setIdBantuan] = useState<string>();

    mounted(() => {
        if (id) {
            setLoading(true)
            BantuanHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (status) {
                    setNamaBantuan(data.namaBantuan)
                    setIdBantuan(data.idBantuan)
                }
                console.log(idBantuan, "id Bantuanxx")
                console.log(namaBantuan, "nama Bantuan")

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
            idBantuan: id,
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
                ]
            },
        }
    }



    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{roleId == 3 ?
                id ? "Ajukan" : "Ajukan"
                : "Detail"
            } <b>Bantuan | {namaBantuan}</b></>}
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
                            ProposalHelper.delete(id, ({ status }) => {
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
                    roleId === 3 ? <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Ajukan</BgsButton>
                        : null
                }

            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}