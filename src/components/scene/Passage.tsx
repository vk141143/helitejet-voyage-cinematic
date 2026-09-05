import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useCinematicMotion } from "./motion";

function Word({ word, i, total, progress, reduced }: { word: string; i: number; total: number; progress: MotionValue<number>; reduced: boolean }) {
  const start = 0.15 + (i / total) * 0.6;
  const end = start + 0.6 / total;
  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** An interlude: a single sentence that is lit word by word as the reader passes through it. */
export function Passage({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useCinematicMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const words = text.split(" ");
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[110vh] items-center justify-center bg-obsidian px-7">
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.1_80/0.16),transparent_65%)] blur-3xl"
      />
      <p className="relative max-w-4xl text-center font-serif text-3xl font-light italic leading-[1.3] text-ivory md:text-[3.4vw]">
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} reduced={reduced} />
        ))}
      </p>
    </section>
  );
}
