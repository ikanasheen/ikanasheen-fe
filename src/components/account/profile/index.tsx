import { BgsButton, BgsForm, BgsTypography, FormModel } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import { credential } from "lib";
import Image from "components/file/components/image";
import Avatar from "@mui/material/Avatar";

export default function AccountProfileComponent() {
    const form: FormModel = {
        showLabelShrink: true,
        apperance: "filled",
        spacing: 2,
        formData: credential.storage.get("user"),
        colCount: 12,
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
                    `fullname|label.text=Nama Lengkap|label.icon=user|editorOptions.readOnly=true`,
                    `email|label.icon=mail|editorOptions.readOnly=true`,
                ],
            },
            `phoneNumber|colSpan=12|label.text=Nomor Telepon|label.icon=phone|editorOptions.readOnly=true`,
            `salesCategory.salesCategoryName|colSpan=12|label.text=Kategori Sales|label.icon=tree|editorOptions.readOnly=true`,
            `territory.territoryName|colSpan=12|label.text=Territory|label.icon=tree|editorOptions.readOnly=true`,
        ]
    }

    return <>
        <BgsTypography className="title-account">Profil Saya</BgsTypography>
        <BgsForm {...form} />
        <BgsButton className="text-end float-end mt-3">Update</BgsButton>

    </>
}