import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { requireRoleAccess } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { listCustomerRequests } from "@/lib/request-service";
import { customerNav as nav } from "@/lib/portal-nav";

type RequestRecord = Record<string, unknown>;

export const Route = createFileRoute("/customer/requests")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: CustomerRequests,
});

function CustomerRequests() {
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [error, setError] = useState("");
  const [tracked, setTracked] = useState<RequestRecord | null>(null);

  useEffect(() => {
    void listCustomerRequests()
      .then((data) => setRequests(data as RequestRecord[]))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load requests."));
  }, []);

  return (
    <PortalShell title="My requests" nav={nav}>
      {error && <p className="mb-4 border border-red-300/30 p-4 text-sm text-red-100">{error}</p>}
      {!error && !requests.length && <p className="border border-dashed border-white/15 p-10 text-center text-sm text-ivory/50">No requests found.</p>}
      <div className="space-y-3">
        {requests.map((request) => {
          const details = request.service_details as Record<string, unknown> | null;
          const customerDetails = request.customer_details as Record<string, unknown> | null;
          const isEvent = request.service_type === "EVENT_AVIATION";
          return (
            <article key={String(request.id)} className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="whisper text-champagne">{String(request.request_number)} · {isEvent ? "EVENT AVIATION" : String(request.service_type)}</p>
                  <p className="mt-2 font-serif text-2xl">{isEvent ? String(details?.event_type ?? "Event flight") : String(request.service_type)}</p>
                  <p className="mt-1 text-sm text-ivory/50">{String(request.destination ?? "Destination to be confirmed")} · {String(request.people_count)} people</p>
                </div>
                <span className="border border-champagne/30 px-3 py-1 whisper text-xs text-champagne">{String(request.status)}</span>
              </div>
              {isEvent && <div className="mt-4 grid gap-2 border-t border-white/10 pt-3 text-xs text-ivory/50 sm:grid-cols-2"><span>Aircraft: {String(details?.aircraft_model ?? "Pending assignment")}</span><span>Timing: {String(details?.timing ?? "Pending")}</span><span>Food: {String(details?.food ?? "Not specified")}</span><span>Crew: {String(details?.crew ?? "Standard crew")}</span></div>}
              {isEvent && request.status === "BOOKED" && <button type="button" onClick={() => setTracked(request)} className="mt-5 border border-champagne/50 bg-champagne/10 px-4 py-2 whisper text-champagne hover:bg-champagne/20">TRACK EVENT SERVICE →</button>}
              {request.status !== "BOOKED" && <p className="mt-4 text-xs text-ivory/40">Status updates from the sales desk will appear here.</p>}
              {customerDetails?.name && <p className="mt-3 text-xs text-ivory/35">Submitted for {String(customerDetails.name)}</p>}
            </article>
          );
        })}
      </div>
      {tracked && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={() => setTracked(null)}><div className="w-full max-w-2xl border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b border-ivory/10 pb-5"><div><p className="whisper text-champagne">BOOKED EVENT SERVICE</p><h2 className="mt-2 font-serif text-3xl text-ivory">{String((tracked.service_details as Record<string, unknown> | null)?.aircraft_model ?? "Aircraft assigned")}</h2><p className="mt-1 text-xs text-ivory/45">{String(tracked.request_number)} · BOOKED</p></div><button type="button" onClick={() => setTracked(null)} className="text-2xl text-ivory/50 hover:text-champagne" aria-label="Close event tracking">×</button></div><div className="relative mt-6 h-56 overflow-hidden border border-champagne/20 bg-[radial-gradient(circle_at_25%_30%,rgba(220,190,120,.14)_1px,transparent_2px),radial-gradient(circle_at_70%_65%,rgba(220,190,120,.12)_1px,transparent_2px)] bg-[length:34px_34px]"><div className="absolute left-[14%] top-[30%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]"/><div className="absolute right-[14%] bottom-[25%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]"/><div className="absolute left-[17%] top-[37%] h-px w-[66%] rotate-[22deg] bg-champagne/70"/><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-champagne/40 bg-obsidian/80 px-3 py-2 whisper text-[0.55rem] text-champagne">SERVICE ROUTE</span></div><div className="mt-5 grid gap-3 border-t border-ivory/10 pt-4 text-sm text-ivory/60 sm:grid-cols-2"><span>Event: {String((tracked.service_details as Record<string, unknown> | null)?.event_type ?? "Special event")}</span><span>Date: {String((tracked.service_details as Record<string, unknown> | null)?.event_date ?? "Confirmed with sales")}</span><span>Food: {String((tracked.service_details as Record<string, unknown> | null)?.food ?? "Not specified")}</span><span>Drinks: {String((tracked.service_details as Record<string, unknown> | null)?.drinks ?? "Not specified")}</span></div></div></div>}
    </PortalShell>
  );
}
