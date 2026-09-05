import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useCinematicMotion } from "./motion";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** Vertical travel as a percentage of the image height. */
  travel?: number;
  /** Starting zoom that settles to 1 as the image passes through the frame. */
  zoom?: number;
  width?: number;
  height?: number;
  priority?: boolean;
};

/**
 * An image that drifts and settles as it passes through the viewport,
 * giving flat photography a sense of depth. Wrap it in a sized container.
 */
export function ParallaxImage({ src, alt = "", className = "", imgClassName = "", travel = 12, zoom = 1.15, width = 1920, height = 1080, priority = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useCinematicMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`${-travel}%`, `${travel}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [zoom, 1 + (zoom - 1) / 2, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ y, scale }}
        className={`absolute inset-0 h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  );
}
