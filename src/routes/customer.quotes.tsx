import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { StubPage } from "@/components/dashboard/StubPage";
import { customerNav } from "@/lib/portal-nav";
export const Route = createFileRoute("/customer/quotes")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: () => <StubPage title="Quotes" nav={customerNav} />,
});
