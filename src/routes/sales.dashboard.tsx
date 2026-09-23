import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { salesNav as nav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/sales/dashboard")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: SalesDashboard,
});

function SalesDashboard() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [access, setAccess] = useState({ customers: 0, subscriptions: 0, credits: 0 });

  useEffect(() => {
    void supabase.from("customer_entitlements").select("subscription_status,credits_remaining").then(({ data }) => {
      const rows = data ?? [];
      setAccess({ customers: rows.length, subscriptions: rows.filter((row) => row.subscription_status === "ACTIVE").length, credits: rows.reduce((total, row) => total + (row.credits_remaining ?? 0), 0) });
    });
  }, []);

  async function handleLogout() {
    await logout();
    await navigate({ to: "/login" });
  }

  return (
    <PortalShell
      title={`Good evening, ${profile?.full_name?.split(" ")[0] ?? "concierge"}.`}
      nav={nav}
      onLogout={() => void handleLogout()}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Link to="/sales/requests" className="border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20">
          <p className="whisper text-champagne">Operations</p>
          <p className="mt-4 font-serif text-3xl">Open requests →</p>
        </Link>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Active subscriptions</p>
          <p className="mt-4 font-serif text-4xl">{access.subscriptions}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Credits held by customers</p>
          <p className="mt-4 font-serif text-4xl">{access.credits.toLocaleString()}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6"><p className="whisper text-ivory/50">Customers with access</p><p className="mt-4 font-serif text-4xl">{access.customers}</p></div>
      </div>
    </PortalShell>
  );
}
