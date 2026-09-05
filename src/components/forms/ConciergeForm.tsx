import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { GlassPanel } from "@/components/lux/GlassPanel";
import { Kicker, SectionReveal } from "@/components/scene/SectionReveal";
import { ease } from "@/components/scene/motion";
import { brand, conciergeTimeframes, conciergeTypes } from "@/content/site";
import { friendlyError, Received, SubmitLine, TextArea, TextField, useEnquiry, WordChoice } from "./fields";

/**
 * The desk. You choose the nature and the timing in words, the brief writes
 * itself as you go, and a person answers within the hour.
 */
export function ConciergeForm() {
  const [v, setV] = useState({ full_name: "", email: "", phone: "", request_type: "", timeframe: "", message: "" });
  const mutation = useEnquiry("concierge");
  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  const brief = [
    v.request_type ? `A ${v.request_type.toLowerCase()} request` : "A request",
    v.timeframe ? v.timeframe.toLowerCase() : null,
    v.full_name ? `for ${v.full_name}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(v);
  };

  return (
    <section className="relative bg-obsidian px-7 py-[14vh] md:px-[8vw]">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
        <div>
          <SectionReveal>
            <Kicker>Write to the Desk</Kicker>
            <h2 className="mt-7 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl">
              Tell us once.
              <br />
              We will do the rest.
            </h2>
          </SectionReveal>

          <AnimatePresence mode="wait">
            {mutation.isSuccess ? (
              <motion.div key="done" className="mt-16">
                <Received title="The desk has your brief." body="A person, not an auto-reply, will be in touch within the hour." />
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -12, transition: { duration: 0.7, ease } }} noValidate className="mt-14 space-y-12">
                <SectionReveal delay={0.1}>
                  <WordChoice label="Nature of request" options={conciergeTypes} value={v.request_type} onChange={set("request_type")} />
                </SectionReveal>
                <SectionReveal delay={0.15}>
                  <WordChoice label="Timeframe" options={conciergeTimeframes} value={v.timeframe} onChange={set("timeframe")} />
                </SectionReveal>
                <SectionReveal delay={0.2}>
                  <TextArea label="Your request" name="message" required rows={4} placeholder="Where, when, for whom, and anything the desk should know." value={v.message} onChange={(e) => set("message")(e.target.value)} />
                </SectionReveal>
                <div className="grid gap-9 md:grid-cols-3">
                  <TextField label="Full name" name="full_name" autoComplete="name" required value={v.full_name} onChange={(e) => set("full_name")(e.target.value)} />
                  <TextField label="Email" name="email" type="email" autoComplete="email" required value={v.email} onChange={(e) => set("email")(e.target.value)} />
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone")(e.target.value)} />
                </div>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <SubmitLine pending={mutation.isPending}>Send to the desk</SubmitLine>
                  <p className="whisper !normal-case !tracking-[0.12em] text-ivory/35">Answered by a person within the hour.</p>
                </div>
                {mutation.isError && (
                  <p role="alert" className="font-serif text-lg italic text-destructive">
                    {friendlyError(mutation.error)}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* The live brief */}
        <aside className="md:sticky md:top-[18vh] md:self-start">
          <SectionReveal delay={0.2}>
            <GlassPanel className="px-8 py-10">
              <span className="whisper text-champagne/80">Your brief</span>
              <p className="mt-6 font-serif text-3xl font-light leading-snug text-ivory md:text-4xl">
                <AnimatePresence mode="wait">
                  <motion.span key={brief} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="block">
                    {brief}.
                  </motion.span>
                </AnimatePresence>
              </p>
              <p className="mt-6 min-h-[3.5rem] font-serif text-lg italic font-light leading-relaxed text-ivory/55">
                {v.message ? `“${v.message.slice(0, 160)}${v.message.length > 160 ? "…" : ""}”` : "Your words will appear here as you write."}
              </p>
              <div className="mt-10 space-y-3 border-t border-ivory/10 pt-6">
                <span className="whisper block text-ivory/40">Or speak to someone now</span>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="block font-serif text-2xl font-light text-ivory transition-colors hover:text-champagne">
                  {brand.phone}
                </a>
                <a href={`mailto:${brand.email}`} className="whisper block text-ivory/50 transition-colors hover:text-champagne">
                  {brand.email}
                </a>
              </div>
            </GlassPanel>
          </SectionReveal>
        </aside>
      </div>
    </section>
  );
}
