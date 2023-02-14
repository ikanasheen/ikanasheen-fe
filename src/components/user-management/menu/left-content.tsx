import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BgsButton, BgsForm, FormModel, FormRef } from "@andrydharmawan/bgs-component";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import MenuHelper from "helper/MenuHelper";
import MenuComponent, { MenuModel } from "./menu";
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ListRoundedIcon from '@mui/icons-material/ListRounded';

interface SearchByListModel {
    value: string;
    text: string;
}

const SearchByList: SearchByListModel[] = [{
    value: "menuCode",
    text: "Code"
}, {
    value: "menuLabel",
    text: "Label"
}]

interface LeftContentProps {
    setMenuCode: (value: string | null) => any;
    menuCode: string | null;
    setShowForm: (value: boolean) => any;
    addSubmenu: (data: MenuModel) => any;
    setMenuParent: (value: MenuModel | null) => any;
}

export interface LeftContentRef {
    refresh: Function;
}

const LeftContent = forwardRef(({ menuCode, setMenuCode, setShowForm, addSubmenu, setMenuParent }: LeftContentProps, ref: ForwardedRef<LeftContentRef>) => {
    const [listMenu, setListMenu] = useState<MenuModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<FormRef>(null);

    useImperativeHandle(ref, () => ({
        refresh
    }))

    let timer: any = null;
    const form: FormModel = {
        formData: { searchBy: "all" },
        items: [{
            itemType: "group",
            colCount: 3,
            items: [{
                dataField: "searchBy",
                editorOptions: {
                    dataSource: [{
                        value: "all",
                        text: "All"
                    }, ...SearchByList]
                },
                editorType: "select"
            }, {
                colSpan: 2,
                dataField: "search",
                editorOptions: {
                    prefix: <SearchIcon />,
                    onChange: ({ value }) => {
                        clearTimeout(timer)
                        timer = setTimeout(() => { setSearch(value) }, 500);
                    }
                }
            }]
        }]
    }

    const refresh = () => {
        let criteria: any = {}
        const { searchBy } = formRef.current?.getData();
        criteria = {};

        if (searchBy === "all") SearchByList.forEach(({ value }) => criteria[value] = search)
        else criteria[searchBy] = search;
        setLoading(true)
        setListMenu([])
        MenuHelper.retrieve({
            parameter: {
                criteria,
                sort: {
                    menuSort: "asc"
                }
            },
            paging: {
                limit: 10000
            }
        }, ({ status, data }) => {
            setLoading(false)
            setListMenu(status ? data : [])
        })
    }

    useEffect(() => {
        refresh()
    }, [search])

    return <>
        <Grid container spacing={3}>
            <Grid item sm={12}>
                <Paper className="shadow-none br-15">
                    <BgsForm {...form} ref={formRef} className="p-3" />
                </Paper>
                <Paper className="shadow-none br-15 mt-3 p-2">
                    <Box className="p-2 ps-3 mt-1 mb-2 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#eeeeee", borderRadius: "10px" }}>
                        <Box>
                            <ListRoundedIcon color="primary" />
                            <span className="fw-bold ms-3">List Menu</span>
                        </Box>
                        <BgsButton variant="outlined" onClick={() => {
                            setMenuCode(null)
                            setTimeout(() => (setShowForm(true), setMenuParent(null)))
                        }} className="min-wt-0 br-100 wt-35"><AddIcon /></BgsButton>
                    </Box>

                    <List className="scroll w-100 sidebar-view" style={{ overflow: "scroll", paddingRight: "0px !important", height: "calc(100vh - 280px)" }}>
                        {loading && Array(5).fill(null).map((e, index) => <Skeleton key={index} animation="wave" variant="rectangular" className="w-100 br-10 rounded mb-2" height={46} />)}
                        {listMenu.filter(x => !x.parent).length === 0 && !loading && <Box className="MuiDataGrid-overlay d-flex align-items-center justify-content-center flex-column w-100 hg-150">
                            <svg width="100" height="50" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                                    <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                                    <g fillRule="nonzero" stroke="#D9D9D9">
                                        <path
                                            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z">
                                        </path>
                                        <path
                                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                            fill="#FAFAFA"></path>
                                    </g>
                                </g>
                            </svg>
                            <Box sx={{ color: "#D9D9D9" }}>No Data</Box>
                        </Box>}
                        {listMenu.filter(x => !x.parent).map((item, index) => <MenuComponent data={item} listData={listMenu} key={index} onSelect={({ menuCode: code }) => setMenuCode(menuCode === code ? "" : code)} selected={menuCode} addSubmenu={addSubmenu} />)}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </>
})

export default LeftContent;