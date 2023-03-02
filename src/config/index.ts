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
        kecamatan                   : `https://ikanasheen.github.io/api-wilayah-indonesia/api/districts/`, // + 8105.json
        kelurahanDesa               : `https://ikanasheen.github.io/api-wilayah-indonesia/api/villages/`, //+ 8105012.json
    },
    master :{
        ikan                       : `${baseUrl}fishery/ikan/`,
        nelayan                    : `${baseUrl}xxx/`,
        sosialisasi                : `${baseUrl}xxx/`,
    },
    userManagement:{
        userList                   : `${baseUrl}fishery/user/`,
    },
    transaksi:{
        transaksi                  : `${baseUrl}xxx/`,

    }
    
}