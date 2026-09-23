import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireRoleAccess, useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import { salesNav } from "@/lib/portal-nav";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/sales/profile")({
  beforeLoad: () => { if (typeof window !== "undefined") return requireRoleAccess(["SALES"]); },
  component: SalesProfilePage,
});

function SalesProfilePage() {
  const { profile, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(profile?.full_name ?? "");
  const [mobile, setMobile] = useState(profile?.mobile ?? "");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(""); setProfileErr(""); setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name, mobile: mobile || null, updated_at: new Date().toISOString() })
        .eq("id", profile!.id);
      if (error) throw new Error(error.message);
      await refreshProfile();
      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(""); setPwErr(""); setSavingPw(true);
    try {
      if (newPassword.length < 8) throw new Error("New password must be at least 8 characters.");
      if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");

      // Re-authenticate with current password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profile!.email,
        password: currentPassword,
      });
      if (signInError) throw new Error("Current password is incorrect.");

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new Error(error.message);

      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setPwMsg("Password changed successfully.");
    } catch (err) {
      setPwErr(err instanceof Error ? err.message : "Password change failed.");
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <PortalShell title="My Profile" nav={salesNav} onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}>
      <div className="grid gap-8 lg:grid-cols-2">

        {/* Profile details */}
        <div className="border border-ivory/10 bg-white/[0.02] p-6">
          <p className="whisper text-champagne">Account details</p>
          <h2 className="mt-1 font-serif text-xl font-light text-ivory">Personal information</h2>

          {profileMsg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300">
              {profileMsg}
            </motion.p>
          )}
          {profileErr && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300">
              {profileErr}
            </motion.p>
          )}

          <form onSubmit={saveProfile} className="mt-6 space-y-5">
            <label className="group relative block">
              <span className="whisper block text-ivory/45">Full name</span>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="field" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" />
            </label>

            <label className="group relative block">
              <span className="whisper block text-ivory/45">Email</span>
              <input type="email" disabled value={profile?.email ?? ""} className="field opacity-40 cursor-not-allowed" />
            </label>

            <label className="group relative block">
              <span className="whisper block text-ivory/45">Mobile</span>
              <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} className="field" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" />
            </label>

            <button type="submit" disabled={savingProfile}
              className="w-full border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50">
              {savingProfile ? "SAVING…" : "SAVE CHANGES"}
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="border border-ivory/10 bg-white/[0.02] p-6">
          <p className="whisper text-champagne">Security</p>
          <h2 className="mt-1 font-serif text-xl font-light text-ivory">Change password</h2>

          {pwMsg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300">
              {pwMsg}
            </motion.p>
          )}
          {pwErr && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300">
              {pwErr}
            </motion.p>
          )}

          <form onSubmit={changePassword} className="mt-6 space-y-5">
            {([
              ["Current password", currentPassword, setCurrentPassword],
              ["New password", newPassword, setNewPassword],
              ["Confirm new password", confirmPassword, setConfirmPassword],
            ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
              <label key={label} className="group relative block">
                <span className="whisper block text-ivory/45">{label}</span>
                <input type="password" required value={val} onChange={e => setter(e.target.value)} className="field" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" />
              </label>
            ))}

            <button type="submit" disabled={savingPw}
              className="w-full border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50">
              {savingPw ? "UPDATING…" : "UPDATE PASSWORD"}
            </button>
          </form>
        </div>

      </div>
    </PortalShell>
  );
}
