import { useEffect, useRef } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, bgsModal, BgsButton, ModalFunc } from "@andrydharmawan/bgs-component";
import { MainLayoutProps } from "shared/layout/main-layout";
import PermissionHelper from "helper/PermissionHelper";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

interface UserManagementPermissionsFormProps extends MainLayoutProps {
    modalOptions: ModalFunc;
    permissionId?: number;
    menuCode: string;
    onSuccess: Function;
}

export default function UserManagementPermissionsForm({ title, mode, modalOptions, permissionId, menuCode, onSuccess }: UserManagementPermissionsFormProps) {
    const formRef = useRef<FormRef>(null);

    const form: FormGroupModel = {
        onSubmit: (values, { loading }) => {
            loading(true);
            modalOptions.closeOnOutsideDisabled(true);

            const {
                action, deleted, label, permissionId, sort
            } = values;

            PermissionHelper.createupdate({
                action, deleted, label, menuCode, permissionId, sort
            }, permissionId, ({ status }) => {
                loading(false)
                modalOptions.closeOnOutsideDisabled(false)
                if (status) modalOptions.hide(), onSuccess();
            })
        },
        formData: {
            deleted: false
        },
        item: {
            main: {
                items: [
                    `action|validationRules`,
                    `label|validationRules`,
                    `sort|validationRules|editorType=number`
                ]
            }
        }
    }

    useEffect(() => {
        if (permissionId) {
            formRef.current?.loading(true)

            PermissionHelper.detail(permissionId, ({ status, data }) => {
                formRef.current?.loading(false);
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) formRef.current?.updateData(data);
            })
        }
    }, [])
    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <Box className="p-3">
            <h4 className="text-secondary fs-20">{title}</h4>
            <Divider />
            <Box className="mt-3">
                <BgsForm name="main" {...group} />
            </Box>

            <Box className="mt-4">
                <BgsButton className="me-2 btn hg-40 wt-100 shadow-none br-30" type="submit">{mode === "create" ? "Save" : "Update"}</BgsButton>
                <BgsButton variant="text" className="hg-40 wt-100 btn-cancel shadow-none br-30"  onClick={() => modalOptions.hide()}>Cancel</BgsButton>
            </Box>
        </Box>}
    />
}

interface ModalUserManagementPermissionsFormProps {
    menuCode: string;
    permissionId?: number;
    onSuccess: Function;
}

export function modalUserManagementPermissionsForm({ permissionId, menuCode, onSuccess }: ModalUserManagementPermissionsFormProps) {
    bgsModal({
        width: 400,
        render: e => <div className="p-3">
            <UserManagementPermissionsForm title={`${permissionId ? "Edit" : "Add"} Permissions`} onSuccess={onSuccess} menuCode={menuCode} permissionId={permissionId} mode={!permissionId ? "create" : "edit"} modalOptions={e} />
        </div>
    })
}