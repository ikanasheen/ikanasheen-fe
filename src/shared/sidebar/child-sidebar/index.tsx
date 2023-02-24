import { BgsForm, BgsTypography, FormModel, useRouter } from "@andrydharmawan/bgs-component";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { isArray } from "lib";
import { MenuModel } from "models";
import { MenuPermissionWrapper } from "models/menu.model";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";
import Slide from '@mui/material/Slide';
import MenuConst from "consts/menu.const";

interface ChildSidebarProps {
    menuCode?: string;
}

function ChildSidebar({ menuCode: menuCodeActive }: ChildSidebarProps) {
    const router = useRouter();
    const [menu, setMenu] = useState<MenuModel[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        let menuTemp: MenuModel[] = [];
        const menuStorage: MenuPermissionWrapper[] = MenuConst;
        if (isArray(menuStorage, 0) && menuStorage) {
            const find = menuStorage.find(x => x.menuCode === menuCodeActive);
            if (find) {
                if (find.menuParent) {
                    const recursiveMenu = (menuCode: string): MenuModel[] => {
                        return menuStorage.filter(y => y.menuParent === menuCode).map(({ menuCode, menuName, menuPath, menuIcon }) => ({ menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
                    }

                    menuStorage.filter(x => x.menuParent === find.menuParent).forEach(({ menuCode, menuName, menuPath, menuIcon }) => menuTemp.push({ menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
                    setMenu(menuTemp);
                }
            }
        }
    }, [router, router.query, router.pathname])

    const form: FormModel = {
        items: [{
            dataField: "search",
            label: {
                visible: false
            },
            editorOptions: {
                allowClear: true,
                placeholder: "Search menu...",
                onChange: ({ value }) => setSearch(value || "")
            }
        }]
    }

    const menuFixed = menu.filter(x => x.menuName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return <>
        {!!menu.length && <Box className="sidebar-secondary">
            <Box className="form-sidebar-search">
                <BgsForm {...form} />
            </Box>
            <Divider />
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <List>
                    {menuFixed.map(({ menuName, menuPath, menuIcon = "material-icons-round|folder_open", menuCode }, index) => <Link to={menuPath || ""} key={index}>
                        <Tooltip title={menuName} placement="right">
                            <ListItem button className={`${menuCode === menuCodeActive ? "active" : ""}`} selected={menuCode === menuCodeActive}>
                                <ListItemIcon>
                                    <Icon baseClassName={menuIcon.split("|")[0] || "material-icons-round"}>{menuIcon.split("|")[1] || "folder_open"}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={menuName} />
                            </ListItem>
                        </Tooltip>
                    </Link>)}
                    {!menuFixed.length && <BgsTypography className="text-center text-hint-color fs-15 pd-10 mgt-10">No menu found.</BgsTypography>}
                </List>
            </Slide>
        </Box>}
    </>
}

export default connect(state => state)(ChildSidebar);