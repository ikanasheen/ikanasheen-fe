import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Icon from '@mui/material/Icon';
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { BgsButton } from "@andrydharmawan/bgs-component";

export interface MenuModel {
    createDateTime: string;
    updateDateTime: string;
    createdBy: string;
    updateBy: string;
    deleted: boolean;
    menuCode: string;
    menuLabel: string;
    menuType: string;
    menuPath: string;
    menuSort: number;
    menuStatus: boolean;
    menuIcon: string;
    parent?: MenuModel;
}

interface MenuComponentProps {
    data: MenuModel;
    listData: MenuModel[];
    onSelect: (data: MenuModel) => any;
    addSubmenu: (data: MenuModel) => any;
    selected: string | null;
}

export default function MenuComponent({ data, listData, onSelect, selected, addSubmenu }: MenuComponentProps) {
    const [open, setOpen] = useState<boolean>(false);

    const children: MenuModel[] = listData.filter(x => x.parent).filter(x => x.parent?.menuCode === data.menuCode);

    if (children?.length) {
        return <>
            <ListItemButton
                onClick={(e) => {
                    setOpen(!open)
                    onSelect(data)
                    e.stopPropagation();
                    e.preventDefault();
                }}
                className={`${children.find(({ menuCode }) => menuCode === selected) || data.menuCode === selected ? "active" : ""}`}
                selected={children.find(({ menuCode }) => menuCode === selected) || data.menuCode === selected ? true : false}
            >
                <ListItemIcon>
                    {!!data.menuIcon && <Icon baseClassName={data.menuIcon.split("|")[0] || "material-icons-round"}>{data.menuIcon.split("|")[1] || "folder_open"}</Icon>}
                </ListItemIcon>
                <ListItemText primary={<>
                    <span className="text-secondary font-italic me-2">#{data.menuSort}</span>
                    {data.menuLabel}
                </>} />
                {open ? <Icon baseClassName="material-icons-round icon-arrow">keyboard_arrow_down</Icon> : <Icon baseClassName="material-icons-round icon-arrow">chevron_right</Icon>}
                <BgsButton title="Add Submenu" className="float-end min-wt-0 br-7 wt-18 hg-18 max-wt-18 max-hg-18 ms-3 icon-add zi-99"
                    onClick={({ event }) => {
                        addSubmenu(data)
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                ><AddIcon className="fs-15" /></BgsButton>
            </ListItemButton>

            <Collapse
                easing="mountOnEnter"
                className="child-menu"
                in={open} timeout="auto" unmountOnExit>
                {children.map(({ menuLabel, menuCode, menuSort, ...others }, index) => <List key={index} component="div" disablePadding>
                    <ListItemButton sx={{ pl: "40px" }} onClick={() => onSelect({ menuLabel, menuCode, menuSort, ...others })} className={selected === menuCode ? "active" : ""}>
                        <ListItemText primary={<>
                            <span className="text-secondary font-italic me-2">#{menuSort}</span>
                            {menuLabel}
                        </>} />
                    </ListItemButton>
                </List>)}
            </Collapse>
        </>
    }
    else {
        return <ListItem
            button
            onClick={(e) => {
                onSelect(data)
                e.stopPropagation();
                e.preventDefault();
            }}
            className={selected === data.menuCode ? "active" : ""} selected={selected === data.menuCode}>
            <ListItemIcon>
                {!!data.menuIcon && <Icon baseClassName={data.menuIcon.split("|")[0] || "material-icons-round"}>{data.menuIcon.split("|")[1] || "folder_open"}</Icon>}
            </ListItemIcon>
            <ListItemText primary={<>
                <span className="text-secondary font-italic me-2">#{data.menuSort}</span>
                {data.menuLabel}
            </>} />
            <BgsButton title="Add Submenu" className="float-end min-wt-0 br-7 wt-18 hg-18 max-wt-18 max-hg-18 ms-3 icon-add" onClick={({ event }) => {
                addSubmenu(data)
                event.stopPropagation();
                event.preventDefault();
            }}><AddIcon className="fs-15" /></BgsButton>
        </ListItem>
    }
}