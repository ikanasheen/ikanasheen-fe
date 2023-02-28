import { MenuPermissionWrapper } from "models/menu.model";

export const MenuConst: MenuPermissionWrapper[] = [
    //1 admin, 2 gov, 3 nelayan, 4 pembeli
    {
        menuCode: "dashboard",
        menuName: "Dashboard",
        menuPath: "/",
        details: ["list"],
        menuIcon: "material-icons-round|dashboard",
        idRole: [1, 2, 3, 4]
    },
    {
        menuCode: "harga-ikan",
        menuName: "Daftar Harga Ikan",
        details: ["list"],
        menuPath: "/harga-ikan",
        menuIcon: "material-icons-round|price_change",
        idRole: [1, 3, 2, 4]
    },
    {
        menuCode: "nelayan",
        menuName: "Daftar Nelayan",
        details: ["list"],
        menuPath: "/nelayan",
        menuIcon: "material-icons-round|contacts",
        idRole: [1, 2]
    },
    //transaksi admin, gov
    {
        menuCode: "transaksi",
        menuName: "Transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|receipt_long",
        menuPath: "/transaksi/daftar-transaksi-nelayan",
        idRole: [2, 1]
    },
    //transaksi pembeli
    {
        menuCode: "transaksi-pembeli",
        menuName: "Transaksi",
        details: [],
        menuIcon: "material-icons-round|receipt_long",
        menuPath: "/transaksi/daftar-transaksi-pembeli",
        idRole: [4]
    },
    //children transaksi pembeli   
    {
        menuCode: "daftar-transaksi-pembeli",
        menuName: "Daftar Transaksi",
        menuParent: "transaksi-pembeli",
        details: ["list", "create"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/daftar-transaksi-pembeli",
        idRole: [4]
    },

    //transaksi nelayan
    {
        menuCode: "transaksi-nelayan",
        menuName: "Transaksi",
        details: [],
        menuIcon: "material-icons-round|receipt_long",
        menuPath: "/transaksi/daftar-transaksi-nelayan",
        idRole: [3]
    },
    //children transaksi nelayan
    {
        menuCode: "daftar-transaksi-nelayan",
        menuName: "Daftar Transaksi",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/daftar-transaksi-nelayan",
        idRole: [3]
    },
    {
        menuCode: "transaksi-saya",
        menuName: "Transaksi Saya",
        menuParent: "transaksi-nelayan",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/transaksi-saya",
        idRole: [3]
    },
    //end of transaksi
    {
        menuCode: "pengembangan",
        menuName: "Pengembangan Diri",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|tips_and_updates",
        menuPath: "/master-data/transaksi",
        idRole: [1]
    },
    {
        menuCode: "pengembangan",
        menuName: "Pengembangan Diri",
        details: ["list"],
        menuIcon: "material-icons-round|tips_and_updates",
        menuPath: "/master-data/transaksi",
        idRole: [3, 2]
    },
    {
        menuCode: "pengajuan",
        menuName: "Pengajuan Proposal",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|sticky_note_2",
        menuPath: "/master-data/transaksi",
        idRole: [1, 3]
    },
    {
        menuCode: "pengajuan",
        menuName: "Pengajuan Proposal",
        details: ["list", "update"],
        menuIcon: "material-icons-round|sticky_note_2",
        menuPath: "/master-data/transaksi",
        idRole: [2]
    }
]


export default MenuConst;