import { MainLayoutProps } from "shared/layout/main-layout";
import MainLayout from "shared/layout/main-layout";
import { lazy } from "react";
const MainComponent = lazy(() => import("components/agent-journey-plan"));

const props: MainLayoutProps = {
    title: "Agent Journey List",
    mode: "index",
    menuCode: "agent-journey-plan",
    actionCode: "list",
    usingContainer: false
}

export default function AgentJourneyPlanPages() {
    return <MainLayout {...props}>
        <MainComponent {...props} />
    </MainLayout>
}