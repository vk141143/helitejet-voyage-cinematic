import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { customerNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/customer/events")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]); },
  component: CustomerEvents,
});

type Aircraft = { id: string; kind: "flight" | "helicopter"; model: string; capacity: string };

function CustomerEvents() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [eventType, setEventType] = useState<"SPECIAL" | "EMERGENCY">("SPECIAL");
  const [timing, setTiming] = useState<"IMMEDIATE" | "SCHEDULED">("SCHEDULED");
  const [aircraftKind, setAircraftKind] = useState<"flight" | "helicopter">("flight");
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [aircraftId, setAircraftId] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [people, setPeople] = useState(2);
  const [food, setFood] = useState("");
  const [champagne, setChampagne] = useState(false);
  const [drinks, setDrinks] = useState("");
  const [crew, setCrew] = useState("");
  const [name, setName] = useState(profile?.full_name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [mobile, setMobile] = useState(profile?.mobile ?? "");
  const [identity, setIdentity] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.from("aircraft").select("id,kind,model,capacity").eq("kind", aircraftKind).order("model")
      .then(({ data, error: err }) => { if (err) setError(err.message); else setAircraft((data ?? []) as Aircraft[]); });
  }, [aircraftKind]);

  useEffect(() => {
    if (!aircraft.some((item) => item.id === aircraftId)) setAircraftId("");
  }, [aircraft, aircraftId]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!eventName.trim()) return setError("Enter the event details.");
    if (!aircraftId) return setError("Choose a flight or helicopter.");
    if (timing === "SCHEDULED" && (!eventDate || !eventTime)) return setError("Choose the scheduled date and time.");
    if (!name.trim() || !email.trim() || !mobile.trim()) return setError("Name, email and mobile number are required.");
    setSaving(true); setError("");
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Your session has expired. Please sign in again.");
      let identityPath: string | null = null;
      if (identity) {
        const extension = identity.name.split(".").pop() ?? "bin";
        identityPath = `identity/${user.id}/event-${Date.now()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("request-documents").upload(identityPath, identity);
        if (uploadError) throw uploadError;
      }
      const selected = aircraft.find((item) => item.id === aircraftId);
      const { data: requestNumber, error: numberError } = await supabase.rpc("next_request_number");
      if (numberError) throw numberError;
      const { error: insertError } = await supabase.from("requests").insert({
        request_number: requestNumber,
        customer_id: user.id,
        service_type: "EVENT_AVIATION",
        service_subtype: eventType,
        status: "SUBMITTED",
        request_mode: "BOOKING",
        people_count: people,
        currency: "USD",
        start_date: eventDate || null,
        additional_requirements: eventName.trim(),
        customer_details: { name: name.trim(), email: email.trim(), mobile: mobile.trim(), identity_doc: identityPath },
        service_details: { event_type: eventType, timing, event_date: eventDate || null, event_time: eventTime || null, aircraft_id: aircraftId, aircraft_kind: aircraftKind, aircraft_model: selected?.model, aircraft_capacity: selected?.capacity, food, champagne, drinks, crew },
      });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to submit event request."); }
    finally { setSaving(false); }
  }

  async function handleLogout() { await logout(); await navigate({ to: "/login" }); }

  if (submitted) return <PortalShell title="Events" nav={customerNav} onLogout={() => void handleLogout()}><div className="border border-champagne/30 bg-champagne/[0.05] p-8 text-center"><p className="whisper text-champagne">EVENT REQUEST RECEIVED</p><h2 className="mt-3 font-serif text-4xl text-ivory">Your event flight is with the desk.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ivory/60">Sales will confirm the aircraft, timing, crew and service details. Track the request from My Requests.</p><button type="button" onClick={() => void navigate({ to: "/customer/requests" })} className="mt-6 border border-champagne/50 px-5 py-3 whisper text-champagne">VIEW REQUEST →</button></div></PortalShell>;

  return <PortalShell title="Events" nav={customerNav} onLogout={() => void handleLogout()}>
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-8">
      <div><p className="whisper text-champagne">EVENT AVIATION DESK</p><p className="mt-3 max-w-2xl font-serif text-2xl text-ivory/80">Arrange a flight or helicopter for a special occasion or an emergency.</p></div>
      {error && <p className="border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}
      <section className="grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2"><label><span className="whisper text-ivory/50">Event type</span><select value={eventType} onChange={(e) => setEventType(e.target.value as typeof eventType)} className="field mt-2 bg-midnight text-ivory"><option value="SPECIAL">Special event</option><option value="EMERGENCY">Emergency</option></select></label><label><span className="whisper text-ivory/50">Timing</span><select value={timing} onChange={(e) => setTiming(e.target.value as typeof timing)} className="field mt-2 bg-midnight text-ivory"><option value="IMMEDIATE">Immediate</option><option value="SCHEDULED">Scheduled</option></select></label><label className="md:col-span-2"><span className="whisper text-ivory/50">Event details</span><textarea value={eventName} onChange={(e) => setEventName(e.target.value)} rows={3} className="field mt-2 resize-none" placeholder="Tell us about the event or emergency..." required /></label>{timing === "SCHEDULED" && <><label><span className="whisper text-ivory/50">Date</span><input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="field mt-2" required /></label><label><span className="whisper text-ivory/50">Time</span><input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="field mt-2" required /></label></>}<label><span className="whisper text-ivory/50">People</span><input type="number" min={1} max={500} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="field mt-2" required /></label></section>
      <section className="space-y-5 border border-ivory/10 bg-white/[0.02] p-6"><div><p className="whisper text-champagne">AIRCRAFT</p><p className="mt-2 text-sm text-ivory/50">Choose a flight or helicopter, then select a model from the Supabase fleet.</p></div><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setAircraftKind("flight")} className={`border p-4 text-left font-serif ${aircraftKind === "flight" ? "border-champagne text-ivory" : "border-ivory/15 text-ivory/50"}`}>Flight</button><button type="button" onClick={() => setAircraftKind("helicopter")} className={`border p-4 text-left font-serif ${aircraftKind === "helicopter" ? "border-champagne text-ivory" : "border-ivory/15 text-ivory/50"}`}>Helicopter</button></div><select value={aircraftId} onChange={(e) => setAircraftId(e.target.value)} className="w-full border border-champagne/40 bg-midnight px-3 py-3 text-sm text-ivory" required><option value="">Choose a {aircraftKind} model</option>{aircraft.map((item) => <option key={item.id} value={item.id}>{item.model} · {item.capacity}</option>)}</select></section>
      <section className="grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2"><div className="md:col-span-2"><p className="whisper text-champagne">ONBOARD SERVICE</p></div><label><span className="whisper text-ivory/50">Food preferences</span><input value={food} onChange={(e) => setFood(e.target.value)} className="field mt-2" placeholder="Cuisine, dietary needs" /></label><label><span className="whisper text-ivory/50">Drinks</span><input value={drinks} onChange={(e) => setDrinks(e.target.value)} className="field mt-2" placeholder="Wine, spirits, soft drinks" /></label><label className="flex items-center gap-3 text-sm text-ivory/65"><input type="checkbox" checked={champagne} onChange={(e) => setChampagne(e.target.checked)} className="accent-[var(--champagne)]" /> Champagne service</label><label><span className="whisper text-ivory/50">Crew preferences</span><input value={crew} onChange={(e) => setCrew(e.target.value)} className="field mt-2" placeholder="Language, assistance, special crew needs" /></label></section>
      <section className="grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2"><div className="md:col-span-2"><p className="whisper text-champagne">CUSTOMER DETAILS</p></div><label><span className="whisper text-ivory/50">Full name</span><input value={name} onChange={(e) => setName(e.target.value)} className="field mt-2" required /></label><label><span className="whisper text-ivory/50">Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field mt-2" required /></label><label><span className="whisper text-ivory/50">Mobile number</span><input value={mobile} onChange={(e) => setMobile(e.target.value)} className="field mt-2" required /></label><div><span className="whisper text-ivory/50">Identity proof</span><button type="button" onClick={() => fileRef.current?.click()} className="mt-2 block border border-ivory/20 px-4 py-2 whisper text-ivory/60">{identity?.name ?? "UPLOAD DOCUMENT"}</button><input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => setIdentity(e.target.files?.[0] ?? null)} /></div></section>
      <button type="submit" disabled={saving} className="border border-champagne/50 px-6 py-3 whisper text-champagne disabled:opacity-40">{saving ? "SUBMITTING..." : "SUBMIT EVENT REQUEST →"}</button>
    </form>
  </PortalShell>;
}
