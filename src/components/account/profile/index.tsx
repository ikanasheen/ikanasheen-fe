import { BgsButton, BgsForm, BgsTypography, FormModel, FormRef } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { credential } from "lib";
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
                formRef.current?.itemOption("alamat").option("visible", true);
            }
            if (roleId == "3" || roleId == "4") {
                formRef.current?.itemOption("alamat").option("visible", true);
                formRef.current?.itemOption("email").option("visible", true);
                formRef.current?.itemOption("noTelepon").option("visible", true);
                formRef.current?.itemOption("username").option("editorOptions.disabled", false);
                formRef.current?.itemOption("nama").option("editorOptions.disabled", false);
            }
            if (roleId == "1" || roleId == "2") {
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
                    roleId == "1" || roleId == "2" ? `username|colSpan=12|label.text=Username|editorOptions.disabled=true`
                        : `username|colSpan=12|label.text=Username`,
                ],
            },
            roleId == "1" || roleId == "2" ? `nama|label.text=Nama Lengkap|colSpan=12|editorOptions.disabled=true`
                : `nama|label.text=Nama Lengkap|colSpan=12`,
            `noTelepon|label.text=No Telepon|colSpan=6|visible=false`,
            `email|label.text=Email|colSpan=6|visible=false`,
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
            } : null,
            roleId == "3" || roleId == "4" ? `alamat|label.text=Alamat Lengkap|editorType=textarea|colSpan=12` : null,
        ]
    }

    return <>
        <BgsTypography className="title-account">Profil Saya</BgsTypography>
        <Grid sx={{ verflowY: "scroll", overflowX: "hidden" }}>
            <BgsForm {...form} />
        </Grid>
        {roleId == "3" || roleId == "4" ? <BgsButton loading={loading} type="submit" visibleLoading={false} className="text-end float-end mt-3">Update</BgsButton>
            : null}


    </>
}