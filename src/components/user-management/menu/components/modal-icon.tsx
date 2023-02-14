import { BgsButton, BgsForm, BgsTypography, FormModel } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { MaterialIconJson } from "json"
import { Children, useState } from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface IconsProps {
    id: string;
    name: string;
    group_id: string;
    keywords: string[];
    ligature: string;
    codepoint: string;
    type: string;
}

interface MaterialIconComponentProps {
    onSelected: (value: IconsProps) => void;
    hide: Function;
}

export default function MaterialIconComponent({ onSelected, hide }: MaterialIconComponentProps) {
    const [categories, setCategories] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [type, setType] = useState<string>("material-icons-round")
    const typeList = [{
        text: "Outlined",
        value: "material-icons-outlined"
    }, {
        text: "Filled",
        value: "material-icons"
    }, {
        text: "Rounded",
        value: "material-icons-round"
    }, {
        text: "Sharp",
        value: "material-icons-sharp"
    }, {
        text: "Two tone",
        value: "material-icons-two-tone"
    }];

    let timer: any = null;

    const form: FormModel = {
        colCount: 5,
        apperance: "filled",
        items: [
            {
                colSpan: 1.5,
                dataField: "categories",
                editorType: "select",
                editorOptions: {
                    allowClear: true,
                    dataSource: [{
                        name: "All",
                        key: "All",
                        icons: []
                    }, ...MaterialIconJson.categories],
                    displayExpr: "name",
                    valueExpr: "name",
                    onChange: ({ value }) => setCategories(value === "All" ? "" : value),
                }
            },
            {
                dataField: "search",
                colSpan: 3.5,
                editorOptions: {
                    onChange: ({ value }) => {
                        clearTimeout(timer)
                        timer = setTimeout(() => setSearch(value.toString() || ""), 800);
                    }
                }
            }
        ]
    }

    return <Box className="pd-20">
        <BgsForm className="w-100" {...form} />
        <Box className="d-flex mgt-20" sx={{ gap: 1 }}>
            {Children.toArray(typeList.map(({ text, value }) => <Chip onClick={() => setTimeout(() => setType(value), 0)} label={<Box className="d-flex align-items-center">{type === value && <CheckRoundedIcon />}{text}</Box>} variant={type === value ? "filled" : "outlined"} />))}
        </Box>
        <Box className="scroll mgt-10" sx={{ height: "calc(100vh - 250px)" }}>
            <IconComponent onSelected={onSelected} search={search} categories={categories} hide={hide} type={type} />
        </Box>
    </Box>
}

interface IconComponentProps extends MaterialIconComponentProps {
    search: string;
    categories: string;
    type: string;
}

const IconComponent = ({ search, categories, onSelected, hide, type }: IconComponentProps) => {
    return <Grid container columns={7} spacing={2}>
        {Children.toArray(MaterialIconJson.categories.filter(x => categories ? x.name === categories : x).map(({ icons, name }) => <>
            {!search && <Grid item xs={7}><BgsTypography className="mgb-20 mgt-20 fw-700" sx={{ textTransform: "capitalize" }}>{name}</BgsTypography></Grid>}
            {(icons.filter(x => search ? x.keywords[0].includes(search) : x).length > 0) && <>
                {icons.filter(x => search ? x.keywords[0].includes(search) : x).map(({ ligature, name, ...others }, index) => <Grid key={index} item xs={1} className="d-flex justify-content-center flex-column">
                    <BgsButton variant="text" color="inherit" className="w-100" onClick={() => (onSelected({ ligature, name, ...others, type }), hide())}><Icon baseClassName={`${type} fs-35`}>{ligature}</Icon></BgsButton>
                    <Box className="w-100 min-hg-40" sx={{ textTransform: "capitalize", fontSize: "10px", textAlign: "center" }}>{name}</Box>
                </Grid>)}
            </>}
        </>))}
    </Grid>
}