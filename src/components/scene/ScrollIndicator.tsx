import { motion, useTransform, type MotionValue } from "motion/react";
import { useCinematicMotion } from "./motion";

/** A breathing hairline inviting the visitor to scroll. */
export function ScrollIndicator({ opacity, label = "Scroll" }: { opacity?: MotionValue<number>; label?: string }) {
  const { reduced } = useCinematicMotion();
  return (
    <motion.div style={opacity ? { opacity } : {}} className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="whisper text-ivory/50">{label}</span>
      <motion.span
        className="block h-12 w-px bg-gradient-to-b from-gold to-transparent"
        animate={reduced ? { scaleY: 1 } : { scaleY: [0.2, 1, 0.2], originY: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/** A vertical track with a thumb bound to a container's scroll progress (used by the menu). */
export function ScrollTrack({ progress, className = "" }: { progress: MotionValue<number>; className?: string }) {
  const top = useTransform(progress, [0, 1], ["0%", "75%"]);
  return (
    <div aria-hidden className={`pointer-events-none relative h-40 w-px bg-ivory/15 ${className}`}>
      <motion.span style={{ top }} className="absolute left-0 h-1/4 w-px bg-champagne" />
    </div>
  );
}
