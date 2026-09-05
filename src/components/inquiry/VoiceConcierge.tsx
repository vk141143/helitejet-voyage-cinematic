import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease, useCinematicMotion } from "@/components/scene/motion";
import type { AircraftCategory } from "./flightMatcher";

type VoiceState = "idle" | "listening" | "speaking";
export type Service = "AVIATION" | "MOBILITY" | "YACHTS" | "RESIDENCES" | "CONCIERGE" | "EXPERIENCES";
type Distance = "short-hop" | "regional" | "cross-country" | "long-range" | "intercontinental";

type SpeechRecognitionResultEvent = Event & { results: { [index: number]: { [index: number]: { transcript: string } } } };
type SpeechRecognitionErrorEvent = Event & { error: string };
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type Props = {
  step: number;
  stepCount: number;
  service: Service | null;
  category: AircraftCategory;
  travellers: number;
  distance: Distance;
  budget: number;
  onService: (service: Service | null) => void;
  onCategory: (category: AircraftCategory) => void;
  onTravellers: (count: number) => void;
  onStep: (step: number) => void;
  onOpenDistance: (requested?: Distance) => void;
  onShowOptions: () => void;
};

type Intent =
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "GO_TO_STEP"; target: "type" | "aircraft" | "people" | "where" | "budget" }
  | { type: "START_OVER" }
  | { type: "SELECT_SERVICE"; service: Service }
  | { type: "SELECT_AIRCRAFT"; category: AircraftCategory }
  | { type: "SET_TRAVELLERS"; count: number }
  | { type: "OPEN_DISTANCE_DROPDOWN"; requestedDistance?: Distance }
  | { type: "SET_BUDGET"; amount: number }
  | { type: "SHOW_OPTIONS" }
  | { type: "HELP" }
  | { type: "EXPLAIN" }
  | { type: "UNKNOWN" };

const services: { name: Service; aliases: string[] }[] = [
  { name: "AVIATION", aliases: ["aviation", "private jet", "private jets", "aircraft", "helicopter", "helicopters"] },
  { name: "MOBILITY", aliases: ["mobility", "car", "cars", "chauffeur", "chauffeurs"] },
  { name: "YACHTS", aliases: ["yacht", "yachts", "marine"] },
  { name: "RESIDENCES", aliases: ["residence", "residences", "villa", "villas", "hotel", "hotels", "stay", "stays"] },
  { name: "CONCIERGE", aliases: ["concierge", "assistance", "personal assistance"] },
  { name: "EXPERIENCES", aliases: ["experience", "experiences", "moments"] },
];

const aircraft: { name: AircraftCategory; aliases: string[] }[] = [
  { name: "Light Jet", aliases: ["light", "light jet"] },
  { name: "Midsize Jet", aliases: ["midsize", "mid size", "midsize jet"] },
  { name: "Super-Midsize Jet", aliases: ["super midsize", "super-midsize", "super midsize jet"] },
  { name: "Heavy / Large-Cabin Jet", aliases: ["heavy", "large cabin", "large-cabin", "heavy jet"] },
  { name: "VIP Airliner / Widebody", aliases: ["vip", "airliner", "widebody", "wide body"] },
];

const distances: { name: Distance; aliases: string[] }[] = [
  { name: "short-hop", aliases: ["short hop", "short-hop"] },
  { name: "regional", aliases: ["regional"] },
  { name: "cross-country", aliases: ["cross country", "cross-country"] },
  { name: "long-range", aliases: ["long range", "long-range"] },
  { name: "intercontinental", aliases: ["intercontinental", "inter continental"] },
];

function getRecognitionConstructor() {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ??
    (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
}

function parseCount(text: string) {
  const digits = text.match(/\b\d{1,2}\b/);
  if (digits) return Number(digits[0]);
  const words: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, fifteen: 15, twenty: 20, thirty: 30, forty: 40, fifty: 50 };
  const found = Object.entries(words).find(([word]) => text.includes(word));
  return found?.[1];
}

