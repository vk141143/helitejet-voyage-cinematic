import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { StubPage } from "@/components/dashboard/StubPage";
import { salesNav } from "@/lib/portal-nav";
export const Route = createFileRoute("/sales/my-requests")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: () => <StubPage title="My Requests" nav={salesNav} />,
});
