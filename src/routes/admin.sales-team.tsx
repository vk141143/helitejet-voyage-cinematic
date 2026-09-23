import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { adminNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/admin/sales-team")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: SalesTeamPage,
});

type SalesMember = {
  id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  department: string | null;
  identity_doc_name: string | null;
  created_at: string;
};

type FormState = {
  full_name: string;
  email: string;
  password: string;
  mobile: string;
  department: string;
  notes: string;
};

function SalesTeamPage() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState<SalesMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ full_name: "", email: "", password: "", mobile: "", department: "", notes: "" });
  const [docFile, setDocFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadMembers() {
    setLoading(true);
    const { data } = await supabase
      .from("sales_members")
      .select("id, full_name, email, mobile, department, identity_doc_name, created_at")
      .order("created_at", { ascending: false });
    setMembers((data as SalesMember[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadMembers(); }, []);

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(c => ({ ...c, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      if (form.password.length < 8) throw new Error("Password must be at least 8 characters.");

      // 1. Create auth account — trigger creates profile as CUSTOMER
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name, mobile: form.mobile } },
      });
      if (signUpError) throw new Error(signUpError.message);

      // 2. Promote profile to SALES — retry a few times as trigger may be slightly delayed
      let profileId: string | null = null;
      for (let i = 0; i < 5; i++) {
        const { data } = await supabase.rpc("promote_to_sales_by_email", { user_email: form.email });
        if (data) { profileId = data as string; break; }
        await new Promise(r => setTimeout(r, 600));
      }

      // 3. Upload identity document if provided
      let docPath: string | null = null;
      let docName: string | null = null;
      if (docFile && profileId) {
        const ext = docFile.name.split(".").pop();
        docPath = `${profileId as string}/identity.${ext}`;
        docName = docFile.name;
        const { error: uploadError } = await supabase.storage
          .from("staff-documents")
          .upload(docPath, docFile, { upsert: true });
        if (uploadError) throw new Error("Account created but document upload failed: " + uploadError.message);
      }

      // 4. Insert into dedicated sales_members table via security-definer RPC
      const { error: insertError } = await supabase.rpc("insert_sales_member", {
        p_profile_id: profileId as string,
        p_full_name: form.full_name,
        p_email: form.email,
        p_mobile: form.mobile || null,
        p_department: form.department || null,
        p_notes: form.notes || null,
        p_identity_doc_path: docPath,
        p_identity_doc_name: docName,
        p_created_by: profile?.id ?? null,
      });
      if (insertError) throw new Error("Account created but record insert failed: " + insertError.message);

      setSuccess(`${form.full_name} added. They can log in at /login with their email and password.`);
      setForm({ full_name: "", email: "", password: "", mobile: "", department: "", notes: "" });
      setDocFile(null);
      setOpen(false);
      void loadMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PortalShell title="Sales Team" nav={adminNav} onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}>
      <div className="mb-6 flex items-center justify-between">
        <p className="whisper text-champagne">{members.length} member{members.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => { setOpen(true); setError(""); setSuccess(""); }}
          className="inline-flex items-center gap-2 border border-champagne/40 px-5 py-3 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10"
        >
          + ADD SALES MEMBER
        </button>
      </div>

      {success && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300">
          {success}
        </motion.p>
      )}

      {loading ? (
        <p className="font-serif text-sm italic text-ivory/40">Loading…</p>
      ) : members.length === 0 ? (
        <div className="border border-ivory/10 bg-white/[0.02] p-8 text-center">
          <p className="font-serif italic text-ivory/40">No sales members yet. Add your first one.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-ivory/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory/10 text-left">
                {["Name", "Email", "Mobile", "Department", "ID Doc", "Joined"].map(h => (
                  <th key={h} className="px-4 py-3 whisper text-ivory/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-ivory/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-serif text-ivory">{m.full_name}</td>
                  <td className="px-4 py-3 text-ivory/60">{m.email}</td>
                  <td className="px-4 py-3 text-ivory/60">{m.mobile ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{m.department ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">
                    {m.identity_doc_name ? (
                      <span className="text-champagne/70 text-xs">{m.identity_doc_name}</span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-ivory/40">{new Date(m.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4"
            onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              className="w-full max-w-md border border-ivory/10 bg-[oklch(0.1_0.008_275)] p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="whisper text-champagne">Sales Team</p>
                  <h2 className="mt-1 font-serif text-2xl font-light text-ivory">Add Sales Member</h2>
                </div>
                <button onClick={() => setOpen(false)} className="text-xl leading-none text-ivory/40 hover:text-ivory">✕</button>
              </div>

              {error && (
                <p className="mb-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {([
                  ["full_name", "Full name", "text", true],
                  ["email", "Email address", "email", true],
                  ["password", "Password (min 8 chars)", "password", true],
                  ["mobile", "Mobile number", "tel", false],
                  ["department", "Department (e.g. Aviation, Yachts)", "text", false],
                ] as const).map(([key, label, type, required]) => (
                  <label key={key} className="group relative block">
                    <span className="whisper block text-ivory/45">{label}</span>
                    <input
                      type={type}
                      required={required}
                      value={form[key]}
                      onChange={update(key)}
                      className="field"
                    />
                    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" />
                  </label>
                ))}

                <label className="group relative block">
                  <span className="whisper block text-ivory/45">Notes (optional)</span>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={update("notes")}
                    className="field resize-none"
                  />
                </label>

                {/* Identity document */}
                <div>
                  <span className="whisper block text-ivory/45">Identity document (optional)</span>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="mt-1 cursor-pointer border border-dashed border-ivory/20 px-4 py-5 text-center transition-colors hover:border-champagne/40"
                  >
                    {docFile ? (
                      <p className="font-serif text-sm text-ivory/70">
                        {docFile.name} <span className="text-ivory/30">({(docFile.size / 1024).toFixed(0)} KB)</span>
                      </p>
                    ) : (
                      <p className="font-serif text-sm italic text-ivory/30">Click to upload passport, ID card, or photo</p>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
                    onChange={e => setDocFile(e.target.files?.[0] ?? null)} />
                </div>

                <p className="font-serif text-xs italic text-ivory/30">
                  They log in at <span className="text-champagne">/login</span> with this email and password → redirected to sales dashboard.
                </p>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setOpen(false)}
                    className="flex-1 border border-ivory/20 px-4 py-3 whisper text-ivory/50 hover:border-ivory/40 hover:text-ivory">
                    CANCEL
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50">
                    {submitting ? "CREATING…" : "CREATE LOGIN"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalShell>
  );
}
