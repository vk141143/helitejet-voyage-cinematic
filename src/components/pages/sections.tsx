import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DestinationCard } from "@/components/lux/DestinationCard";
import { LuxuryCard } from "@/components/lux/LuxuryCard";
import { ParallaxImage } from "@/components/scene/ParallaxImage";
import { Kicker, Lines, LineLink, SectionReveal } from "@/components/scene/SectionReveal";
import {
  aboutContent,
  aviationContent,
  destinationsContent,
  experiencesContent,
  membershipContent,
  mobilityContent,
  privateContent,
  residencesContent,
  scenes,
  yachtsContent,
  type WorldPath,
} from "@/content/site";

/* ---------- shared editorial blocks ---------- */

function Editorial({ kicker, title, body, children, align = "left", className = "" }: { kicker: string; title: string; body: string; children?: ReactNode; align?: "left" | "right"; className?: string }) {
  return (
    <div className={`${align === "right" ? "md:text-right md:ml-auto" : ""} max-w-xl ${className}`}>
      <SectionReveal>
        <Kicker align={align}>{kicker}</Kicker>
      </SectionReveal>
      <h2 className="mt-7 font-serif text-[2.5rem] font-light leading-[1.02] text-ivory md:text-[3.8vw]">
        <Lines text={title} />
      </h2>
      <SectionReveal delay={0.2}>
        <p className="mt-7 font-serif text-lg font-light leading-relaxed text-ivory/70 md:text-[1.35rem] md:leading-[1.55]">{body}</p>
      </SectionReveal>
      {children}
    </div>
  );
}

function CTA({ to, label, className = "", onOpenInquiry }: { to?: WorldPath; label: string; className?: string; onOpenInquiry?: () => void }) {
  return (
    <SectionReveal delay={0.3} className={className}>
      {onOpenInquiry ? (
        <button type="button" onClick={onOpenInquiry} className="text-left">
          <LineLink>{label}</LineLink>
        </button>
      ) : (
        <Link to={to!}>
          <LineLink>{label}</LineLink>
        </Link>
      )}
    </SectionReveal>
  );
}

