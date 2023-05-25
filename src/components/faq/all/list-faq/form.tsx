import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import FaqHelper from "helper/faq/FaqHelper";
import TopikHelper from "helper/faq/TopikHelper";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default function FaqForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    mounted(() => {
        if (id) {
            setLoading(true)
            FaqHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId !== 1) formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                    if (id) {
                        formRef.current?.itemOption("namaTopik").option("visible", true);
                        formRef.current?.itemOption("idTopik").option("visible", false);
                    }

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
            FaqHelper.createupdate(values, values.idFaq, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "idTopik",
                        label: {
                            text: "Topik"
                        },
                        editorType: "select",
                        editorOptions: {
                            mode: "popup",
                            helper: data => TopikHelper.retrieve(data),
                            displayExpr: ({ namaTopik }) => ` ${namaTopik} `,
                            valueExpr: "idTopik",
                            tableOptions: {
                                mode: "popup",
                                showIndexing: true,
                                columns: [
                                    "idTopik|caption=Id Topik|width=130",
                                    "namaTopik|caption=Nama Topik|width=180",
                                    `deskripsi|caption=Deskripsi|width=200|className=text-break`,
                                ]
                            },
                        },
                        visible: true,
                        validationRules: ["required"]
                    },
                    {
                        dataField: "namaTopik",
                        caption: "Nama Topik",
                        visible: false,
                        validationRules: ["required"],
                        editorOptions: { disabled: true }
                    },
                    `pertanyaan|label.text=Pertanyaan|validationRules`,
                    `jawaban|label.text=Jawaban|editorType=textarea|editorOptions.rows=5|validationRules`,

                ]
            },
        }
    }


    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<>{
                roleId == 1 && id ? "Ubah"
                    : "Tambah"
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
                            FaqHelper.delete(id, ({ status }) => {
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