function parseIntent(raw: string, currentStep: number): Intent {
  const text = raw.toLowerCase().replace(/[^a-z0-9 -]/g, " ").replace(/\s+/g, " ").trim();
  if (/\b(start over|start again|reset)\b/.test(text)) return { type: "START_OVER" };
  if (/\b(show my options|show options|my options)\b/.test(text)) return { type: "SHOW_OPTIONS" };
  const namedStep = text.match(/(?:go back to|take me back to|return to|change) (?:the )?(aircraft|people|travellers|travelers|where|distance|budget|type)/);
  if (namedStep) {
    const target = namedStep[1];
    if (target === "travellers" || target === "travelers") return { type: "GO_TO_STEP", target: "people" };
    if (target === "distance") return { type: "GO_TO_STEP", target: "where" };
    return { type: "GO_TO_STEP", target: target as "type" | "aircraft" | "people" | "where" | "budget" };
  }
  if (/\b(next|go next|continue|next step)\b/.test(text)) return { type: "NEXT_STEP" };
  if (/\b(back|go back|previous|take me back|return)\b/.test(text)) return { type: "PREVIOUS_STEP" };
  if (/\b(help|what can you do)\b/.test(text)) return { type: "HELP" };
  if (/\b(explain|what is|tell me about)\b/.test(text)) return { type: "EXPLAIN" };

  const service = services.find((item) => item.aliases.some((alias) => text.includes(alias)));
  if (service) return { type: "SELECT_SERVICE", service: service.name };
  const category = aircraft.find((item) => item.aliases.some((alias) => text.includes(alias)));
  if (category) return { type: "SELECT_AIRCRAFT", category: category.name };

  const count = parseCount(text);
  if (count && (/\b(traveller|travelers|travellers|people|passengers|party|make that)\b/.test(text) || currentStep > 0)) return { type: "SET_TRAVELLERS", count: Math.min(50, Math.max(1, count)) };
  const distance = distances.find((item) => item.aliases.some((alias) => text.includes(alias)));
  if (distance) return { type: "OPEN_DISTANCE_DROPDOWN", requestedDistance: distance.name };
  const amount = text.replace(/,/g, "").match(/\b(\d{2,6})\b/);
  if (amount && /\b(budget|dollar|dollars|thousand|preferred)\b/.test(text)) return { type: "SET_BUDGET", amount: Number(amount[1]) < 1000 ? Number(amount[1]) * 1000 : Number(amount[1]) };
  return { type: "UNKNOWN" };
}

function chooseVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => /^en(-|_)/i.test(voice.lang) && /female|samantha|karen|victoria|serena|zira|ava/i.test(voice.name)) ?? voices.find((voice) => /^en(-|_)/i.test(voice.lang)) ?? voices[0];
}

