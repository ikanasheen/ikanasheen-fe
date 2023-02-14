import { BgsButton, BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Children, lazy, Suspense, useState } from "react";
import "./index.scss";
import CloseIcon from '@mui/icons-material/Close';

interface MyAccountComponentProps {
    hide: Function;
}

type MenuType = "profile" | "change-password"

interface MenuProps {
    label: string;
    value: MenuType;
    icon: string;
}

const menu: MenuProps[] = [{
    label: "Profile",
    value: "profile",
    icon: "ri-user-3-line"
}, {
    label: "Ubah Password",
    value: "change-password",
    icon: "ri-key-line"
}];

type ComponentProps = {
    [x in MenuType]: any;
};

const component: ComponentProps = {
    profile: lazy(() => import("./profile")),
    "change-password": lazy(() => import("./change-password")),
}

export default function MyAccountComponent({ hide }: MyAccountComponentProps) {
    const [active, setActive] = useState<MenuType>(menu[0].value);
    const Component = component[active];

    return <Box className="position-relative">
        <Grid container>
            <Grid xs={4} className="sidebard-account-menu">
                <BgsTypography className="text-secondary fs-12">My Account</BgsTypography>
                {Children.toArray(menu.map(({ value, label, icon }) => <BgsButton onClick={() => setActive(value)} className={active === value ? "active" : ""} variant="text"><i className={`${icon} me-2`}></i> {label}</BgsButton>))}
            </Grid>
            <Grid xs={8} className="account-content">
                <Suspense>
                    <Component />
                </Suspense>
            </Grid>
        </Grid>
        <BgsButton className="close-modal" variant="icon" onClick={() => hide()}><CloseIcon /></BgsButton>
    </Box>
}