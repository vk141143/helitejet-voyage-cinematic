import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { customerNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/customer/subscriptions")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: CustomerSubscriptions,
});

type Entitlement = { subscription_status: string; subscription_plan: string | null; credits_remaining: number; updated_at: string };
type Purchase = { id: string; purchase_type: string; product_code: string; credits: number; amount_usd: number; status: string; created_at: string };

function CustomerSubscriptions() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile?.id) return;
    async function load() {
      const [access, history] = await Promise.all([
        supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining,updated_at").eq("customer_id", profile.id).maybeSingle(),
        supabase.from("entitlement_purchases").select("id,purchase_type,product_code,credits,amount_usd,status,created_at").eq("customer_id", profile.id).order("created_at", { ascending: false }),
      ]);
      if (access.error || history.error) setError(access.error?.message ?? history.error?.message ?? "Unable to load account access.");
      setEntitlement(access.data as Entitlement | null);
      setPurchases((history.data ?? []) as Purchase[]);
    }
    void load();
    const channel = supabase.channel(`customer-subscriptions-${profile.id}`).on("postgres_changes", { event: "*", schema: "public", table: "customer_entitlements", filter: `customer_id=eq.${profile.id}` }, (payload) => {
      if (payload.new) setEntitlement(payload.new as Entitlement);
    }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [profile?.id]);

  async function handleLogout() {
    await logout();
    await navigate({ to: "/login" });
  }

  return (
    <PortalShell title="Subscription & credits" nav={customerNav} onLogout={() => void handleLogout()}>
      {error && <p className="mb-5 border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="border border-champagne/30 bg-champagne/[0.06] p-6">
          <p className="whisper text-champagne">SUBSCRIPTION</p>
          <p className="mt-4 font-serif text-2xl text-ivory">{entitlement?.subscription_status === "ACTIVE" ? entitlement.subscription_plan ?? "Active" : "No active plan"}</p>
          <p className="mt-2 text-xs text-ivory/45">{entitlement?.subscription_status === "ACTIVE" ? "Booking access enabled" : "Credits enable enquiries"}</p>
        </div>
        <div className="border border-ivory/10 bg-white/[0.03] p-6">
          <p className="whisper text-ivory/50">ENQUIRY CREDITS</p>
          <p className="mt-4 font-serif text-4xl text-ivory">{(entitlement?.credits_remaining ?? 0).toLocaleString()}</p>
          <p className="mt-2 text-xs text-ivory/45">Available for flight and service enquiries</p>
        </div>
        <a href="/subscriptions#plans" className="border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20">
          <p className="whisper text-champagne">MANAGE ACCESS</p>
          <p className="mt-4 font-serif text-2xl text-ivory">View plans & credits →</p>
        </a>
      </div>
      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between border-b border-ivory/10 pb-3">
          <div><p className="whisper text-champagne">ACCOUNT HISTORY</p><h2 className="mt-2 font-serif text-2xl text-ivory">Your purchases</h2></div>
          <span className="text-xs text-ivory/40">{purchases.length} records</span>
        </div>
        <div className="space-y-2">
          {purchases.map((purchase) => (
            <article key={purchase.id} className="flex flex-wrap items-center justify-between gap-3 border border-ivory/10 bg-white/[0.02] px-4 py-3 text-sm">
              <div><p className="font-serif text-ivory">{purchase.purchase_type === "SUBSCRIPTION" ? `Subscription · ${purchase.product_code}` : `${purchase.credits.toLocaleString()} enquiry credits`}</p><p className="mt-1 text-xs text-ivory/40">{new Date(purchase.created_at).toLocaleString()} · {purchase.status}</p></div>
              <span className="text-champagne">${Number(purchase.amount_usd).toFixed(2)}</span>
            </article>
          ))}
          {!purchases.length && <p className="border border-dashed border-ivory/10 p-8 text-center text-sm text-ivory/35">No purchases yet.</p>}
        </div>
      </section>
    </PortalShell>
  );
}
