import { MenuPermissionWrapper } from "models/menu.model";

export const MenuConst: MenuPermissionWrapper[] = [
    //1 admin, 2 gov, 3 nelayan, 4 pembeli
    //DASHBOARD
    {
        menuCode: "dashboard",
        menuName: "Dashboard",
        menuPath: "/",
        details: ["list"],
        menuIcon: "material-icons-round|dashboard",
        idRole: [1, 2, 3, 4]
    },

    //DAFTAR KOMODITI
    {
        menuCode: "daftar-komoditi",
        menuName: "Daftar Komoditi",
        details: ["list", "create", "update", "delete"],
        menuPath: "/daftar-komoditi",
        menuIcon: "material-icons-round|price_change",
        idRole: [1]
    },
    {
        menuCode: "daftar-komoditi",
        menuName: "Daftar Komoditi",
        details: ["list"], //list aja
        menuPath: "/daftar-komoditi",
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
    //main menu
    {
        //admin, gov
        menuCode: "transaksi", //admin gov
        menuName: "Transaksi",
        details: [],
        menuIcon: "material-icons-round|receipt_long",
        // menuPath: "/transaksi/all/semua-transaksi",
        idRole: [1,2]
    },
    {
        //pembeli
        menuCode: "transaksi-pembeli",
        menuName: "Transaksi",
        details: [],
        menuIcon: "material-icons-round|receipt_long",
        // menuPath: "/transaksi/pembeli/transaksi-pembeli",
        idRole: [4]
    },
    {
        //nelayan
        menuCode: "transaksi-nelayan",
        menuName: "Transaksi",
        details: [],
        menuIcon: "material-icons-round|receipt_long",
        // menuPath: "/transaksi/nelayan/transaksi-nelayan",
        idRole: [3]
    },
    //children admin, gov
    {
        menuCode: "semua-transaksi",
        menuName: "Semua Transaksi",
        menuParent: "transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/all/semua-transaksi",
        idRole: [2, 1] 
    },
    {
        menuCode: "transaksi-belum-diproses",
        menuName: "Transaksi Belum Diproses",
        menuParent: "transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/all/belum-diproses",
        idRole: [2, 1]
    },
    {
        menuCode: "transaksi-sudah-diproses",
        menuName: "Transaksi Sudah Diproses",
        menuParent: "transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/all/sudah-diproses",
        idRole: [2, 1]
    },
    //children transaksi nelayan
    {
        menuCode: "transaksi-belum-diproses-nelayan",
        menuName: "Transaksi Diajukan",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/nelayan/belum-diproses-nelayan",
        idRole: [3]
    },    
    {
        menuCode: "transaksi-nelayan-nego",
        menuName: "Transaksi Nego",
        menuParent: "transaksi-nelayan",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/nelayan/nego",
        idRole: [3]
    },
    {
        menuCode: "transaksi-nelayan-diproses",
        menuName: "Transaksi Diproses",
        menuParent: "transaksi-nelayan",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/nelayan/diproses",
        idRole: [3]
    },
    {
        menuCode: "transaksi-nelayan-selesai",
        menuName: "Transaksi Selesai",
        menuParent: "transaksi-nelayan",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/nelayan/selesai",
        idRole: [3]
    },
    //children transaksi pembeli
    {
        menuCode: "transaksi-belum-diproses-pembeli",
        menuName: "Transaksi Belum Diproses",
        menuParent: "transaksi-pembeli",
        details: ["list", "create", "update"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/pembeli/belum-diproses-pembeli",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-nego",
        menuName: "Transaksi Nego",
        menuParent: "transaksi-pembeli",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/pembeli/nego",
        idRole: [4]
    },
    {
        menuCode: "transaksi-sudah-diproses-pembeli",
        menuName: "Transaksi Diproses",
        menuParent: "transaksi-pembeli",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/pembeli/sudah-diproses-pembeli",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-dibatalkan",
        menuName: "Transaksi Dibatalkan",
        menuParent: "transaksi-pembeli",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/pembeli/dibatalkan",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-selesai",
        menuName: "Transaksi Selesai",
        menuParent: "transaksi-pembeli",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/transaksi/pembeli/selesai",
        idRole: [4]
    },

    
    //SOSIALISASI
    {
        menuCode: "sosialisasi-all",
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
        // menuPath: "/sosialisasi/berita",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-berita",
        menuName: "Berita",
        menuParent:"sosialisasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/sosialisasi/berita",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-informasi",
        menuName: "Informasi",
        menuParent:"sosialisasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/sosialisasi/informasi",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-pengembangan-diri",
        menuName: "Pengembangan Diri",
        menuParent:"sosialisasi",
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
    },

    //USER MANAGEMENT
    {
        menuCode: "user-management",
        menuName: "User Management",
        details: [""],
        menuIcon: "material-icons-round|account_tree",
        menuPath: "/user-management/user",
        idRole: [1]
    },
    //children user management
    {
        menuCode: "user-list",
        menuName: "User",
        menuParent:"user-management",
        details: ["list", "update"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/user-management/user",
        idRole: [1]
    },{
        menuCode: "role-list",
        menuName: "Role",
        menuParent:"user-management",
        details: ["list"],
        menuIcon: "material-icons-round|minimize",
        menuPath: "/user-management/role",
        idRole: [1]
    }
]


export default MenuConst;