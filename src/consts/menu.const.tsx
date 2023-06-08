import { MenuPermissionWrapper } from "models/menu.model";
// import menuAdmin from "./menu.admin.const"
export const MenuConst: MenuPermissionWrapper[] = [
    //1 admin, 2 gov, 3 nelayan, 4 pembeli
    // ...menuAdmin,
    //DASHBOARD
    {
        //admin, gov
        menuCode: "main-dashboard",
        menuName: "Dashboard",
        details: [],
        menuIcon: "material-icons-round|dashboard",
        idRole: [1,2,3,4]
    },
    {
        menuCode: "dashboard",
        menuName: "Dashboard",
        menuPath: "/",
        details: ["list"],
        menuParent: "main-dashboard",       
        menuIcon: "material-icons-round|folder_open",
        idRole: [1, 2, 3, 4]
    },

    //DAFTAR KOMODITI
    {
        //admin, gov
        menuCode: "main-komoditi",
        menuName: "Daftar Komoditi",
        details: [],
        menuIcon: "material-icons-round|price_change",
        idRole: [1,3]
    },
    {
        menuCode: "daftar-komoditi",
        menuName: "Daftar Komoditi",
        details: ["list", "create", "update", "delete"],
        menuParent: "main-komoditi",       
        menuPath: "/daftar-komoditi",
        menuIcon: "material-icons-round|folder_open",
        idRole: [1]
    },
    {
        menuCode: "daftar-komoditi",
        menuName: "Daftar Komoditi",
        details: ["list"], //list aja
        menuParent: "main-komoditi",       
        menuPath: "/daftar-komoditi",
        menuIcon: "material-icons-round|folder_open",
        idRole: [3]
    },

    //DAFTAR NELAYAN
    {
        //admin, gov
        menuCode: "main-nelayan",
        menuName: "Daftar Nelayan",
        details: [],
        menuIcon: "material-icons-round|contacts",
        idRole: [1,2]
    },
    {
        menuCode: "nelayan",
        menuName: "Daftar Nelayan",
        details: ["list"],        
        menuParent: "main-nelayan",       
        menuPath: "/nelayan",
        menuIcon: "material-icons-round|folder_open",
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
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/all/semua-transaksi",
        idRole: [2, 1] 
    },
    {
        menuCode: "transaksi-belum-diproses",
        menuName: "Transaksi Belum Diproses",
        menuParent: "transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/all/belum-diproses",
        idRole: [2, 1]
    },
    {
        menuCode: "transaksi-sudah-diproses",
        menuName: "Transaksi Sudah Diproses",
        menuParent: "transaksi",
        details: ["list"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/all/sudah-diproses",
        idRole: [2, 1]
    },
    //children transaksi nelayan
    {
        menuCode: "transaksi-belum-diproses-nelayan",
        menuName: "Transaksi Diajukan",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/nelayan/belum-diproses-nelayan",
        idRole: [3]
    },    
    {
        menuCode: "transaksi-nelayan-nego",
        menuName: "Transaksi Nego",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/nelayan/nego",
        idRole: [3]
    },
    {
        menuCode: "transaksi-nelayan-diproses",
        menuName: "Transaksi Diproses",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/nelayan/diproses",
        idRole: [3]
    },
    {
        menuCode: "transaksi-nelayan-selesai",
        menuName: "Transaksi Selesai",
        menuParent: "transaksi-nelayan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/nelayan/selesai",
        idRole: [3]
    },
    //children transaksi pembeli
    {
        menuCode: "transaksi-belum-diproses-pembeli",
        menuName: "Transaksi Belum Diproses",
        menuParent: "transaksi-pembeli",
        details: ["list", "create", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/pembeli/belum-diproses-pembeli",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-nego",
        menuName: "Transaksi Nego",
        menuParent: "transaksi-pembeli",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/pembeli/nego",
        idRole: [4]
    },
    {
        menuCode: "transaksi-sudah-diproses-pembeli",
        menuName: "Transaksi Diproses",
        menuParent: "transaksi-pembeli",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/pembeli/sudah-diproses-pembeli",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-dibatalkan",
        menuName: "Transaksi Dibatalkan",
        menuParent: "transaksi-pembeli",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/pembeli/dibatalkan",
        idRole: [4]
    },
    {
        menuCode: "transaksi-pembeli-selesai",
        menuName: "Transaksi Selesai",
        menuParent: "transaksi-pembeli",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/transaksi/pembeli/selesai",
        idRole: [4]
    },

    
    //SOSIALISASI
    {
        //admin, gov
        menuCode: "main-sosialisasi",
        menuName: "Sosialisasi",
        details: [],
        menuIcon: "material-icons-round|tips_and_updates",
        idRole: [1,2,3]
    },
    {
        menuCode: "sosialisasi-all",
        menuName: "Sosialisasi",
        menuParent:"main-sosialisasi",
        details: ["list", "create", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/sosialisasi",
        idRole: [1]
    },
    {
        menuCode: "sosialisasi-berita",
        menuName: "Berita",
        menuParent:"main-sosialisasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/sosialisasi/berita",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-informasi",
        menuName: "Informasi",
        menuParent:"main-sosialisasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/sosialisasi/informasi",
        idRole: [3, 2]
    },
    {
        menuCode: "sosialisasi-pengembangan-diri",
        menuName: "Pengembangan Diri",
        menuParent:"main-sosialisasi",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/sosialisasi/pengembangan-diri",
        idRole: [3, 2]
    },

    //BANTUAN
    {
        menuCode: "bantuan",
        menuName: "Bantuan",
        details: [""],
        menuIcon: "material-icons-round|handshake",
        idRole: [1, 2, 3]
    },
    //children bantuan
    {//admin
        menuCode: "bantuan-tersedia-admin",
        menuName: "Bantuan Tersedia",
        menuParent:"bantuan",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/bantuan/admin/tersedia",
        idRole: [1]
    },
    {
        menuCode: "bantuan-diajukan-admin",
        menuName: "Bantuan Diajukan",
        menuParent:"bantuan",
        details: ["list","detail"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/admin/diajukan",
        idRole: [1]
    },
    {//nelayan
        menuCode: "bantuan-tersedia-nelayan",
        menuName: "Bantuan Tersedia",
        menuParent:"bantuan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/nelayan/tersedia",
        idRole: [3]
    },
    {
        menuCode: "bantuan-diajukan-nelayan",
        menuName: "Bantuan Diajukan",
        menuParent:"bantuan",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/nelayan/diajukan",
        idRole: [3]
    },
    {//gov
        menuCode: "bantuan-tersedia-gov",
        menuName: "Bantuan Tersedia",
        menuParent:"bantuan",
        details: ["list","detail"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/gov/tersedia",
        idRole: [2]
    },
    {
        menuCode: "bantuan-diajukan-gov",
        menuName: "Bantuan Diajukan",
        menuParent:"bantuan",
        details: ["list","update"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/gov/diajukan",
        idRole: [2]
    },
    {
        menuCode: "bantuan-terproses-gov",
        menuName: "Bantuan Terproses",
        menuParent:"bantuan",
        details: ["list"],
        menuIcon: "material-icons-round|folder_open'",
        menuPath: "/bantuan/gov/terproses",
        idRole: [2]
    },

    //FAQ
    {
        menuCode: "faq",
        menuName: "FAQ & Pengaduan",
        details: [""],
        menuIcon: "material-icons-round|chat",
        idRole: [1,2,3]
    },
    {//admin
        menuCode: "list-faq-admin",
        menuName: "FAQ",
        menuParent:"faq",
        details: ["list", "create", "update", "delete"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/all/list-faq",
        idRole: [1]
    },
    {
        menuCode: "list-pengaduan-admin",
        menuName: "Pengaduan",
        menuParent:"faq",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/all/list-pengaduan",
        idRole: [1]
    },
    {
        menuCode: "list-pengaduan-terjawab-admin",
        menuName: "Pengaduan Terjawab",
        menuParent:"faq",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/all/list-pengaduan-terjawab",
        idRole: [1]
    },
    {//gov
        menuCode: "list-faq-gov",
        menuName: "FAQ",
        menuParent:"faq",
        details: ["list","detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/gov/list-faq",
        idRole: [2]
    },
    {
        menuCode: "list-pengaduan-gov",
        menuName: "Pengaduan",
        menuParent:"faq",
        details: ["list","detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/gov/list-pengaduan",
        idRole: [2]
    },
    {
        menuCode: "list-pengaduan-terjawab-gov",
        menuName: "Pengaduan Terjawab",
        menuParent:"faq",
        details: ["list","detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/gov/list-pengaduan-terjawab",
        idRole: [2]
    },
    {//nelayan
        menuCode: "list-faq-nelayan",
        menuName: "FAQ",
        menuParent:"faq",
        details: ["list", "update", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/nelayan/list-faq",
        idRole: [3]
    },
    {
        menuCode: "list-pengaduan-nelayan", 
        menuName: "Pengaduan",
        menuParent:"faq",
        details: ["list", "create","detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/nelayan/list-pengaduan",
        idRole: [3]
    },
    {
        menuCode: "list-pengaduan-terjawab-nelayan", 
        menuName: "Pengaduan Terjawab",
        menuParent:"faq",
        details: ["list", "detail"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/faq/nelayan/list-pengaduan-terjawab",
        idRole: [3]
    },
    //USER MANAGEMENT
    {
        menuCode: "user-management",
        menuName: "User Management",
        details: [""],
        menuIcon: "material-icons-round|account_tree",
        idRole: [1]
    },
    //children user management
    {
        menuCode: "user-list",
        menuName: "User",
        menuParent:"user-management",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/user-management/user",
        idRole: [1]
    },
    {
        menuCode: "role-list",
        menuName: "Role",
        menuParent:"user-management",
        details: ["list", "update"],
        menuIcon: "material-icons-round|folder_open",
        menuPath: "/user-management/role",
        idRole: [1]
    }
]


export default MenuConst;