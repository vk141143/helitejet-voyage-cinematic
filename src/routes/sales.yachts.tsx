import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { StubPage } from "@/components/dashboard/StubPage";
import { salesNav } from "@/lib/portal-nav";
export const Route = createFileRoute("/sales/yachts")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: () => <StubPage title="Yachts" nav={salesNav} />,
});
