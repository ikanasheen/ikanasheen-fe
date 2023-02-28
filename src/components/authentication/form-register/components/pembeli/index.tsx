import { BgsButton, BgsForm, BgsGroupForm, BgsTypography, FormGroupModel, FormRef } from "@andrydharmawan/bgs-component";
import { Paper } from "@mui/material";
import RegisterHelper from "helper/RegisterHelper";
import { useRef, useState } from "react";

export default function ChangePasswordComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    let showPassword: boolean = false;
    const formRef = useRef<FormRef>(null);
    const form: FormGroupModel = {
        showLabelShrink: true,
        apperance: "filled",
        onSubmit: (values, { reset }) => {
            setLoading(true)
            RegisterHelper.create(values, ({ status }) => {
                setLoading(false)
                if (status) reset()
            })
        },
        formData: {
            idRole: "pembeli"
        },
        item: {
            main: {
                spacing: 2,
                items: [
                    {
                        dataField: "idRole",
                        label: {
                            text: "Role Code"
                        },
                        editorOptions: {
                            disabled: true
                        },
                        validationRules: ["required"]
                    },
                    `namaLengkap|label.text=Nama Lengkap|validationRules=required`,
                    `alamat|label.text=Alamat|editorType=textarea|validationRules=required`,
                    `noTelepon|label.text=No Telepon|validationRules=required`,
                    `email|label.text=Email`,
                    `username|label.text=Username|validationRules=required`,

                    {
                        itemType: "group",
                        colCount: 2,
                        items: [
                            {
                                dataField: "password",
                                label: {
                                    text: "Password"
                                },
                                editorOptions: {
                                    autoComplete: "new-user-street-address",
                                    type: "password"
                                },
                                validationRules: ["required", "minLength.8", {
                                    message: "Password setidaknya memiliki 8 karakter kombinasi angka, huruf kecil, huruf besar and satu spesial karakter",
                                    validation: value => /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value)
                                }]
                            }, {
                                dataField: "confirmPassword",
                                label: {
                                    text: "Konfirmasi Password"
                                },
                                editorOptions: {
                                    autoComplete: "new-password",
                                    type: "password"
                                },
                                validationRules: ["required", "match.password"]
                            }, {
                                colSpan: 2,
                                template: () => <div style={{ marginTop: -10 }} className="fs-12 text-secondary d-flex align-items-center"><i className="ri-information-line mgr-5"></i> Password setidaknya memiliki 8 karakter kombinasi angka, huruf kecil, huruf besar and satu spesial karakter</div>
                            }, {
                                dataField: "showPassword",
                                colSpan: 2,
                                editorOptions: {
                                    onChange: () => {
                                        showPassword = !showPassword;
                                        formRef.current?.itemOption("password").option("editorOptions.type", showPassword ? "text" : "password")
                                        formRef.current?.itemOption("confirmPassword").option("editorOptions.type", showPassword ? "text" : "password")
                                    }
                                },
                                editorType: "checkbox"
                            }
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
            <Paper className="p-3 mt-3">
                <BgsTypography className="title-account mb-3">Daftar Sebagai Pembeli </BgsTypography>
                <BgsForm name="main" {...group} />
                <BgsButton loading={loading} type="submit" visibleLoading={false} className="btn-sign mgt-30 d-flex align-items-center justify-content-center">Daftar</BgsButton>
            </Paper></>}

    />
}