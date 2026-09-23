import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { customerNav as nav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/customer/dashboard")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: CustomerDashboard,
});

function CustomerDashboard() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [entitlement, setEntitlement] = useState<{ subscription_status: string; subscription_plan: string | null; credits_remaining: number } | null>(null);
  const [pendingBooking, setPendingBooking] = useState<{ id: string; request_number: string; status: string } | null>(null);

  useEffect(() => {
    if (!profile?.id) return;
    void supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining").eq("customer_id", profile.id).maybeSingle()
      .then(({ data }) => setEntitlement(data));
    void supabase.from("requests").select("id,request_number,status").eq("customer_id", profile.id).eq("request_mode", "BOOKING").in("status", ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "SALES_CONTACTED", "OPTIONS_FOUND", "QUOTE_SENT"]).order("created_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => setPendingBooking(data));
    const channel = supabase.channel(`dashboard-entitlement-${profile.id}`).on("postgres_changes", { event: "*", schema: "public", table: "customer_entitlements", filter: `customer_id=eq.${profile.id}` }, (payload) => {
      if (payload.new) setEntitlement(payload.new as typeof entitlement);
    }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [profile?.id]);

  useEffect(() => {
    if (!profile?.id) return;
    const channel = supabase.channel(`dashboard-booking-${profile.id}`).on("postgres_changes", { event: "*", schema: "public", table: "requests", filter: `customer_id=eq.${profile.id}` }, (payload) => {
      if (payload.new && (payload.new as { request_mode?: string }).request_mode === "BOOKING") setPendingBooking(payload.new as typeof pendingBooking);
    }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [profile?.id]);

  async function handleLogout() {
    await logout();
    await navigate({ to: "/login" });
  }

  return (
    <PortalShell
      title={`Good evening, ${profile?.full_name?.split(" ")[0] ?? "member"}.`}
      nav={nav}
      onLogout={() => void handleLogout()}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="border border-champagne/30 bg-champagne/[0.06] p-6">
          <p className="whisper text-champagne">ACCESS</p>
          <p className="mt-4 font-serif text-2xl">{entitlement?.subscription_status === "ACTIVE" ? "Booking enabled" : `${entitlement?.credits_remaining ?? 0} enquiry credits`}</p>
          <p className="mt-2 text-xs text-ivory/45">{entitlement?.subscription_plan ?? "Choose a subscription or credits"}</p>
          <Link to="/customer/subscriptions" className="mt-4 inline-block whisper text-champagne hover:text-ivory">VIEW ACCOUNT →</Link>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Active requests</p>
          <p className="mt-4 font-serif text-4xl">0</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">Pending quotes</p>
          <p className="mt-4 font-serif text-4xl">0</p>
        </div>
        <Link
          to="/customer/requests/new"
          className="border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20"
        >
          <p className="whisper text-champagne">Begin</p>
          <p className="mt-4 font-serif text-3xl">New request →</p>
        </Link>
      </div>
      {pendingBooking && <div className="mt-6 border border-champagne/30 bg-champagne/[0.06] p-6"><p className="whisper text-champagne">PENDING BOOKING · {pendingBooking.request_number}</p><p className="mt-3 font-serif text-2xl text-ivory">Your subscription is active. Continue your flight booking.</p><p className="mt-2 text-sm text-ivory/50">Current status: {pendingBooking.status}</p><Link to="/customer/bookings" className="mt-5 inline-block border border-champagne/50 px-4 py-2 whisper text-champagne">CONTINUE BOOKING →</Link></div>}
    </PortalShell>
  );
}
