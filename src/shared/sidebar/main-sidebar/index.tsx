import { lazy, Suspense, useEffect, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BgsButton, bgsModal, bgsModalConfirmation, BgsTypography, useRouter } from "@andrydharmawan/bgs-component";
import { checkVersion, credential, isArray } from "lib";
import { connect } from "react-redux";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import store, { storeDispatch } from "store";
import MenuModel, { MenuPermissionWrapper } from "models/menu.model";
import Icon from '@mui/material/Icon';
import { Link } from "react-router-dom";
import "./index.scss"
import Grid from "@mui/material/Grid";
import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined';
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";
import { useInterval } from "lib";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import UserHelper from "helper/UserHelper";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const drawerWidth = 270;
const MyAccountComponent = lazy(() => import("components/account"))

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: ".3s" || theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderRight: 0
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: ".3s",
    overflowX: 'hidden',
    width: `75px`,
    [theme.breakpoints.up('sm')]: {
        width: `75px`,
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
        marginTop: 4
    }),
);

interface MainSidebarProps {
    menuCode?: string;
}

function MainSidebar({ menuCode: menuCodeActive }: MainSidebarProps) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState<number[]>([]);
    const [menu, setMenu] = useState<MenuModel[]>([]);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { fullName, email } = credential.storage.get("user") || {};
    const { sidebarOpen: open = true, isNewVersion = false } = store.getState();

    useInterval(
        async () => {
            if (!isNewVersion) checkVersion()
        },
        { interval: 30000 },
    );

    useEffect(() => {
        let menuTemp: MenuModel[] = [];
        const menuStorage: MenuPermissionWrapper[] = credential.storage.get("menu") || [];
        if (isArray(menuStorage, 0) && menuStorage) {
            const recursiveMenu = (menuCode: string): MenuModel[] => {
                return menuStorage.filter(y => y.menuParent === menuCode).map(({ menuCode, menuName, menuPath, menuIcon }) => ({ menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
            }

            menuStorage.filter(x => !x.menuParent).forEach(({ menuCode, menuName, menuPath, menuIcon }) => menuTemp.push({ menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
            setMenu(menuTemp);
            menuTemp.forEach(({ children }, index) => {
                if (children?.length) {
                    const find = children.find(({ menuCode }) => menuCode === menuCodeActive)
                    if (find) setMenuOpen([...menuOpen.filter(x => x !== index), index])
                }
            })
        }
    }, [router, router.query, router.pathname])

    const setMenuActive = (menuCode: string) => menuCode === menuCodeActive ? "active" : "";

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        setAnchorElUser(null);
        bgsModalConfirmation({
            message: "Are you sure want to logout?",
            onClick: ({ loading, modalRef }) => {
                modalRef.closeOnOutsideDisabled(true)
                loading(true)
                UserHelper.logout(() => {
                    loading(false)
                    modalRef.closeOnOutsideDisabled(false)
                    credential.storage.delete(), router.push("/login")
                })
            }
        })
    }

    const myAccount = () => {
        setAnchorElUser(null);
        bgsModal({
            className: "modal-account",
            width: "calc(100% - 400px)",
            render: ({ hide }) => <Suspense><MyAccountComponent hide={hide} /></Suspense>
        })
    }

    return (
        <Drawer variant="permanent" open={open} className="sidebar-drawer">
            <DrawerHeader className="drawer-header">
                {
                    open
                        ? <Box className="position-relative w-100 hg-40 d-flex justify-content-start">
                            <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO}`} />
                        </Box>
                        : <Box className={`d-flex justify-content-center align-items-center ${open ? "" : "drawer-header wt-75 hg-75"}`} >
                            {!open && <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO_SMALL}`} className="mini-logo" />}
                        </Box>
                }
            </DrawerHeader>
            <Slide direction="up" in={isNewVersion} mountOnEnter unmountOnExit>
                <Box className="new-version-app">
                    <Grid container sx={{ bgcolor: "#fff", whiteSpace: "normal !important", borderRadius: "8px" }}>
                        <Grid item xs={2} className="p-2 pdt-10">
                            <Box sx={{ borderRadius: "100%", bgcolor: "#1c78bea3", height: 40, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><BrowserUpdatedOutlinedIcon sx={{ color: "#fff" }} /></Box>
                        </Grid>
                        <Grid item xs={10} className="p-2 ps-1">
                            <h4 className="text-secondary p-0 m-0 fs-16 fw-bold mgb-5">New App Version Available</h4>
                            <h5 className="text-secondary fs-12 lh-13">Please refresh the page to ensure you"re using the latest version. <br /><a style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.location.reload()}>Reload now</a></h5>
                        </Grid>
                    </Grid>
                    <BgsButton className="close-button" variant="icon" onClick={() => storeDispatch({ isNewVersion: false })}><CloseRoundedIcon /></BgsButton>
                </Box>
            </Slide>
            <List className="w-100 sidebar-component" sx={{ maxHeight: `calc(100vh - 115px${isNewVersion ? " - 85px" : ""})`, overflowX: "hidden", overflowY: "scroll", ...open ? null : { width: 75, maxWidth: 75 } }}>
                {menu.map(({ menuIcon: icon, menuName: name, menuPath: to, children, menuCode }, index): any => <Link to={isArray(children, 0) && children ? (children[0]?.menuPath || "") : (to || "")} key={index} className="menu-item">
                    <Tooltip title={name} placement="right">
                        <ListItem button className={`${setMenuActive(menuCode)} ${isArray(children, 0) && children ? (children.find(({ menuCode }) => menuCode === menuCodeActive) ? "active" : "") : ""}`} selected={isArray(children, 0) && children ? (children.find(({ menuCode }) => menuCode === menuCodeActive) ? true : false) : (setMenuActive(menuCode) === "active")}>
                            <ListItemIcon>
                                {!!icon && <Icon baseClassName={icon.split("|")[0] || "material-icons-round"}>{icon.split("|")[1] || "folder_open"}</Icon>}
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    </Tooltip>
                </Link>)}
                <div className="animation start-home"></div>
            </List>
            <Box sx={{ position: "absolute", bottom: 10 }} className="d-flex justify-content-center align-items-center w-100">
                <BgsButton variant="icon" onClick={({ event }) => handleOpenUserMenu(event)}>
                    <Avatar src="/assets/img/avatar/avatar.svg" sx={{ width: 44, height: 44 }} />
                </BgsButton>

                <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    transformOrigin={{ horizontal: "right", vertical: 250 }}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                    <Box className="d-flex flex-column justify-content-center align-items-center p-3 ps-4 pe-4 min-wt-250">
                        <Avatar className="p-0 m-0 mb-2" sx={{ width: 45, height: 45 }} variant="rounded" src="/assets/img/avatar/avatar.svg" />
                        <BgsTypography className="fw-bold">{fullName}</BgsTypography>
                        <BgsTypography className="text-secondary">{email}</BgsTypography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={myAccount}>
                        <ListItemIcon>
                            <ManageAccountsOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        My Account
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Drawer >
    );
}

export default connect(state => state)(MainSidebar);