import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import SosialisasiHelper from "helper/sosialisasi/SosialisasiHelper";
import JenisKontenConst from "consts/jenisKontent.const";
import StatusConst from "consts/status.const";

export default function SosialisasiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            SosialisasiHelper.createupdate(values, values.idSosialisasi, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            status: StatusConst[0].value,
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `judul|label.text=Judul|validationRules=required`,
                    {
                        dataField: "jenisKonten",
                        label: {
                            text: "Jenis Konten"
                        },
                        validationRules: ["required"],
                        editorType: "select",
                        editorOptions: {
                            dataSource: JenisKontenConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    },
                    `konten|minRows=6|label.text=Konten|editorType=textarea|validationRules=required`,
                    {
                        dataField: "status",
                        label: {
                            text: "Status"
                        },
                        editorType: "radiobutton",
                        editorOptions: {
                            dataSource: StatusConst,
                            displayExpr: "display",
                            valueExpr: "value",
                        },
                    },
                    `penulis|label.text=Penulis|validationRules=required`,
                    // `tanggalDibuat|label.text=Tanggal Dibuat|editorType=date`
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            SosialisasiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (roleId !== 1) formRef.current?.disabled(true)
                // if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

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
                            SosialisasiHelper.delete(id, ({ status }) => {
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