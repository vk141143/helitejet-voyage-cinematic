import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { PortalShell } from "@/components/dashboard/PortalShell";
import type { adminNav, customerNav, salesNav } from "@/lib/portal-nav";

type Nav = typeof adminNav | typeof customerNav | typeof salesNav;

export function StubPage({ title, nav }: { title: string; nav: Nav }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <PortalShell
      title={title}
      nav={nav as { label: string; to: string }[]}
      onLogout={() => { void logout().then(() => navigate({ to: "/login" })); }}
    >
      <div className="border border-ivory/10 bg-white/[0.02] p-8">
        <p className="whisper text-champagne">Coming soon</p>
        <p className="mt-3 font-serif text-lg text-ivory/50 italic">{title} — this section is under construction.</p>
      </div>
    </PortalShell>
  );
}
