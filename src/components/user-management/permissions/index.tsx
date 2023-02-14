import { TableModel, BgsTable, TableRef } from "@andrydharmawan/bgs-component";

import AddIcon from "@mui/icons-material/Add";
import PermissionHelper from "helper/PermissionHelper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { modalUserManagementPermissionsForm } from "./form";
import { useRef } from "react";
import { MenuModel } from "../menu/menu";
import Box from "@mui/material/Box";

export default function UserManagementPermissionsList({ menuCode }: MenuModel) {
    const tableRef = useRef<TableRef>(null);

    const onSuccess = () => {
        tableRef.current?.refresh();
    }

    const table: TableModel = {
        helper: data => PermissionHelper.retrieve(data),
        parameter: () => {
            return {
                filter: { "menu.menuCode": [menuCode] }
            }
        },
        toolbar: {
            items: [{
                onClick: () => modalUserManagementPermissionsForm({ menuCode, onSuccess }),
                prefix: () => <AddIcon />,
                className: "btn hg-46 wt-210",
                text: "Create New"
            }]
        },
        title: "Permission List",
        showIndexing: true,
        columns: [
            "action|width=200",
            "label|width=200",
            {
                caption: "Action",
                cellType: "action",
                sticky: "right",
                width: 50,
                cellOptions: {
                    items: [{
                        variant: "icon",
                        actionType: "menu",
                        suffix: () => <MoreVertIcon />,
                        menuOptions: {
                            items: [{
                                text: "Edit",
                                onClick: ({ data }) => modalUserManagementPermissionsForm({ menuCode, permissionId: data.permissionId, onSuccess })
                            }, {
                                text: "Delete",
                                actionType: "modal",
                                onClick: ({ loading, data, modalRef, tableRef }) => {
                                    loading(true)
                                    PermissionHelper.delete(data.permissionId, ({ status }) => {
                                        loading(false)
                                        if (status) modalRef.hide(), tableRef.refresh()
                                    })
                                }
                            }]
                        }
                    }]
                }
            }
        ]
    }

    return <Box className="p-4">
        <BgsTable {...table} ref={tableRef} />
    </Box>
}