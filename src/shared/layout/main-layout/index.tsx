import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren, useEffect, useState } from "react";
import { connect } from "react-redux";
import MainNaviation from "shared/navigation/main-naviation";
import MainSidebar from "shared/sidebar/main-sidebar";
import { credential } from "lib";
import { BgsButton, useRouter } from "@andrydharmawan/bgs-component";
import BgsLayout, { BgsLayoutProps } from "..";
import Error403 from "shared/error-page/page-403";
import LoadingPage from "shared/loading-page";
import { Suspense } from "react";
import store, { storeDispatch } from "store";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChildSidebar from "shared/sidebar/child-sidebar";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

export interface MainLayoutProps extends BgsLayoutProps {
    onScroll?: (event: React.SyntheticEvent) => any;
    usingBreadcrumb?: boolean;
    usingContainer?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function MainLayout({ children, title, menuCode, actionCode, usingContainer = true }: PropsWithChildren<MainLayoutProps>) {
    const router = useRouter();
    const { sidebarOpen = true } = store.getState();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!credential.storage.get("token")) router.push("/login")
    }, [])

    const handleDrawerClose = () => {
        storeDispatch(({ sidebarOpen }) => ({
            sidebarOpen: !sidebarOpen
        }))
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <BgsLayout
        title={title}
        menuCode={menuCode}
        actionCode={actionCode}
        render={({ isAuthorize, key }) => <>
            <Box sx={{ display: 'flex' }}>
                {false && <CssBaseline />}
                {false && <MainNaviation />}
                <MainSidebar menuCode={menuCode} />
                {false && <BgsButton className="btn-hide" sx={{
                    position: "absolute",
                    bottom: 10,
                    left: sidebarOpen ? 259 : 60,
                    zIndex: 1200,
                    transition: ".3s"
                }} onClick={handleDrawerClose}>{sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</BgsButton>}
                <ChildSidebar menuCode={menuCode} />
                <Box component="main" sx={{ flexGrow: 1, height: "100vh" }}>
                    {false && <DrawerHeader />}
                    <Box className="scroll" sx={{ padding: usingContainer ? "30px" : 0, minHeight: "100vh", height: "100vh", overflowY: "auto", bgcolor: "#f8f9fa", position: "relative" }}>
                        <Suspense fallback={<LoadingPage />}>
                            <div key={key}>
                                {isAuthorize ? children : <Error403 />}
                            </div>
                        </Suspense>
                    </Box>
                </Box>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    sx={{p: 20}}
                >   
                    <TextField fullWidth />
                </Popover>
                <Fab sx={{ position: "fixed", bottom: 10, right: 10 }} onClick={handleClick}>
                    <ForumRoundedIcon />
                </Fab>
            </Box>
        </>}
    />
}
// "#f1f4f8"
export default connect(state => state)(MainLayout);