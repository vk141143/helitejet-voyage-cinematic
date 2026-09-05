import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ease, useCinematicMotion } from "./motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string | undefined;
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

/** Fades and lifts content into view once as it enters the frame. */
export function SectionReveal({ children, delay = 0, className, y = 28, as = "div" }: Props) {
  const { reduced } = useCinematicMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Splits a headline on \n and reveals each line with a slight stagger. */
export function Lines({ text, className, delay = 0 }: { text: string; className?: string | undefined; delay?: number }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <SectionReveal key={i} delay={delay + i * 0.12} className={className}>
          <span className="block">{line}</span>
        </SectionReveal>
      ))}
    </>
  );
}

/** Small tracked label with a hairline rule. */
export function Kicker({ children, align = "left" }: { children: ReactNode; align?: "left" | "right" | "center" }) {
  return (
    <div className={`flex items-center gap-5 ${align === "right" ? "md:flex-row-reverse" : align === "center" ? "justify-center" : ""}`}>
      <span className="h-px w-12 bg-gold/70" />
      <span className="whisper text-champagne/80">{children}</span>
      {align === "center" && <span className="h-px w-12 bg-gold/70" />}
    </div>
  );
}

/** The site's single call-to-action treatment: a word and a drawn line. */
export function LineLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory ${className}`}>
      <span>{children}</span>
      <span className="relative block h-px w-12 overflow-hidden bg-gold/50">
        <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" />
      </span>
    </span>
  );
}
