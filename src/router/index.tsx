import { Children, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
const Page404 = lazy(() => import("shared/error-page/page-404"))

import AutoRoute from './AutoRoute';
import router from "./router.json"

interface RouterProps {
    path: string;
    component: string;
}

export default function Router() {
    const routers: RouterProps[] = router;

    return (<Routes>
        <Route path="*" element={<Suspense><Page404 /></Suspense>} />
        {Children.toArray(routers.map(({ path, component }) => <Route path={path} element={<AutoRoute component={component} />} />))}
    </Routes>)
}
