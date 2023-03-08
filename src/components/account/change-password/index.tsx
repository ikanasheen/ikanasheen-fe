import { BgsButton, BgsForm, BgsGroupForm, BgsTypography, FormGroupModel, FormRef } from "@andrydharmawan/bgs-component";
import  InputAdornment  from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserHelper from "helper/UserHelper";
import { credential } from "lib";
import { useRef, useState } from "react";

export default function ChangePasswordComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const userId = credential.storage.get("user")?.idUser;

    let showPassword: boolean = false;
    const formRef = useRef<FormRef>(null);
    const form: FormGroupModel = {
        showLabelShrink: true,
        apperance: "filled",
        onSubmit: (values, { reset }) => {
            setLoading(true)
            UserHelper.changePassword(values, ({ status }) => {
                setLoading(false)
                if (status) reset()
            })
        },
        formData: {
            idUser: userId
        },
        item: {
            main: {
                spacing: 2,
                items: [
                    {
                        dataField: "oldPassword",
                        label: {
                            icon: "key",
                            text: "Password Lama"
                        },
                        editorOptions: {
                            autoComplete: "new-user-street-address",
                            type: "password",
                            suffix: () => <InputAdornment position="end" >
                                        <BgsButton
                                            variant="icon"
                                            onClick={() => {
                                                showPassword = !showPassword;
                                                formRef.current?.itemOption("oldPassword").option("editorOptions.type", showPassword ? "text" : "password")
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </BgsButton>
                                    </InputAdornment>
                        },
                        validationRules: ["required"]
                    },
                    {
                        itemType: "group",
                        colCount: 2,
                        items: [
                            {
                                dataField: "password",
                                label: {
                                    icon: "key",
                                    text: "Password Baru"
                                },
                                editorOptions: {
                                    autoComplete: "new-user-street-address",
                                    type: "password",
                                    suffix: () => <InputAdornment position="end" >
                                        <BgsButton
                                            variant="icon"
                                            onClick={() => {
                                                showPassword = !showPassword;
                                                formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </BgsButton>
                                    </InputAdornment>
                                },
                                validationRules: ["required", "minLength.8", {
                                    message: "Password setidaknya memiliki 8 karakter kombinasi angka, huruf kecil, huruf besar and satu spesial karakter",
                                    validation: value => /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)
                                }]
                            }, {
                                dataField: "confirmPassword",
                                label: {
                                    icon: "key",
                                    text: "Konfirmasi Password"
                                },
                                editorOptions: {
                                    autoComplete: "new-password",
                                    type: "password",
                                    suffix: () => <InputAdornment position="end" >
                                        <BgsButton
                                            variant="icon"
                                            onClick={() => {
                                                showPassword = !showPassword;
                                                formRef.current?.itemOption("confirmPassword").option("editorOptions.type", showPassword ? "text" : "password")
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </BgsButton>
                                    </InputAdornment>
                                },
                                validationRules: ["required", "match.password"]
                            }, {
                                colSpan: 2,
                                template: () => <div style={{ marginTop: -10 }} className="fs-12 text-secondary d-flex align-items-center"><i className="ri-information-line mgr-5"></i> Password must have at least 8 characters with number, lowercase, uppercase and one special character</div>
                            },
                            //  {
                            //     dataField: "showPassword",
                            //     colSpan: 2,
                            //     editorOptions: {
                            //         onChange: () => {
                            //             showPassword = !showPassword;
                            //             formRef.current?.itemOption("oldPassword").option("editorOptions.type", showPassword ? "text" : "password")
                            //             formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                            //             formRef.current?.itemOption("confirmPassword").option("editorOptions.type", showPassword ? "text" : "password")
                            //         }
                            //     },
                            //     editorType: "checkbox"
                            // }
                        ]
                    }
                ]
            }
        }
    }

    return <BgsGroupForm
        ref={formRef}
        {...form}
        render={group => <>
            <BgsTypography className="title-account">Ubah Password</BgsTypography>
            <BgsForm name="main" {...group} />
            <BgsButton loading={loading} type="submit" visibleLoading={false} className="float-end btn-save-data mgt-30 d-flex align-items-center justify-content-center"><i className="ri-key-fill fs-20 mgr-10"></i> Ubah Password</BgsButton>
        </>}
    />
}