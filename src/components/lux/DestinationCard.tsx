import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ParallaxImage } from "@/components/scene/ParallaxImage";
import { ease, useCinematicMotion } from "@/components/scene/motion";

type Props = {
  index: number;
  name: string;
  region: string;
  season: string;
  line: string;
  image: string;
};

/**
 * A tall portal. The photograph is held behind a narrow frame that widens as
 * you hover, as if a door were opening onto the place.
 */
export function DestinationCard({ index, name, region, season, line, image }: Props) {
  const { reduced } = useCinematicMotion();
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.2, ease, delay: (index % 5) * 0.08 }}
      className="group relative"
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]">
          <ParallaxImage src={image} alt={`${name}, ${region}`} className="aspect-[3/4]" travel={8} zoom={1.12} width={900} height={1200} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/10" />
        {/* Door frame */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-champagne/40 transition-all duration-1000 group-hover:left-3" />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-px bg-champagne/40 transition-all duration-1000 group-hover:right-3" />
        <span className="whisper absolute left-5 top-5 text-ivory/60">{String(index + 1).padStart(2, "0")}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="whisper block text-champagne/80">{region}</span>
          <h3 className="mt-2 font-serif text-4xl font-light leading-none text-ivory md:text-5xl">{name}</h3>
          <p className="mt-4 max-h-0 overflow-hidden font-serif text-base font-light leading-relaxed text-ivory/70 opacity-0 transition-all duration-1000 group-hover:max-h-40 group-hover:opacity-100 md:text-lg">
            {line}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="whisper !tracking-[0.2em] text-ivory/45">{season}</span>
            <Link to="/concierge" className="whisper text-champagne opacity-0 transition-opacity duration-700 group-hover:opacity-100 focus:opacity-100">
              Arrange
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
