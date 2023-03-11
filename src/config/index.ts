const baseUrl                   = `${process.env.REACT_APP_API_URL}`;
//
export const api = {
    
    menu                        : `${baseUrl}menu/`,
    permission                  : `${baseUrl}permission/`,
    role                        : `${baseUrl}role/`,
    file                        : `${baseUrl}file/`,
    visit                       : `${baseUrl}visit/`,
    territory                   : `${baseUrl}territory/`,
    salesCategory               : `${baseUrl}sales/category/`,
    salesAgent                  : `${baseUrl}sales/agent/`,
    partner                     : `${baseUrl}partner/`,
    city                        : `${baseUrl}city/`,


    user                        : `${baseUrl}fishery/`,
    dashboard                   : `${baseUrl}dashboard/`,


    register :{
        registerNelayan             : `${baseUrl}fishery/register/nelayan/`,
        registerPembeli             : `${baseUrl}fishery/register/pembeli/`,
    },
    master :{
        ikan                       : `${baseUrl}fishery/ikan/`,
        nelayan                    : `${baseUrl}fishery/nelayan/`,
        sosialisasi                : `${baseUrl}fishery/sosialisasi/`,
    },
    userManagement:{
        userList                   : `${baseUrl}fishery/user/`,
    },
    transaksi:{
        transaksi                  : `${baseUrl}fishery/transaksi/`,

    }
    
}