import { BgsButton, BgsForm, FormModel, bgsModal } from "@andrydharmawan/bgs-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import axios from "axios";
import { useState } from "react";
import BgsLayout from "shared/layout";
import { TransitionGroup } from 'react-transition-group';
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from "@mui/material/ListItemText";

interface HeaderProps {
    key: string;
    value: string;
}

export default function ApiPages() {
    const [response, setResponse] = useState<any>(null)

    const form: FormModel = {
        apperance: "filled",
        showIcon: true,
        showLabelShrink: true,
        onSubmit: ({ method, url, headers = [], body = {} }, { loading }) => {
            loading(true)

            const client = axios.create({ baseURL: url });

            let header = {};

            (headers as HeaderProps[]).forEach(({ key, value }) => {
                header = {
                    ...header,
                    [key]: value
                }
            })

            client({ method, data: JSON.parse(body), headers: header, responseType: "json", })
                .then(response => {
                    console.log(response, "resposne")
                    setResponse(response)
                    loading(false)
                })
                .catch(response => {
                    console.log(response, "err")
                    setResponse(response)
                    loading(false)
                })
        },
        formData: {
            headers: [{
                key: "Content-Type",
                value: "application/json"
            }]
        },
        items: [
            {
                dataField: "method",
                editorType: "select",
                editorOptions: {
                    dataSource: ["POST", "PUT", "PATCH", "GET", "DELETE"]
                },
                validationRules: ["required"]
            },
            "url|label.icon=url|validationRules",
            "body|editorType=textarea",
            {
                dataField: "headers",
                template: ({ value = [], setValue }) => {
                    return <Box>
                        <Box className="text-end">
                            <BgsButton onClick={
                                () => {
                                    bgsModal({
                                        render: ({ hide }) => <Box className="pd-30">
                                            <BgsForm
                                                onSubmit={
                                                    (values) => {
                                                        setValue([...value, values])
                                                        hide()
                                                    }
                                                }
                                                items={
                                                    ["key|validationRules", "value|validationRules",
                                                        {
                                                            editorType: "button",
                                                            editorOptions: {
                                                                type: "submit",
                                                                text: "SEND"
                                                            }
                                                        }]
                                                }
                                            />
                                        </Box >
                                    })
                                }}> Add Header</BgsButton >
                        </Box >
                        <List>
                            <TransitionGroup>
                                {(value as HeaderProps[]).map((item, index) => (
                                    <Collapse key={index}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    title="Delete"
                                                    onClick={() => setValue([...(value as HeaderProps[]).filter((x, i) => i !== index)])}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText primary={item.key} />
                                        </ListItem>
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Box >
                }
            },
            {
                editorType: "button",
                editorOptions: {
                    className: "w-100 hg-56 min-hg-56 max-hg-56",
                    type: "submit",
                    text: "SEND"
                }
            }
        ]
    }

    return <BgsLayout
        title="Api"
        render={() => <>
            <Box className="pd-30">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <BgsForm {...form} />
                    </Grid>
                    <Grid item xs={8}>
                        <pre className="scroll" style={{ maxHeight: "calc(100vh - 60px)", height: "calc(100vh - 60px)", overflow: "scroll" }}>
                            {JSON.stringify(response, undefined, 2)}
                        </pre>
                    </Grid>
                </Grid>
            </Box>
        </>}
    />
}