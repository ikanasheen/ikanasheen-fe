import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { MainLayoutProps } from "shared/layout/main-layout";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import UserManagementMenuForm from "./form";
import LeftContent, { LeftContentRef } from "./left-content";
import { MenuModel } from "./menu";
import "./index.scss"

export default function UserManagementMenuList({ /**permissions**/ }: MainLayoutProps) {
    const [menuCode, setMenuCode] = useState<string | null>(null)
    const [menuParent, setMenuParent] = useState<MenuModel | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const leftContenRef = useRef<LeftContentRef>(null)

    useEffect(() => {
        setShowForm(!!menuCode)
        setMenuParent(null)
    }, [menuCode])
    
    const addSubmenu = (data: MenuModel) => {
        setMenuCode(null)
        setTimeout(() => (setMenuParent(data), setShowForm(true)))
    }

    return <>
        <Grid container spacing={1}>
            <Grid item sm={4}>
                <LeftContent ref={leftContenRef} setMenuCode={setMenuCode} menuCode={menuCode} setShowForm={setShowForm} setMenuParent={setMenuParent} addSubmenu={addSubmenu} />
            </Grid>
            <Grid item sm={8}>
                {showForm
                    ? <UserManagementMenuForm
                        menuParent={menuParent}
                        id={menuCode}
                        title={""}
                        menuCode={""}
                        onSuccess={() => {
                            setMenuCode(null)
                            setTimeout(() => setShowForm(false))
                            leftContenRef.current?.refresh()
                        }}
                        onCancel={() => {
                            setMenuCode(null)
                            setTimeout(() => setShowForm(false))
                        }}
                    />
                    : <Paper className="p-3 br-15 shadow-none">
                        <Alert severity="info">Please click add or click list menu to edit data!</Alert>
                        <Box className="MuiDataGrid-overlay d-flex align-items-center justify-content-center flex-column w-100 hg-150">
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
                            <Box sx={{ color: "#D9D9D9" }}>No Data Selected</Box>
                        </Box>
                    </Paper>}
            </Grid>
        </Grid>
    </>
}