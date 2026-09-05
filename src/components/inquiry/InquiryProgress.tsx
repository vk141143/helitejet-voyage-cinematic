import { motion } from "motion/react";
import { useCinematicMotion } from "@/components/scene/motion";
import type { InquiryStep } from "./inquiryConfig";

type Props = {
  steps: InquiryStep[];
  currentStep: number;
  onSelect: (index: number) => void;
};

export function InquiryProgress({ steps, currentStep, onSelect }: Props) {
  const { reduced } = useCinematicMotion();

  return (
    <div className="flex items-center justify-between gap-2 md:gap-4">
      {steps.map((step, index) => {
        const active = index === currentStep;
        const complete = index < currentStep;
        const disabled = index > currentStep;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(index)}
            disabled={disabled}
            aria-label={`Go to ${step.label}`} 
            aria-current={active ? "step" : undefined}
            className={`group flex min-w-0 flex-1 items-center gap-2 border-0 bg-transparent p-0 text-left outline-none ${disabled ? "cursor-default opacity-40" : "cursor-pointer"}`}
          >
            <span className={`mb-2 block h-px w-full transition-colors ${active || complete ? "bg-champagne/80" : "bg-ivory/20"}`} />
            <span className={`whisper block text-[0.58rem] tracking-[0.22em] ${active ? "text-champagne" : complete ? "text-ivory/80" : "text-ivory/35"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`hidden text-[0.58rem] tracking-[0.22em] md:block ${active ? "text-champagne" : complete ? "text-ivory/80" : "text-ivory/35"}`}>
              {step.label.toUpperCase()}
            </span>
            {active && !reduced && (
              <motion.span
                layoutId="inquiry-progress-indicator"
                className="absolute inset-x-0 bottom-0 h-px bg-champagne"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
