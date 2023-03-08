import { BgsButton, BgsForm, BgsGroupForm, BgsTypography, FormGroupModel, FormRef, useRouter } from "@andrydharmawan/bgs-component";
import Grid from "@mui/material/Grid";
import GenderConst from "consts/gender.consts";
import RegisterNelayanHelper from "helper/register/RegisterNelayanHelper";
import { useRef, useState } from "react";
import KecamatanHelper from "helper/register/KecamatanHelper";
import { MainLayoutProps } from "shared/layout/main-layout";

interface RegisterFormProps extends MainLayoutProps {
    onSuccess?: Function;
}

export default function FormRegisterComponent({ onSuccess = () => { } }: RegisterFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    let showPassword: boolean = false;
    const formRef = useRef<FormRef>(null);
    const form: FormGroupModel = {
        showLabelShrink: true,
        apperance: "filled",
        onSubmit: (values) => {
            setLoading(true)
            RegisterNelayanHelper.create(values, ({ status }) => {
                setLoading(false)
                if (status) {
                    // reset()
                    onSuccess()
                    router.push("/login")
                } else {
                    router.push("/form-register")
                }
            })
        },
        formData: {
            gender: GenderConst[0].value,
            idRole: 3
        },
        item: {
            main: {
                spacing: 2,
                colCount: 2,
                items: [
                    `namaLengkap|colSpan=2|label.text=Nama Lengkap|validationRules=required,maxLength.255`,
                    `tanggalLahir|label.text=Tanggal Lahir|editorType=date|validationRules=required`,
                    {
                        dataField: "gender",
                        label: {
                            text: "Jenis Kelamin"
                        },
                        editorOptions: {
                            dataSource: GenderConst,
                            displayExpr: "text",
                            valueExpr: "value"
                        },
                        editorType: "radiobutton",
                        validationRules: ["required"]
                    },
                    {
                        dataField: "kecamatan",
                        label: {
                            text: "Kecamatan"
                        },
                        validationRules: ["required"],
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
                    },
                    {
                        dataField: "kelurahanDesa",
                        label: {
                            text: "Kelurahan/Desa"
                        },
                        validationRules: ["required"],
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
                    },
                    `alamat|colSpan=2|label.text=Alamat|editorType=textarea,maxLength.255|validationRules=required`,
                    {
                        dataField: "noTelepon",
                        label: {
                            text: "No Telepon"
                        },
                        validationRules: ["required"],
                        editorOptions: {
                            placeholder: "08...",
                        }
                    },
                    // `email|label.text=Email|validationRules=email`,
                    {
                        dataField: "email",
                        label: {
                            text: "Email"
                        },
                        validationRules: [{
                            message: "Format email tidak valid",
                            validation: (value) => value ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) : true
                        }]
                    },
                    `username|colSpan=2|label.text=Username|validationRules=required,maxLength.255`,
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
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
                                validationRules: ["required", "minLength.8", "maxLength.255",{
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
                                validationRules: ["required", "match.password","maxLength.255"]
                            }, {
                                colSpan: 2,
                                template: () => <div style={{ marginTop: -10 }} className="fs-12 text-secondary d-flex align-items-center"><i className="ri-information-line mgr-5"></i> Password setidaknya memiliki 8 karakter kombinasi angka, huruf kecil, huruf besar and satu spesial karakter</div>
                            },
                            {
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
            <Grid className="ms-4" item xs={12}  >
                <BgsTypography className="title-account mb-3">Daftar Sebagai Nelayan</BgsTypography>
                <BgsForm name="main" {...group} />
            </Grid>
            <BgsButton loading={loading} type="submit" visibleLoading={false} className="btn-sign mgt-30 d-flex align-items-center justify-content-center">Daftar</BgsButton>
        </>}
    />
}