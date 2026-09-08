import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brand, scenes } from "@/content/site";
import { ease, useCinematicMotion } from "@/components/scene/motion";
import { aircraftInventory, type AircraftKind, type InventoryAircraft } from "./aircraftInventory";
import { matchAircraft, type AircraftCategory, type AircraftMatch } from "./flightMatcher";
import { inquiryConfig, type InquiryContext } from "./inquiryConfig";
import { InquiryProgress } from "./InquiryProgress";
import { InquiryStep } from "./InquiryStep";
import { VoiceConcierge, type Service } from "./VoiceConcierge";

function EmbeddedJourneyCard() {
  const { reduced } = useCinematicMotion();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [showAircraftPicker, setShowAircraftPicker] = useState(false);
  const [aircraftKind, setAircraftKind] = useState<AircraftKind | null>(null);
  const [aircraftQuery, setAircraftQuery] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [selectedAircraft, setSelectedAircraft] = useState<InventoryAircraft | null>(null);
  const [category, setCategory] = useState<AircraftCategory>("Light Jet");
  const [travellers, setTravellers] = useState(4);
  const [distance, setDistance] = useState("regional");
  const [budget, setBudget] = useState(30000);
  const [results, setResults] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const distanceRef = useRef<HTMLSelectElement>(null);
  const serviceOptions: Service[] = ["AVIATION", "MOBILITY", "YACHTS", "RESIDENCES", "CONCIERGE", "EXPERIENCES"];
  const isAviation = service === "AVIATION";
  const stepLabels = ["TYPE", "PEOPLE", "BUDGET"];
  const contentStep = step;
  const recommended = isAviation ? matchAircraft({ travellers, distanceId: distance, category }) : [];
  const hasCategoryFit = recommended.length > 0;
  const displayedBudget = `$${budget.toLocaleString()}`;
  const contentTransition = reduced ? { duration: 0 } : { duration: 0.55, ease };

  const next = () => {
    if (step === 0 && !service) return;
    if (step === 0 && isAviation && !selectedAircraft) {
      setShowAircraftPicker(true);
      return;
    }
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
      : contentStep === 1
        ? "HOW MANY TRAVELLERS?"
        : "WHAT'S YOUR PREFERRED BUDGET?";

  return (
    <>
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
                {contentStep === 0 && <div className="grid grid-cols-2 gap-2">{serviceOptions.map((option) => <button key={option} type="button" onClick={() => { setService(option); if (option === "AVIATION") setShowAircraftPicker(true); else { setAircraftKind(null); setSelectedAircraft(null); } }} aria-pressed={service === option} className={`border px-3 py-3 text-left font-serif text-sm transition-colors ${service === option ? "border-champagne/80 bg-champagne/[0.08] text-ivory" : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"}`}><span className="block">{option}</span><span className="mt-1 block text-[0.62rem] text-ivory/35">{option === "AVIATION" ? "Private Jets & Helicopters" : option === "MOBILITY" ? "Luxury Cars & Chauffeurs" : option === "YACHTS" ? "Yacht Charter & Marine Experiences" : option === "RESIDENCES" ? "Villas, Hotels & Private Stays" : option === "CONCIERGE" ? "Personal Assistance" : "Curated Moments & Lasting Memories"}</span></button>)}</div>}
                {contentStep === 1 && <div className="flex items-center justify-center gap-8 pt-5"><button type="button" onClick={() => setTravellers((value) => Math.max(1, value - 1))} aria-label="Decrease travellers" className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne">−</button><span className="font-serif text-5xl font-light text-ivory">{travellers}</span><button type="button" onClick={() => setTravellers((value) => Math.min(50, value + 1))} aria-label="Increase travellers" className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne">+</button></div>}
                {contentStep === 2 && <div className="pt-3"><div className="text-center font-serif text-4xl font-light text-ivory">{displayedBudget}</div><input aria-label="Preferred budget" type="range" min="10000" max="150000" step="5000" value={budget} onChange={(event) => setBudget(Number(event.target.value))} onPointerUp={() => window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } }))} onKeyUp={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } })); }} className="mt-10 h-1 w-full cursor-pointer appearance-none bg-[linear-gradient(90deg,oklch(0.72_0.1_80)_0%,oklch(0.72_0.1_80)_var(--progress),oklch(0.94_0.014_85/0.18)_var(--progress),oklch(0.94_0.014_85/0.18)_100%)] accent-champagne" style={{ ["--progress" as string]: `${((budget - 10000) / 140000) * 100}%` }} /><div className="mt-3 flex justify-between whisper text-ivory/35"><span>$10,000</span><span>$150,000</span></div><div className="mt-8 text-center whisper text-ivory/40">Preferred budget</div></div>}
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

      {!voiceEnabled && <div className="flex items-center justify-between border-t border-ivory/10 pt-4">
        <button type="button" onClick={back} disabled={step === 0 && !results} className="whisper text-ivory/55 transition-colors hover:text-champagne disabled:invisible">← BACK</button>
        {!results && <button type="button" onClick={next} className="group inline-flex items-center gap-3 whisper text-champagne transition-colors hover:text-ivory"><span>{step === stepLabels.length - 1 ? "SHOW MY OPTIONS" : "NEXT"}</span><span className="relative block h-px w-10 overflow-hidden bg-gold/50"><span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" /></span></button>}
      </div>}

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
        onVoiceModeChange={setVoiceEnabled}
      />
      </motion.aside>

      <AnimatePresence>
        {showAircraftPicker && isAviation && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAircraftPicker(false)}>
            <motion.div role="dialog" aria-modal="true" aria-label="Choose aircraft" className="w-full max-w-2xl border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-5 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)] md:p-7" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} onClick={(event) => event.stopPropagation()}>
              <div className="flex items-start justify-between gap-4 border-b border-ivory/10 pb-5"><div><div className="whisper text-champagne">AVIATION</div><h2 className="mt-2 font-serif text-3xl font-light text-ivory">Choose your aircraft</h2></div><button type="button" onClick={() => setShowAircraftPicker(false)} aria-label="Close aircraft picker" className="text-2xl text-ivory/50 hover:text-champagne">×</button></div>
              <div className="mt-5 grid grid-cols-2 gap-2">{(["flight", "helicopter"] as AircraftKind[]).map((kind) => <button key={kind} type="button" onClick={() => { setAircraftKind(kind); setSelectedAircraft(null); }} className={`border px-4 py-3 text-left font-serif text-lg ${aircraftKind === kind ? "border-champagne bg-champagne/[0.08] text-ivory" : "border-ivory/15 text-ivory/60 hover:border-ivory/40"}`}>{kind === "flight" ? "Flight" : "Helicopter"}<span className="mt-1 block whisper text-ivory/35">{kind === "flight" ? "Fixed-wing aircraft" : "Rotorcraft"}</span></button>)}</div>
              {aircraftKind && <><div className="mt-5 flex gap-2"><input autoFocus value={aircraftQuery} onChange={(event) => setAircraftQuery(event.target.value)} placeholder="Search model" aria-label="Search aircraft model" className="min-w-0 flex-1 border border-ivory/15 bg-transparent px-3 py-3 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/70" /><select value={capacityFilter} onChange={(event) => setCapacityFilter(event.target.value)} aria-label="Filter seating capacity" className="border border-ivory/15 bg-obsidian px-3 whisper text-ivory/70 outline-none"><option value="all">All seats</option><option value="1-6">1-6 seats</option><option value="7-10">7-10 seats</option><option value="11+">11+ seats</option></select></div><div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">{aircraftInventory.filter((aircraft) => aircraft.kind === aircraftKind && aircraft.model.toLowerCase().includes(aircraftQuery.toLowerCase()) && (capacityFilter === "all" || (capacityFilter === "1-6" && !!aircraft.seats && aircraft.seats <= 6) || (capacityFilter === "7-10" && !!aircraft.seats && aircraft.seats >= 7 && aircraft.seats <= 10) || (capacityFilter === "11+" && !!aircraft.seats && aircraft.seats >= 11))).slice(0, 80).map((aircraft) => <button key={aircraft.id} type="button" onClick={() => { setSelectedAircraft(aircraft); setShowAircraftPicker(false); setStep(1); }} className="flex w-full items-center justify-between gap-3 border border-ivory/10 px-3 py-3 text-left transition-colors hover:border-champagne/70 hover:bg-champagne/[0.06]"><span className="font-serif text-base text-ivory">{aircraft.model}</span><span className="whisper text-ivory/50">{aircraft.capacity}</span></button>)}</div></>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  const [aircraftKind, setAircraftKind] = useState<AircraftKind | null>(null);
  const [aircraftQuery, setAircraftQuery] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [selectedAircraft, setSelectedAircraft] = useState<InventoryAircraft | null>(null);
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
      setAircraftKind(null);
      setAircraftQuery("");
      setCapacityFilter("all");
      setSelectedAircraft(null);
    }
  }, [open, context]);

  const currentStepMeta = config.steps[currentStep];
  const canProceed = currentStepMeta.id === "aircraft" ? selectedAircraft !== null : currentStepMeta.id === "people" ? travellers !== null : currentStepMeta.id === "where" ? distance !== null : true;

  const flightResults =
    travellers && distance
      ? matchAircraft({
          travellers,
          distanceId: distance,
        })
      : [];

  const selectedAircraftCard: AircraftMatch | null = selectedAircraft
    ? { name: selectedAircraft.model, category: selectedAircraft.kind === "flight" ? "Fixed-wing aircraft" : "Rotorcraft", seats: selectedAircraft.capacity, range: "Inventory aircraft", cruise: "Concierge matched", mission: "Selected from the HELITEJET fleet inventory" }
    : null;

  const resultCards: AircraftMatch[] =
    context === "flights"
      ? selectedAircraftCard ? [selectedAircraftCard] : flightResults.slice(0, 4)
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

                        {currentStepMeta.id === "aircraft" ? (
                          <div className="flex flex-1 flex-col gap-4">
                            <div className="grid grid-cols-2 gap-2">
                              {(["flight", "helicopter"] as AircraftKind[]).map((kind) => (
                                <button key={kind} type="button" onClick={() => { setAircraftKind(kind); setSelectedAircraft(null); }} className={`border px-4 py-3 text-left font-serif text-lg transition-colors ${aircraftKind === kind ? "border-champagne bg-champagne/[0.08] text-ivory" : "border-ivory/15 text-ivory/60 hover:border-ivory/40 hover:text-ivory"}`}>
                                  {kind === "flight" ? "Flight" : "Helicopter"}
                                  <span className="mt-1 block whisper text-ivory/35">{kind === "flight" ? "Fixed-wing aircraft" : "Rotorcraft"}</span>
                                </button>
                              ))}
                            </div>
                            {aircraftKind && (
                              <div className="flex min-h-0 flex-1 flex-col border border-ivory/10 bg-ivory/[0.02] p-3">
                                <div className="flex flex-col gap-2 md:flex-row">
                                  <input value={aircraftQuery} onChange={(event) => setAircraftQuery(event.target.value)} placeholder="Search model" aria-label="Search aircraft model" className="min-w-0 flex-1 border border-ivory/15 bg-transparent px-3 py-2 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/70" />
                                  <select value={capacityFilter} onChange={(event) => setCapacityFilter(event.target.value)} aria-label="Filter seating capacity" className="border border-ivory/15 bg-obsidian px-3 py-2 whisper text-ivory/70 outline-none focus:border-champagne/70">
                                    <option value="all">All seats</option>
                                    <option value="1-6">1-6 seats</option>
                                    <option value="7-10">7-10 seats</option>
                                    <option value="11+">11+ seats</option>
                                  </select>
                                </div>
                                <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]">
                                  {aircraftInventory.filter((aircraft) => aircraft.kind === aircraftKind && aircraft.model.toLowerCase().includes(aircraftQuery.toLowerCase()) && (capacityFilter === "all" || (capacityFilter === "1-6" && !!aircraft.seats && aircraft.seats <= 6) || (capacityFilter === "7-10" && !!aircraft.seats && aircraft.seats >= 7 && aircraft.seats <= 10) || (capacityFilter === "11+" && !!aircraft.seats && aircraft.seats >= 11))).slice(0, 80).map((aircraft) => (
                                    <button key={aircraft.id} type="button" onClick={() => setSelectedAircraft(aircraft)} className={`flex w-full items-center justify-between gap-3 border px-3 py-2 text-left transition-colors ${selectedAircraft?.id === aircraft.id ? "border-champagne/80 bg-champagne/[0.08]" : "border-ivory/10 hover:border-ivory/35"}`}>
                                      <span className="font-serif text-base text-ivory">{aircraft.model}</span>
                                      <span className="whisper shrink-0 text-ivory/50">{aircraft.capacity}</span>
                                    </button>
                                  ))}
                                </div>
                                {selectedAircraft && <div className="mt-3 border-t border-ivory/10 pt-3 whisper text-champagne">SELECTED: {selectedAircraft.model}</div>}
                              </div>
                            )}
                          </div>
                        ) : (
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
                        )}
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
