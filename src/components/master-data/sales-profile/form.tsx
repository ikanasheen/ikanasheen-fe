import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import SalesAgentHelper from "helper/SalesAgentHelper";
import SalesCategoryHelper from "helper/SalesCategoryHelper";
import { ServiceNameUploadConst } from "consts";
import FileHelper from "helper/FileHelper";
// import Image from "components/file/components/image";

export default function SalesCategoryForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            SalesAgentHelper.createupdate(values, values.id, ({ status }) => {
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
                    `salesName|label.text=Nama Sales|label.icon=user|validationRules=required,maxLength.50`,
                    `email|label.text=Email|label.icon=mail|validationRules=email`,
                    `phoneNumber|label.text=Nomor Telepon|label.icon=phone|validationRules=maxLength.15,pattern.number`,
                    {
                        dataField: "salesCategory.id",
                        editorType: "select",
                        label: {
                            text: "Kategori Sales",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: data => SalesCategoryHelper.retrieve(data),
                            displayExpr: "salesCategoryName",
                            valueExpr: "id",
                            search: "salesCategoryName"
                        }
                    },
                    {
                        dataField: "photoProfiles",
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
                                    serviceName: ServiceNameUploadConst.SALES_AGENT
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
            SalesAgentHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
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
            title={<>{id ? "Ubah" : "Tambah"} <b>{title}</b></>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Batal</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading={false} type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}