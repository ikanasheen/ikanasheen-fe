import { useRouter } from "@andrydharmawan/bgs-component";
import { useEffect } from "react";

interface HeadTitleProps {
    title: string;
    children?: any;
}

function getFaviconEl() {
    return document.getElementById("favicon");
}

export default function HeadTitle({ title = "", children }: HeadTitleProps) {
    const router = useRouter();
    useEffect(() => {
        const favicon: any = getFaviconEl();
        favicon.href = `/assets/img/logo/${process.env.REACT_APP_ICON}`;

        document.title = `${title} | ${process.env.REACT_APP_NAME}`
    }, [router.pathname])

    return <>
        {children}
    </>
}