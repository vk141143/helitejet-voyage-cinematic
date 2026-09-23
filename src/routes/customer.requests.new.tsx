import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { CustomerRequestWizard } from "@/components/inquiry/CustomerRequestWizard";
import { customerNav as nav } from "@/lib/portal-nav";
export const Route = createFileRoute("/customer/requests/new")({ beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); }, component: NewRequest });
function NewRequest() { const { profile } = useAuth(); return <PortalShell title="New request" nav={nav}><CustomerRequestWizard profile={profile} /></PortalShell>; }
