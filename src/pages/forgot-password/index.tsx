import { lazy } from "react";
import { BgsLayoutProps } from "shared/layout";
import { useEffect } from "react";
import { credential } from "lib";
import { useRouter } from "@andrydharmawan/bgs-component";

import AuthLayout from "shared/layout/auth-layout";
const MainComponent = lazy(() => import("components/authentication/forgot-password"));

const props: BgsLayoutProps = {
    title: "Forgot Password",
    mode: "index"
}

export default function ForgotPasswordPages() {
    const router = useRouter();

    useEffect(() => {
        if (credential.storage.get("user")) router.push("/")
    }, [])

    return <AuthLayout {...props}>
        <MainComponent {...props} />
    </AuthLayout >
}