export function VoiceConcierge({ step, stepCount, service, category, travellers, distance, budget, onService, onCategory, onTravellers, onStep, onOpenDistance, onShowOptions }: Props) {
  const { reduced } = useCinematicMotion();
  const [decision, setDecision] = useState<"pending" | "enabled" | "declined">("pending");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [message, setMessage] = useState("Ask Concierge");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const listenRef = useRef<() => void>(() => undefined);
  const listenAfterSpeechRef = useRef(false);

  useEffect(() => {
    setDecision((window.localStorage.getItem("helitejet-voice-choice") as "enabled" | "declined" | null) ?? "pending");
    setSupported(!!getRecognitionConstructor() && "speechSynthesis" in window);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    return () => {
      recognitionRef.current?.abort();
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const activate = () => {
      if (decision === "enabled") listenRef.current();
      else setDecision("pending");
    };
    window.addEventListener("helitejet-voice-activate", activate);
    return () => window.removeEventListener("helitejet-voice-activate", activate);
  }, [decision]);

  useEffect(() => {
    if (decision !== "enabled") return;
    const onAircraftConfirmed = (event: Event) => {
      const selected = (event as CustomEvent<{ category?: AircraftCategory }>).detail?.category;
      if (!selected || service !== "AVIATION") return;
      onCategory(selected);
      onStep(Math.min(step + 1, stepCount - 1));
      respond(`${selected}. Understood. How many travellers will be joining you?`, true);
    };
    const onDistanceConfirmed = () => {
      onStep(Math.min(step + 1, stepCount - 1));
      respond("Distance confirmed. What is your preferred budget? Please adjust the slider when ready.");
    };
    const onBudgetConfirmed = (event: Event) => {
      const amount = (event as CustomEvent<{ amount?: number }>).detail?.amount;
      if (!amount) return;
      onShowOptions();
      respond(`Your preferred budget is ${amount.toLocaleString()} dollars. I've prepared your options for concierge review.`);
    };
    window.addEventListener("helitejet-aircraft-confirmed", onAircraftConfirmed);
    window.addEventListener("helitejet-distance-confirmed", onDistanceConfirmed);
    window.addEventListener("helitejet-budget-confirmed", onBudgetConfirmed);
    return () => {
      window.removeEventListener("helitejet-aircraft-confirmed", onAircraftConfirmed);
      window.removeEventListener("helitejet-distance-confirmed", onDistanceConfirmed);
      window.removeEventListener("helitejet-budget-confirmed", onBudgetConfirmed);
    };
  }, [decision, service, step, stepCount, onShowOptions]);

  const speak = (text: string, listenAfter = false) => {
    if (!supported || !window.speechSynthesis) return;
    listenAfterSpeechRef.current = listenAfter;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = chooseVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.onstart = () => setVoiceState("speaking");
    utterance.onend = () => {
      setVoiceState("idle");
      if (listenAfterSpeechRef.current) {
        listenAfterSpeechRef.current = false;
        window.setTimeout(() => listenRef.current(), 180);
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const respond = (text: string, listenAfter = false) => {
    setMessage(text);
    speak(text, listenAfter);
  };

  const dispatch = (intent: Intent) => {
    switch (intent.type) {
      case "SELECT_SERVICE":
        onService(intent.service);
        onStep(intent.service === "AVIATION" ? 1 : 1);
        respond(intent.service === "AVIATION" ? "Certainly. Let's plan your private aviation journey. What type of aircraft would you prefer?" : `${intent.service[0]}${intent.service.slice(1).toLowerCase()}. Let's shape your request. How many travellers will be joining you?`, intent.service !== "AVIATION");
        break;
      case "SELECT_AIRCRAFT":
        onCategory(intent.category);
        onStep(Math.min(step + 1, stepCount - 1));
        respond(`${intent.category}. Understood. How many travellers will be joining you?`, true);
        break;
      case "SET_TRAVELLERS":
        onTravellers(intent.count);
        onStep(Math.min(step + 1, stepCount - 1));
        respond(`${intent.count} travellers. Understood. How far will you be travelling?`, true);
        break;
      case "OPEN_DISTANCE_DROPDOWN":
        onOpenDistance(intent.requestedDistance);
        respond(`${intent.requestedDistance ? intent.requestedDistance.replace("-", " ") : "That distance"}, please confirm it in the selector.`);
        break;
      case "SET_BUDGET":
        respond(`${intent.amount.toLocaleString()} dollars. Please adjust the preferred budget slider to confirm.`);
        break;
      case "NEXT_STEP":
        onStep(Math.min(step + 1, stepCount - 1));
        respond("Let's continue.");
        break;
      case "PREVIOUS_STEP":
        onStep(Math.max(0, step - 1));
        respond("Of course. Going back.");
        break;
      case "GO_TO_STEP": {
        const indexes = service === "AVIATION" ? { type: 0, aircraft: 1, people: 2, where: 3, budget: 4 } : { type: 0, aircraft: 0, people: 1, where: 2, budget: 3 };
        const targetStep = indexes[intent.target];
        if (intent.target === "aircraft" && service !== "AVIATION") {
          respond("Aircraft selection is available within Aviation. Please choose Aviation first.");
          break;
        }
        onStep(targetStep);
        respond(`Let's return to ${intent.target}.`);
        break;
      }
      case "START_OVER":
        onService(null);
        onStep(0);
        respond("Let's begin again. What are you looking for today?");
        break;
      case "SHOW_OPTIONS":
        if (step === stepCount - 1) {
          onShowOptions();
          respond("Your journey preferences are ready for concierge review.");
        } else {
          respond("Your journey is not quite ready. Say next to continue.");
        }
        break;
      case "HELP":
        respond("I can explain HELITEJET services and guide your journey request. Say Aviation, next, back, or how many travellers.");
        break;
      case "EXPLAIN":
        respond(category === "Light Jet" ? "Light jets suit shorter regional journeys and smaller groups." : `${category} aircraft are selected from the HELITEJET fleet guide using documented seating and range.`);
        break;
      default:
        respond("I'm here to help with HELITEJET services and your journey request.");
    }
  };

  const listen = () => {
    const Constructor = getRecognitionConstructor();
    if (!Constructor) {
      setSupported(false);
      setMessage("Voice concierge isn't available on this browser.");
      return;
    }
    const recognition = new Constructor();
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      setVoiceState("idle");
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) dispatch(parseIntent(transcript, step));
    };
    recognition.onerror = () => {
      setVoiceState("idle");
      setMessage("I didn't catch that. Please try again.");
    };
    recognition.onend = () => setVoiceState("idle");
    recognitionRef.current = recognition;
    setVoiceState("listening");
    setMessage("Listening...");
    recognition.start();
  };

  listenRef.current = listen;

  const enable = () => {
    window.localStorage.setItem("helitejet-voice-choice", "enabled");
    setDecision("enabled");
    respond("Hello. I'm your HELITEJET voice concierge. What are you looking for today: Aviation, Mobility, Yachts, Residences, Concierge, or Experiences?", true);
  };

  const decline = () => {
    window.localStorage.setItem("helitejet-voice-choice", "declined");
    setDecision("declined");
  };

  return (
    <>
      <AnimatePresence>
        {decision === "pending" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.5, ease }} className="fixed bottom-6 left-6 z-[70] w-[260px] border border-ivory/15 bg-[oklch(0.09_0.008_275/0.94)] p-4 shadow-2xl backdrop-blur-md">
            <div className="whisper text-champagne">PRIVATE CONCIERGE</div>
            <div className="mt-3 font-serif text-lg font-light text-ivory">Would you like a private voice concierge?</div>
            <p className="mt-2 font-serif text-sm italic text-ivory/55">Your HELITEJET concierge can guide you through your journey.</p>
            <div className="mt-4 flex gap-4"><button type="button" onClick={enable} className="whisper text-champagne hover:text-ivory">ENABLE VOICE</button><button type="button" onClick={decline} className="whisper text-ivory/45 hover:text-ivory">NOT NOW</button></div>
          </motion.div>
        )}
      </AnimatePresence>

      {decision !== "pending" && (
        <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[65] flex items-center gap-3 border border-ivory/15 bg-[oklch(0.09_0.008_275/0.9)] px-3 py-2 shadow-xl backdrop-blur-md">
          <button type="button" onClick={decision === "enabled" ? listen : () => setDecision("pending")} className="flex items-center gap-3 text-left outline-none"><span className={`h-2.5 w-2.5 rounded-full border border-champagne/70 ${voiceState === "listening" ? "animate-pulse bg-champagne" : voiceState === "speaking" ? "bg-champagne/60" : "bg-transparent"}`} /><span className="whisper text-[0.58rem] text-ivory/70">{supported ? (voiceState === "listening" ? "LISTENING..." : voiceState === "speaking" ? "SPEAKING..." : decision === "enabled" ? message : "VOICE CONCIERGE") : "VOICE UNAVAILABLE"}</span></button>
          {decision === "enabled" && <button type="button" onClick={() => { window.speechSynthesis.cancel(); recognitionRef.current?.abort(); setVoiceState("idle"); }} className="whisper text-ivory/35 hover:text-ivory" aria-label="Stop voice">×</button>}
        </motion.div>
      )}
    </>
  );
}
