import { lazy } from "react";
import { BgsLayoutProps } from "shared/layout";
import { useEffect } from "react";
import { credential } from "lib";
import { useRouter } from "@andrydharmawan/bgs-component";

import AuthLayout from "shared/layout/auth-layout";
const MainComponent = lazy(() => import("components/authentication/reset-password"));

const props: BgsLayoutProps = {
    title: "Reset Password",
    mode: "index"
}

export default function ResetPasswordPages() {
    const router = useRouter();

    useEffect(() => {
        if (credential.storage.get("token")) router.push("/")
    }, [])

    return <AuthLayout {...props}>
        <MainComponent {...props} />
    </AuthLayout >
}