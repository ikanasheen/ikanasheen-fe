import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PartnerHelper from "helper/PartnerHelper";
import CityHelper from "helper/CityHelper";
import { OutletTypeConst, PartnerCategoryConst, ServiceNameUploadConst, TierTypeConst } from "consts";
import FileHelper from "helper/FileHelper";
// import Image from "components/file/components/image";

export default function PartnerForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            PartnerHelper.createupdate(values, values.id, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            isActive: true
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    `partnerId|label.icon=key|validationRules`,
                    {
                        dataField: "outletType",
                        editorType: "select",
                        editorOptions: {
                            dataSource: OutletTypeConst,
                            displayExpr: "display",
                            valueExpr: "value"
                        },
                        label: {
                            text: "Tipe Outlet"
                        },
                        validationRules: ["required"]
                    },
                    `partnerName|label.text=Nama|validationRules=required,minLength.3,maxLength.50`,
                    {
                        dataField: "partnerTier",
                        editorType: "select",
                        editorOptions: {
                            dataSource: TierTypeConst,
                            displayExpr: "display",
                            valueExpr: "value"
                        },
                        label: {
                            text: "Tier"
                        }
                    },
                    `partnerAddress|label.text=Alamat|editorType=textarea|validationRules=minLength.5,maxLength.255`,
                    {
                        dataField: "partnerCategory",
                        editorType: "select",
                        editorOptions: {
                            dataSource: PartnerCategoryConst,
                            displayExpr: "display",
                            valueExpr: "value"
                        },
                        label: {
                            text: "Kategori"
                        }
                    },
                    `partnerEmail|label.text=Email|label.icon=mail|validationRules=email`,
                    `partnerPhoneNumber|label.icon=phone|label.text=Nomor Telepon|validationRules=minLength.6,maxLength.15,pattern.number`,
                    {
                        dataField: "city.id",
                        editorType: "select",
                        label: {
                            text: "Kota",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: data => CityHelper.retrieve(data),
                            displayExpr: "cityName",
                            valueExpr: "id",
                            search: "cityName"
                        }
                    },
                    {
                        dataField: "partnerPhotos",
                        label: {
                            text: "Foto"
                        },
                        editorOptions: {
                            maxFile: 1,
                            accept: ".jpg, .jpeg, .png",
                            maxSize: 2,
                            helper: (data) => FileHelper.upload(data),
                            beforeUpload: () => {
                                return {
                                    serviceName: ServiceNameUploadConst.PARTNER
                                }
                            },
                            // iconUpload: (data) => <Image showFull {...data} size="lg" />,
                            iconRemoveUpload: () => <i className="ri-delete-bin-line fs-16 mgl-2 mgr-2"></i>
                        },
                        editorType: "upload",
                        validationRules: ["required"]
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            PartnerHelper.detail(id, ({ status, data }) => {
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
                            PartnerHelper.delete(id, ({ status }) => {
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
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Batal</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}