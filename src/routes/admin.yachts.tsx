import { createFileRoute } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { useNavigate } from "@tanstack/react-router";
import { adminNav } from "@/lib/portal-nav";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence, motion } from "motion/react";

type YachtRow = { id: string; name: string; yacht_type: string | null; length_m: number | null; capacity: string | null; guests: number | null };
type AddMode = "choose" | "single" | "json";

function AdminYachts() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [yachts, setYachts] = useState<YachtRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("choose");

  const [sName, setSName] = useState("");
  const [sType, setSType] = useState("");
  const [sLength, setSLength] = useState("");
  const [sCapacity, setSCapacity] = useState("");
  const [sGuests, setSGuests] = useState("");
  const [sError, setSError] = useState("");
  const [saving, setSaving] = useState(false);

  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [jsonPreview, setJsonPreview] = useState<Omit<YachtRow, "id">[]>([]);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true); setError("");
    const { data, error: err } = await supabase.from("yachts").select("*").order("name");
    if (err) setError(err.message);
    else setYachts((data ?? []) as YachtRow[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  const filtered = yachts.filter((y) =>
    !search || y.name.toLowerCase().includes(search.toLowerCase()) || (y.yacht_type ?? "").toLowerCase().includes(search.toLowerCase())
  );

  function openModal() {
    setShowModal(true); setAddMode("choose");
    setSName(""); setSType(""); setSLength(""); setSCapacity(""); setSGuests(""); setSError("");
    setJsonText(""); setJsonError(""); setJsonPreview([]);
  }

  async function handleSingleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sName.trim()) return setSError("Enter a yacht name.");
    setSaving(true); setSError("");
    const { error: err } = await supabase.from("yachts").insert({
      name: sName.trim(),
      yacht_type: sType.trim() || null,
      length_m: sLength ? Number(sLength) : null,
      capacity: sCapacity.trim() || null,
      guests: sGuests ? Number(sGuests) : null,
    });
    if (err) { setSError(err.message); setSaving(false); return; }
    setSaving(false); setShowModal(false); void load();
  }

  function parseJsonInput(text: string) {
    setJsonText(text); setJsonError(""); setJsonPreview([]);
    if (!text.trim()) return;
    try {
      const arr: unknown[] = Array.isArray(JSON.parse(text)) ? JSON.parse(text) : [JSON.parse(text)];
      const entries = arr.map((item, i) => {
        const o = item as Record<string, unknown>;
        const name = String(o.name ?? o.yacht_name ?? "");
        if (!name) throw new Error(`Item ${i + 1}: missing "name" field`);
        return {
          name,
          yacht_type: o.yacht_type ? String(o.yacht_type) : o.type ? String(o.type) : null,
          length_m: o.length_m ? Number(o.length_m) : o.length ? Number(o.length) : null,
          capacity: o.capacity ? String(o.capacity) : null,
          guests: o.guests ? Number(o.guests) : null,
        };
      });
      setJsonPreview(entries);
    } catch (err) { setJsonError(err instanceof Error ? err.message : "Invalid JSON"); }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => parseJsonInput(String(ev.target?.result ?? ""));
    reader.readAsText(file);
  }

  async function handleJsonImport() {
    if (!jsonPreview.length) return;
    setImporting(true);
    const { error: err } = await supabase.from("yachts").insert(jsonPreview);
    if (err) { setJsonError(err.message); setImporting(false); return; }
    setImporting(false); setShowModal(false); void load();
  }

  async function handleDelete(id: string) {
    await supabase.from("yachts").delete().eq("id", id);
    void load();
  }

  return (
    <PortalShell title="Yachts" nav={adminNav as { label: string; to: string }[]} onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="whisper text-champagne">YACHT FLEET</p>
          <p className="mt-1 font-serif text-2xl font-light text-ivory">{yachts.length} yachts</p>
        </div>
        <button type="button" onClick={openModal}
          className="inline-flex items-center gap-2 border border-champagne/50 px-5 py-2.5 whisper text-champagne transition-colors hover:bg-champagne/10">
          + ADD YACHT
        </button>
      </div>

      <div className="mb-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or type…"
          className="border border-ivory/15 bg-transparent px-3 py-1.5 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60 w-full md:w-72" />
      </div>

      {error && <p className="mb-4 border border-red-300/30 p-3 text-sm text-red-200">{error}</p>}

      {loading ? (
        <p className="py-12 text-center font-serif italic text-ivory/30">Loading yachts…</p>
      ) : (
        <div className="border border-ivory/10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ivory/10">
                <th className="px-4 py-3 whisper text-ivory/40 font-normal">NAME</th>
                <th className="px-4 py-3 whisper text-ivory/40 font-normal">TYPE</th>
                <th className="px-4 py-3 whisper text-ivory/40 font-normal">LENGTH</th>
                <th className="px-4 py-3 whisper text-ivory/40 font-normal">GUESTS</th>
                <th className="px-4 py-3 whisper text-ivory/40 font-normal">CAPACITY</th>
                <th className="px-4 py-3 whisper text-ivory/40 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((y) => (
                <tr key={y.id} className="border-b border-ivory/[0.06] hover:bg-ivory/[0.02] transition-colors">
                  <td className="px-4 py-3 font-serif text-ivory">{y.name}</td>
                  <td className="px-4 py-3 text-ivory/60">{y.yacht_type ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{y.length_m ? `${y.length_m}m` : "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{y.guests ?? "—"}</td>
                  <td className="px-4 py-3 text-ivory/60">{y.capacity ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => handleDelete(y.id)}
                      className="whisper text-[0.6rem] text-ivory/30 hover:text-red-400 transition-colors">REMOVE</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center font-serif italic text-ivory/30">
                  {yachts.length === 0 ? "No yachts yet. Click + ADD YACHT to get started." : "No yachts match your search."}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}>
            <motion.div className="w-full max-w-lg border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}>

              <div className="flex items-start justify-between border-b border-ivory/10 pb-5">
                <div>
                  <p className="whisper text-champagne">YACHT MANAGEMENT</p>
                  <h2 className="mt-2 font-serif text-3xl font-light text-ivory">
                    {addMode === "choose" ? "Add Yacht" : addMode === "single" ? "Yacht Details" : "Import via JSON"}
                  </h2>
                </div>
                <button type="button" onClick={() => setShowModal(false)} className="text-2xl text-ivory/50 hover:text-champagne">×</button>
              </div>

              {addMode === "choose" && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-ivory/50">How would you like to add yachts?</p>
                  <button type="button" onClick={() => setAddMode("single")}
                    className="w-full border border-champagne/40 py-4 text-left px-5 transition-colors hover:bg-champagne/10">
                    <span className="whisper text-champagne block">ADD ONE BY ONE →</span>
                    <span className="mt-1 block text-xs text-ivory/40">Enter yacht details manually</span>
                  </button>
                  <button type="button" onClick={() => setAddMode("json")}
                    className="w-full border border-ivory/20 py-4 text-left px-5 transition-colors hover:border-ivory/50">
                    <span className="whisper text-ivory/70 block">IMPORT JSON →</span>
                    <span className="mt-1 block text-xs text-ivory/40">Paste or upload a JSON file with multiple yachts</span>
                  </button>
                </div>
              )}

              {addMode === "single" && (
                <form onSubmit={handleSingleSubmit} className="mt-6 space-y-4">
                  {sError && <p className="border border-red-300/30 p-3 text-sm text-red-200">{sError}</p>}
                  <label className="block">
                    <span className="whisper text-ivory/50">Yacht name <span className="text-red-300">*</span></span>
                    <input className="field mt-1" value={sName} onChange={(e) => setSName(e.target.value)} placeholder="e.g. Serenity IV" autoFocus />
                  </label>
                  <label className="block">
                    <span className="whisper text-ivory/50">Type</span>
                    <input className="field mt-1" value={sType} onChange={(e) => setSType(e.target.value)} placeholder="e.g. Motor Yacht, Sailing Yacht" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="whisper text-ivory/50">Length (m)</span>
                      <input className="field mt-1" type="number" value={sLength} onChange={(e) => setSLength(e.target.value)} placeholder="e.g. 45" />
                    </label>
                    <label className="block">
                      <span className="whisper text-ivory/50">Max guests</span>
                      <input className="field mt-1" type="number" value={sGuests} onChange={(e) => setSGuests(e.target.value)} placeholder="e.g. 12" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="whisper text-ivory/50">Capacity note</span>
                    <input className="field mt-1" value={sCapacity} onChange={(e) => setSCapacity(e.target.value)} placeholder="e.g. 12 guests / 6 cabins" />
                  </label>
                  <div className="flex items-center justify-between border-t border-ivory/10 pt-4">
                    <button type="button" onClick={() => setAddMode("choose")} className="whisper text-ivory/40 hover:text-champagne">← BACK</button>
                    <button type="submit" disabled={saving} className="whisper text-champagne hover:text-ivory disabled:opacity-50">
                      {saving ? "SAVING…" : "ADD YACHT →"}
                    </button>
                  </div>
                </form>
              )}

              {addMode === "json" && (
                <div className="mt-6 space-y-4">
                  <p className="text-xs text-ivory/40">
                    Expected format: <code className="text-champagne/70">[{`{"name":"...","yacht_type":"Motor Yacht","length_m":45,"guests":12}`}]</code><br />
                    Required: <code className="text-ivory/50">name</code> · Optional: <code className="text-ivory/50">yacht_type, length_m, guests, capacity</code>
                  </p>
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="border border-ivory/20 px-4 py-2 whisper text-xs text-ivory/60 hover:border-champagne hover:text-champagne transition-colors">
                    UPLOAD .JSON FILE
                  </button>
                  <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
                  <textarea value={jsonText} onChange={(e) => parseJsonInput(e.target.value)}
                    placeholder='[{"name":"Serenity IV","yacht_type":"Motor Yacht","length_m":45,"guests":12}]'
                    rows={6}
                    className="w-full border border-ivory/15 bg-transparent px-3 py-2 font-mono text-xs text-ivory outline-none placeholder:text-ivory/20 focus:border-champagne/60 resize-none" />
                  {jsonError && <p className="border border-red-300/30 p-3 text-sm text-red-200">{jsonError}</p>}
                  {jsonPreview.length > 0 && (
                    <div className="border border-ivory/10 bg-ivory/[0.02] p-3 max-h-40 overflow-y-auto space-y-1">
                      <p className="whisper text-champagne text-[0.6rem] mb-2">{jsonPreview.length} YACHTS READY TO IMPORT</p>
                      {jsonPreview.map((y, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-ivory/60">
                          <span className="font-serif text-ivory">{y.name}</span>
                          {y.yacht_type && <span className="text-ivory/40">{y.yacht_type}</span>}
                          {y.length_m && <span className="ml-auto">{y.length_m}m</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-ivory/10 pt-4">
                    <button type="button" onClick={() => setAddMode("choose")} className="whisper text-ivory/40 hover:text-champagne">← BACK</button>
                    <button type="button" onClick={handleJsonImport} disabled={!jsonPreview.length || !!jsonError || importing}
                      className="whisper text-champagne hover:text-ivory disabled:opacity-40">
                      {importing ? "IMPORTING…" : `IMPORT ${jsonPreview.length > 0 ? `${jsonPreview.length} YACHTS` : ""} →`}
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalShell>
  );
}

export const Route = createFileRoute("/admin/yachts")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]); },
  component: AdminYachts,
});
