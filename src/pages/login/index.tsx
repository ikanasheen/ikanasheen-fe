import { lazy } from "react";
import { BgsLayoutProps } from "shared/layout";
import { useEffect } from "react";
import { credential } from "lib";
import { useRouter } from "@andrydharmawan/bgs-component";

import AuthLayout from "shared/layout/auth-layout";
const MainComponent = lazy(() => import("components/authentication/login"));

const props: BgsLayoutProps = {
    title: "Login",
    mode: "index"
}

export default function LoginPages() {
    const router = useRouter();

    useEffect(() => {
        if (credential.storage.get("token")) router.push("/")
    }, [])

    return <AuthLayout {...props}>
        <MainComponent {...props} />
    </AuthLayout >
}