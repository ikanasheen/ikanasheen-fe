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

    //DAFTAR IKAN
    {
        menuCode: "daftar-ikan",
        menuName: "Daftar Ikan",
        details: ["list", "create", "update", "delete"],
        menuPath: "/daftar-ikan",
        menuIcon: "material-icons-round|price_change",
        idRole: [1]
    },
    {
        menuCode: "daftar-ikan",
        menuName: "Daftar Ikan",
        details: ["list"], //list aja
        menuPath: "/daftar-ikan",
        menuIcon: "material-icons-round|price_change",
        idRole: [3]
    },

    //DAFTAR NELAYAN
    {
        menuCode: "nelayan",
        menuName: "Daftar Nelayan",
        details: ["list"],
        menuPath: "/nelayan",
        menuIcon: "material-icons-round|contacts",
        idRole: [1, 2]
    },

    //TRANSAKSI
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
    
    //SOSIALISASI
    {
        menuCode: "sosialisasi",
        menuName: "Sosialisasi",
        details: ["list", "create", "update"],
        menuIcon: "material-icons-round|tips_and_updates",
        menuPath: "/sosialisasi",
        idRole: [1]
    },
    {
        menuCode: "sosialisasi",
        menuName: "Sosialisasi",
        details: [],
        menuIcon: "material-icons-round|tips_and_updates",
        menuPath: "/sosialisasi/berita",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-berita",
        menuName: "Berita",
        menuParent:"sosialiasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/sosialisasi/berita",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-informasi",
        menuName: "Informasi",
        menuParent:"sosialiasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/sosialisasi/informasi",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-pengembangan-diri",
        menuName: "Pengembangan Diri",
        menuParent:"sosialiasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/sosialisasi/pengembangan-diri",
        idRole: [3, 2]
    },

    //BANTUAN
    {
        menuCode: "bantuan",
        menuName: "Bantuan",
        details: [""],
        menuIcon: "material-icons-round|sticky_note_2",
        menuPath: "/bantuan",
        idRole: [1, 3]
    },
    {
        menuCode: "bantuan-tersedia",
        menuName: "Bantuan Tersedia",
        details: ["list", "update"],
        menuIcon: "material-icons-round|sticky_note_2",
        menuPath: "/master-data/transaksi",
        idRole: [2]
    }
]


export default MenuConst;