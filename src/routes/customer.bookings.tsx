import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { customerNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/customer/bookings")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: CustomerBookings,
});

type Booking = { id: string; request_number: string; status: string; service_type: string; customer_details: Record<string, unknown>; service_details: Record<string, unknown>; created_at: string };

function CustomerBookings() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [tracked, setTracked] = useState<Booking | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [mobile, setMobile] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadBookings() {
    const { data, error: err } = await supabase.from("requests").select("id,request_number,status,service_type,customer_details,service_details,created_at").eq("request_mode", "BOOKING").order("created_at", { ascending: false });
    if (err) setError(err.message); else setBookings((data ?? []) as Booking[]);
  }

  useEffect(() => {
    void loadBookings();
    const channel = supabase.channel(`customer-bookings-${profile?.id ?? "unknown"}`).on("postgres_changes", { event: "*", schema: "public", table: "requests", filter: `customer_id=eq.${profile?.id ?? ""}` }, () => { void loadBookings(); }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [profile?.id]);

  function continueBooking(booking: Booking) {
    const details = booking.customer_details ?? {};
    setSelected(booking); setName(String(details.name ?? "")); setEmail(String(details.email ?? profile?.email ?? "")); setMobile(String(details.mobile ?? "")); setError("");
  }

  async function submitBooking(event: FormEvent) {
    event.preventDefault();
    if (!selected || !name.trim() || !email.trim() || !mobile.trim()) { setError("Name, email and mobile number are required."); return; }
    setSaving(true); setError("");
    try {
      let identityDoc = selected.customer_details.identity_doc ?? null;
      if (file) {
        const extension = file.name.split(".").pop() ?? "bin";
        const path = `identity/${profile?.id}/${selected.id}-${Date.now()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("request-documents").upload(path, file);
        if (uploadError) throw uploadError;
        identityDoc = path;
      }
      const { error: updateError } = await supabase.from("requests").update({ status: "SUBMITTED", customer_details: { ...selected.customer_details, name: name.trim(), email: email.trim(), mobile: mobile.trim(), identity_doc: identityDoc }, updated_at: new Date().toISOString() }).eq("id", selected.id);
      if (updateError) throw updateError;
      setSelected(null); setFile(null); await loadBookings();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to submit booking."); }
    finally { setSaving(false); }
  }

  async function handleLogout() { await logout(); await navigate({ to: "/login" }); }

  return (
    <PortalShell title="Bookings" nav={customerNav} onLogout={() => void handleLogout()}>
      {error && <p className="mb-5 border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <article key={booking.id} className="border border-ivory/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="whisper text-champagne">{booking.request_number} · AVIATION BOOKING</p><h2 className="mt-2 font-serif text-2xl text-ivory">Flight booking request</h2><p className="mt-2 text-sm text-ivory/50">Created {new Date(booking.created_at).toLocaleDateString()}</p></div><span className="border border-champagne/30 px-3 py-1 whisper text-xs text-champagne">{booking.status}</span></div>
            {booking.status === "DRAFT" ? <button type="button" onClick={() => continueBooking(booking)} className="mt-5 border border-champagne/50 px-4 py-2 whisper text-champagne">CONTINUE BOOKING →</button> : booking.status === "BOOKED" ? <button type="button" onClick={() => setTracked(booking)} className="mt-5 border border-champagne/50 bg-champagne/10 px-4 py-2 whisper text-champagne hover:bg-champagne/20">TRACK FLIGHT →</button> : <p className="mt-5 text-sm text-ivory/60">Sales is reviewing your booking. Status updates appear here automatically.</p>}
          </article>
        ))}
        {!bookings.length && <p className="border border-dashed border-ivory/10 p-10 text-center text-sm text-ivory/35">No booking requests yet. Choose a subscription to begin.</p>}
      </div>
      {tracked && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={() => setTracked(null)}><div className="w-full max-w-2xl border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b border-ivory/10 pb-5"><div><p className="whisper text-champagne">LIVE FLIGHT TRACKING</p><h2 className="mt-2 font-serif text-3xl text-ivory">{String(tracked.service_details?.aircraft_model ?? "Booked flight")}</h2><p className="mt-1 text-xs text-ivory/45">{tracked.request_number} · BOOKED</p></div><button type="button" onClick={() => setTracked(null)} className="text-2xl text-ivory/50 hover:text-champagne" aria-label="Close tracking">×</button></div><div className="relative mt-6 h-64 overflow-hidden border border-champagne/20 bg-[radial-gradient(circle_at_25%_30%,rgba(220,190,120,.14)_1px,transparent_2px),radial-gradient(circle_at_70%_65%,rgba(220,190,120,.12)_1px,transparent_2px)] bg-[length:34px_34px]"><div className="absolute left-[14%] top-[28%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]"/><div className="absolute right-[14%] bottom-[24%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]"/><div className="absolute left-[17%] top-[35%] h-px w-[66%] rotate-[22deg] bg-champagne/70"/><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-champagne/40 bg-obsidian/80 px-3 py-2 whisper text-[0.55rem] text-champagne">FLIGHT ROUTE</div><p className="absolute bottom-3 left-4 whisper text-[0.55rem] text-ivory/40">DEPARTURE</p><p className="absolute right-4 top-3 whisper text-[0.55rem] text-ivory/40">DESTINATION</p></div><div className="mt-5 grid gap-3 border-t border-ivory/10 pt-4 text-sm text-ivory/60 sm:grid-cols-2"><span>Aircraft: {String(tracked.service_details?.aircraft_model ?? "Assigned by concierge")}</span><span>Type: {String(tracked.service_details?.aircraft_kind ?? "Private aviation")}</span><span>Passengers: {String(tracked.service_details?.travellers ?? "-")}</span><span>Route: {String(tracked.service_details?.route ?? "Confirmed with sales")}</span></div></div></div>}
      {selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"><form onSubmit={submitBooking} className="w-full max-w-lg border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7"><p className="whisper text-champagne">COMPLETE BOOKING</p><h2 className="mt-2 font-serif text-3xl text-ivory">Remaining details</h2><label className="mt-6 block"><span className="whisper text-ivory/50">Full name</span><input className="field mt-2" value={name} onChange={(event) => setName(event.target.value)} required /></label><label className="mt-4 block"><span className="whisper text-ivory/50">Email</span><input className="field mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="mt-4 block"><span className="whisper text-ivory/50">Mobile number</span><input className="field mt-2" value={mobile} onChange={(event) => setMobile(event.target.value)} required /></label><div className="mt-4"><span className="whisper text-ivory/50">Identity proof</span><div className="mt-2"><button type="button" onClick={() => fileRef.current?.click()} className="border border-ivory/20 px-4 py-2 whisper text-ivory/60">{file?.name ?? "UPLOAD DOCUMENT"}</button></div><input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></div><div className="mt-6 flex justify-between border-t border-ivory/10 pt-4"><button type="button" onClick={() => setSelected(null)} className="whisper text-ivory/40">CANCEL</button><button type="submit" disabled={saving} className="whisper text-champagne disabled:opacity-40">{saving ? "SUBMITTING..." : "SUBMIT BOOKING →"}</button></div></form></div>}
    </PortalShell>
  );
}
