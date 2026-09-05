import type { ReactNode } from "react";

/**
 * A restrained architectural panel: charcoal glass, one hairline, no radius.
 * Used sparingly — the request panel and the concierge brief.
 */
export function GlassPanel({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`relative border border-ivory/10 bg-[oklch(0.16_0.008_275/0.72)] backdrop-blur-md transition-shadow duration-1000 ${
        glow ? "shadow-[0_40px_120px_-30px_oklch(0.72_0.1_80/0.45),0_0_0_1px_oklch(0.86_0.055_85/0.18)]" : "shadow-[0_40px_120px_-40px_oklch(0_0_0/0.8)]"
      } ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
      {children}
    </div>
  );
}
