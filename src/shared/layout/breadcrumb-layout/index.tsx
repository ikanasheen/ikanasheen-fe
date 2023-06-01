import { MainLayoutProps } from "shared/layout/main-layout";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import "./index.scss"
import { Link } from "react-router-dom";
import ArrowDropDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { BgsButton, useRouter } from "@andrydharmawan/bgs-component";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import { MenuModel } from "models";
import { credential, isArray } from "lib";
import { MenuPermissionWrapper } from "models/menu.model";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import MenuConst from "consts/menu.const";

interface BreadcrumbLayoutProps extends MainLayoutProps {
    action?: JSX.Element;
}

export default function BreadcrumbLayout({
    action,
    children,
    menuCode,
    // actionCode
}: PropsWithChildren<BreadcrumbLayoutProps>) {
    const [breadcrumb, setBreadcrumb] = useState<MenuModel[]>([]);
    const [active] = useState<string>("");
    const router = useRouter();

    const findBreadcrumb = (x: MenuModel): any => {
        if (x.menuPath) {
            console.log(router.pathname, "pathname")
            console.log(x, "x aja")
            if (x.menuPath === "/" || x.menuPath === "/") return null;
            else return router.pathname===x.menuPath;
        }
        else if (x.children?.length) return x.children.find(findBreadcrumb);
        return null
    }

    useEffect(() => {
        const { idRole } = credential.storage.get("user") || {};

        let breadcrumbTemp: MenuModel[] = [];
        let menuTemp: MenuModel[] = [];
        console.log(menuCode, "menucodeee")
        const menuStorage: MenuPermissionWrapper[] = MenuConst.filter(x => x.idRole.includes(idRole)) || [];
        if (isArray(menuStorage, 0) && menuStorage) {
            const recursiveMenu = (menuCode: string): MenuModel[] => {
                return menuStorage.filter(y => y.menuParent === menuCode).map(({ menuCode, menuName, menuPath, menuIcon, ...others }) => ({ ...others, menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
            }

            menuStorage.filter(x => !x.menuParent).forEach(({ menuCode, menuName, menuPath, menuIcon, ...others }) => menuTemp.push({ ...others, menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
            const find = menuTemp.find(findBreadcrumb)
            if (find) {
                breadcrumbTemp.push(find)
                if (find.children?.length) {
                    const findChild = find.children.find(findBreadcrumb);
                    if (findChild) breadcrumbTemp.push(findChild)
                    console.log(findChild, "FIndd Child")
                }
            }

            setBreadcrumb(breadcrumbTemp)
        }

    }, [router, router.query])

    return <>
        <Box className="pd-25 d-flex align-items-center justify-content-between min-hg-90" sx={{ paddingRight: "10px !important" }}>
            <Breadcrumbs className="bgs-breadcrumb">
                <Link color="inherit" to="/">
                    <HomeOutlinedIcon />
                </Link>
                {Children.toArray(breadcrumb.map(item => <BreadcrumbItem {...item} menuCodeActive={menuCode} />))}
                {!!active && <Typography color="text.primary">{active}</Typography>}
            </Breadcrumbs>
            {action}
        </Box>
        {children}
    </>
}

interface BreadcrumbItemProps extends MenuModel {
    menuCodeActive: string | undefined;
}

const BreadcrumbItem = ({ children, menuName, menuCodeActive, menuPath = "" }: BreadcrumbItemProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const router = useRouter()

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (children?.length) return <>
        <Typography color="inherit"><BgsButton onClick={({ event }) => handleOpenUserMenu(event)} variant="text" size="small" color="inherit" sx={{ fontSize: "inherit" }}>{menuName} <ArrowDropDownRoundedIcon color="inherit" /></BgsButton></Typography>
        <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
                className: "min-wt-200 br-3"
            }}
        >
            {Children.toArray(children.map(({ menuName, menuIcon = "folder_open", menuCode, menuPath = "" }) => <MenuItem selected={menuCodeActive === menuCode} onClick={() => router.push(menuPath)}>
                <ListItemIcon>
                    <Icon baseClassName="material-icons-round">{menuIcon}</Icon>
                </ListItemIcon>
                {menuName}
            </MenuItem>))}
        </Menu>
    </>
    else return <Typography color="text.primary">
        <Link color="inherit" to={menuPath}>
            {menuName}
        </Link>
    </Typography>
}