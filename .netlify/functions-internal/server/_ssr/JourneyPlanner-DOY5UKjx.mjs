import { r as __toESM } from "../_runtime.mjs";
import { m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { c as useCinematicMotion, s as ease } from "./CinematicPage-DbieIfxY.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/JourneyPlanner-DOY5UKjx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var aircraftData = [
	{
		name: "Cessna Citation CJ3+",
		category: "Light Jet",
		seats: "6–8",
		range: "2,040 NM",
		cruise: "478 MPH",
		mission: "Regional / short domestic hops"
	},
	{
		name: "Embraer Phenom 300E",
		category: "Light Jet",
		seats: "6–10",
		range: "2,010 NM",
		cruise: "521 MPH",
		mission: "Fastest light jet; short-to-mid domestic"
	},
	{
		name: "Bombardier Learjet 75 Liberty",
		category: "Light Jet",
		seats: "6–8",
		range: "2,080 NM",
		cruise: "530 MPH",
		mission: "Quick regional business trips"
	},
	{
		name: "HondaJet Elite II",
		category: "Light Jet",
		seats: "5–6",
		range: "1,547 NM",
		cruise: "489 MPH",
		mission: "Short hops, owner-operator friendly"
	},
	{
		name: "Cessna Citation Latitude",
		category: "Midsize Jet",
		seats: "7–9",
		range: "2,700 NM",
		cruise: "514 MPH",
		mission: "Coast-to-coast domestic, flat floor cabin"
	},
	{
		name: "Hawker 900XP",
		category: "Midsize Jet",
		seats: "7–8",
		range: "2,930 NM",
		cruise: "518 MPH",
		mission: "Domestic transcon, value midsize"
	},
	{
		name: "Learjet 60XR",
		category: "Midsize Jet",
		seats: "7–8",
		range: "2,405 NM",
		cruise: "534 MPH",
		mission: "Fast midsize domestic"
	},
	{
		name: "Bombardier Challenger 350",
		category: "Super-Midsize Jet",
		seats: "8–10",
		range: "3,200 NM",
		cruise: "541 MPH",
		mission: "Transcontinental, short international"
	},
	{
		name: "Cessna Citation Longitude",
		category: "Super-Midsize Jet",
		seats: "8–12",
		range: "3,500 NM",
		cruise: "541 MPH",
		mission: "Transcon plus, quiet cabin"
	},
	{
		name: "Gulfstream G280",
		category: "Super-Midsize Jet",
		seats: "8–10",
		range: "3,600 NM",
		cruise: "559 MPH",
		mission: "Transcon, high-speed cruise"
	},
	{
		name: "Gulfstream G550",
		category: "Heavy / Large-Cabin Jet",
		seats: "14–19",
		range: "6,750 NM",
		cruise: "561 MPH",
		mission: "Nonstop intercontinental"
	},
	{
		name: "Gulfstream G650ER",
		category: "Heavy / Large-Cabin Jet",
		seats: "11–19",
		range: "7,500 NM",
		cruise: "610 MPH",
		mission: "Ultra-long-range, fastest in class"
	},
	{
		name: "Bombardier Global 6000",
		category: "Heavy / Large-Cabin Jet",
		seats: "13–17",
		range: "6,000 NM",
		cruise: "590 MPH",
		mission: "Long international routes"
	},
	{
		name: "Bombardier Global 7500",
		category: "Heavy / Large-Cabin Jet",
		seats: "14–19",
		range: "7,700 NM",
		cruise: "610 MPH",
		mission: "Ultra-long-range flagship, 4 living zones"
	},
	{
		name: "Dassault Falcon 8X",
		category: "Heavy / Large-Cabin Jet",
		seats: "12–16",
		range: "6,450 NM",
		cruise: "561 MPH",
		mission: "Long-range, short-field capability"
	},
	{
		name: "Dassault Falcon 7X",
		category: "Heavy / Large-Cabin Jet",
		seats: "12–16",
		range: "5,950 NM",
		cruise: "561 MPH",
		mission: "Long-range trijet, steep-approach capable"
	},
	{
		name: "Boeing Business Jet (BBJ)",
		category: "VIP Airliner / Widebody",
		seats: "25–50",
		range: "6,190 NM",
		cruise: "541 MPH",
		mission: "Heads of state, large delegations"
	},
	{
		name: "Airbus ACJ319/320",
		category: "VIP Airliner / Widebody",
		seats: "19–50",
		range: "6,000+ NM",
		cruise: "541 MPH",
		mission: "Corporate delegations, VVIP configuration"
	}
];
var distanceThresholds = {
	"short-hop": 130,
	regional: 520,
	"cross-country": 1300,
	"long-range": 3030,
	intercontinental: 5200
};
function parseSeatRange(seats) {
	const [min, max] = seats.split("–").map((n) => Number.parseInt(n.replace(/[^0-9]/g, ""), 10));
	return {
		min,
		max
	};
}
function parseRangeNm(range) {
	return Number.parseInt(range.replace(/[^0-9]/g, ""), 10);
}
function matchAircraft({ travellers, distanceId, category }) {
	const threshold = distanceThresholds[distanceId] ?? 130;
	const matches = aircraftData.filter((aircraft) => !category || aircraft.category === category).map((aircraft) => {
		const { min, max } = parseSeatRange(aircraft.seats);
		const rangeNm = parseRangeNm(aircraft.range);
		const seatFit = travellers <= max && travellers >= min;
		const rangeFit = rangeNm >= threshold;
		const seatScore = Math.max(0, (max - travellers) * 1.4 + 12);
		const rangeScore = Math.max(0, (rangeNm - threshold) / 120);
		return {
			aircraft,
			seatFit,
			rangeFit,
			score: seatFit ? seatScore + rangeScore : 0
		};
	}).filter((entry) => entry.seatFit && entry.rangeFit).sort((a, b) => b.score - a.score).map((entry) => entry.aircraft);
	if (matches.length >= 4) return matches.slice(0, 4);
	return aircraftData.filter((aircraft) => !category || aircraft.category === category).map((aircraft) => {
		const { min, max } = parseSeatRange(aircraft.seats);
		const rangeNm = parseRangeNm(aircraft.range);
		return {
			aircraft,
			seatFit: travellers <= max,
			rangeFit: rangeNm >= threshold * .7,
			score: Math.max(0, (travellers - min) * 2 + rangeNm / 100)
		};
	}).filter((entry) => entry.seatFit && entry.rangeFit).sort((a, b) => b.score - a.score).map((entry) => entry.aircraft).slice(0, 4);
}
var inquiryConfig = {
	flights: {
		title: "PLAN YOUR JOURNEY",
		intro: "Tell us what you're looking for.",
		resultTitle: "YOUR JOURNEY",
		resultSummary: "Based on your requirements, we've selected a collection of aircraft suited to your journey.",
		steps: [
			{
				id: "aircraft",
				label: "Aircraft",
				title: "Flight or helicopter?"
			},
			{
				id: "people",
				label: "People",
				title: "How many travellers?"
			},
			{
				id: "where",
				label: "Where",
				title: "Where are you going?"
			},
			{
				id: "budget",
				label: "Budget",
				title: "What would you like to invest in this journey?"
			}
		],
		peopleOptions: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			10,
			12,
			15,
			20
		],
		distanceOptions: [
			{
				id: "short-hop",
				label: "Short hop",
				subtitle: "Up to 150 mi",
				thresholdNm: 130,
				thresholdMiles: 150
			},
			{
				id: "regional",
				label: "Regional",
				subtitle: "Up to 600 mi",
				thresholdNm: 520,
				thresholdMiles: 600
			},
			{
				id: "cross-country",
				label: "Cross country",
				subtitle: "Up to 1,500 mi",
				thresholdNm: 1300,
				thresholdMiles: 1500
			},
			{
				id: "long-range",
				label: "Long range",
				subtitle: "Up to 3,500 mi",
				thresholdNm: 3030,
				thresholdMiles: 3500
			},
			{
				id: "intercontinental",
				label: "Intercontinental",
				subtitle: "6,000 mi and beyond",
				thresholdNm: 5200,
				thresholdMiles: 6e3
			}
		],
		cta: "SHOW MY OPTIONS",
		concierge: "SPEAK TO A CONCIERGE"
	},
	yachts: {
		title: "PLAN YOUR ESCAPE",
		intro: "Tell us what kind of passage you have in mind.",
		resultTitle: "YOUR ESCAPE",
		resultSummary: "These charter profiles may suit the rhythm, guest count and style of your voyage.",
		steps: [
			{
				id: "people",
				label: "People",
				title: "How many guests?"
			},
			{
				id: "where",
				label: "Where",
				title: "What kind of escape?"
			},
			{
				id: "budget",
				label: "Budget",
				title: "What would you like to invest in this voyage?"
			}
		],
		peopleOptions: [
			2,
			4,
			6,
			8,
			10,
			12,
			16
		],
		distanceOptions: [
			{
				id: "weekender",
				label: "Weekender",
				subtitle: "Harbour to harbour",
				thresholdNm: 180,
				thresholdMiles: 200
			},
			{
				id: "coastal",
				label: "Coastal",
				subtitle: "Mediterranean rhythm",
				thresholdNm: 900,
				thresholdMiles: 1e3
			},
			{
				id: "explorer",
				label: "Explorer",
				subtitle: "Cross-border passage",
				thresholdNm: 1800,
				thresholdMiles: 2e3
			},
			{
				id: "grand-voyage",
				label: "Grand voyage",
				subtitle: "Longer horizon",
				thresholdNm: 3600,
				thresholdMiles: 4e3
			}
		],
		cta: "SHOW MY OPTIONS",
		concierge: "SPEAK TO A CONCIERGE"
	},
	residences: {
		title: "FIND YOUR RESIDENCE",
		intro: "Tell us how the stay should feel.",
		resultTitle: "YOUR RESIDENCE",
		resultSummary: "These residence profiles align with the scale, mood and pace of the stay you describe.",
		steps: [
			{
				id: "people",
				label: "People",
				title: "How many guests?"
			},
			{
				id: "where",
				label: "Where",
				title: "What kind of setting?"
			},
			{
				id: "budget",
				label: "Budget",
				title: "What would you like to invest in this stay?"
			}
		],
		peopleOptions: [
			2,
			4,
			6,
			8,
			10,
			12,
			16
		],
		distanceOptions: [
			{
				id: "coastal",
				label: "Coastal",
				subtitle: "Sea and light",
				thresholdNm: 250,
				thresholdMiles: 300
			},
			{
				id: "city",
				label: "City",
				subtitle: "Cultural access",
				thresholdNm: 350,
				thresholdMiles: 400
			},
			{
				id: "alpine",
				label: "Alpine",
				subtitle: "Winter calm",
				thresholdNm: 700,
				thresholdMiles: 800
			},
			{
				id: "estate",
				label: "Estate",
				subtitle: "Private grounds",
				thresholdNm: 1200,
				thresholdMiles: 1300
			}
		],
		cta: "SHOW MY OPTIONS",
		concierge: "SPEAK TO A CONCIERGE"
	}
};
function InquiryProgress({ steps, currentStep, onSelect }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-between gap-2 md:gap-4",
		children: steps.map((step, index) => {
			const active = index === currentStep;
			const complete = index < currentStep;
			const disabled = index > currentStep;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(index),
				disabled,
				"aria-label": `Go to ${step.label}`,
				"aria-current": active ? "step" : void 0,
				className: `group flex min-w-0 flex-1 items-center gap-2 border-0 bg-transparent p-0 text-left outline-none ${disabled ? "cursor-default opacity-40" : "cursor-pointer"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mb-2 block h-px w-full transition-colors ${active || complete ? "bg-champagne/80" : "bg-ivory/20"}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `whisper block text-[0.58rem] tracking-[0.22em] ${active ? "text-champagne" : complete ? "text-ivory/80" : "text-ivory/35"}`,
						children: String(index + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `hidden text-[0.58rem] tracking-[0.22em] md:block ${active ? "text-champagne" : complete ? "text-ivory/80" : "text-ivory/35"}`,
						children: step.label.toUpperCase()
					}),
					active && !reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						layoutId: "inquiry-progress-indicator",
						className: "absolute inset-x-0 bottom-0 h-px bg-champagne",
						"aria-hidden": "true"
					})
				]
			}, step.id);
		})
	});
}
function PeopleOption({ value, selected, onSelect }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(value),
		"aria-pressed": selected,
		className: `relative inline-flex h-14 items-center justify-center border px-4 py-3 text-lg font-light transition-all duration-500 outline-none focus-visible:border-champagne focus-visible:text-ivory ${selected ? "border-champagne/80 bg-champagne/5 text-ivory shadow-[0_0_0_1px_rgba(223,198,142,0.45)]" : "border-ivory/10 bg-transparent text-ivory/60 hover:border-ivory/30 hover:text-ivory"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-[1.55rem] leading-none",
			children: value
		}), !reduced && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			layoutId: "people-select-glow",
			className: "absolute inset-0 border border-champagne/70",
			transition: { duration: .3 }
		})]
	});
}
function InquiryStep({ step, context, travellers, selectedDistance, budget, onTravellersChange, onDistanceChange, onBudgetChange, peopleOptions, distanceOptions }) {
	const { reduced } = useCinematicMotion();
	if (step.id === "people") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: reduced ? false : {
			opacity: 0,
			x: 14,
			filter: "blur(10px)"
		},
		animate: {
			opacity: 1,
			x: 0,
			filter: "blur(0px)"
		},
		exit: reduced ? { opacity: 0 } : {
			opacity: 0,
			x: -20,
			filter: "blur(8px)"
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "space-y-9",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-3 md:grid-cols-6",
			children: peopleOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleOption, {
				value: option,
				selected: travellers === option,
				onSelect: onTravellersChange
			}, option))
		})
	});
	if (step.id === "where") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: reduced ? false : {
			opacity: 0,
			x: 18,
			filter: "blur(10px)"
		},
		animate: {
			opacity: 1,
			x: 0,
			filter: "blur(0px)"
		},
		exit: reduced ? { opacity: 0 } : {
			opacity: 0,
			x: -18,
			filter: "blur(8px)"
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "space-y-3",
		children: distanceOptions.map((option) => {
			const active = selectedDistance === option.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": active,
				onClick: () => onDistanceChange(option.id),
				className: `group w-full border p-5 text-left transition-all duration-500 outline-none focus-visible:border-champagne ${active ? "border-champagne/80 bg-[oklch(0.18_0.012_80/0.38)]" : "border-ivory/10 bg-transparent hover:border-ivory/20 hover:bg-white/[0.01]"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-serif text-2xl font-light text-ivory md:text-3xl",
						children: option.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 whisper text-ivory/45",
						children: option.subtitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `relative flex h-4 w-4 items-center justify-center rounded-full border ${active ? "border-champagne bg-champagne/10" : "border-ivory/30"}`,
						children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-champagne" })
					})]
				})
			}, option.id);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: reduced ? false : {
			opacity: 0,
			x: 18,
			filter: "blur(10px)"
		},
		animate: {
			opacity: 1,
			x: 0,
			filter: "blur(0px)"
		},
		exit: reduced ? { opacity: 0 } : {
			opacity: 0,
			x: -18,
			filter: "blur(8px)"
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4 border-b border-ivory/10 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-serif text-5xl font-light leading-none text-ivory md:text-7xl",
					children: ["$", budget.toLocaleString()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "whisper text-ivory/40",
					children: "Budget preference"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Budget preference",
					type: "range",
					min: 2e3,
					max: 25e4,
					step: 500,
					value: budget,
					onChange: (event) => onBudgetChange(Number(event.target.value)),
					className: "h-1 w-full cursor-pointer appearance-none bg-[linear-gradient(90deg,oklch(0.72_0.1_80)_0%,oklch(0.72_0.1_80)_var(--progress),oklch(0.94_0.014_85/0.18)_var(--progress),oklch(0.94_0.014_85/0.18)_100%)] accent-champagne",
					style: { ["--progress"]: `${(budget - 2e3) / 248e3 * 100}%` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between whisper text-ivory/45",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$2,000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$250,000" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-none border border-ivory/10 bg-[oklch(0.15_0.008_275/0.55)] p-4 text-sm leading-relaxed text-ivory/60",
				children: context === "flights" ? "This is an inquiry preference only. Actual charter pricing is not included in the supplied fleet guide." : "This budget helps us shape a shortlist without suggesting fixed charter pricing."
			})
		]
	});
}
var STORAGE_KEY = "hj_home_draft";
function saveDraft(d) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
	} catch {}
}
function EmbeddedJourneyCard() {
	const { reduced } = useCinematicMotion();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [service, setService] = (0, import_react.useState)(null);
	const [travellers, setTravellers] = (0, import_react.useState)(2);
	const [budget, setBudget] = (0, import_react.useState)(3e4);
	const [currency, setCurrency] = (0, import_react.useState)("EUR");
	const [showAuth, setShowAuth] = (0, import_react.useState)(false);
	const [authMode, setAuthMode] = (0, import_react.useState)("choose");
	const [authEmail, setAuthEmail] = (0, import_react.useState)("");
	const [authPassword, setAuthPassword] = (0, import_react.useState)("");
	const [authConfirm, setAuthConfirm] = (0, import_react.useState)("");
	const [authError, setAuthError] = (0, import_react.useState)("");
	const [authPending, setAuthPending] = (0, import_react.useState)(false);
	const [showBooking, setShowBooking] = (0, import_react.useState)(false);
	const [bName, setBName] = (0, import_react.useState)("");
	const [bMobile, setBMobile] = (0, import_react.useState)("");
	const [bEmail, setBEmail] = (0, import_react.useState)("");
	const [bFiles, setBFiles] = (0, import_react.useState)([]);
	const [bError, setBError] = (0, import_react.useState)("");
	const [bPending, setBPending] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [entitlement, setEntitlement] = (0, import_react.useState)(null);
	const [entitlementLoading, setEntitlementLoading] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!entitlement?.customer_id) return;
		const channel = supabase.channel(`customer-entitlement-${entitlement.customer_id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "customer_entitlements",
			filter: `customer_id=eq.${entitlement.customer_id}`
		}, (payload) => {
			if (payload.new) setEntitlement(payload.new);
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [entitlement?.customer_id]);
	const [aviationKind, setAviationKind] = (0, import_react.useState)(null);
	const [dbAircraft, setDbAircraft] = (0, import_react.useState)([]);
	const [acSearch, setAcSearch] = (0, import_react.useState)("");
	const [acSelected, setAcSelected] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (aviationKind) supabase.from("aircraft").select("id,kind,model,capacity").eq("kind", aviationKind).order("model").then(({ data }) => setDbAircraft(data ?? []));
	}, [aviationKind]);
	const serviceOptions = [
		"AVIATION",
		"MOBILITY",
		"YACHTS",
		"RESIDENCES",
		"CONCIERGE",
		"EXPERIENCES"
	];
	const serviceDesc = {
		AVIATION: "Private Jets & Helicopters",
		MOBILITY: "Luxury Cars & Chauffeurs",
		YACHTS: "Yacht Charter & Marine Experiences",
		RESIDENCES: "Villas, Hotels & Private Stays",
		CONCIERGE: "Personal Assistance",
		EXPERIENCES: "Curated Moments & Lasting Memories"
	};
	const stepLabels = service === "AVIATION" ? [
		"TYPE",
		"AIRCRAFT",
		"PEOPLE",
		"BUDGET"
	] : [
		"TYPE",
		"PEOPLE",
		"BUDGET"
	];
	const ct = reduced ? { duration: 0 } : {
		duration: .55,
		ease
	};
	const next = () => {
		if (step === 0 && !service) return;
		if (step === 1 && service === "AVIATION" && !aviationKind) return;
		if (step < stepLabels.length - 1) {
			setStep((v) => v + 1);
			return;
		}
		saveDraft({
			service,
			travellers,
			budget,
			currency
		});
		setShowAuth(true);
	};
	const back = () => {
		if (step === 0) return;
		if (step === 1 && service === "AVIATION") {
			setAviationKind(null);
			setAcSelected(null);
			setAcSearch("");
		}
		setStep((v) => Math.max(0, v - 1));
	};
	async function handleAuth(e) {
		e.preventDefault();
		setAuthError("");
		setAuthPending(true);
		try {
			if (authMode === "login") {
				const { error } = await supabase.auth.signInWithPassword({
					email: authEmail,
					password: authPassword
				});
				if (error) throw new Error("Invalid email or password.");
			} else {
				if (authPassword !== authConfirm) throw new Error("Passwords do not match.");
				if (authPassword.length < 8) throw new Error("Password must be at least 8 characters.");
				const { data, error } = await supabase.auth.signUp({
					email: authEmail,
					password: authPassword
				});
				if (error) throw new Error(error.message);
				if (!data.session) throw new Error("Please confirm your email then return here.");
			}
			const { data: authUser } = await supabase.auth.getUser();
			if (!authUser.user) throw new Error("Session expired. Please sign in again.");
			setEntitlementLoading(true);
			const { data: entitlementRow, error: entitlementError } = await supabase.from("customer_entitlements").select("*").eq("customer_id", authUser.user.id).maybeSingle();
			if (entitlementError) throw entitlementError;
			setEntitlement(entitlementRow ?? null);
			setEntitlementLoading(false);
			setBEmail(authEmail);
			setShowAuth(false);
			setShowBooking(true);
		} catch (err) {
			setAuthError(err instanceof Error ? err.message : "Authentication failed.");
			setEntitlementLoading(false);
		} finally {
			setAuthPending(false);
		}
	}
	async function handleBookingSubmit(e) {
		e.preventDefault();
		setBError("");
		if (!bName.trim()) return setBError("Enter your full name.");
		if (!bMobile.trim()) return setBError("Enter your mobile number.");
		if (!bEmail.trim()) return setBError("Enter your email.");
		setBPending(true);
		try {
			const { data: auth } = await supabase.auth.getUser();
			if (!auth.user) throw new Error("Session expired. Please sign in again.");
			let docPath = null;
			if (bFiles[0]) {
				const ext = bFiles[0].name.split(".").pop();
				const path = `identity/${auth.user.id}/${Date.now()}.${ext}`;
				const { error: upErr } = await supabase.storage.from("request-documents").upload(path, bFiles[0]);
				if (upErr) throw new Error("Upload failed: " + upErr.message);
				docPath = path;
			}
			const { data: num, error: numErr } = await supabase.rpc("next_request_number");
			if (numErr) throw numErr;
			const { error: insErr } = await supabase.from("requests").insert({
				request_number: num,
				customer_id: auth.user.id,
				service_type: service ?? "GENERAL",
				status: "SUBMITTED",
				request_mode: entitlement?.subscription_status === "ACTIVE" ? "BOOKING" : "ENQUIRY",
				entitlement_snapshot: entitlement ? {
					subscription_status: entitlement.subscription_status,
					subscription_plan: entitlement.subscription_plan,
					credits_remaining: entitlement.credits_remaining
				} : {},
				people_count: travellers,
				budget,
				currency,
				customer_details: {
					name: bName,
					email: bEmail,
					mobile: bMobile,
					identity_doc: docPath
				},
				service_details: {
					source: "home_planner",
					aircraft_model: dbAircraft.find((aircraft) => aircraft.id === acSelected)?.model ?? null,
					aircraft_kind: aviationKind,
					travellers
				}
			});
			if (insErr) throw insErr;
			if (entitlement?.subscription_status !== "ACTIVE" && entitlement?.credits_remaining) {
				await supabase.rpc("consume_customer_credit");
				setEntitlement((current) => current ? {
					...current,
					credits_remaining: Math.max(0, current.credits_remaining - 1)
				} : current);
			}
			localStorage.removeItem(STORAGE_KEY);
			setSubmitted(true);
		} catch (err) {
			setBError(err instanceof Error ? err.message : "Submission failed.");
		} finally {
			setBPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
			role: "region",
			"aria-label": "HELITEJET journey planner",
			initial: reduced ? false : {
				opacity: 0,
				y: 18
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .9,
				ease
			},
			className: "flex h-[480px] w-full flex-col border border-ivory/15 bg-[oklch(0.09_0.008_275/0.84)] p-5 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)] backdrop-blur-md md:h-[500px] md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid gap-2 border-b border-ivory/10 pb-4 ${stepLabels.length === 4 ? "grid-cols-4" : "grid-cols-3"}`,
					children: stepLabels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: i > step,
						onClick: () => setStep(i),
						className: `text-left whisper text-[0.52rem] tracking-[0.12em] transition-colors ${i === step ? "text-champagne" : i < step ? "text-ivory/70" : "text-ivory/30"}`,
						children: [
							String(i + 1).padStart(2, "0"),
							" ",
							label
						]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-ivory/10 py-3 text-center text-[0.6rem] tracking-[0.12em] text-ivory/40",
					children: "SUBSCRIPTION = BOOK FLIGHTS · CREDITS = SEND ENQUIRY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex min-h-0 flex-1 flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						initial: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: reduced ? false : {
								opacity: 0,
								x: 18,
								filter: "blur(8px)"
							},
							animate: {
								opacity: 1,
								x: 0,
								filter: "blur(0px)"
							},
							exit: reduced ? { opacity: 0 } : {
								opacity: 0,
								x: -18,
								filter: "blur(8px)"
							},
							transition: ct,
							className: "flex flex-1 flex-col pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-center font-serif text-xl font-light text-ivory/80",
								children: step === 0 ? "What are you looking for?" : step === 1 && service === "AVIATION" ? "Flight or Helicopter?" : step === stepLabels.length - 1 ? "Preferred budget" : "How many travellers?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-1 flex-col justify-start",
								children: [
									step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: serviceOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setService(opt);
												setAviationKind(null);
											},
											"aria-pressed": service === opt,
											className: `border px-3 py-3 text-left font-serif text-sm transition-colors ${service === opt ? "border-champagne/80 bg-champagne/[0.08] text-ivory" : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block",
												children: opt
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-[0.62rem] text-ivory/35",
												children: serviceDesc[opt]
											})]
										}, opt))
									}),
									step === 1 && service === "AVIATION" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-1 flex-col gap-3",
										children: !aviationKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-3 pt-2",
											children: ["flight", "helicopter"].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setAviationKind(kind);
													setAcSelected(null);
													setAcSearch("");
												},
												className: "border border-ivory/10 px-4 py-6 text-left font-serif transition-colors hover:border-ivory/30 hover:text-ivory text-ivory/55",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-lg",
													children: kind === "flight" ? "Flight" : "Helicopter"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mt-2 block text-[0.62rem] text-ivory/35",
													children: kind === "flight" ? "Fixed-wing private aircraft" : "Rotorcraft & charter"
												})]
											}, kind))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-1 flex-col gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "whisper text-[0.6rem] border border-champagne/40 text-champagne px-2 py-0.5",
														children: aviationKind === "flight" ? "FLIGHT" : "HELICOPTER"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															setAviationKind(null);
															setAcSelected(null);
														},
														className: "whisper text-[0.6rem] text-ivory/30 hover:text-champagne",
														children: "CHANGE"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: acSearch,
													onChange: (e) => setAcSearch(e.target.value),
													placeholder: "Search model…",
													className: "border border-ivory/15 bg-transparent px-3 py-1.5 text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 overflow-y-auto space-y-1 max-h-40 [scrollbar-width:thin] [scrollbar-color:var(--color-gold)_transparent]",
													children: [dbAircraft.filter((a) => !acSearch || a.model.toLowerCase().includes(acSearch.toLowerCase())).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => setAcSelected(a.id),
														className: `flex w-full items-center justify-between gap-3 border px-3 py-2 text-left transition-colors ${acSelected === a.id ? "border-champagne/80 bg-champagne/[0.08]" : "border-ivory/10 hover:border-ivory/30"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-serif text-sm text-ivory",
															children: a.model
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "whisper text-[0.6rem] text-ivory/50",
															children: a.capacity
														})]
													}, a.id)), dbAircraft.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "py-4 text-center text-xs text-ivory/30 italic",
														children: [
															"No ",
															aviationKind,
															"s in fleet yet."
														]
													})]
												}),
												acSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "whisper text-[0.6rem] text-champagne border-t border-ivory/10 pt-2",
													children: ["SELECTED: ", dbAircraft.find((a) => a.id === acSelected)?.model]
												})
											]
										})
									}),
									(step === 1 && service !== "AVIATION" || step === 2 && service === "AVIATION") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-8 pt-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setTravellers((v) => Math.max(1, v - 1)),
												className: "flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne",
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif text-5xl font-light text-ivory",
												children: travellers
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setTravellers((v) => Math.min(50, v + 1)),
												className: "flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne",
												children: "+"
											})
										]
									}),
									(step === 2 && service !== "AVIATION" || step === 3 && service === "AVIATION") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-center font-serif text-4xl font-light text-ivory",
												children: ["$", budget.toLocaleString()]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "range",
												min: "10000",
												max: "150000",
												step: "5000",
												value: budget,
												onChange: (e) => setBudget(Number(e.target.value)),
												className: "mt-10 h-1 w-full cursor-pointer appearance-none accent-champagne",
												style: { background: `linear-gradient(90deg,oklch(0.72 0.1 80) ${(budget - 1e4) / 14e4 * 100}%,oklch(0.94 0.014 85/0.18) ${(budget - 1e4) / 14e4 * 100}%)` }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex justify-between whisper text-ivory/35",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$10,000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$150,000" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 flex justify-center gap-2",
												children: [
													"EUR",
													"USD",
													"GBP",
													"AED"
												].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCurrency(c),
													className: `border px-3 py-1 whisper text-[0.55rem] transition-colors ${currency === c ? "border-champagne text-champagne" : "border-ivory/20 text-ivory/40 hover:border-ivory/50"}`,
													children: c
												}, c))
											})
										]
									})
								]
							})]
						}, step)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-ivory/10 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: back,
						disabled: step === 0,
						className: "whisper text-ivory/55 transition-colors hover:text-champagne disabled:invisible",
						children: "← BACK"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: next,
						disabled: step === 0 && !service || step === 1 && service === "AVIATION" && (!aviationKind || !acSelected),
						className: "group inline-flex items-center gap-3 whisper text-champagne transition-colors hover:text-ivory disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step === stepLabels.length - 1 ? "LOGIN TO CONTINUE" : "NEXT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative block h-px w-10 overflow-hidden bg-gold/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setShowAuth(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "w-full max-w-md border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: 10
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between border-b border-ivory/10 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "PRIVATE PORTAL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl font-light text-ivory",
							children: authMode === "choose" ? "Continue your enquiry" : authMode === "login" ? "Sign in" : "Create account"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAuth(false),
							className: "text-2xl text-ivory/50 hover:text-champagne",
							children: "×"
						})]
					}),
					authMode === "choose" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ivory/60",
								children: "Your selections have been saved. Sign in or create an account to continue."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAuthMode("login"),
								className: "w-full border border-champagne/40 py-3 whisper text-champagne transition-colors hover:bg-champagne/10",
								children: "SIGN IN →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAuthMode("register"),
								className: "w-full border border-ivory/20 py-3 whisper text-ivory/60 transition-colors hover:border-ivory/50 hover:text-ivory",
								children: "CREATE ACCOUNT →"
							})
						]
					}),
					(authMode === "login" || authMode === "register") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAuth,
						className: "mt-6 space-y-4",
						children: [
							authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border border-red-300/30 p-3 text-sm text-red-200",
								children: authError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-ivory/50",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "email",
									required: true,
									value: authEmail,
									onChange: (e) => setAuthEmail(e.target.value),
									autoFocus: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-ivory/50",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "password",
									required: true,
									value: authPassword,
									onChange: (e) => setAuthPassword(e.target.value)
								})]
							}),
							authMode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-ivory/50",
									children: "Confirm password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "password",
									required: true,
									value: authConfirm,
									onChange: (e) => setAuthConfirm(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAuthMode("choose"),
									className: "whisper text-ivory/40 hover:text-champagne",
									children: "← BACK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: authPending,
									className: "whisper text-champagne hover:text-ivory disabled:opacity-50",
									children: authPending ? "PLEASE WAIT…" : authMode === "login" ? "SIGN IN →" : "CREATE & CONTINUE →"
								})]
							})
						]
					})
				]
			})
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "w-full max-w-lg border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: 10
				},
				children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "REQUEST RECEIVED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-4xl font-light text-ivory",
							children: "We will be in touch."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ivory/60",
							children: "Our concierge team will review your requirements and reach out within the hour."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void navigate({
								to: "/customer/dashboard",
								replace: true
							}),
							className: "mt-4 whisper text-champagne hover:text-ivory",
							children: "VIEW MY PORTAL →"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between border-b border-ivory/10 pb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "BOOKING DETAILS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl font-light text-ivory",
							children: "Complete your request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-ivory/40",
							children: [
								service,
								" · ",
								travellers,
								" people · ",
								currency,
								" ",
								budget.toLocaleString()
							]
						})
					] })
				}), entitlementLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-ivory/60",
					children: "Checking your subscription and credits..."
				}) : !entitlement || entitlement.subscription_status !== "ACTIVE" && entitlement.credits_remaining <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4 border border-champagne/25 bg-champagne/[0.04] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "ONE STEP BEFORE CONTINUING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-xl text-ivory",
							children: "Choose a subscription to book flights, or credits to send an enquiry."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ivory/55",
							children: "Your live account entitlement will appear here as soon as it is activated."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/subscriptions#plans",
								className: "border border-champagne/50 px-4 py-2 whisper text-champagne",
								children: "VIEW SUBSCRIPTIONS →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/subscriptions#credits",
								className: "border border-ivory/20 px-4 py-2 whisper text-ivory/60",
								children: "VIEW CREDIT OPTIONS →"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleBookingSubmit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border border-champagne/20 bg-champagne/[0.04] p-3 text-sm text-ivory/65",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-champagne",
								children: entitlement.subscription_status === "ACTIVE" ? "SUBSCRIPTION ACTIVE · BOOKING ENABLED" : `CREDITS AVAILABLE · ${entitlement.credits_remaining} REMAINING · ENQUIRY MODE`
							})
						}),
						bError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border border-red-300/30 p-3 text-sm text-red-200",
							children: bError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: bName,
								onChange: (e) => setBName(e.target.value),
								placeholder: "Your full name",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Mobile number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "tel",
								value: bMobile,
								onChange: (e) => setBMobile(e.target.value),
								placeholder: "+44 7700 000000",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "email",
								value: bEmail,
								onChange: (e) => setBEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whisper text-ivory/50",
									children: ["Identity document ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ivory/30",
										children: "(optional)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => fileRef.current?.click(),
										className: "border border-ivory/20 px-4 py-2 whisper text-ivory/60 transition-colors hover:border-champagne hover:text-champagne",
										children: bFiles[0] ? bFiles[0].name : "UPLOAD DOC / IMAGE"
									}), bFiles[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setBFiles([]),
										className: "text-ivory/30 hover:text-red-300",
										children: "×"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: ".jpg,.jpeg,.png,.pdf",
									className: "hidden",
									onChange: (e) => setBFiles(Array.from(e.target.files ?? []).slice(0, 1))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-ivory/30",
									children: "JPG, PNG or PDF · max 10 MB"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-ivory/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowBooking(false);
									setShowAuth(true);
									setAuthMode("choose");
								},
								className: "whisper text-ivory/40 hover:text-champagne",
								children: "← BACK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: bPending,
								className: "whisper text-champagne hover:text-ivory disabled:opacity-50",
								children: bPending ? "SUBMITTING…" : entitlement.subscription_status === "ACTIVE" ? "SUBMIT BOOKING →" : "SEND ENQUIRY →"
							})]
						})
					]
				})] })
			})
		}) })
	] });
}
function JourneyPlanner({ context, open = true, onClose, embedded = false }) {
	const { reduced } = useCinematicMotion();
	const config = inquiryConfig[context];
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const [travellers, setTravellers] = (0, import_react.useState)(context === "flights" ? 4 : 6);
	const [distance, setDistance] = (0, import_react.useState)(context === "flights" ? "regional" : "coastal");
	const [budget, setBudget] = (0, import_react.useState)(25e3);
	const [aircraftKind, setAircraftKind] = (0, import_react.useState)(null);
	const [aircraftQuery, setAircraftQuery] = (0, import_react.useState)("");
	const [capacityFilter, setCapacityFilter] = (0, import_react.useState)("all");
	const [selectedAircraft, setSelectedAircraft] = (0, import_react.useState)(null);
	const [showResults, setShowResults] = (0, import_react.useState)(false);
	const panelRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const canClose = !embedded && !!onClose;
	(0, import_react.useEffect)(() => {
		if (!open || embedded) return;
		const prevOverflow = document.body.style.overflow;
		const prevPadding = document.body.style.paddingRight;
		const w = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = "hidden";
		if (w > 0) document.body.style.paddingRight = `${w}px`;
		return () => {
			document.body.style.overflow = prevOverflow;
			document.body.style.paddingRight = prevPadding;
		};
	}, [open, embedded]);
	(0, import_react.useEffect)(() => {
		if (!open || embedded) return;
		closeRef.current?.focus({ preventScroll: true });
		const sel = "button,[href],input,select,textarea,[tabindex]:not([tabindex=\"-1\"])";
		const onKeyDown = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose?.();
				return;
			}
			if (e.key !== "Tab" || !panelRef.current) return;
			const els = Array.from(panelRef.current.querySelectorAll(sel)).filter((el) => !el.hasAttribute("disabled"));
			if (!els.length) {
				e.preventDefault();
				return;
			}
			const first = els[0];
			const last = els[els.length - 1];
			const cur = document.activeElement;
			if (e.shiftKey && (cur === first || !panelRef.current.contains(cur))) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && (cur === last || !panelRef.current.contains(cur))) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [
		open,
		onClose,
		embedded
	]);
	(0, import_react.useEffect)(() => {
		if (!open && !embedded) {
			setCurrentStep(0);
			setShowResults(false);
			setTravellers(context === "flights" ? 4 : 6);
			setDistance(context === "flights" ? "regional" : "coastal");
			setBudget(25e3);
			setAircraftKind(null);
			setAircraftQuery("");
			setCapacityFilter("all");
			setSelectedAircraft(null);
		}
	}, [open, context]);
	const currentStepMeta = config.steps[currentStep];
	const canProceed = currentStepMeta.id === "aircraft" ? selectedAircraft !== null : currentStepMeta.id === "people" ? travellers !== null : currentStepMeta.id === "where" ? distance !== null : true;
	const flightResults = travellers && distance ? matchAircraft({
		travellers,
		distanceId: distance
	}) : [];
	const selectedAircraftCard = selectedAircraft ? {
		name: selectedAircraft.model,
		category: selectedAircraft.kind === "flight" ? "Fixed-wing aircraft" : "Rotorcraft",
		seats: selectedAircraft.capacity,
		range: "Inventory aircraft",
		cruise: "Concierge matched",
		mission: "Selected from the HELITEJET fleet inventory"
	} : null;
	const resultCards = context === "flights" ? selectedAircraftCard ? [selectedAircraftCard] : flightResults.slice(0, 4) : [
		{
			name: "Harbour Collection",
			category: context === "yachts" ? "Explorer Yacht" : "Seaside Residence",
			seats: `${travellers ?? 4} guests`,
			range: distance ? config.distanceOptions.find((o) => o.id === distance)?.label ?? "Curated route" : "Curated route",
			cruise: "Private briefing",
			mission: context === "yachts" ? "Harbour-to-harbour charter with crew and tender" : "A stay designed for calm, privacy and daily rhythm"
		},
		{
			name: "Private Wing",
			category: context === "yachts" ? "Classic Yacht" : "City Residence",
			seats: `${travellers ?? 4} guests`,
			range: "Flex itinerary",
			cruise: "Concierge planning",
			mission: context === "yachts" ? "Elegant coastal passages and in-port access" : "A residence in the centre of your preferred rhythm"
		},
		{
			name: "Club Horizon",
			category: context === "yachts" ? "Sailing Yacht" : "Alpine Residence",
			seats: `${travellers ?? 4} guests`,
			range: "Seasonal stay",
			cruise: "House team",
			mission: context === "yachts" ? "Slow, weather-led passages and private shore days" : "Elevation, privacy, and daily rituals shaped around the landscape"
		}
	];
	const handleAdvance = () => {
		if (!canProceed) return;
		if (currentStep < config.steps.length - 1) {
			setCurrentStep((s) => Math.min(s + 1, config.steps.length - 1));
			return;
		}
		setShowResults(true);
	};
	const handleBack = () => {
		if (showResults) {
			setShowResults(false);
			return;
		}
		if (currentStep > 0) setCurrentStep((s) => Math.max(s - 1, 0));
	};
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmbeddedJourneyCard, {});
	if (!open && !embedded) return null;
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: reduced ? { opacity: 0 } : { opacity: 0 },
		animate: { opacity: 1 },
		exit: reduced ? { opacity: 0 } : { opacity: 0 },
		transition: {
			duration: .7,
			ease
		},
		className: "fixed inset-0 z-[80] bg-[oklch(0.07_0.006_275/0.86)] backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
			ref: panelRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Travel planning inquiry",
			initial: reduced ? false : {
				x: 80,
				opacity: 0
			},
			animate: {
				x: 0,
				opacity: 1
			},
			exit: reduced ? { opacity: 0 } : {
				x: 80,
				opacity: 0
			},
			transition: {
				duration: .8,
				ease
			},
			className: "absolute inset-y-0 right-0 z-10 flex w-full max-w-[820px] flex-col border-l border-ivory/10 bg-[oklch(0.11_0.008_275)] shadow-[0_0_180px_-80px_rgba(0,0,0,0.9)] md:w-[54vw]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: scenes[context === "flights" ? "aviation" : context === "yachts" ? "yachts" : "residences"],
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,oklch(0.11_0.008_275/0.92),oklch(0.11_0.008_275/0.86)_40%,oklch(0.11_0.008_275/0.92))]" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-full flex-col px-5 pb-6 pt-6 md:px-9 md:pb-10 md:pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 border-b border-ivory/10 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-2xl font-light tracking-[0.18em] text-ivory",
							children: brand.mark
						}), canClose && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							ref: closeRef,
							type: "button",
							onClick: onClose,
							className: "whisper flex items-center gap-3 text-ivory/70 outline-none transition-colors hover:text-champagne focus-visible:text-champagne",
							"aria-label": "Close inquiry",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Close" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-3 w-3 border border-current",
								"aria-hidden": "true"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-8 md:pt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 md:mb-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryProgress, {
								steps: config.steps,
								currentStep: showResults ? config.steps.length - 1 : currentStep,
								onSelect: (i) => {
									if (!showResults) setCurrentStep(Math.min(i, config.steps.length - 1));
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-h-[420px] flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: !showResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: reduced ? false : {
										opacity: 0,
										x: 18,
										filter: "blur(12px)"
									},
									animate: {
										opacity: 1,
										x: 0,
										filter: "blur(0px)"
									},
									exit: reduced ? { opacity: 0 } : {
										opacity: 0,
										x: -18,
										filter: "blur(8px)"
									},
									transition: {
										duration: .65,
										ease
									},
									className: "flex flex-1 flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-8 flex items-center justify-between text-ivory/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "whisper text-champagne/80",
												children: String(currentStep + 1).padStart(2, "0")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "whisper",
												children: String(config.steps.length).padStart(2, "0")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "whisper text-champagne/80",
												children: currentStepMeta.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-4 max-w-md font-serif text-4xl font-light leading-tight text-ivory md:text-[3.3rem]",
												children: currentStepMeta.title
											})]
										}),
										currentStepMeta.id === "aircraft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-1 flex-col gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 gap-2",
												children: ["flight", "helicopter"].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														setAircraftKind(kind);
														setSelectedAircraft(null);
													},
													className: `border px-4 py-3 text-left font-serif text-lg transition-colors ${aircraftKind === kind ? "border-champagne bg-champagne/[0.08] text-ivory" : "border-ivory/15 text-ivory/60 hover:border-ivory/40 hover:text-ivory"}`,
													children: [kind === "flight" ? "Flight" : "Helicopter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mt-1 block whisper text-ivory/35",
														children: kind === "flight" ? "Fixed-wing aircraft" : "Rotorcraft"
													})]
												}, kind))
											}), aircraftKind && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex min-h-0 flex-1 flex-col border border-ivory/10 bg-ivory/[0.02] p-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col gap-2 md:flex-row",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: aircraftQuery,
															onChange: (e) => setAircraftQuery(e.target.value),
															placeholder: "Search model",
															className: "min-w-0 flex-1 border border-ivory/15 bg-transparent px-3 py-2 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/70"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: capacityFilter,
															onChange: (e) => setCapacityFilter(e.target.value),
															className: "border border-ivory/15 bg-obsidian px-3 py-2 whisper text-ivory/70 outline-none focus:border-champagne/70",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "all",
																	children: "All seats"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "1-6",
																	children: "1-6 seats"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "7-10",
																	children: "7-10 seats"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "11+",
																	children: "11+ seats"
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]",
														children: aircraftInventory.filter((a) => a.kind === aircraftKind && a.model.toLowerCase().includes(aircraftQuery.toLowerCase()) && (capacityFilter === "all" || capacityFilter === "1-6" && !!a.seats && a.seats <= 6 || capacityFilter === "7-10" && !!a.seats && a.seats >= 7 && a.seats <= 10 || capacityFilter === "11+" && !!a.seats && a.seats >= 11)).slice(0, 80).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setSelectedAircraft(a),
															className: `flex w-full items-center justify-between gap-3 border px-3 py-2 text-left transition-colors ${selectedAircraft?.id === a.id ? "border-champagne/80 bg-champagne/[0.08]" : "border-ivory/10 hover:border-ivory/35"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-serif text-base text-ivory",
																children: a.model
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "whisper shrink-0 text-ivory/50",
																children: a.capacity
															})]
														}, a.id))
													}),
													selectedAircraft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3 border-t border-ivory/10 pt-3 whisper text-champagne",
														children: ["SELECTED: ", selectedAircraft.model]
													})
												]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryStep, {
											step: currentStepMeta,
											context,
											travellers,
											selectedDistance: distance,
											budget,
											onTravellersChange: setTravellers,
											onDistanceChange: setDistance,
											onBudgetChange: setBudget,
											peopleOptions: config.peopleOptions,
											distanceOptions: config.distanceOptions
										})
									]
								}, `step-${currentStep}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: reduced ? false : {
										opacity: 0,
										y: 26,
										filter: "blur(12px)"
									},
									animate: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)"
									},
									exit: reduced ? { opacity: 0 } : {
										opacity: 0,
										y: -18,
										filter: "blur(8px)"
									},
									transition: {
										duration: .8,
										ease
									},
									className: "flex flex-1 flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-8",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "whisper text-champagne/80",
												children: config.resultTitle
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-px w-24 bg-gradient-to-r from-gold via-champagne to-transparent" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-serif text-3xl font-light text-ivory md:text-5xl",
												children: [resultCards.length, " AIRCRAFT SELECTED"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-ivory/70",
												children: config.resultSummary
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 grid gap-4 md:grid-cols-2",
											children: resultCards.map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
												initial: reduced ? false : {
													opacity: 0,
													y: 22,
													filter: "blur(10px)"
												},
												animate: {
													opacity: 1,
													y: 0,
													filter: "blur(0px)"
												},
												transition: {
													duration: .7,
													delay: i * .1,
													ease
												},
												className: "group overflow-hidden border border-ivory/10 bg-[oklch(0.16_0.008_275/0.52)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative overflow-hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: scenes[context === "flights" ? "aviation" : context === "yachts" ? "yachts" : "residences"],
														alt: card.name,
														className: "h-52 w-full object-cover transition duration-1000 group-hover:scale-[1.06]"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "whisper text-champagne/80",
															children: card.category.toUpperCase()
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "mt-3 font-serif text-3xl font-light leading-tight text-ivory",
															children: card.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-5 space-y-2 text-sm uppercase tracking-[0.18em] text-ivory/55",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: card.seats }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: card.range }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: card.cruise })
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-5 font-serif text-lg italic leading-relaxed text-ivory/70",
															children: card.mission
														})
													]
												})]
											}, card.name))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-8 border-t border-ivory/10 pt-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/concierge",
												onClick: onClose,
												className: "group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: config.concierge }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "relative block h-px w-12 overflow-hidden bg-gold/50",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
												})]
											})
										})
									]
								}, "results")
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-auto border-t border-ivory/10 pt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleBack,
								disabled: !showResults && currentStep === 0,
								className: "whisper inline-flex items-center gap-2 text-ivory/60 transition-colors hover:text-champagne disabled:cursor-not-allowed disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "←"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BACK" })]
							}), !showResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAdvance,
								disabled: !canProceed,
								className: "whisper inline-flex items-center gap-3 text-champagne transition-colors hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentStep === config.steps.length - 1 ? config.cta : "NEXT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative block h-px w-12 overflow-hidden bg-gold/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-100 bg-ivory" })
								})]
							})]
						})
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && panel });
}
//#endregion
export { JourneyPlanner as t };
