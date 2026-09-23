import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { SupportTickets } from "@/components/dashboard/SupportTickets";
import { salesNav } from "@/lib/portal-nav";

export const Route = createFileRoute("/sales/support")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: () => <SupportTickets role="SALES" nav={salesNav} />,
});
