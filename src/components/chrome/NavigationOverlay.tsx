import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brand, menu, scenes } from "@/content/site";
import { ease, useCinematicMotion } from "@/components/scene/motion";
import { ScrollTrack } from "@/components/scene/ScrollIndicator";

type Props = { open: boolean; current: string; onClose: () => void };

/**
 * Fullscreen navigation. Sits above every layer, locks the page behind it,
 * scrolls independently so no choice is ever clipped, and keeps CLOSE in view.
 */
export function NavigationOverlay({ open, current, onClose }: Props) {
  // Body lock with scrollbar compensation
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, pad: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.pad;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return <AnimatePresence>{open && <Panel current={current} onClose={onClose} />}</AnimatePresence>;
}

function Panel({ current, onClose }: Omit<Props, "open">) {
  const { reduced } = useCinematicMotion();
  const [hover, setHover] = useState<(typeof menu)[number] | null>(null);
  const active = hover ?? menu.find((m) => m.to === current) ?? menu[0]!;
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      id="cinematic-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      exit={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-0 z-[60] bg-obsidian grain"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={active.image}
            src={scenes[active.image]}
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-obsidian/75 md:bg-[linear-gradient(90deg,var(--obsidian)_0%,var(--obsidian)_42%,oklch(0.12_0.008_275/0.45)_100%)]" />
      </div>

      {/* Header — always visible */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 py-7 md:px-10 md:py-9">
        <Link to="/" onClick={onClose} className="font-serif text-2xl font-light tracking-[0.18em] text-ivory">
          {brand.mark}
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} className="whisper flex items-center gap-4 text-ivory outline-none focus-visible:text-champagne">
          <span>Close</span>
          <span className="relative block h-3 w-6">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      {/* Independent scroll region */}
      <div ref={scrollRef} className="absolute inset-0 z-10 overflow-y-auto overscroll-contain pt-[88px] pb-[72px] md:pt-[104px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav aria-label="Primary" className="flex min-h-full flex-col justify-center px-7 py-6 md:px-[8vw]">
          <ol className="space-y-1 md:space-y-0">
            {menu.map((m, i) => (
              <motion.li
                key={m.to}
                initial={reduced ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.045 }}
                onMouseEnter={() => setHover(m)}
                onMouseLeave={() => setHover(null)}
              >
                <Link
                  to={m.to}
                  onClick={onClose}
                  onFocus={() => setHover(m)}
                  className="group flex items-baseline gap-5 py-1 outline-none md:gap-8"
                  activeProps={{ "aria-current": "page" }}
                >
                  <span className="whisper w-6 text-gold/70">{m.numeral}</span>
                  <span
                    className={`font-serif font-light leading-[1.08] transition-all duration-500 text-[8vw] md:text-[3.3vw] ${
                      active.to === m.to ? "text-ivory md:translate-x-3" : "text-ivory/40 group-hover:text-ivory group-focus-visible:text-ivory"
                    }`}
                  >
                    {m.label}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Right scroll indicator */}
      <ScrollTrack progress={scrollYProgress} className="absolute right-6 top-1/2 z-10 -translate-y-1/2 md:right-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-7 pb-6 pt-3 md:px-10"
      >
        <span className="whisper text-ivory/40">{brand.tagline}</span>
        <a href={`mailto:${brand.email}`} className="whisper hidden text-ivory/40 hover:text-champagne md:block">
          {brand.email}
        </a>
      </motion.div>
    </motion.div>
  );
}
