import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { SupportTickets } from "@/components/dashboard/SupportTickets";
import { adminNav } from "@/lib/portal-nav";

export const Route = createFileRoute("/admin/support")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: () => <SupportTickets role="ADMIN" nav={adminNav} />,
});
