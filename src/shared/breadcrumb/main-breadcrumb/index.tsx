import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useEffect, useState } from "react";
import { useRouter } from "@andrydharmawan/bgs-component";
import { BgsButton } from "@andrydharmawan/bgs-component";
import { MenuModel } from "models/index";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { MenuPermissionWrapper } from "models/menu.model";
import { credential, isArray } from "lib";

export default function MainBreadcrumb() {
    const router = useRouter();
    const [breadcrumb, setBreadcrumb] = useState<MenuModel[]>([]);

    const findBreadcrumb = (x: MenuModel): any => {
        if (x.menuPath) {
            if (x.menuPath === "/" || x.menuPath === "/") return null;
            else return router.pathname.includes(x.menuPath);
        }
        else if (x.children?.length) return x.children.find(findBreadcrumb);
        return null
    }

    useEffect(() => {
        let breadcrumbTemp: MenuModel[] = [];
        let menuTemp: MenuModel[] = [];
        const menuStorage: MenuPermissionWrapper[] = credential.storage.get("menu") || [];
        if (isArray(menuStorage, 0) && menuStorage) {
            const recursiveMenu = (menuCode: string): MenuModel[] => {
                return menuStorage.filter(y => y.menuParent === menuCode).map(({ menuCode, menuName, menuPath, menuIcon, ...others }) => ({ ...others, menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))
            }

            menuStorage.filter(x => !x.menuParent && x.menuCode.includes("bo-")).forEach(({ menuCode, menuName, menuPath, menuIcon, ...others }) => menuTemp.push({ ...others, menuCode, menuName, menuPath, menuIcon, children: recursiveMenu(menuCode) }))

            const find = menuTemp.find(findBreadcrumb)

            if (find) {
                breadcrumbTemp.push(find)
                if (find.children?.length) {
                    const findChild = find.children.find(findBreadcrumb);
                    if (findChild) breadcrumbTemp.push(findChild)
                }
            }
            setBreadcrumb(breadcrumbTemp)
        }

    }, [router, router.query])

    return <div className="hg-40 d-flex align-items-center container">
        <Breadcrumbs aria-label="breadcrumb">
            <BgsButton variant="text" className="max-wt-25 min-wt-0 hg-25 text-secondary" to={"/"}>
                <HomeRoundedIcon className="fs-18 text-secondary" />
            </BgsButton>
            {breadcrumb.map(({ menuName: name, children }, index) => <BgsButton
                key={index}
                variant="text"
                {...children?.length ? {
                    actionType: "menu",
                    menuOptions: {
                        items: children.map(({ menuName: text, menuPath: to }) => {
                            return {
                                text,
                                to
                            }
                        })
                    }
                } : null}
                className={`hg-25 text-secondary min-wt-0 ${children?.length ? "" : "fw-bold"}`}
            >
                {name} {children?.length ? <ArrowDropDownRoundedIcon className="text-secondary" /> : null}
            </BgsButton>)}
        </Breadcrumbs>
    </div>
}