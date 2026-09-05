import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Chapter as ChapterContent } from "@/content/site";
import { scenes } from "@/content/site";
import { useCinematicMotion } from "./motion";
import { Lines, SectionReveal as Reveal } from "./SectionReveal";

/**
 * A scene chapter. Three depth planes move at different rates as the
 * visitor scrolls: the photograph (far), a floating numeral (mid), and the
 * text (near). The frame is pinned for the duration so it reads like a
 * slow camera move rather than a page scroll.
 */
export function Chapter({ chapter }: { chapter: ChapterContent }) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useCinematicMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const off = reduced ? 0 : 1;
  const imgY = useTransform(scrollYProgress, [0, 1], [`${-10 * off}%`, `${10 * off}%`]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.06, 1.0].map((v) => (reduced ? 1 : v)));
  const imgO = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const numeralY = useTransform(scrollYProgress, [0, 1], [180 * off, -180 * off]);
  const textY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [90 * off, 0, -90 * off]);
  const textO = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const ruleScale = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const veil = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.5, 0.85]);

  const right = chapter.align === "right";
  const img = chapter.image ? scenes[chapter.image] : undefined;

  return (
    <section ref={ref} id={chapter.id} className="relative h-[170vh] md:h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden grain">
        {img && (
          <motion.div style={{ opacity: imgO }} className="absolute inset-0">
            <motion.img
              src={img}
              alt=""
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />
          </motion.div>
        )}
        <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-obsidian" />
        <div
          className={`absolute inset-0 ${
            right
              ? "bg-[linear-gradient(270deg,var(--obsidian)_0%,transparent_55%)]"
              : "bg-[linear-gradient(90deg,var(--obsidian)_0%,transparent_55%)]"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

        {/* Mid plane — floating numeral */}
        <motion.span
          aria-hidden
          style={{ y: numeralY }}
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif font-light leading-none text-ivory/[0.045] text-[52vw] md:text-[30vw] ${
            right ? "left-[4vw]" : "right-[4vw]"
          }`}
        >
          {chapter.numeral}
        </motion.span>

        {/* Near plane — text */}
        <motion.div
          style={{ y: textY, opacity: textO }}
          className={`absolute inset-0 flex items-end pb-[14vh] md:items-center md:pb-0 ${
            right ? "justify-start md:justify-end" : "justify-start"
          }`}
        >
          <div className={`w-full px-7 md:w-[46vw] md:px-[7vw] ${right ? "md:text-right" : ""}`}>
            <div className={`flex items-center gap-5 ${right ? "md:flex-row-reverse" : ""}`}>
              <motion.span style={{ scaleX: ruleScale, originX: right ? 1 : 0 }} className="h-px w-14 bg-gold" />
              <span className="whisper text-champagne/80">
                {chapter.numeral} — {chapter.kicker}
              </span>
            </div>
            <h2 className="mt-7 font-serif font-light leading-[1.02] tracking-[-0.01em] text-ivory text-[2.6rem] md:text-[4.2vw]">
              <Lines text={chapter.title} />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-7 max-w-md font-serif text-lg font-light leading-relaxed text-ivory/70 md:text-[1.35rem] md:leading-[1.55]">
                {chapter.body}
              </p>
            </Reveal>
            {chapter.details && (
              <Reveal delay={0.4}>
                <ul className={`mt-8 space-y-2 ${right ? "md:ml-auto" : ""}`}>
                  {chapter.details.map((d) => (
                    <li key={d} className="whisper text-ivory/45 !tracking-[0.22em] !normal-case !text-[0.72rem]">
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {chapter.link && (
              <Reveal delay={0.5}>
                <Link
                  to={chapter.link.to}
                  className="group mt-10 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory"
                >
                  <span>{chapter.link.label}</span>
                  <span className="relative block h-px w-10 overflow-hidden bg-gold/50">
                    <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
