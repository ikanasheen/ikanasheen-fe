import { useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton } from "@andrydharmawan/bgs-component";
import { isArray, mounted } from "lib";
import FileHelper from "helper/FileHelper";
import RoleHelper from "helper/RoleHelper";
import UserHelper from "helper/UserHelper";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SalesCategoryHelper from "helper/SalesCategoryHelper";
import TerritoryHelper from "helper/TerritoryHelper";
import { RolesEnum, ServiceNameUploadConst } from "consts";
import Image from "components/file/components/image";

export default function UserManagementUserForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    let showPassword: boolean = false;

    const visibleSalesCoordinator = (roleCode: string) => {
        formRef.current?.itemOption("salesCategory.id").option("visible", roleCode !== RolesEnum.SALES_COORDINATOR)
    }

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values) => {
            setLoading(true);
            values.roles === RolesEnum.SALES_COORDINATOR && delete values.salesCategory;

            values.roles = [{
                code: values.roles
            }];

            delete values.showPassword;


            UserHelper.createupdate(values, values.idUser, ({ status }) => {
                setLoading(false);
                if (status) onSuccess();
            })
        },
        formData: {
            enabled: true
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "fullname",
                        editorOptions: {
                            autoComplete: "off"
                        },
                        label: {
                            icon: "user",
                            text: "Nama Lengkap"
                        },
                        validationRules: ["required"]
                    },
                    `email|label.icon=mail|validationRules=required,email|editorOptions.disabled=${!!id}`,
                    `phoneNumber|label.text=Nomor Telepon|label.icon=phone|validationRules=required,maxLength.15,pattern.number`,
                    {
                        dataField: "roles",
                        editorType: "select",
                        label: {
                            text: "Role",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: (data) => RoleHelper.retrieve(data),
                            displayExpr: "description",
                            search: "description",
                            valueExpr: "code",
                            onChange: ({ value }) => visibleSalesCoordinator(value)
                        },
                        validationRules: ["required"]
                    },
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
                        },
                        validationRules: ["required"]
                    },
                    {
                        dataField: "territory.id",
                        editorType: "select",
                        label: {
                            text: "Territory",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: data => TerritoryHelper.retrieve(data),
                            displayExpr: "territoryName",
                            valueExpr: "id",
                            search: "territoryName"
                        },
                        validationRules: ["required"]
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
                                    serviceName: ServiceNameUploadConst.USER
                                }
                            },
                            iconUpload: (data) => <Image showFull {...data} size="lg" />,
                            iconRemoveUpload: () => <i className="ri-delete-bin-line fs-16 mgl-2 mgr-2"></i>
                        },
                        editorType: "upload",
                        validationRules: ["required"]
                    },
                    {
                        dataField: "enabled",
                        className: "switch-label",
                        label: {
                            visible: false
                        },
                        dataType: "boolean",
                        editorType: "switch"
                    },
                    {
                        itemType: "group",
                        name: "panel-password",
                        colCount: 2,
                        items: [{
                            dataField: "password",
                            label: {
                                icon: "key",
                            },
                            editorOptions: {
                                autoComplete: "new-password",
                                type: "password"
                            },
                            validationRules: ["required", "minLength.8", {
                                message: "Password must have at least 8 characters with number, lowercase, uppercase and one special character",
                                validation: value => /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)
                            }]
                        }, {
                            dataField: "confirmPassword",
                            label: {
                                icon: "key"
                            },
                            editorOptions: {
                                autoComplete: "new-password",
                                type: "password"
                            },
                            validationRules: ["required", "match.password"]
                        }, {
                            colSpan: 2,
                            template: () => <div style={{marginTop: -20}} className="fs-12 text-secondary d-flex align-items-center"><i className="ri-information-line mgr-5"></i> Password must have at least 8 characters with number, lowercase, uppercase and one special character</div>
                        }, {
                            dataField: "showPassword",
                            editorOptions: {
                                onChange: () => {
                                    showPassword = !showPassword;
                                    formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                                    formRef.current?.itemOption("confirmPassword").option("editorOptions.type", showPassword ? "text" : "password")
                                }
                            },
                            editorType: "checkbox"
                        }]
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            formRef.current?.itemOption("panel-password").option("visible", false)
            formRef.current?.itemOption("username").option("editorOptions.disabled", true)

            UserHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    if (isArray(data.roles, 0)) {
                        data.roles = data.roles[0].code;
                        data.roles === RolesEnum.SALES_COORDINATOR && visibleSalesCoordinator(data.roles)
                    }

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
                        onClick: ({ loading }) => {
                            loading(true)
                            UserHelper.delete(id, ({ status }) => {
                                loading(false)
                                status && onSuccess()
                            })
                        }
                    }]
                }}
            >
                <MoreHorizRoundedIcon />
            </BgsButton>}</>}
            footer={<>
                <BgsButton variant="text" className="btn-cancel" onClick={() => hide()}>Batal</BgsButton>
                <BgsButton className="btn-save" loading={loading} visibleLoading type="submit">Simpan {id && " Perubahan"}</BgsButton>
            </>}
        >
            <BgsForm name="main" {...group} />
        </DrawerLayout>}
    />
}