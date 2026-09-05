import { Link } from "@tanstack/react-router";
import { brand, menu } from "@/content/site";

/** Quiet colophon. Rendered inside the closing frame so every page ends the same way. */
export function Footer({ overlay = false }: { overlay?: boolean }) {
  return (
    <footer className={`${overlay ? "absolute inset-x-0 bottom-0" : "relative border-t border-ivory/10 bg-obsidian"} px-7 pb-7 pt-6 md:px-10`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <span className="block font-serif text-lg tracking-[0.2em] text-ivory/80">{brand.mark}</span>
          <span className="whisper block text-ivory/40">{brand.cities}</span>
        </div>
        <nav aria-label="Footer" className="hidden flex-wrap gap-x-5 gap-y-2 md:flex md:max-w-xl md:justify-end">
          {menu.slice(1).map((m) => (
            <Link key={m.to} to={m.to} className="whisper text-ivory/40 transition-colors hover:text-champagne">
              {m.label}
            </Link>
          ))}
        </nav>
        <a href={`mailto:${brand.email}`} className="whisper text-ivory/40 transition-colors hover:text-champagne">
          {brand.email}
        </a>
      </div>
    </footer>
  );
}
