
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    spacing: 16,
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontSize: 14,
        button: {
            textTransform: "none",
            fontFamily: ["Source Sans Pro"].join(", ")
        },
        fontFamily: ["Source Sans Pro"].join(", ")
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    opacity: 100
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    border: "1px solid #dee3e8"
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 3,
                    background: "#16161a",
                    fontSize: 12
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "& .MuiDataGrid-root": {
                        border: "0px solid #fff !important",

                    },
                    "&:last-child td": {
                        borderBottom: 0,
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0000001f"
                    }
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: "3px",
                    padding: "2px 5px",
                    "&:after, &:before": {
                        display: "none"
                    },
                    background: "#ebeff2"
                }
            }
        },
        // MuiFormLabel: {
        //     styleOverrides: {
        //         root: {
        //             color: "#666f75"
        //         }
        //     }
        // }
    }
});

export default theme;