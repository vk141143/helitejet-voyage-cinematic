import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { adminNav as nav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
    <PortalShell title="Platform overview" nav={nav} onLogout={() => void handleLogout()}>
      <div className="grid gap-5 md:grid-cols-3">
        <Link to="/admin/requests" className="border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20">
          <p className="whisper text-champagne">Administration</p>
          <p className="mt-4 font-serif text-3xl">All requests →</p>
        </Link>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Customers</p>
          <p className="mt-4 font-serif text-4xl">{access.customers}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Active subscriptions</p>
          <p className="mt-4 font-serif text-4xl">{access.subscriptions}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6"><p className="whisper text-ivory/50">Credits remaining</p><p className="mt-4 font-serif text-4xl">{access.credits.toLocaleString()}</p></div>
      </div>

      <div className="mt-10 border border-ivory/10 bg-white/[0.02] p-6">
        <p className="whisper text-champagne">Admin Bootstrap</p>
        <p className="mt-3 font-serif text-sm text-ivory/60">
          To create Sales accounts, use the Supabase dashboard or run the SQL below in the Supabase SQL editor.
          Sales users log in through <span className="text-champagne">/login</span> and are redirected to their dashboard automatically.
        </p>
        <pre className="mt-4 overflow-x-auto border border-ivory/10 bg-obsidian p-4 text-xs text-ivory/50">{`-- Create a Sales user (run in Supabase SQL editor as service role)
-- 1. Create auth user via Supabase Auth dashboard or API
-- 2. Then update their profile role:
UPDATE public.profiles
SET role = 'SALES'
WHERE email = 'sales@example.com';`}</pre>
      </div>
    </PortalShell>
  );
}
