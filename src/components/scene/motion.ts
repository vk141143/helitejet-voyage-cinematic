import { useReducedMotion } from "motion/react";

/** Central place for the site's motion language. */
export const ease = [0.22, 1, 0.36, 1] as const;

export function useCinematicMotion() {
  const reduced = useReducedMotion();
  return { reduced: !!reduced };
}
