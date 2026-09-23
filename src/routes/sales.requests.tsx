import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { requireRoleAccess } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { listStaffRequests } from "@/lib/request-service";
import { salesNav as nav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

type RequestRecord = Record<string, unknown>;

export const Route = createFileRoute("/sales/requests")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: SalesRequests,
});

function SalesRequests() {
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");
  const [viewing, setViewing] = useState<RequestRecord | null>(null);

  async function load() {
    try { setRequests((await listStaffRequests()) as RequestRecord[]); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to load requests."); }
  }

  useEffect(() => { void load(); }, []);

  async function updateStatus(id: string, status: string) {
    setSaving(id);
    const { error: updateError } = await supabase.from("requests").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message); else await load();
    setSaving("");
  }

  function displayValue(value: unknown, fallback = "Not provided") {
    return value === null || value === undefined || value === "" ? fallback : String(value);
  }

  return (
    <PortalShell title="Requests" nav={nav}>
      {error && <p className="mb-4 border border-red-300/30 p-4 text-red-100">{error}</p>}
      <div className="space-y-3">
        {requests.map((request) => {
          const customer = request.customer_details as Record<string, unknown> | null;
          const event = request.service_details as Record<string, unknown> | null;
          return <article key={String(request.id)} className="border border-white/10 p-5"><div className="flex flex-wrap justify-between gap-3"><div><p className="whisper text-champagne">{String(request.request_number)} · {String(request.request_mode ?? "ENQUIRY")}</p><p className="mt-2 font-serif text-2xl">{String(request.service_type)}</p><p className="mt-1 text-sm text-ivory/50">{String(customer?.name ?? request.customer_id)} · {String(customer?.email ?? "-")}</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => setViewing(request)} className="border border-ivory/30 px-3 py-2 whisper text-[0.6rem] text-ivory/70 hover:border-champagne hover:text-champagne">VIEW</button><select value={String(request.status)} disabled={saving === String(request.id)} onChange={(event) => void updateStatus(String(request.id), event.target.value)} className="h-10 min-w-48 border border-champagne/60 bg-midnight px-3 font-sans text-xs font-medium tracking-[0.12em] text-ivory outline-none focus:border-champagne disabled:opacity-50" aria-label={`Update status for ${String(request.request_number)}`}><option value="DRAFT">DRAFT</option><option value="SUBMITTED">SUBMITTED</option><option value="UNDER_REVIEW">UNDER REVIEW</option><option value="SALES_CONTACTED">SALES CONTACTED</option><option value="OPTIONS_FOUND">OPTIONS FOUND</option><option value="QUOTE_SENT">QUOTE SENT</option><option value="BOOKED">BOOKED</option><option value="COMPLETED">COMPLETED</option><option value="CANCELLED">CANCELLED</option></select></div></div><p className="mt-4 text-xs text-ivory/50">Status changes are visible to the customer and admin.</p></article>;
        })}
      </div>
      {viewing && (() => { const event = viewing.service_details as Record<string, unknown> | null; const customer = viewing.customer_details as Record<string, unknown> | null; return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={() => setViewing(null)}><div className="flex max-h-[75vh] w-full max-w-lg flex-col overflow-hidden border border-ivory/15 bg-[oklch(0.1_0.008_275)]" onClick={(clickEvent) => clickEvent.stopPropagation()}><div className="flex shrink-0 items-start justify-between border-b border-ivory/10 p-5"><div><p className="whisper text-champagne">REQUEST DETAILS</p><h2 className="mt-2 font-serif text-2xl text-ivory">{String(viewing.request_number)}</h2></div><button type="button" onClick={() => setViewing(null)} className="flex h-8 w-8 items-center justify-center border border-ivory/20 text-xl text-ivory/60 hover:border-champagne hover:text-champagne" aria-label="Close request details">×</button></div><div className="min-h-0 overflow-y-auto p-5 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]"><div className="grid gap-3 text-sm text-ivory/65 sm:grid-cols-2"><span>Customer: {displayValue(customer?.name ?? viewing.customer_id)}</span><span>Email: {displayValue(customer?.email)}</span><span>Mobile: {displayValue(customer?.mobile)}</span><span>Status: {displayValue(viewing.status)}</span><span>Service: {displayValue(viewing.service_type)}</span><span>Passengers: {displayValue(viewing.people_count)}</span></div><div className="mt-6 border-t border-ivory/10 pt-5"><p className="whisper text-champagne">EVENT / FLIGHT DETAILS</p><div className="mt-3 grid gap-3 text-sm text-ivory/65 sm:grid-cols-2"><span>Event type: {displayValue(event?.event_type)}</span><span>Timing: {displayValue(event?.timing)}</span><span>Date: {displayValue(event?.event_date)}</span><span>Time: {displayValue(event?.event_time)}</span><span>Aircraft: {displayValue(event?.aircraft_model)}</span><span>Aircraft type: {displayValue(event?.aircraft_kind)}</span><span>Capacity: {displayValue(event?.aircraft_capacity)}</span><span>Food: {displayValue(event?.food)}</span><span>Drinks: {displayValue(event?.drinks)}</span><span>Champagne: {event?.champagne ? "Included" : "Not requested"}</span><span className="sm:col-span-2">Crew preferences: {displayValue(event?.crew)}</span></div></div><div className="mt-5 border-t border-ivory/10 pt-5"><p className="whisper text-champagne">CUSTOMER DETAILS</p><div className="mt-3 grid gap-3 text-sm text-ivory/65 sm:grid-cols-2"><span>Name: {displayValue(customer?.name)}</span><span>Email: {displayValue(customer?.email)}</span><span>Mobile: {displayValue(customer?.mobile)}</span><span>Identity proof: {customer?.identity_doc ? "Uploaded" : "Not uploaded"}</span></div></div></div></div></div>; })()}
    </PortalShell>
  );
}
