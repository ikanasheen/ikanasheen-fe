import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { BgsButton, bgsModalConfirmation, BgsTypography, useRouter } from "@andrydharmawan/bgs-component";
import { credential } from "lib";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import Tooltip from '@mui/material/Tooltip';
import store, { ConfigureStore } from "store";
import Notifications from '@mui/icons-material/NotificationsNoneRounded';
import "./index.scss";
const drawerWidth = 270;
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "#808080",
    borderBottom: "1px solid #c7c7c7",
    transition: ".3s",
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: ".3s"
    })
}));

function MainNavigation() {
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [fullName, setFullName] = useState<string | null | undefined>();
    const [email, setEmail] = useState<string | null | undefined>();

    const { sidebarOpen = true }: ConfigureStore = store.getState();

    useEffect(() => {
        const { fullName: name, email } = credential.storage.get("user") || {};

        setFullName(name);
        setEmail(email);
    }, [])

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
                // UserHelper.authLogout(({ status }) => {
                loading(false)
                modalRef.closeOnOutsideDisabled(false)
                // if (status) 
                credential.storage.delete(), router.push("/login")
                // })
            }
        })
    }

    return (
        <AppBar position="fixed" open={sidebarOpen} className="shadow-none b-0" sx={{ borderBottom: 0 }}>
            <Toolbar className="pdl-0 pdr-0" sx={{ justifyContent: "space-between" }}>
                <Box className="d-flex align-items-center">
                    <Box className={`d-flex justify-content-center align-items-center ${sidebarOpen ? "" : "drawer-header wt-75 hg-64"}`} >
                        {!sidebarOpen && <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO_SMALL}`} alt="CRESA" className="mini-logo" />}
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, width: sidebarOpen ? "100%" : "calc(100% - 75px)", borderBottom: "2px solid #0193cb17" }}>
                    <BgsTypography className="fw-bold fs-18 ms-3">👋Hi {fullName || "user"}!</BgsTypography>
                    <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", pr: 2 }}>
                        <BgsButton className="btn br-20 me-4 shadow-none ps-4 pe-4" to="/event-catalog/create"><EventAvailableRoundedIcon /> Create Event</BgsButton>
                        <Tooltip title="Inbox">
                            <IconButton className="me-3" sx={{ bgcolor: "#0193cb17" }}>
                                <Badge badgeContent={0} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 } }}>
                                    <MailOutlineOutlinedIcon sx={{ fontSize: 25, color: "#228abc" }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notification">
                            <IconButton className="me-4" sx={{ bgcolor: "#0193cb17" }}>
                                <Badge badgeContent={0} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 } }}>
                                    <Notifications sx={{ fontSize: 25, color: "#228abc" }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <Button onClick={handleOpenUserMenu} sx={{ p: 0, m: 0, minWidth: 0 }} size="small">
                                <Avatar sx={{ width: 34, height: 34 }} variant="circular" />
                            </Button>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "&:before": {
                                        content: "''",
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <Box className="d-flex flex-column justify-content-center align-items-center p-3 ps-4 pe-4 min-wt-250">
                                <Avatar className="p-0 m-0 mb-2" sx={{ width: 45, height: 45 }} variant="rounded" />
                                <BgsTypography className="fw-bold">{fullName}</BgsTypography>
                                <BgsTypography className="text-secondary">{email}</BgsTypography>
                            </Box>
                            <Divider />
                            <MenuItem>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default connect(state => state)(MainNavigation);