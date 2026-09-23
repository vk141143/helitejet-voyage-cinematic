import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { salesNav } from "@/lib/portal-nav";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/sales/aviation")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: SalesAviation,
});

type AircraftRow = { id: string; kind: "flight" | "helicopter"; model: string; capacity: string; seats: number | null };

function SalesAviation() {
  const { logout } = useAuth();
  const [aircraft, setAircraft] = useState<AircraftRow[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "flight" | "helicopter">("all");
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.from("aircraft").select("id,kind,model,capacity,seats").order("kind").order("model")
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setAircraft((data ?? []) as AircraftRow[]);
      });
  }, []);

  const filtered = aircraft.filter((row) =>
    (filter === "all" || row.kind === filter) && row.model.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PortalShell title="Aviation" nav={salesNav} onLogout={() => { void logout(); }}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="whisper text-champagne">READ-ONLY FLEET CATALOGUE</p>
          <p className="mt-2 text-sm text-ivory/50">Flights and helicopters available for customer requests.</p>
        </div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search model..."
          className="border border-ivory/15 bg-transparent px-3 py-2 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60 md:w-64" />
      </div>
      <div className="mb-5 flex flex-wrap gap-3">
        {["all", "flight", "helicopter"].map((option) => (
          <button key={option} type="button" onClick={() => setFilter(option as typeof filter)}
            className={`border px-4 py-1.5 whisper text-xs ${filter === option ? "border-champagne text-champagne" : "border-ivory/20 text-ivory/50"}`}>
            {option === "all" ? "ALL" : option === "flight" ? "FLIGHTS" : "HELICOPTERS"}
          </button>
        ))}
      </div>
      {error && <p className="mb-4 border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}
      <div className="grid gap-8 md:grid-cols-2">
        {["flight", "helicopter"].map((kind) => {
          const rows = filtered.filter((row) => row.kind === kind);
          if (filter !== "all" && filter !== kind) return null;
          return (
            <section key={kind}>
              <div className="mb-3 flex items-baseline justify-between border-b border-ivory/10 pb-3">
                <h2 className="font-serif text-2xl font-light text-ivory">{kind === "flight" ? "Flights" : "Helicopters"}</h2>
                <span className="whisper text-ivory/40">{rows.length} AVAILABLE</span>
              </div>
              <div className="space-y-2">
                {rows.map((row) => (
                  <article key={row.id} className="border border-ivory/10 bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-serif text-lg text-ivory">{row.model}</p>
                      <span className="whisper text-xs text-champagne">{row.capacity}</span>
                    </div>
                    <p className="mt-1 text-xs text-ivory/35">{row.seats ? `${row.seats} seats` : "Capacity on request"} · View only</p>
                  </article>
                ))}
                {!rows.length && <p className="border border-dashed border-ivory/10 p-6 text-center text-sm text-ivory/35">No aircraft found.</p>}
              </div>
            </section>
          );
        })}
      </div>
    </PortalShell>
  );
}
