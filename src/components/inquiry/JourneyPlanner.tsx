import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brand, scenes } from "@/content/site";
import { ease, useCinematicMotion } from "@/components/scene/motion";
import { getAircraftCategoryOptions, matchAircraft, type AircraftCategory } from "./flightMatcher";
import { inquiryConfig, type InquiryContext } from "./inquiryConfig";
import { InquiryProgress } from "./InquiryProgress";
import { InquiryStep } from "./InquiryStep";
import { VoiceConcierge, type Service } from "./VoiceConcierge";

function EmbeddedJourneyCard() {
  const { reduced } = useCinematicMotion();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [category, setCategory] = useState<AircraftCategory>("Light Jet");
  const [travellers, setTravellers] = useState(4);
  const [distance, setDistance] = useState("regional");
  const [budget, setBudget] = useState(30000);
  const [results, setResults] = useState(false);
  const distanceRef = useRef<HTMLSelectElement>(null);
  const categories = getAircraftCategoryOptions();
  const serviceOptions: Service[] = ["AVIATION", "MOBILITY", "YACHTS", "RESIDENCES", "CONCIERGE", "EXPERIENCES"];
  const isAviation = service === "AVIATION";
  const stepLabels = isAviation ? ["TYPE", "AIRCRAFT", "PEOPLE", "WHERE", "BUDGET"] : ["TYPE", "PEOPLE", "WHERE", "BUDGET"];
  const contentStep = isAviation ? step : step === 0 ? 0 : step - 1;
  const recommended = isAviation ? matchAircraft({ travellers, distanceId: distance, category }) : [];
  const hasCategoryFit = recommended.length > 0;
  const displayedBudget = `$${budget.toLocaleString()}`;
  const contentTransition = reduced ? { duration: 0 } : { duration: 0.55, ease };

  const next = () => {
    if (step === 0 && !service) return;
    if (step < stepLabels.length - 1) setStep((value) => value + 1);
    else setResults(true);
  };

  const back = () => {
    if (results) {
      setResults(false);
      return;
    }
    setStep((value) => Math.max(0, value - 1));
  };

  const openDistance = () => {
    distanceRef.current?.focus();
    distanceRef.current?.showPicker?.();
  };

  const contentTitle = results
    ? "YOUR OPTIONS"
    : contentStep === 0
      ? "WHAT ARE YOU LOOKING FOR?"
      : isAviation && contentStep === 1
        ? "WHAT ARE YOU FLYING?"
        : contentStep === (isAviation ? 2 : 1)
          ? "HOW MANY TRAVELLERS?"
          : contentStep === (isAviation ? 3 : 2)
            ? "WHERE ARE YOU GOING?"
            : "WHAT'S YOUR PREFERRED BUDGET?";

  return (
    <motion.aside
      role="region"
      aria-label="HELITEJET journey planner"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="flex h-[520px] w-full flex-col border border-ivory/15 bg-[oklch(0.09_0.008_275/0.84)] p-5 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)] backdrop-blur-md md:h-[540px] md:p-6"
    >
      <div className="grid grid-cols-4 gap-2 border-b border-ivory/10 pb-4">
        {stepLabels.map((label, index) => (
          <button key={label} type="button" disabled={index > step || results} onClick={() => setStep(index)} className={`text-left whisper text-[0.52rem] tracking-[0.12em] transition-colors ${index === step && !results ? "text-champagne" : index < step || results ? "text-ivory/70" : "text-ivory/30"}`}>
            {String(index + 1).padStart(2, "0")} {label}
          </button>
        ))}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {!results ? (
            <motion.div key={step} initial={reduced ? false : { opacity: 0, x: 18, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(8px)" }} transition={contentTransition} className="flex flex-1 flex-col pt-8">
              <div className="text-center">
                <div className="font-serif text-3xl font-light text-champagne">{String(step + 1).padStart(2, "0")}</div>
                <h2 className="mt-4 font-serif text-2xl font-light leading-tight text-ivory md:text-3xl">{contentTitle}</h2>
              </div>

              <div className="mt-7 flex flex-1 flex-col justify-start">
                {contentStep === 0 && <div className="grid grid-cols-2 gap-2">{serviceOptions.map((option) => <button key={option} type="button" onClick={() => setService(option)} aria-pressed={service === option} className={`border px-3 py-3 text-left font-serif text-sm transition-colors ${service === option ? "border-champagne/80 bg-champagne/[0.08] text-ivory" : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"}`}><span className="block">{option}</span><span className="mt-1 block text-[0.62rem] text-ivory/35">{option === "AVIATION" ? "Private Jets & Helicopters" : option === "MOBILITY" ? "Luxury Cars & Chauffeurs" : option === "YACHTS" ? "Yacht Charter & Marine Experiences" : option === "RESIDENCES" ? "Villas, Hotels & Private Stays" : option === "CONCIERGE" ? "Personal Assistance" : "Curated Moments & Lasting Memories"}</span></button>)}</div>}
                {isAviation && contentStep === 1 && <div className="grid gap-2">{categories.map((option) => <button key={option.id} type="button" onClick={() => { setCategory(option.id); window.dispatchEvent(new CustomEvent("helitejet-aircraft-confirmed", { detail: { category: option.id } })); }} aria-pressed={category === option.id} className={`border px-3 py-2.5 text-left font-serif text-sm transition-colors ${category === option.id ? "border-champagne/80 bg-champagne/[0.08] text-ivory" : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"}`}>{option.label}</button>)}</div>}
                {contentStep === (isAviation ? 2 : 1) && <div className="flex items-center justify-center gap-8 pt-5"><button type="button" onClick={() => setTravellers((value) => Math.max(1, value - 1))} aria-label="Decrease travellers" className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne">−</button><span className="font-serif text-5xl font-light text-ivory">{travellers}</span><button type="button" onClick={() => setTravellers((value) => Math.min(50, value + 1))} aria-label="Increase travellers" className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne">+</button></div>}
                {contentStep === (isAviation ? 3 : 2) && <label className="block"><span className="whisper text-ivory/50">ROUTE OR DISTANCE</span><select ref={distanceRef} value={distance} onChange={(event) => { setDistance(event.target.value); window.dispatchEvent(new Event("helitejet-distance-confirmed")); }} className="mt-3 w-full appearance-none border border-ivory/20 bg-obsidian px-4 py-3 font-serif text-base text-ivory outline-none transition-colors focus:border-champagne"><option value="short-hop">Short hop — Up to 150 mi</option><option value="regional">Regional — Up to 600 mi</option><option value="cross-country">Cross country — Up to 1,500 mi</option><option value="long-range">Long range — Up to 3,500 mi</option><option value="intercontinental">Intercontinental — 6,000 mi and beyond</option></select></label>}
                {contentStep === (isAviation ? 4 : 3) && <div className="pt-3"><div className="text-center font-serif text-4xl font-light text-ivory">{displayedBudget}</div><input aria-label="Preferred budget" type="range" min="10000" max="150000" step="5000" value={budget} onChange={(event) => setBudget(Number(event.target.value))} onPointerUp={() => window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } }))} onKeyUp={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } })); }} className="mt-10 h-1 w-full cursor-pointer appearance-none bg-[linear-gradient(90deg,oklch(0.72_0.1_80)_0%,oklch(0.72_0.1_80)_var(--progress),oklch(0.94_0.014_85/0.18)_var(--progress),oklch(0.94_0.014_85/0.18)_100%)] accent-champagne" style={{ ["--progress" as string]: `${((budget - 10000) / 140000) * 100}%` }} /><div className="mt-3 flex justify-between whisper text-ivory/35"><span>$10,000</span><span>$150,000</span></div><div className="mt-8 text-center whisper text-ivory/40">Preferred budget</div></div>}
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={reduced ? false : { opacity: 0, x: 18, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={contentTransition} className="flex flex-1 flex-col pt-8">
              <div className="text-center"><div className="whisper text-champagne">YOUR OPTIONS</div><h2 className="mt-4 font-serif text-2xl font-light leading-tight text-ivory">{isAviation ? hasCategoryFit ? `${recommended.length} AIRCRAFT SUITED TO YOUR JOURNEY` : "YOUR PARTY MAY BE BETTER SUITED TO ANOTHER AIRCRAFT CATEGORY" : "YOUR REQUEST IS WITH THE CONCIERGE"}</h2></div>
              <div className="mt-6 grid max-h-[224px] gap-2 overflow-y-auto pr-2 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]">{isAviation ? recommended.slice(0, 4).map((aircraft) => <article key={aircraft.name} className="border border-ivory/10 bg-ivory/[0.03] p-3"><div className="font-serif text-lg font-light text-ivory">{aircraft.name}</div><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 whisper text-ivory/50"><span>{aircraft.seats} SEATS</span><span>{aircraft.range}</span><span>{aircraft.cruise}</span></div><div className="mt-2 font-serif text-sm italic text-ivory/60">{aircraft.mission}</div></article>) : <p className="border border-ivory/10 bg-ivory/[0.03] p-4 text-center font-serif text-sm italic text-ivory/60">Your selected {service?.toLowerCase()} enquiry will be shaped by the HELITEJET concierge team.</p>}</div>
              <Link to="/request-access" className="mt-4 self-start border border-champagne/50 px-3 py-2 whisper text-[0.58rem] text-champagne transition-colors hover:border-champagne hover:bg-champagne/10 hover:text-ivory">REQUEST ACCESS</Link>
              {!hasCategoryFit && <button type="button" onClick={() => { setCategory("Midsize Jet"); setResults(false); }} className="mt-4 text-left whisper text-champagne hover:text-ivory">EXPLORE SUITABLE AIRCRAFT →</button>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-ivory/10 pt-4">
        <button type="button" onClick={back} disabled={step === 0 && !results} className="whisper text-ivory/55 transition-colors hover:text-champagne disabled:invisible">← BACK</button>
        {!results && <button type="button" onClick={next} className="group inline-flex items-center gap-3 whisper text-champagne transition-colors hover:text-ivory"><span>{step === stepLabels.length - 1 ? "SHOW MY OPTIONS" : "NEXT"}</span><span className="relative block h-px w-10 overflow-hidden bg-gold/50"><span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" /></span></button>}
      </div>

      <VoiceConcierge
        step={step}
        stepCount={stepLabels.length}
        service={service}
        category={category}
        travellers={travellers}
        distance={distance as "short-hop" | "regional" | "cross-country" | "long-range" | "intercontinental"}
        budget={budget}
        onService={setService}
        onCategory={setCategory}
        onTravellers={setTravellers}
        onStep={setStep}
        onOpenDistance={openDistance}
        onShowOptions={() => { if (step === stepLabels.length - 1) setResults(true); }}
      />
    </motion.aside>
  );
}

export function JourneyPlanner({
  context,
  open = true,
  onClose,
  embedded = false,
}: {
  context: InquiryContext;
  open?: boolean;
  onClose?: () => void;
  embedded?: boolean;
}) {
  const { reduced } = useCinematicMotion();
  const config = inquiryConfig[context];
  const [currentStep, setCurrentStep] = useState(0);
  const [travellers, setTravellers] = useState<number | null>(context === "flights" ? 4 : 6);
  const [distance, setDistance] = useState<string | null>(context === "flights" ? "regional" : "coastal");
  const [budget, setBudget] = useState(25000);
  const [showResults, setShowResults] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const canClose = !embedded && !!onClose;

  useEffect(() => {
    if (!open || embedded) return;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const width = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (width > 0) document.body.style.paddingRight = `${width}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [open, embedded]);

  useEffect(() => {
    if (!open || embedded) return;
    closeRef.current?.focus({ preventScroll: true });

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
      if (!focusables.length) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (current === first || !panelRef.current.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !panelRef.current.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, embedded]);

  useEffect(() => {
    if (!open && !embedded) {
      setCurrentStep(0);
      setShowResults(false);
      setTravellers(context === "flights" ? 4 : 6);
      setDistance(context === "flights" ? "regional" : "coastal");
      setBudget(25000);
    }
  }, [open, context]);

  const currentStepMeta = config.steps[currentStep];
  const canProceed = currentStep === 0 ? travellers !== null : currentStep === 1 ? distance !== null : true;

  const flightResults =
    travellers && distance
      ? matchAircraft({
          travellers,
          distanceId: distance,
        })
      : [];

  const resultCards =
    context === "flights"
      ? flightResults.slice(0, 4)
      : [
          { name: "Harbour Collection", category: context === "yachts" ? "Explorer Yacht" : "Seaside Residence", seats: `${travellers ?? 4} guests`, range: distance ? config.distanceOptions.find((option) => option.id === distance)?.label ?? "Curated route" : "Curated route", cruise: "Private briefing", mission: context === "yachts" ? "Harbour-to-harbour charter with crew and tender" : "A stay designed for calm, privacy and daily rhythm" },
          { name: "Private Wing", category: context === "yachts" ? "Classic Yacht" : "City Residence", seats: `${travellers ?? 4} guests`, range: "Flex itinerary", cruise: "Concierge planning", mission: context === "yachts" ? "Elegant coastal passages and in-port access" : "A residence in the centre of your preferred rhythm" },
          { name: "Club Horizon", category: context === "yachts" ? "Sailing Yacht" : "Alpine Residence", seats: `${travellers ?? 4} guests`, range: "Seasonal stay", cruise: "House team", mission: context === "yachts" ? "Slow, weather-led passages and private shore days" : "Elevation, privacy, and daily rituals shaped around the landscape" },
        ];

  const showStep = !showResults;

  const handleAdvance = () => {
    if (!canProceed) return;
    if (currentStep < config.steps.length - 1) {
      setCurrentStep((step) => Math.min(step + 1, config.steps.length - 1));
      return;
    }
    setShowResults(true);
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((step) => Math.max(step - 1, 0));
    }
  };

  const title = showResults ? config.resultTitle : config.title;
  const intro = showResults ? config.resultSummary : config.intro;

  if (embedded) return <EmbeddedJourneyCard />;

  if (!open && !embedded) return null;

  const panel = (
    <motion.div
      initial={embedded ? false : reduced ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={embedded ? undefined : reduced ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: embedded ? 0.8 : 0.7, ease }}
      className={embedded ? "w-full max-w-[500px] border border-ivory/10 bg-[oklch(0.11_0.008_275/0.9)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-sm" : "fixed inset-0 z-[80] bg-[oklch(0.07_0.006_275/0.86)] backdrop-blur-sm"}
    >
          <motion.aside
            ref={panelRef}
            role={embedded ? "region" : "dialog"}
            aria-modal={embedded ? undefined : "true"}
            aria-label="Travel planning inquiry"
            initial={embedded ? false : reduced ? false : { x: 80, opacity: 0 }}
            animate={embedded ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={embedded ? undefined : reduced ? { opacity: 0 } : { x: 80, opacity: 0 }}
            transition={{ duration: 0.8, ease }}
            className={embedded ? "relative flex w-full flex-col bg-[oklch(0.11_0.008_275/0.9)]" : "absolute inset-y-0 right-0 z-10 flex w-full max-w-[820px] flex-col border-l border-ivory/10 bg-[oklch(0.11_0.008_275)] shadow-[0_0_180px_-80px_rgba(0,0,0,0.9)] md:w-[54vw]"}
          >
            {!embedded && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <img src={scenes[context === "flights" ? "aviation" : context === "yachts" ? "yachts" : "residences"]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.11_0.008_275/0.92),oklch(0.11_0.008_275/0.86)_40%,oklch(0.11_0.008_275/0.92))]" />
              </div>
            )}

            <div className={`relative flex h-full flex-col ${embedded ? "px-4 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6" : "px-5 pb-6 pt-6 md:px-9 md:pb-10 md:pt-8"}`}>
              <div className="flex items-center justify-between gap-4 border-b border-ivory/10 pb-5">
                <div className="font-serif text-2xl font-light tracking-[0.18em] text-ivory">{brand.mark}</div>
                {canClose && (
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="whisper flex items-center gap-3 text-ivory/70 outline-none transition-colors hover:text-champagne focus-visible:text-champagne"
                    aria-label="Close inquiry"
                  >
                    <span>Close</span>
                    <span className="block h-3 w-3 border border-current" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="pt-8 md:pt-10">
                <div className="mb-6 md:mb-8">
                  <InquiryProgress steps={config.steps} currentStep={showResults ? config.steps.length - 1 : currentStep} onSelect={(index) => {
                    if (showResults) return;
                    setCurrentStep(Math.min(index, config.steps.length - 1));
                  }} />
                </div>

                <div className={`flex ${embedded ? "min-h-[360px]" : "min-h-[420px]"} flex-col`}>
                  <AnimatePresence mode="wait">
                    {showStep ? (
                      <motion.div
                        key={`step-${currentStep}`}
                        initial={reduced ? false : { opacity: 0, x: 18, filter: "blur(12px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, x: -18, filter: "blur(8px)" }}
                        transition={{ duration: 0.65, ease }}
                        className="flex flex-1 flex-col"
                      >
                        <div className="mb-8 flex items-center justify-between text-ivory/50">
                          <span className="whisper text-champagne/80">{String(currentStep + 1).padStart(2, "0")}</span>
                          <span className="whisper">{String(config.steps.length).padStart(2, "0")}</span>
                        </div>

                        <div className="mb-5">
                          <div className="whisper text-champagne/80">{currentStepMeta.label}</div>
                          <h2 className="mt-4 max-w-md font-serif text-4xl font-light leading-tight text-ivory md:text-[3.3rem]">{currentStepMeta.title}</h2>
                        </div>

                        <InquiryStep
                          step={currentStepMeta}
                          context={context}
                          travellers={travellers}
                          selectedDistance={distance}
                          budget={budget}
                          onTravellersChange={(value) => setTravellers(value)}
                          onDistanceChange={(value) => setDistance(value)}
                          onBudgetChange={(value) => setBudget(value)}
                          peopleOptions={config.peopleOptions}
                          distanceOptions={config.distanceOptions}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="results"
                        initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
                        transition={{ duration: 0.8, ease }}
                        className="flex flex-1 flex-col"
                      >
                        <div className="mb-8">
                          <div className="whisper text-champagne/80">{title}</div>
                          <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold via-champagne to-transparent" />
                        </div>

                        <div className="mb-6">
                          <div className="font-serif text-3xl font-light text-ivory md:text-5xl">{resultCards.length} AIRCRAFT SELECTED</div>
                          <p className="mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-ivory/70">{intro}</p>
                        </div>

                        <div className="mt-2 grid gap-4 md:grid-cols-2">
                          {resultCards.map((card, index) => (
                            <motion.article
                              key={card.name}
                              initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(10px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 0.7, delay: index * 0.1, ease }}
                              className="group overflow-hidden border border-ivory/10 bg-[oklch(0.16_0.008_275/0.52)]"
                            >
                              <div className="relative overflow-hidden">
                                <img src={scenes[context === "flights" ? "aviation" : context === "yachts" ? "yachts" : "residences"]} alt={card.name} className="h-52 w-full object-cover transition duration-1000 group-hover:scale-[1.06]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                              </div>
                              <div className="p-5">
                                <div className="whisper text-champagne/80">{card.category.toUpperCase()}</div>
                                <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-ivory">{card.name}</h3>
                                <div className="mt-5 space-y-2 text-sm uppercase tracking-[0.18em] text-ivory/55">
                                  <div>{card.seats}</div>
                                  <div>{card.range}</div>
                                  <div>{card.cruise}</div>
                                </div>
                                <p className="mt-5 font-serif text-lg italic leading-relaxed text-ivory/70">{card.mission}</p>
                                <div className="mt-6">
                                  <span className="group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory">
                                    <span>VIEW AIRCRAFT</span>
                                    <span className="relative block h-px w-10 overflow-hidden bg-gold/50">
                                      <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </motion.article>
                          ))}
                        </div>

                        <div className="mt-8 border-t border-ivory/10 pt-6">
                          <Link
                            to="/concierge"
                            onClick={onClose}
                            className="group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory"
                          >
                            <span>{config.concierge}</span>
                            <span className="relative block h-px w-12 overflow-hidden bg-gold/50">
                              <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" />
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative mt-auto border-t border-ivory/10 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={showResults ? false : currentStep === 0}
                    className="whisper inline-flex items-center gap-2 text-ivory/60 transition-colors hover:text-champagne disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span aria-hidden="true">←</span>
                    <span>BACK</span>
                  </button>

                  {!showResults && (
                    <button
                      type="button"
                      onClick={handleAdvance}
                      disabled={!canProceed}
                      className="whisper inline-flex items-center gap-3 text-champagne transition-colors hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>{currentStep === config.steps.length - 1 ? config.cta : "NEXT"}</span>
                      <span className="relative block h-px w-12 overflow-hidden bg-gold/50">
                        <span className="absolute inset-0 origin-left scale-x-100 bg-ivory" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
      </motion.div>
  );

  return embedded ? panel : <AnimatePresence>{open && panel}</AnimatePresence>;
}
