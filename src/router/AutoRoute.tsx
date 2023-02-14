// import { lazy, Suspense } from "react";
import { lazy, Suspense } from "react";
import Error404 from "shared/error-page/page-404";
import LoadingLayout from "shared/layout/loading-layout";

interface AutoRouteProps {
    component: string;
}

export default function AutoRoute({ component }: AutoRouteProps) {
    try {
        // const Component = require(`../pages${component}`).default;
        // return <Component />
        const Component = lazy(() => import(`../pages${component}`))
        // const Component = require(`../pages${component}`).default;
        return <Suspense fallback={<LoadingLayout />}>
            <Component />
        </Suspense>
    } catch (error) {
        return <Error404 />
    }
}
