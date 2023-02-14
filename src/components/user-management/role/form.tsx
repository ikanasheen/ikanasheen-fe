import { useEffect, useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton, BgsSpinner, BgsTypography } from "@andrydharmawan/bgs-component";
import MenuHelper from "helper/MenuHelper";
import RoleHelper from "helper/RoleHelper";
import { mounted } from "lib";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default function UserManagementMenuForm({ title, mode, id, hide, onSuccess = () => {} }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [menu, setMenu] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [permissionsData, setPermissionsData] = useState<any>([]);

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: (values, { loading }) => {
            loading(true)
            values.permissions = permissionsData;
            RoleHelper.createupdate(values, id, ({ status }) => {
                loading(false)
                if (status) onSuccess();
            })
        },
        formData: {
            deleted: false
        },
        item: {
            main: {
                spacing: 3,
                items: [
                    {
                        dataField: "code",
                        label: {
                            icon: "key"
                        },
                        validationRules: ["required"]
                    },
                    `roleOrder|validationRules|editorType=number`,
                    `description|validationRules|editorType=textarea`
                ]
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        MenuHelper.retrieve({
            paging: {
                limit: 10000
            },
            parameter: {
                sort: {
                    menuSort: "asc"
                }
            }
        }, ({ status, data }) => {
            setLoading(false)
            if (status) setMenu(data)
        });
    }, [])

    mounted(() => {
        if (id) {
            formRef.current?.loading(true)

            RoleHelper.detail(id, ({ status, data }) => {
                formRef.current?.loading(false);
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.itemOption("code").option("editorOptions.disabled", true);
                    setPermissionsData(data.permissions || [])
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <>
            <DrawerLayout
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
                                RoleHelper.delete(id, ({ status }) => {
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
                <BgsTypography className="title-bgs-form mgb-20">List Menu</BgsTypography>
                <Divider />
                <Box className="row">
                    {loading && <BgsSpinner />}
                    {menu.filter((x: any) => !x.parent).map(({ menuLabel, permissions = [], menuCode }: any, index: number) => <Box className="col-md-4 position-relative p-2" key={index}>
                        <Card className="p-3" sx={{ bgcolor: "#ededed" }}>
                            <BgsTypography className="text-secondary mb-2 fw-bold">{menuLabel}</BgsTypography>
                            <Card className="bg-white shadow-none p-3">
                                {permissions.map(({ label, permissionId }: any, index: number) => <FormControlLabel
                                    key={index}
                                    className="w-100"
                                    value={!!permissionsData.find((x: any) => x.permissionId === permissionId)}
                                    checked={!!permissionsData.find((x: any) => x.permissionId === permissionId)}
                                    control={<Checkbox onChange={() => {
                                        const findIndex = permissionsData.findIndex((x: any) => x.permissionId === permissionId);
                                        if (findIndex === -1) setPermissionsData([...permissionsData, { permissionId }])
                                        else setPermissionsData(permissionsData.filter((x: any) => x.permissionId !== permissionId))
                                    }} />}
                                    label={label}
                                />)}
                                {menu.filter((y: any) => y.parent).filter((y: any) => y.parent.menuCode === menuCode).length > 0 && <Box className="row">
                                    {menu.filter((y: any) => y.parent).filter((y: any) => y.parent.menuCode === menuCode).map(({ menuLabel, permissions = [] }: any, index: number) => <Box className="col-md-12 position-relative p-2" key={index}>
                                        <Card className="p-3" sx={{ bgcolor: "#e1e1e1" }}>
                                            <BgsTypography className="text-secondary mb-2 fw-bold">{menuLabel}</BgsTypography>
                                            <Card className="bg-white shadow-none p-3">
                                                {permissions.map(({ label, permissionId }: any, index: number) => <FormControlLabel
                                                    key={index}
                                                    className="w-100"
                                                    value={!!permissionsData.find((x: any) => x.permissionId === permissionId)}
                                                    checked={!!permissionsData.find((x: any) => x.permissionId === permissionId)}
                                                    control={<Checkbox onChange={() => {
                                                        const findIndex = permissionsData.findIndex((x: any) => x.permissionId === permissionId);
                                                        if (findIndex === -1) setPermissionsData([...permissionsData, { permissionId }])
                                                        else setPermissionsData(permissionsData.filter((x: any) => x.permissionId !== permissionId))
                                                    }} />}
                                                    label={`${label}`}
                                                />)}
                                            </Card>
                                        </Card>
                                    </Box>)}
                                </Box>}
                            </Card>
                        </Card>
                    </Box>)}
                </Box>
            </DrawerLayout>
        </>}
    />
}