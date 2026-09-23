import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { adminNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/customers")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: CustomersPage,
});

type Customer = {
  id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  country: string | null;
  company: string | null;
  created_at: string;
};

function CustomersPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email, mobile, country, company, created_at")
        .eq("role", "CUSTOMER")
        .order("created_at", { ascending: false });
      setCustomers((data as Customer[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = customers.filter(c =>
    !search ||
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.country ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalShell title="Customers" nav={adminNav} onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="whisper text-champagne">{customers.length} registered</p>
        <label className="group relative block w-64">
          <input
            type="text"
            placeholder="Search name, email, country…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="field text-sm"
          />
          <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" />
        </label>
      </div>

      {loading ? (
        <p className="font-serif text-sm italic text-ivory/40">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="border border-ivory/10 bg-white/[0.02] p-8 text-center">
          <p className="font-serif text-ivory/40 italic">{search ? "No customers match your search." : "No customers registered yet."}</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-ivory/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory/10 text-left">
                <th className="px-4 py-3 whisper text-ivory/40">Name</th>
                <th className="px-4 py-3 whisper text-ivory/40">Email</th>
                <th className="px-4 py-3 whisper text-ivory/40">Mobile</th>
                <th className="px-4 py-3 whisper text-ivory/40">Country</th>
                <th className="px-4 py-3 whisper text-ivory/40">Company</th>
                <th className="px-4 py-3 whisper text-ivory/40">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-ivory/5 transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-serif text-ivory">{c.full_name || "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{c.email}</td>
                  <td className="px-4 py-3 text-ivory/60">{c.mobile ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{c.country ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{c.company ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/40">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalShell>
  );
}
