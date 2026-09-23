import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, type UserRole } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { supabase } from "@/integrations/supabase/client";

type SupportTicket = {
  id: string;
  requester_id: string;
  requester_role: "CUSTOMER" | "SALES";
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  admin_response: string | null;
  created_at: string;
};

type SupportTicketsProps = {
  role: UserRole;
  nav: readonly { label: string; to: string }[];
};

export function SupportTickets({ role, nav }: SupportTicketsProps) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SupportTicket["status"]>("OPEN");
  const [response, setResponse] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadTickets() {
    const { data, error: err } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setTickets((data ?? []) as SupportTicket[]);
  }

  useEffect(() => { void loadTickets(); }, []);

  async function createTicket(event: FormEvent) {
    event.preventDefault();
    if (!subject.trim() || !message.trim() || !profile) return;
    setSaving(true); setError("");
    const { error: err } = await supabase.from("support_tickets").insert({
      requester_id: profile.id,
      requester_role: role,
      subject: subject.trim(),
      message: message.trim(),
    });
    if (err) setError(err.message);
    else { setSubject(""); setMessage(""); await loadTickets(); }
    setSaving(false);
  }

  async function updateTicket(ticket: SupportTicket) {
    const { error: err } = await supabase.from("support_tickets").update({
      status: ticket.status,
      admin_response: response[ticket.id] ?? ticket.admin_response ?? null,
      updated_at: new Date().toISOString(),
    }).eq("id", ticket.id);
    if (err) setError(err.message);
    else await loadTickets();
  }

  async function handleLogout() {
    await logout();
    await navigate({ to: "/login" });
  }

  return (
    <PortalShell title="Support" nav={nav as { label: string; to: string }[]} onLogout={() => void handleLogout()}>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {role !== "ADMIN" && (
          <form onSubmit={createTicket} className="border border-champagne/25 bg-champagne/[0.04] p-6">
            <p className="whisper text-champagne">OPEN A SUPPORT TICKET</p>
            <label className="mt-5 block">
              <span className="whisper text-ivory/50">Subject</span>
              <input value={subject} onChange={(event) => setSubject(event.target.value)} required className="field mt-2" placeholder="What do you need help with?" />
            </label>
            <label className="mt-4 block">
              <span className="whisper text-ivory/50">Message</span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} required rows={6} className="field mt-2 resize-none" placeholder="Describe the request..." />
            </label>
            <button type="submit" disabled={saving} className="mt-5 border border-champagne/50 px-5 py-2.5 whisper text-champagne disabled:opacity-40">
              {saving ? "SENDING..." : "SEND TO ADMIN ->"}
            </button>
          </form>
        )}

        <section>
          <div className="mb-4 flex items-baseline justify-between border-b border-ivory/10 pb-3">
            <div>
              <p className="whisper text-champagne">{role === "ADMIN" ? "SUPPORT INBOX" : "YOUR TICKETS"}</p>
              <h2 className="mt-2 font-serif text-2xl font-light text-ivory">{tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}</h2>
            </div>
          </div>
          {error && <p className="mb-4 border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="border border-ivory/10 bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="whisper text-xs text-champagne">{ticket.requester_role} · {new Date(ticket.created_at).toLocaleDateString()}</span>
                    <h3 className="mt-2 font-serif text-xl text-ivory">{ticket.subject}</h3>
                  </div>
                  <span className="border border-ivory/20 px-2 py-1 whisper text-[0.6rem] text-ivory/60">{ticket.status.replace("_", " ")}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-ivory/65">{ticket.message}</p>
                {ticket.admin_response && <p className="mt-4 border-l border-champagne/50 pl-3 text-sm text-champagne/80">Admin: {ticket.admin_response}</p>}
                {role === "ADMIN" && (
                  <div className="mt-5 grid gap-3 border-t border-ivory/10 pt-4 md:grid-cols-[auto_1fr_auto]">
                    <select value={ticket.status} onChange={(event) => setTickets((current) => current.map((item) => item.id === ticket.id ? { ...item, status: event.target.value as SupportTicket["status"] } : item))} className="field">
                      <option value="OPEN">Open</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option><option value="CLOSED">Closed</option>
                    </select>
                    <input value={response[ticket.id] ?? ticket.admin_response ?? ""} onChange={(event) => setResponse((current) => ({ ...current, [ticket.id]: event.target.value }))} className="field" placeholder="Reply to requester..." />
                    <button type="button" onClick={() => void updateTicket(ticket)} className="border border-champagne/50 px-4 py-2 whisper text-champagne">UPDATE</button>
                  </div>
                )}
              </article>
            ))}
            {!tickets.length && <p className="border border-dashed border-ivory/10 p-10 text-center text-sm text-ivory/35">No support tickets yet.</p>}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
