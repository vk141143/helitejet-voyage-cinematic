import { motion } from "motion/react";
import { useCinematicMotion } from "@/components/scene/motion";
import type { InquiryContext, InquiryStep as InquiryStepType } from "./inquiryConfig";

type PeopleOptionProps = {
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
};

function PeopleOption({ value, selected, onSelect }: PeopleOptionProps) {
  const { reduced } = useCinematicMotion();

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      className={`relative inline-flex h-14 items-center justify-center border px-4 py-3 text-lg font-light transition-all duration-500 outline-none focus-visible:border-champagne focus-visible:text-ivory ${
        selected ? "border-champagne/80 bg-champagne/5 text-ivory shadow-[0_0_0_1px_rgba(223,198,142,0.45)]" : "border-ivory/10 bg-transparent text-ivory/60 hover:border-ivory/30 hover:text-ivory"
      }`}
    >
      <span className="font-serif text-[1.55rem] leading-none">{value}</span>
      {!reduced && selected && <motion.span layoutId="people-select-glow" className="absolute inset-0 border border-champagne/70" transition={{ duration: 0.3 }} />}
    </button>
  );
}

type StepProps = {
  step: InquiryStepType;
  context: InquiryContext;
  travellers: number | null;
  selectedDistance: string | null;
  budget: number;
  onTravellersChange: (value: number) => void;
  onDistanceChange: (value: string) => void;
  onBudgetChange: (value: number) => void;
  peopleOptions: number[];
  distanceOptions: { id: string; label: string; subtitle: string }[];
};

export function InquiryStep({ step, context, travellers, selectedDistance, budget, onTravellersChange, onDistanceChange, onBudgetChange, peopleOptions, distanceOptions }: StepProps) {
  const { reduced } = useCinematicMotion();

  if (step.id === "people") {
    return (
      <motion.div initial={reduced ? false : { opacity: 0, x: 14, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20, filter: "blur(8px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="space-y-9">
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
          {peopleOptions.map((option) => (
            <PeopleOption key={option} value={option} selected={travellers === option} onSelect={onTravellersChange} />
          ))}
        </div>
      </motion.div>
    );
  }

  if (step.id === "where") {
    return (
      <motion.div initial={reduced ? false : { opacity: 0, x: 18, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(8px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="space-y-3">
        {distanceOptions.map((option) => {
          const active = selectedDistance === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onDistanceChange(option.id)}
              className={`group w-full border p-5 text-left transition-all duration-500 outline-none focus-visible:border-champagne ${
                active ? "border-champagne/80 bg-[oklch(0.18_0.012_80/0.38)]" : "border-ivory/10 bg-transparent hover:border-ivory/20 hover:bg-white/[0.01]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-2xl font-light text-ivory md:text-3xl">{option.label}</div>
                  <div className="mt-2 whisper text-ivory/45">{option.subtitle}</div>
                </div>
                <span className={`relative flex h-4 w-4 items-center justify-center rounded-full border ${active ? "border-champagne bg-champagne/10" : "border-ivory/30"}`}>
                  {active && <span className="h-2 w-2 rounded-full bg-champagne" />}
                </span>
              </div>
            </button>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div initial={reduced ? false : { opacity: 0, x: 18, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(8px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="space-y-8">
      <div className="flex items-end justify-between gap-4 border-b border-ivory/10 pb-4">
        <div className="font-serif text-5xl font-light leading-none text-ivory md:text-7xl">${budget.toLocaleString()}</div>
        <div className="whisper text-ivory/40">Budget preference</div>
      </div>

      <div className="space-y-4">
        <input
          aria-label="Budget preference"
          type="range"
          min={2000}
          max={250000}
          step={500}
          value={budget}
          onChange={(event) => onBudgetChange(Number(event.target.value))}
          className="h-1 w-full cursor-pointer appearance-none bg-[linear-gradient(90deg,oklch(0.72_0.1_80)_0%,oklch(0.72_0.1_80)_var(--progress),oklch(0.94_0.014_85/0.18)_var(--progress),oklch(0.94_0.014_85/0.18)_100%)] accent-champagne"
          style={{
            // @ts-expect-error CSS variable is used by CSS and works in browser
            ["--progress" as string]: `${((budget - 2000) / (250000 - 2000)) * 100}%`,
          }}
        />

        <div className="flex items-center justify-between whisper text-ivory/45">
          <span>$2,000</span>
          <span>$250,000</span>
        </div>
      </div>

      <div className="rounded-none border border-ivory/10 bg-[oklch(0.15_0.008_275/0.55)] p-4 text-sm leading-relaxed text-ivory/60">
        {context === "flights"
          ? "This is an inquiry preference only. Actual charter pricing is not included in the supplied fleet guide."
          : "This budget helps us shape a shortlist without suggesting fixed charter pricing."}
      </div>
    </motion.div>
  );
}
