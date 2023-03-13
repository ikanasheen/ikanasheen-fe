
import { BgsButton, bgsDrawer, BgsTypography } from "@andrydharmawan/bgs-component";
import { PropsWithChildren, Suspense } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { MainLayoutProps } from "../main-layout";

interface DrawerLayoutProps2 {
    render: (props: DrawerRenderProps2) => any;
    onSuccess?: Function;
}

interface DrawerRenderProps2 {
    onSuccess: Function;
    hide: Function;
    closeOnOutsideDisabled: Function;
}

export interface DrawerRenderProps extends MainLayoutProps {
    onSuccess?: Function;
    hide: Function;
    params?: any;
    id?: any;
    idUserNelayan?:any,
    hargaNego?:any,
    isNego?:any,
    closeOnOutsideDisabled: Function;
}

export function drawerLayout({ render, onSuccess = () => { } }: DrawerLayoutProps2) {
    return bgsDrawer({
        anchor: "right",
        width: "calc(100vw / 2)",
        render: ({ hide, closeOnOutsideDisabled }) => <>
            <Suspense>
                {render({
                    hide,
                    onSuccess: () => {
                        hide()
                        onSuccess()
                    },
                    closeOnOutsideDisabled
                })}
            </Suspense>
            <BgsButton className="close-drawer" variant="icon" onClick={() => hide()}><CloseIcon /></BgsButton>
        </>
    })
}

export default DrawerLayout;

interface ScrollEventProps {
    scrollTop: number; offsetHeight: number; scrollHeight: number;
}

const scrollEvent = ({ scrollTop = 0, offsetHeight = 0, scrollHeight = 0 }: ScrollEventProps) => {
    const start = scrollTop > 0;
    const end = scrollTop + offsetHeight < scrollHeight;
    const stickyRight = document.getElementsByClassName("form-footer");
    const stickyLeft = document.getElementsByClassName("form-header");

    if (stickyRight.length) {
        for (let index = 0; index < stickyRight.length; index++) {
            end ? stickyRight[index].classList.add("shadow-bottom") : stickyRight[index].classList.remove("shadow-bottom");
        }
    }
    if (stickyLeft.length) {
        for (let index = 0; index < stickyLeft.length; index++) {
            start ? stickyLeft[index].classList.add("shadow-top") : stickyLeft[index].classList.remove("shadow-top");
        }
    }

}

interface DrawerLayoutProps {
    footer?: any;
    title: any;
    action?: any;
    noPadding?: boolean;
}

function DrawerLayout({ title, children, footer, action, noPadding = false }: PropsWithChildren<DrawerLayoutProps>) {
    return <Box className="form-container">
        <Box className="form-header">
            <BgsTypography>{title}</BgsTypography>
            {action}
        </Box>
        <Box className={`form-content ${!footer && "no-footer"} ${noPadding && "no-padding"}`} onScroll={(ref) => {
            const { scrollTop = 0, offsetHeight = 0, scrollHeight = 0 } = ref.currentTarget || {};
            scrollEvent({ scrollTop, offsetHeight, scrollHeight })
        }}>
            {children}
        </Box>
        {footer && <Box className="form-footer">
            {footer}
        </Box>}
    </Box>
}