import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { salesNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/sales/customers")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: SalesCustomersPage,
});

type Customer = {
  id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  country: string | null;
  company: string | null;
  created_at: string;
  entitlement: { subscription_status: string; subscription_plan: string | null; credits_remaining: number } | null;
  purchasedCredits: number;
  purchaseCount: number;
};

type ProfileRow = Omit<Customer, "entitlement" | "purchasedCredits" | "purchaseCount">;

function SalesCustomersPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadCustomers() {
    const { data, error } = await supabase.from("profiles").select("id, full_name, email, mobile, country, company, created_at").eq("role", "CUSTOMER").order("created_at", { ascending: false });
    if (error || !data) { setLoading(false); return; }
    const ids = data.map((customer) => customer.id);
    const [{ data: entitlements }, { data: purchases }] = await Promise.all([
      supabase.from("customer_entitlements").select("customer_id,subscription_status,subscription_plan,credits_remaining").in("customer_id", ids),
      supabase.from("entitlement_purchases").select("customer_id,credits").in("customer_id", ids),
    ]);
    const entitlementByCustomer = new Map((entitlements ?? []).map((item) => [item.customer_id, item]));
    const purchaseTotals = new Map<string, { credits: number; count: number }>();
    (purchases ?? []).forEach((purchase) => {
      const current = purchaseTotals.get(purchase.customer_id) ?? { credits: 0, count: 0 };
      purchaseTotals.set(purchase.customer_id, { credits: current.credits + (purchase.credits ?? 0), count: current.count + 1 });
    });
    setCustomers((data as ProfileRow[]).map((customer) => ({
      ...customer,
      entitlement: entitlementByCustomer.get(customer.id) ?? null,
      purchasedCredits: purchaseTotals.get(customer.id)?.credits ?? 0,
      purchaseCount: purchaseTotals.get(customer.id)?.count ?? 0,
    })));
    setLoading(false);
  }

  useEffect(() => {
    void loadCustomers();
    const channel = supabase.channel("sales-customer-access")
      .on("postgres_changes", { event: "*", schema: "public", table: "customer_entitlements" }, () => { void loadCustomers(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "entitlement_purchases" }, () => { void loadCustomers(); })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, []);

  const filtered = customers.filter((customer) =>
    !search || customer.full_name.toLowerCase().includes(search.toLowerCase()) || customer.email.toLowerCase().includes(search.toLowerCase()) || (customer.country ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PortalShell title="Customers" nav={salesNav} onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="whisper text-champagne">{customers.length} registered</p>
        <input type="text" placeholder="Search name, email, country..." value={search} onChange={(event) => setSearch(event.target.value)} className="field w-64 text-sm" />
      </div>
      {loading ? <p className="font-serif text-sm italic text-ivory/40">Loading...</p> : filtered.length === 0 ? (
        <div className="border border-ivory/10 bg-white/[0.02] p-8 text-center"><p className="font-serif italic text-ivory/40">{search ? "No customers match your search." : "No customers registered yet."}</p></div>
      ) : (
        <div className="overflow-x-auto border border-ivory/10">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ivory/10 text-left">
              {["Name", "Email", "Mobile", "Subscription", "Credits", "Purchases", "Country", "Company", "Joined"].map((heading) => <th key={heading} className="px-4 py-3 whisper text-ivory/40">{heading}</th>)}
            </tr></thead>
            <tbody>{filtered.map((customer) => (
              <tr key={customer.id} className="border-b border-ivory/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-serif text-ivory">{customer.full_name || "-"}</td>
                <td className="px-4 py-3 text-ivory/60">{customer.email}</td>
                <td className="px-4 py-3 text-ivory/60">{customer.mobile ?? "-"}</td>
                <td className="px-4 py-3 text-ivory/60">{customer.entitlement?.subscription_status === "ACTIVE" ? customer.entitlement.subscription_plan ?? "Active" : "No subscription"}</td>
                <td className="px-4 py-3 text-ivory/60"><span className="text-ivory">{(customer.entitlement?.credits_remaining ?? 0).toLocaleString()}</span><span className="block text-[0.65rem] text-ivory/35">{customer.purchasedCredits.toLocaleString()} bought</span></td>
                <td className="px-4 py-3 text-ivory/60">{customer.purchaseCount}</td>
                <td className="px-4 py-3 text-ivory/60">{customer.country ?? "-"}</td>
                <td className="px-4 py-3 text-ivory/60">{customer.company ?? "-"}</td>
                <td className="px-4 py-3 text-ivory/40">{new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </PortalShell>
  );
}
