import { BgsButton, BgsForm, BgsTypography, FormModel, FormRef } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { credential} from "lib";
import Image from "components/file/components/image";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import KecamatanHelper from "helper/register/KecamatanHelper";
import { useRef, useState } from "react";
import UserHelper from "helper/UserHelper";


export default function AccountProfileComponent() {
    const roleId = credential.storage.get("user")?.idRole;
    // const userId = credential.storage.get("user")?.idUser;
    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<FormRef>(null);
    // mounted(() => {
    //     if (id) {
    //         setLoading(true)
    //         UserHelper.detail(id, ({ status, data }) => {
    //             setLoading(false)
    //             if (status) {
    //                 if(roleId == "3" ){
    //                     formRef.current?.itemOption("kelurahanDesa").option("visible", true);
    //                     formRef.current?.itemOption("kecamatan").option("visible", true);
    //                 }
    //                 formRef.current?.updateData(data);
    //             }
    //         })
    //     }
    // })

    const form: FormModel = {
        showLabelShrink: true,
        apperance: "filled",
        spacing: 2,
        formData: credential.storage.get("user"),
        colCount: 12,
        onSubmit: (values, { reset }) => {

            if (roleId == "3") {
                formRef.current?.itemOption("kelurahanDesa").option("visible", true);
                formRef.current?.itemOption("kecamatan").option("visible", true);
            }
            setLoading(true)
            UserHelper.changeProfile(values, ({ status }) => {
                setLoading(false)
                if (status) reset()
            })
        },
        items: [
            {
                colSpan: 3,
                dataField: "photoProfiles",
                template: ({ value }) => <>
                    <Box className="position-relative">
                        {!!value?.length
                            ? <Image showFull {...value[0]} size="xlg" />
                            : <Avatar variant="rounded" src="/assets/img/avatar/avatar.svg" sx={{ width: 130, height: 130 }} />}
                    </Box>
                </>
            },
            {
                itemType: "group",
                colSpan: 9,
                items: [
                    `idUser|label.text=ID User|editorOptions.disabled=true`,
                    `username|colSpan=12|label.text=Username`,
                ],
            },
            `nama|label.text=Nama Lengkap|colSpan=12`,
            `noTelepon|label.text=No Telepon|colSpan=6`,
            `email|label.text=Email|colSpan=6`,
            roleId == "3" ? {
                colSpan: 6,
                dataField: "kecamatan",
                label: {
                    text: "Kecamatan"
                },
                editorType: "select",
                editorOptions: {
                    helper: data => KecamatanHelper.retrieveDistrict(data),
                    displayExpr: "name",
                    valueExpr: "name",
                    afterChange: {
                        clearItems: ["kelurahanDesa"],
                        reloadItems: ["kelurahanDesa"]
                    },

                    onChange: ({ formRef, data }) => {
                        formRef.updateData({
                            kecamatanId: data?.id || ""
                        })
                    }

                },
            } : null,
            roleId == "3" ? {
                colSpan: 6,
                dataField: "kelurahanDesa",
                label: {
                    text: "Kelurahan/Desa"
                },
                editorType: "select",
                editorOptions: {
                    helper: data => KecamatanHelper.retrieveVillages(data),
                    displayExpr: "name",
                    valueExpr: "name",
                    parameterFromField: [{
                        opt: "filter",
                        fromField: "kecamatanId",
                        propReq: "id"
                    }]

                },
            }: null,
            `alamat|label.text=Alamat Lengkap|editorType=textarea|colSpan=12`,
            // {
            //     colSpan: 12,
            //     dataField: "status",
            //     editorType: "select",
            //     label: {
            //         text: "Status"
            //     },
            //     editorOptions: {
            //         dataSource: StatusConst,
            //         displayExpr: "display",
            //         valueExpr: "value",
            //         disabled: true
            //     },
            // },
        ]
    }

    return <>
        <BgsTypography className="title-account">Profil Saya</BgsTypography>
        <Grid sx={{ verflowY: "scroll", overflowX: "hidden" }}>
            <BgsForm {...form} />
        </Grid>
        <BgsButton loading={loading} type="submit" visibleLoading={false} className="text-end float-end mt-3">Update</BgsButton>

    </>
}