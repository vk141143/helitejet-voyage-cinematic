import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, type FormEvent, type MouseEvent } from "react";
import { GlassPanel } from "@/components/lux/GlassPanel";
import { SectionReveal } from "@/components/scene/SectionReveal";
import { ease, useCinematicMotion } from "@/components/scene/motion";
import { interestOptions, travelProfiles } from "@/content/site";
import { friendlyError, Received, SelectField, SubmitLine, TextArea, TextField, useEnquiry } from "./fields";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  size: 1 + ((i * 7) % 3),
  delay: (i % 6) * 1.3,
  duration: 14 + (i % 5) * 3,
}));

/**
 * The request panel: a floating charcoal-glass plane that leans toward the
 * cursor and with the scroll, lit by a single champagne source, surrounded by
 * slow fog and a few drifting motes. Focusing a field warms the whole panel.
 */
export function RequestAccessForm() {
  const { reduced } = useCinematicMotion();
  const section = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);
  const [v, setV] = useState({ full_name: "", email: "", phone: "", location: "", interest: "", travel_profile: "", message: "" });
  const mutation = useEnquiry("access");

  // Mouse perspective
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rxMouse = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 60, damping: 18 });
  const ryMouse = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 60, damping: 18 });
  // Scroll perspective
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const rxScroll = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const rotateX = useTransform([rxMouse, rxScroll], ([a, b]) => (reduced ? 0 : (a as number) + (b as number)));
  const rotateY = useTransform(ryMouse, (a) => (reduced ? 0 : a));
  const floatY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);
  const lightX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const lightY = useTransform(my, [-0.5, 0.5], ["20%", "60%"]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(v);
  };

  return (
    <section ref={section} onMouseMove={onMove} onMouseLeave={onLeave} className="relative overflow-hidden bg-obsidian px-5 py-[14vh] md:px-[10vw] md:py-[18vh]">
      {/* Fog */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="fog absolute -left-[20%] top-[10%] h-[70vh] w-[70vw] bg-[radial-gradient(ellipse,oklch(0.3_0.01_270/0.5),transparent_65%)] blur-3xl" />
        <span className="fog fog-slow absolute -right-[25%] bottom-[0%] h-[80vh] w-[80vw] bg-[radial-gradient(ellipse,oklch(0.28_0.02_262/0.5),transparent_65%)] blur-3xl" />
        <span className="fog fog-slower absolute left-[20%] top-[50%] h-[50vh] w-[60vw] bg-[radial-gradient(ellipse,oklch(0.72_0.1_80/0.08),transparent_65%)] blur-3xl" />
        {/* Gold light source */}
        <motion.span
          style={{ left: lightX, top: lightY }}
          className="absolute h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,oklch(0.86_0.055_85/0.22),transparent_60%)] blur-2xl"
        />
        {/* Particles */}
        {!reduced &&
          PARTICLES.map((p, i) => (
            <span
              key={i}
              className="mote absolute rounded-full bg-champagne/70"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
            />
          ))}
      </div>

      <div className="relative mx-auto max-w-3xl" style={{ perspective: 1600 }}>
        <SectionReveal className="mb-12 text-center">
          <span className="whisper text-champagne/80">Request Access</span>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl">A conversation,<br />not an application.</h2>
        </SectionReveal>

        <motion.div style={{ rotateX, rotateY, y: floatY, transformStyle: "preserve-3d" }} className="will-change-transform">
          <GlassPanel glow={focused} className="px-6 py-10 md:px-14 md:py-14">
            {/* Depth focus glow */}
            <motion.span
              aria-hidden
              animate={{ opacity: focused ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.055_85/0.08),transparent_60%)]"
            />
            <AnimatePresence mode="wait">
              {mutation.isSuccess ? (
                <motion.div key="done" exit={{ opacity: 0 }} className="py-8">
                  <Received title="The desk will call you." body="Expect a quiet conversation within two days, at an hour of your choosing." />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  onFocus={() => setFocused(true)}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocused(false)}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.7, ease } }}
                  noValidate
                  className="relative"
                  style={{ transform: reduced ? undefined : "translateZ(30px)" }}
                >
                  <div className="grid gap-9 md:grid-cols-2 md:gap-x-10">
                    <TextField label="Full name" name="full_name" autoComplete="name" required value={v.full_name} onChange={set("full_name")} />
                    <TextField label="Email" name="email" type="email" autoComplete="email" required value={v.email} onChange={set("email")} />
                    <TextField label="Phone" name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} />
                    <TextField label="Location" name="location" autoComplete="address-level2" placeholder="City, country" value={v.location} onChange={set("location")} />
                    <SelectField label="Interest" name="interest" options={interestOptions} value={v.interest} onChange={set("interest")} />
                    <SelectField label="Travel profile" name="travel_profile" options={travelProfiles} value={v.travel_profile} onChange={set("travel_profile")} />
                    <div className="md:col-span-2">
                      <TextArea label="Message" name="message" placeholder="Anything the desk should know before calling." value={v.message} onChange={set("message")} />
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <SubmitLine pending={mutation.isPending}>Request a call</SubmitLine>
                    <p className="whisper !normal-case !tracking-[0.12em] text-ivory/35">Held in confidence. Never shared.</p>
                  </div>

                  {mutation.isError && (
                    <p role="alert" className="mt-6 font-serif text-lg italic text-destructive">
                      {friendlyError(mutation.error)}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
