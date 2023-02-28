const baseUrl                   = `${process.env.REACT_APP_API_URL}`;
//
export const api = {
    user                        : `${baseUrl}fishery/`,
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
    dashboard                   : `${baseUrl}dashboard/`,

    register                    : `${baseUrl}fishery/register/`,

    pengembanganDiri            : `${baseUrl}xxx/`,
    pengajuanBantuan            : `${baseUrl}xxx/`,

    hargaIkan                  : `${baseUrl}xxx/`,
    nelayan                    : `${baseUrl}xxx/`,
    transaksi                  : `${baseUrl}xxx/`,
}