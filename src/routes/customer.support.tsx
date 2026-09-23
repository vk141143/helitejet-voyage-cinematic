import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { SupportTickets } from "@/components/dashboard/SupportTickets";
import { customerNav } from "@/lib/portal-nav";
export const Route = createFileRoute("/customer/support")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: () => <SupportTickets role="CUSTOMER" nav={customerNav} />,
});
