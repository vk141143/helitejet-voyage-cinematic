import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { ParallaxImage } from "@/components/scene/ParallaxImage";
import { useCinematicMotion } from "@/components/scene/motion";

type Props = {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
  aspect?: string;
  /** Floating tilt toward the cursor. */
  float?: boolean;
  width?: number;
  height?: number;
};

/**
 * A photographic tile with a hairline frame, a caption block and — on
 * desktop — a gentle 3D float toward the cursor. Sharp corners, no chrome.
 */
export function LuxuryCard({ image, alt = "", eyebrow, title, children, className = "", aspect = "aspect-[4/5]", float = true, width = 1280, height = 800 }: Props) {
  const { reduced } = useCinematicMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const lift = useSpring(0, { stiffness: 120, damping: 20 });
  const on = float && !reduced;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!on) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    lift.set(-10);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    lift.set(0);
  };

  return (
    <div style={{ perspective: 1400 }} className={className}>
      <motion.article
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={on ? { rotateX: rx, rotateY: ry, y: lift, transformStyle: "preserve-3d" } : {}}
        className="group relative"
      >
        <div className="relative border border-ivory/10">
          <ParallaxImage src={image} alt={alt} className={aspect} travel={6} zoom={1.1} width={width} height={height} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-0 border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/30" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8" style={on ? { transform: "translateZ(40px)" } : undefined}>
            {eyebrow && <span className="whisper block text-champagne/80">{eyebrow}</span>}
            <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-ivory md:text-4xl">{title}</h3>
          </div>
        </div>
        {children && <div className="pt-5">{children}</div>}
      </motion.article>
    </div>
  );
}
