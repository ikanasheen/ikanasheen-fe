import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsGroupForm, BgsButton, Items, BgsTypography, BgsForm } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import SosialisasiHelper from "helper/sosialisasi/SosialisasiHelper";
import StatusConst from "consts/status.const";

export default function SosialisasiForm({ title, id, hide, onSuccess = () => { } }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const roleId = credential.storage.get("user")?.idRole;
    const [judul, setJudul] = useState();
    const [konten, setKonten] = useState();
    const [penulis, setPenulis] = useState();
    const [tanggalDibuat, setTanggalDibuat] = useState();

    const item: Items = {
        editorOptions: {
            aligned: "horizontal"
        },
        editorType: "label"
    }
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
                    {
                        dataField: "judul",
                        ...item
                    },
                    {
                        dataField: "konten",
                        ...item
                    },
                    {
                        dataField: "penulis",
                        ...item
                    },

                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            SosialisasiHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                setJudul(data.judul)
                setKonten(data.konten)
                setPenulis(data.penulis)
                setTanggalDibuat(data.tanggalDibuat)
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
            <BgsForm {...group} />
            <BgsTypography variant="h4" className="fw-bold fs-20 text-center" >{judul}</BgsTypography>
            <BgsTypography variant="body1" className="text-secondary fs-14 text-start mt-4" >{konten}</BgsTypography>
            <BgsTypography variant="body2" className="text-secondary fs-14 text-end mt-4" >{tanggalDibuat}</BgsTypography>
            <BgsTypography variant="body2" className="text-secondary fs-14 text-end mt-2" >Penulis: {penulis}</BgsTypography>

        </DrawerLayout>}
    />
}