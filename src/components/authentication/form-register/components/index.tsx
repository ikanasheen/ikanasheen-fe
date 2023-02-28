import { BgsButton, BgsTypography } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Children, lazy, Suspense, useState } from "react";
import "../index.scss";
import CloseIcon from '@mui/icons-material/Close';

interface RegisterComponentProps {
    hide: Function;
}

type MenuType = "nelayan" | "pembeli"

interface MenuProps {
    label: string;
    value: MenuType;
}

const menu: MenuProps[] = [{
    label: "Nelayan",
    value: "nelayan"
}, {
    label: "Pembeli",
    value: "pembeli"
}];

type ComponentProps = {
    [x in MenuType]: any;
};

const component: ComponentProps = {
    nelayan: lazy(() => import("./nelayan")),
    "pembeli": lazy(() => import("./pembeli")),
}

export default function RegisterComponent({hide }: RegisterComponentProps) {
    const [active, setActive] = useState<MenuType>(menu[0].value);
    const Component = component[active];

    return <Box className="position-relative">
        <Grid container>
            <Grid xs={4} className="sidebard-account-menu">
                <BgsTypography className="text-secondary fs-12">My Account</BgsTypography>
                {Children.toArray(menu.map(({ value, label }) => <BgsButton onClick={() => setActive(value)} className={active === value ? "active" : ""} variant="text">{label}</BgsButton>))}
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