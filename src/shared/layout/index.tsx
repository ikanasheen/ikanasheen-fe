import { connect } from "react-redux";
import { clearDrawer, clearModal, bgsStoreDispatch, clearMenu } from "@andrydharmawan/bgs-component";
import HeadTitle from "../head-title";
import React, { useEffect, useState } from "react";
import configureStore, { ConfigureStore, storeDispatch } from "store";
import { MenuPermissionWrapper } from "models/menu.model";
import { ConfigurationPermissionsModel } from "models/configuration-roles.model";
import { useRouter } from "@andrydharmawan/bgs-component";
import { v4 } from "uuid";
import LoadingLayout from "./loading-layout";
import MenuConst from "consts/menu.const";

export interface BgsLayoutProps {
    title: string;
    menuCode?: string;
    actionCode?: string;
    permissions?: ConfigurationPermissionsModel;
    mode?: "index" | "create" | "edit" | "detail";
    render?: (props: BgsLayoutRenderProps) => React.ReactElement;
}

interface BgsLayoutRenderProps {
    title: string;
    menuCode?: string;
    actionCode?: string;
    isAuthorize: boolean;
    key: string;
}

const BgsLayout = ({ title, menuCode, actionCode, render }: BgsLayoutProps) => {
    const router = useRouter();
    const [isAuthorize, setIsAuthorize] = useState<boolean>(true);
    const [key, setKey] = useState<string>(v4());
    const { isFirstLoad }: ConfigureStore = configureStore.getState();

    useEffect(() => {
        setTimeout(() => storeDispatch({ isFirstLoad: false }), 700)
    })

    useEffect(() => {
        clearModal();
        clearDrawer();
        clearMenu();

        if (menuCode && actionCode) {
            const menu: MenuPermissionWrapper[] = MenuConst || [];
            const data = menu.find(x => x.menuCode === menuCode && x.details.includes(actionCode));
            bgsStoreDispatch({ accessRoles: data?.details })

            if (menu.length) setIsAuthorize(!!data)
            else setIsAuthorize(false)

            setKey(v4())
        }
    }, [router, router.query, router.pathname])

    return <div>
        <HeadTitle title={title} />
        {(isFirstLoad && false) && <LoadingLayout />}
        {render ? render({ title, menuCode, actionCode, isAuthorize, key }) : null}
    </div>
}

export default connect(state => state)(BgsLayout);