import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren, useEffect } from "react";
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
    const { sidebarOpen: open = true } = store.getState();

    useEffect(() => {
        if (!credential.storage.get("token")) router.push("/login")
    }, [])

    const handleDrawerClose = () => {
        storeDispatch(({ sidebarOpen }) => ({
            sidebarOpen: !sidebarOpen
        }))
    };

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
                    left: open ? 259 : 60,
                    zIndex: 1200,
                    transition: ".3s"
                }} onClick={handleDrawerClose}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</BgsButton>}
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
            </Box>
        </>}
    />
}
// "#f1f4f8"
export default connect(state => state)(MainLayout);