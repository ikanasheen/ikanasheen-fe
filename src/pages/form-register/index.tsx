import { lazy } from "react";
import { BgsLayoutProps } from "shared/layout";
import { useEffect } from "react";
import { credential } from "lib";
import { useRouter } from "@andrydharmawan/bgs-component";

import AuthLayout from "shared/layout/auth-layout";
const RegisterComponent = lazy(() => import("components/authentication/form-register"));

const props: BgsLayoutProps = {
    title: "Daftar Akun",
    mode: "create"
}

export default function FormRegisterPages() {
    const router = useRouter();

    useEffect(() => {
        if (credential.storage.get("user")) router.push("/")
    }, [])

    return <AuthLayout {...props}>
        <RegisterComponent />
    </AuthLayout >
}