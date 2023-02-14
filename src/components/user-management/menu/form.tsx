import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { lazy, Suspense, useRef } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsButton, bgsModalConfirmation, bgsModal } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import MenuHelper from "helper/MenuHelper";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { mounted } from "lib";
import { MenuModel } from "./menu";
import UserManagementPermissionsList from "../permissions";
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";

interface UserManagementMenuFormProps extends MainLayoutProps {
    id?: string | null;
    onSuccess: Function;
    onCancel: Function;
    menuParent: MenuModel | null;
}

export default function UserManagementMenuForm({ id, onSuccess, onCancel, menuParent }: UserManagementMenuFormProps) {
    const formRef = useRef<FormRef>(null);

    const showIcon = () => {
        const MaterialIconComponent = lazy(() => import("./components/modal-icon"));
        bgsModal({
            width: "50%",
            render: ({ hide }) => <Suspense fallback={<Box sx={{ height: "calc(100vh - 150px)" }} className="w-100 d-flex align-items-center justify-content-center"><CircularProgress /></Box>}>
                <MaterialIconComponent onSelected={({ ligature, type }) => formRef.current?.updateData({ menuIcon: `${type}|${ligature}` })} hide={hide} />
            </Suspense>
        })
    }

    const form: FormGroupModel = {
        onSubmit: (values, { loading }) => {
            loading(true)
            MenuHelper.createupdate(values, id, ({ status }) => {
                loading(false)
                if (status) onSuccess();
            })
        },
        formData: {
            deleted: false,
            menuType: "view"
        },
        item: {
            main: {
                colCount: 2,
                items: [
                    `menuCode|validationRules`,
                    `menuLabel|validationRules`,
                    `menuType|validationRules`,
                    `menuSort|validationRules|editorType=number`,
                    `titlePage|validationRules`,
                    `titleContent|validationRules`,
                    `menuPath`,
                    {
                        template: ({ value }) => <Box className="d-flex" sx={{ alignItems: "center", gap: 1 }}>
                            <Icon baseClassName={value.split("|")[0] || "material-icons-round"}>{value.split("|")[1] || "folder_open"}</Icon>
                            <BgsButton onClick={showIcon}><InfoRoundedIcon className="fs-16 me-2" />Choose Icon</BgsButton>
                        </Box>,
                        dataField: "menuIcon",
                        // label: {
                        //     hint: <a href="https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Icons" target="_blank" className="d-flex align-items-center mt-1 text-black"><InfoRoundedIcon className="fs-16 text-warning me-2" /> <span>Click to show reference icon</span></a> as any
                        // }
                    }
                ]
            }
        }
    }

    const deleteData = () => {
        if (id) {
            bgsModalConfirmation({
                onClick: ({ loading, modalRef }) => {
                    loading(true)
                    modalRef.closeOnOutsideDisabled(true)
                    MenuHelper.delete(id, ({ status }) => {
                        loading(false)
                        modalRef.closeOnOutsideDisabled(false)
                        if (status) onSuccess(), modalRef.hide()
                    })
                }
            })
        }
    }

    mounted(() => {
        formRef.current?.itemOption("menuCode").option("editorOptions.disabled", !!id)
        formRef.current?.reset();

        if (menuParent) {
            formRef.current?.updateData({ menuParent: menuParent.menuCode })
        }
        else if (id) {
            formRef.current?.loading(true)

            MenuHelper.detail(id, ({ status, data }) => {
                formRef.current?.loading(false);
                if (status) {
                    if (data.parent) {
                        data.menuParent = data.parent.menuCode;
                        delete data.parent;
                    }
                    formRef.current?.updateData(data);
                }
            })
        }
    }, [id, menuParent])

    const permission = () => {
        if (id) bgsModal({
            width: "60%",
            render: () => <Paper className="p-3 pt-0 br-15 shadow-none">
                <UserManagementPermissionsList {...formRef.current?.getData()} />
            </Paper>
        })
    }

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <>
            <Grid item sm={12} xs={12}>
                <Paper className="p-3 br-15 shadow-none">
                    <Box className="p-2 ps-3 mt-1 mb-4 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#eeeeee", borderRadius: "10px" }}>
                        <Box>
                            <span className="fw-bold ms-3 fs-20">{menuParent ? <>Add Submenu <Chip className="chip-default" variant="filled" color="primary" label={menuParent.menuLabel} /></> : (id ? "Edit Data" : "Create New")}</span>
                        </Box>
                        {!!id && <Box className="d-flex align-items-center justify-content-end">
                            <BgsButton className="me-2" onClick={permission}><AddModeratorOutlinedIcon className="me-2" /> Permission</BgsButton>
                            <BgsButton onClick={deleteData} color="error" variant="icon" className="min-wt-0 min-wt-40"><DeleteOutlineRoundedIcon /> </BgsButton>
                        </Box>}
                    </Box>
                    <BgsForm name="main" {...group} />
                    <Box className="mt-4">
                        <BgsButton className="me-2 btn hg-40 wt-100 shadow-none br-30" type="submit">{!id ? "Save" : "Update"}</BgsButton>
                        <BgsButton variant="text" className="hg-40 wt-100 btn-cancel shadow-none br-30" onClick={() => onCancel()}>Cancel</BgsButton>
                    </Box>
                </Paper>
            </Grid>
        </>}
    />
}