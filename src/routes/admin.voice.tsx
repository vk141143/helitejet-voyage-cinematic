import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess } from "@/lib/auth";
import { StubPage } from "@/components/dashboard/StubPage";
import { adminNav } from "@/lib/portal-nav";
export const Route = createFileRoute("/admin/voice")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: () => <StubPage title="Voice Assistant" nav={adminNav} />,
});