function Split({ image, children, flip = false, imageKey, inquiryLabel, onOpenInquiry }: { image?: string; imageKey?: keyof typeof scenes; children: ReactNode; flip?: boolean; inquiryLabel?: string; onOpenInquiry?: () => void }) {
  const src = image ?? (imageKey ? scenes[imageKey] : scenes.home);
  return (
    <section className="relative grid items-center gap-12 px-7 py-[12vh] md:grid-cols-2 md:gap-[6vw] md:px-[7vw]">
      <div className={flip ? "md:order-2" : ""}>{children}</div>
      <div className={`relative ${flip ? "md:order-1" : ""}`}>
        <ParallaxImage src={src} className="aspect-[4/5] md:aspect-[3/4]" />
        {inquiryLabel && onOpenInquiry && (
          <button
            type="button"
            onClick={onOpenInquiry}
            className="group absolute -bottom-2 right-4 z-10 flex items-center gap-4 border border-champagne/40 bg-[oklch(0.13_0.01_275/0.82)] px-4 py-3 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:bg-[oklch(0.15_0.012_275/0.9)] md:right-8 md:px-5"
            aria-label={inquiryLabel}
          >
            <span className="whisper text-champagne">{inquiryLabel}</span>
            <span className="relative block h-px w-10 overflow-hidden bg-gold/60">
              <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

/* ---------- Aviation ---------- */

export function AviationSections({ onOpenInquiry }: { onOpenInquiry?: () => void }) {
  const c = aviationContent;
  return (
    <>
      <Split imageKey="aviation" inquiryLabel="Plan Your Journey" onOpenInquiry={onOpenInquiry}>
        <Editorial {...c.intro} />
      </Split>
      <section className="px-7 py-[8vh] md:px-[7vw]">
        <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
          {c.jets.map((j, i) => (
            <SectionReveal key={j.name} as="li" delay={i * 0.08} className="grid gap-3 py-8 md:grid-cols-[1fr_auto_auto_1.4fr] md:items-baseline md:gap-10">
              <span className="font-serif text-3xl font-light text-ivory md:text-4xl">{j.name}</span>
              <span className="whisper text-champagne/80">{j.range}</span>
              <span className="whisper text-ivory/50">{j.seats}</span>
              <span className="font-serif text-lg italic font-light text-ivory/60">{j.note}</span>
            </SectionReveal>
          ))}
        </ol>
      </section>
      <Split imageKey="mobility" flip>
        <Editorial kicker={c.helicopters.kicker} title={c.helicopters.title} body={c.helicopters.body} align="right">
          <SectionReveal delay={0.3}>
            <ul className="mt-8 space-y-2">
              {c.helicopters.fleet.map((f) => (
                <li key={f} className="whisper !normal-case !tracking-[0.22em] !text-[0.72rem] text-ivory/45">{f}</li>
              ))}
            </ul>
          </SectionReveal>
        </Editorial>
      </Split>
      <section className="px-7 py-[12vh] md:px-[7vw]">
        <Editorial kicker={c.network.kicker} title={c.network.title} body={c.network.body} />
        <dl className="mt-14 grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-4">
          {c.network.lines.map(([k, v], i) => (
            <SectionReveal key={k} delay={i * 0.08}>
              <dt className="whisper text-champagne/80">{k}</dt>
              <dd className="mt-3 font-serif text-xl font-light leading-snug text-ivory/80">{v}</dd>
            </SectionReveal>
          ))}
        </dl>
        <CTA {...c.cta} className="mt-16" onOpenInquiry={onOpenInquiry} />
      </section>
    </>
  );
}

/* ---------- Yachts ---------- */

export function YachtsSections({ onOpenInquiry }: { onOpenInquiry?: () => void }) {
  const c = yachtsContent;
  return (
    <>
      <section className="px-7 pt-[12vh] md:px-[7vw]">
        <Editorial {...c.intro} />
      </section>
      <Split imageKey="yachts" flip inquiryLabel="Explore Options" onOpenInquiry={onOpenInquiry}>
        <Editorial kicker="The Fleet" title="Each passage, shaped by the desk." body="A yacht is chosen by mood, guest count, destination and day-to-day rhythm rather than a single brochure list." align="right" />
      </Split>
      <section className="grid gap-10 px-7 py-[10vh] md:grid-cols-3 md:gap-8 md:px-[7vw]">
        {c.fleet.map((y, i) => (
          <SectionReveal key={y.name} delay={i * 0.12} className={i === 1 ? "md:mt-20" : ""}>
            <LuxuryCard image={scenes[y.image]} alt={`${y.name}, ${y.type}`} eyebrow={`${y.type} · ${y.length}`} title={y.name}>
              <p className="whisper !normal-case !tracking-[0.18em] text-ivory/45">{y.guests}</p>
              <p className="mt-2 whisper !normal-case !tracking-[0.18em] text-champagne/70">{y.waters}</p>
              <p className="mt-4 font-serif text-lg font-light leading-relaxed text-ivory/65">{y.note}</p>
            </LuxuryCard>
          </SectionReveal>
        ))}
      </section>
      <Split imageKey="residences" flip>
        <Editorial {...c.arrival} align="right">
          <CTA {...c.cta} className="mt-10" onOpenInquiry={onOpenInquiry} />
        </Editorial>
      </Split>
    </>
  );
}

/* ---------- Mobility ---------- */

export function MobilitySections() {
  const c = mobilityContent;
  return (
    <>
      <section className="px-7 py-[8vh] md:px-[7vw]">
        <SectionReveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ivory/10 pb-8">
          {c.sequence.map((s, i) => (
            <span key={i} className="flex items-baseline gap-6">
              <span className="font-serif text-4xl font-light text-ivory md:text-6xl">{s.stage}</span>
              {i < c.sequence.length - 1 && <span className="h-px w-10 self-center bg-gold/60" />}
            </span>
          ))}
        </SectionReveal>
      </section>
      {c.sequence.map((s, i) => (
        <Split key={i} imageKey={s.image} flip={i % 2 === 1}>
          <Editorial kicker={`${String(i + 1).padStart(2, "0")} — ${s.stage}`} title={s.title} body={s.body} align={i % 2 === 1 ? "right" : "left"} />
        </Split>
      ))}
      <section className="px-7 py-[12vh] md:px-[7vw]">
        <Editorial {...c.principle}>
          <CTA {...c.cta} className="mt-10" />
        </Editorial>
      </section>
    </>
  );
}

/* ---------- Residences ---------- */

export function ResidencesSections({ onOpenInquiry }: { onOpenInquiry?: () => void }) {
  const c = residencesContent;
  return (
    <>
      <Split imageKey="residences" inquiryLabel="Enquire" onOpenInquiry={onOpenInquiry}>
        <Editorial kicker="Residences" title="A home that is already prepared." body="Choose the setting, guest count and rhythm of the stay, and the desk arranges the rest with the same discretion as the flight itself." align="left" />
      </Split>
      {c.properties.map((p, i) => (
        <section key={p.name} className="relative min-h-screen overflow-hidden">
          <ParallaxImage src={scenes[p.image]} alt={`${p.name}, ${p.place}`} className="absolute inset-0 h-full" travel={10} zoom={1.2} width={1600} height={900} />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/10" />
          <div className={`relative flex min-h-screen items-end px-7 pb-[12vh] pt-[30vh] md:px-[7vw] ${i % 2 ? "md:justify-end" : ""}`}>
            <div className={`max-w-xl ${i % 2 ? "md:text-right" : ""}`}>
              <SectionReveal>
                <Kicker align={i % 2 ? "right" : "left"}>{`${String(i + 1).padStart(2, "0")} — ${p.place}`}</Kicker>
              </SectionReveal>
              <h2 className="mt-6 font-serif text-5xl font-light leading-none text-ivory md:text-[5.5vw]">
                <Lines text={p.name} />
              </h2>
              <SectionReveal delay={0.2}>
                <p className="whisper mt-5 text-ivory/50">{p.sleeps}</p>
                <ul className="mt-6 space-y-2">
                  {p.lines.map((l) => (
                    <li key={l} className="font-serif text-lg font-light text-ivory/75 md:text-xl">{l}</li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
          </div>
        </section>
      ))}
      <section className="px-7 py-[12vh] md:px-[7vw]">
        <Editorial {...c.stewardship}>
          <CTA {...c.cta} className="mt-10" onOpenInquiry={onOpenInquiry} />
        </Editorial>
      </section>
    </>
  );
}

/* ---------- Experiences ---------- */

export function ExperiencesSections() {
  const c = experiencesContent;
  const span = (s: string) => (s === "wide" ? "md:col-span-2 aspect-[16/9]" : s === "tall" ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square");
  return (
    <>
      <section className="px-7 pt-[10vh] md:px-[7vw]">
        <SectionReveal className="flex flex-wrap items-baseline justify-between gap-6 border-b border-ivory/10 pb-8">
          <span className="font-serif text-3xl font-light italic text-ivory/70">Issue No. 12 — The Quiet Season</span>
          <span className="whisper text-ivory/40">{c.features.map((f) => f.category).join(" · ")}</span>
        </SectionReveal>
      </section>
      <section className="grid gap-6 px-7 py-[8vh] md:grid-cols-3 md:px-[7vw]">
        {c.features.map((f, i) => (
          <SectionReveal key={f.title} delay={(i % 3) * 0.1} className={`group relative overflow-hidden ${span(f.size)}`}>
            <ParallaxImage src={scenes[f.image]} alt={f.title} className="absolute inset-0 h-full" travel={6} zoom={1.1} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent transition-opacity duration-1000 group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="whisper text-champagne/80">{f.category}</span>
              <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-ivory md:text-4xl">{f.title}</h3>
              <p className="mt-3 max-w-md font-serif text-base italic font-light leading-relaxed text-ivory/65 md:text-lg">{f.dek}</p>
            </div>
          </SectionReveal>
        ))}
      </section>
      <section className="px-7 pb-[8vh] md:px-[7vw]">
        <CTA {...c.cta} />
      </section>
    </>
  );
}

/* ---------- Destinations ---------- */

export function DestinationsSections() {
  const c = destinationsContent;
  return (
    <>
      <section className="grid grid-cols-2 gap-4 px-5 py-[10vh] md:grid-cols-5 md:gap-6 md:px-[5vw]">
        {c.portals.map((p, i) => (
          <DestinationCard key={p.name} index={i} {...p} />
        ))}
      </section>
      <section className="px-7 pb-[10vh] md:px-[7vw]">
        <CTA {...c.cta} />
      </section>
    </>
  );
}

/* ---------- Membership ---------- */

export function MembershipSections() {
  const c = membershipContent;
  return (
    <>
      <Split imageKey="membership">
        <Editorial {...c.intro} />
      </Split>
      <section className="px-7 py-[10vh] md:px-[7vw]">
        <ol className="grid gap-12 md:grid-cols-4 md:gap-10">
          {c.path.map((s, i) => (
            <SectionReveal key={s.step} as="li" delay={i * 0.1} className="border-t border-ivory/10 pt-8">
              <span className="font-serif text-5xl font-light text-champagne/70">{s.step}</span>
              <h3 className="mt-6 font-serif text-3xl font-light text-ivory">{s.title}</h3>
              <p className="mt-4 font-serif text-lg font-light leading-relaxed text-ivory/65">{s.body}</p>
            </SectionReveal>
          ))}
        </ol>
      </section>
      <section className="px-7 py-[10vh] md:px-[7vw]">
        <div className="grid gap-16 md:grid-cols-2 md:gap-[6vw]">
          {c.tiers.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.12}>
              <Kicker>{i === 0 ? "Tier One" : "Tier Two"}</Kicker>
              <h3 className="mt-6 font-serif text-4xl font-light text-ivory md:text-5xl">{t.name}</h3>
              <p className="mt-6 font-serif text-lg font-light leading-relaxed text-ivory/65 md:text-xl">{t.body}</p>
              {"to" in t && t.to && (
                <Link to={t.to} className="mt-8 inline-block">
                  <LineLink>Discover</LineLink>
                </Link>
              )}
            </SectionReveal>
          ))}
        </div>
        <CTA {...c.cta} className="mt-20" />
      </section>
    </>
  );
}

/* ---------- Private ---------- */

export function PrivateSections() {
  const c = privateContent;
  return (
    <section className="px-7 py-[14vh] md:px-[14vw]">
      <div className="mx-auto max-w-3xl space-y-[18vh]">
        {c.statements.map((s) => (
          <SectionReveal key={s.numeral} className="text-center">
            <span className="font-serif text-2xl font-light text-champagne/50">{s.numeral}</span>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-ivory/90 md:text-6xl">{s.title}</h2>
            <p className="mx-auto mt-8 max-w-xl font-serif text-lg font-light leading-relaxed text-ivory/50 md:text-xl">{s.body}</p>
          </SectionReveal>
        ))}
        <CTA {...c.cta} className="text-center" />
      </div>
    </section>
  );
}

/* ---------- About ---------- */

export function AboutSections() {
  const c = aboutContent;
  return (
    <>
      {c.sections.map((s, i) => (
        <Split key={s.id} imageKey={s.image} flip={i % 2 === 1}>
          <Editorial kicker={`${String(i + 1).padStart(2, "0")} — ${s.kicker}`} title={s.title} body={s.body} align={i % 2 === 1 ? "right" : "left"} />
        </Split>
      ))}
      <section className="px-7 pb-[10vh] md:px-[7vw]">
        <CTA {...c.cta} />
      </section>
    </>
  );
}
