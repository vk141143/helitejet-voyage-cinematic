import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/content/site";
import { ease, useCinematicMotion } from "./motion";

/**
 * A restrained veil that closes over the old page and lifts from the new one.
 * It never touches route rendering, so navigation stays instant and reliable.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { reduced } = useCinematicMotion();
  const first = useRef(true);
  const [veil, setVeil] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setVeil(pathname);
    const t = window.setTimeout(() => setVeil(null), reduced ? 250 : 1100);
    return () => window.clearTimeout(t);
  }, [pathname, reduced]);

  return (
    <AnimatePresence>
      {veil && (
        <motion.div
          key={veil}
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.2 : 0.9, ease } }}
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-obsidian"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-2xl font-light text-ivory/70"
          >
            {brand.mark}
          </motion.span>
          {!reduced && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease }}
              className="absolute left-[30%] right-[30%] top-1/2 mt-8 h-px origin-left bg-gold/60"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
