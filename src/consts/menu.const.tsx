import { MenuPermissionWrapper } from "models/menu.model";

export const MenuConst: MenuPermissionWrapper[] = [
    {
        menuCode: "dashboard",
        menuName: "Dashboard",
        menuPath: "/",
        details: ["list"],
        menuIcon: "material-icons-round|dashboard",
        role: ["admin", "nelayan"]
    },
    {
        menuCode: "master-data",
        menuName: "Master Data",
        details: [],
        menuPath: "/master-data/distribusi",
        menuIcon: "material-icons-round|view_list",
        role: ["admin"]
    },
    {
        menuParent: "master-data",
        menuCode: "distribusi",
        menuName: "Distribusi",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|folder",
        menuPath: "/master-data/distribusi",
        role: ["admin"]
    },
    {
        menuParent: "master-data",
        menuCode: "address",
        menuName: "Transaksi",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|folder",
        menuPath: "/master-data/territory",
        role: ["admin"]
    }
]


export default MenuConst;