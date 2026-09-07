import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { C as useCinematicMotion, l as brand, p as ease, x as scenes } from "./CinematicPage-Cr4gnA8c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/JourneyPlanner-B1trAify.js
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
var services = [
	{
		name: "AVIATION",
		aliases: [
			"aviation",
			"private jet",
			"private jets",
			"aircraft",
			"helicopter",
			"helicopters"
		]
	},
	{
		name: "MOBILITY",
		aliases: [
			"mobility",
			"car",
			"cars",
			"chauffeur",
			"chauffeurs"
		]
	},
	{
		name: "YACHTS",
		aliases: [
			"yacht",
			"yachts",
			"marine"
		]
	},
	{
		name: "RESIDENCES",
		aliases: [
			"residence",
			"residences",
			"villa",
			"villas",
			"hotel",
			"hotels",
			"stay",
			"stays"
		]
	},
	{
		name: "CONCIERGE",
		aliases: [
			"concierge",
			"assistance",
			"personal assistance"
		]
	},
	{
		name: "EXPERIENCES",
		aliases: [
			"experience",
			"experiences",
			"moments"
		]
	}
];
var aircraft = [
	{
		name: "Light Jet",
		aliases: ["light", "light jet"]
	},
	{
		name: "Midsize Jet",
		aliases: [
			"midsize",
			"mid size",
			"midsize jet"
		]
	},
	{
		name: "Super-Midsize Jet",
		aliases: [
			"super midsize",
			"super-midsize",
			"super midsize jet"
		]
	},
	{
		name: "Heavy / Large-Cabin Jet",
		aliases: [
			"heavy",
			"large cabin",
			"large-cabin",
			"heavy jet"
		]
	},
	{
		name: "VIP Airliner / Widebody",
		aliases: [
			"vip",
			"airliner",
			"widebody",
			"wide body"
		]
	}
];
var distances = [
	{
		name: "short-hop",
		aliases: ["short hop", "short-hop"]
	},
	{
		name: "regional",
		aliases: ["regional"]
	},
	{
		name: "cross-country",
		aliases: ["cross country", "cross-country"]
	},
	{
		name: "long-range",
		aliases: ["long range", "long-range"]
	},
	{
		name: "intercontinental",
		aliases: ["intercontinental", "inter continental"]
	}
];
function getRecognitionConstructor() {
	if (typeof window === "undefined") return void 0;
	return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}
function parseCount(text) {
	const digits = text.match(/\b\d{1,2}\b/);
	if (digits) return Number(digits[0]);
	return Object.entries({
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
		ten: 10,
		eleven: 11,
		twelve: 12,
		fifteen: 15,
		twenty: 20,
		thirty: 30,
		forty: 40,
		fifty: 50
	}).find(([word]) => text.includes(word))?.[1];
}
function parseIntent(raw, currentStep) {
	const text = raw.toLowerCase().replace(/[^a-z0-9 -]/g, " ").replace(/\s+/g, " ").trim();
	if (/\b(start over|start again|reset)\b/.test(text)) return { type: "START_OVER" };
	if (/\b(show my options|show options|my options)\b/.test(text)) return { type: "SHOW_OPTIONS" };
	const namedStep = text.match(/(?:go back to|take me back to|return to|change) (?:the )?(aircraft|people|travellers|travelers|where|distance|budget|type)/);
	if (namedStep) {
		const target = namedStep[1];
		if (target === "travellers" || target === "travelers") return {
			type: "GO_TO_STEP",
			target: "people"
		};
		if (target === "distance") return {
			type: "GO_TO_STEP",
			target: "where"
		};
		return {
			type: "GO_TO_STEP",
			target
		};
	}
	if (/\b(next|go next|continue|next step)\b/.test(text)) return { type: "NEXT_STEP" };
	if (/\b(back|go back|previous|take me back|return)\b/.test(text)) return { type: "PREVIOUS_STEP" };
	if (/\b(help|what can you do)\b/.test(text)) return { type: "HELP" };
	if (/\b(explain|what is|tell me about)\b/.test(text)) return { type: "EXPLAIN" };
	const service = services.find((item) => item.aliases.some((alias) => text.includes(alias)));
	if (service) return {
		type: "SELECT_SERVICE",
		service: service.name
	};
	const category = aircraft.find((item) => item.aliases.some((alias) => text.includes(alias)));
	if (category) return {
		type: "SELECT_AIRCRAFT",
		category: category.name
	};
	const count = parseCount(text);
	if (count && (/\b(traveller|travelers|travellers|people|passengers|party|make that)\b/.test(text) || currentStep > 0)) return {
		type: "SET_TRAVELLERS",
		count: Math.min(50, Math.max(1, count))
	};
	const distance = distances.find((item) => item.aliases.some((alias) => text.includes(alias)));
	if (distance) return {
		type: "OPEN_DISTANCE_DROPDOWN",
		requestedDistance: distance.name
	};
	const amount = text.replace(/,/g, "").match(/\b(\d{2,6})\b/);
	if (amount && /\b(budget|dollar|dollars|thousand|preferred)\b/.test(text)) return {
		type: "SET_BUDGET",
		amount: Number(amount[1]) < 1e3 ? Number(amount[1]) * 1e3 : Number(amount[1])
	};
	return { type: "UNKNOWN" };
}
function chooseVoice() {
	const voices = window.speechSynthesis.getVoices();
	return voices.find((voice) => /^en(-|_)/i.test(voice.lang) && /female|samantha|karen|victoria|serena|zira|ava/i.test(voice.name)) ?? voices.find((voice) => /^en(-|_)/i.test(voice.lang)) ?? voices[0];
}
function VoiceConcierge({ step, stepCount, service, category, travellers, distance, budget, onService, onCategory, onTravellers, onStep, onOpenDistance, onShowOptions, onVoiceModeChange }) {
	const { reduced } = useCinematicMotion();
	const [decision, setDecision] = (0, import_react.useState)("pending");
	const [voiceState, setVoiceState] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("Ask Concierge");
	const [supported, setSupported] = (0, import_react.useState)(true);
	const recognitionRef = (0, import_react.useRef)(null);
	const listenRef = (0, import_react.useRef)(() => void 0);
	const listenAfterSpeechRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setDecision(window.localStorage.getItem("helitejet-voice-choice") ?? "pending");
		setSupported(!!getRecognitionConstructor() && "speechSynthesis" in window);
	}, []);
	(0, import_react.useEffect)(() => {
		onVoiceModeChange?.(decision === "enabled");
	}, [decision, onVoiceModeChange]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
		return () => {
			recognitionRef.current?.abort();
			if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const activate = () => {
			if (decision === "enabled") listenRef.current();
			else setDecision("pending");
		};
		window.addEventListener("helitejet-voice-activate", activate);
		return () => window.removeEventListener("helitejet-voice-activate", activate);
	}, [decision]);
	(0, import_react.useEffect)(() => {
		if (decision !== "enabled") return;
		const onAircraftConfirmed = (event) => {
			const selected = event.detail?.category;
			if (!selected || service !== "AVIATION") return;
			onCategory(selected);
			onStep(Math.min(step + 1, stepCount - 1));
			respond(`${selected}. Understood. How many travellers will be joining you?`, true);
		};
		const onDistanceConfirmed = () => {
			onStep(Math.min(step + 1, stepCount - 1));
			respond("Distance confirmed. What is your preferred budget? Please adjust the slider when ready.");
		};
		const onBudgetConfirmed = (event) => {
			const amount = event.detail?.amount;
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
	}, [
		decision,
		service,
		step,
		stepCount,
		onShowOptions
	]);
	const speak = (text, listenAfter = false) => {
		if (!supported || !window.speechSynthesis) return;
		listenAfterSpeechRef.current = listenAfter;
		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		const voice = chooseVoice();
		if (voice) utterance.voice = voice;
		utterance.rate = .92;
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
	const respond = (text, listenAfter = false) => {
		setMessage(text);
		speak(text, listenAfter);
	};
	const dispatch = (intent) => {
		switch (intent.type) {
			case "SELECT_SERVICE":
				onService(intent.service);
				onStep(intent.service === "AVIATION" ? 1 : 1);
				respond(`${intent.service[0]}${intent.service.slice(1).toLowerCase()}. Let's shape your request. How many travellers will be joining you?`, true);
				break;
			case "SELECT_AIRCRAFT":
				onCategory(intent.category);
				onStep(Math.min(step + 1, stepCount - 1));
				respond(`${intent.category}. Understood. How many travellers will be joining you?`, true);
				break;
			case "SET_TRAVELLERS":
				onTravellers(intent.count);
				onStep(Math.min(step + 1, stepCount - 1));
				respond(`${intent.count} travellers. Understood. What is your preferred budget?`, true);
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
				const targetStep = (service === "AVIATION" ? {
					type: 0,
					aircraft: 1,
					people: 2,
					where: 3,
					budget: 4
				} : {
					type: 0,
					aircraft: 0,
					people: 1,
					where: 2,
					budget: 3
				})[intent.target];
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
				} else respond("Your journey is not quite ready. Say next to continue.");
				break;
			case "HELP":
				respond("I can explain HELITEJET services and guide your journey request. Say Aviation, next, back, or how many travellers.");
				break;
			case "EXPLAIN":
				respond(category === "Light Jet" ? "Light jets suit shorter regional journeys and smaller groups." : `${category} aircraft are selected from the HELITEJET fleet guide using documented seating and range.`);
				break;
			default: respond("I'm here to help with HELITEJET services and your journey request.");
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
		onVoiceModeChange?.(true);
		respond("Hello. I'm your HELITEJET voice concierge. What are you looking for today: Aviation, Mobility, Yachts, Residences, Concierge, or Experiences?", true);
	};
	const decline = () => {
		window.localStorage.setItem("helitejet-voice-choice", "declined");
		setDecision("declined");
		onVoiceModeChange?.(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: decision === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: 8
		},
		transition: {
			duration: .5,
			ease
		},
		className: "fixed bottom-6 left-6 z-[70] w-[260px] border border-ivory/15 bg-[oklch(0.09_0.008_275/0.94)] p-4 shadow-2xl backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "whisper text-champagne",
				children: "PRIVATE CONCIERGE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-serif text-lg font-light text-ivory",
				children: "Would you like a private voice concierge?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-serif text-sm italic text-ivory/55",
				children: "Your HELITEJET concierge can guide you through your journey."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: enable,
					className: "whisper text-champagne hover:text-ivory",
					children: "ENABLE VOICE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: decline,
					className: "whisper text-ivory/45 hover:text-ivory",
					children: "NOT NOW"
				})]
			})
		]
	}) }), decision !== "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: reduced ? false : {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "fixed bottom-5 right-5 z-[65] flex items-center gap-3 border border-ivory/15 bg-[oklch(0.09_0.008_275/0.9)] px-3 py-2 shadow-xl backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: decision === "enabled" ? listen : () => setDecision("pending"),
			className: "flex items-center gap-3 text-left outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full border border-champagne/70 ${voiceState === "listening" ? "animate-pulse bg-champagne" : voiceState === "speaking" ? "bg-champagne/60" : "bg-transparent"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whisper text-[0.58rem] text-ivory/70",
				children: supported ? voiceState === "listening" ? "LISTENING..." : voiceState === "speaking" ? "SPEAKING..." : decision === "enabled" ? message : "VOICE CONCIERGE" : "VOICE UNAVAILABLE"
			})]
		}), decision === "enabled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				window.speechSynthesis.cancel();
				recognitionRef.current?.abort();
				setVoiceState("idle");
			},
			className: "whisper text-ivory/35 hover:text-ivory",
			"aria-label": "Stop voice",
			children: "×"
		})]
	})] });
}
function EmbeddedJourneyCard() {
	const { reduced } = useCinematicMotion();
	const [step, setStep] = (0, import_react.useState)(0);
	const [service, setService] = (0, import_react.useState)(null);
	const [category, setCategory] = (0, import_react.useState)("Light Jet");
	const [travellers, setTravellers] = (0, import_react.useState)(4);
	const [distance, setDistance] = (0, import_react.useState)("regional");
	const [budget, setBudget] = (0, import_react.useState)(3e4);
	const [results, setResults] = (0, import_react.useState)(false);
	const [voiceEnabled, setVoiceEnabled] = (0, import_react.useState)(false);
	const distanceRef = (0, import_react.useRef)(null);
	const serviceOptions = [
		"AVIATION",
		"MOBILITY",
		"YACHTS",
		"RESIDENCES",
		"CONCIERGE",
		"EXPERIENCES"
	];
	const isAviation = service === "AVIATION";
	const stepLabels = [
		"TYPE",
		"PEOPLE",
		"BUDGET"
	];
	const contentStep = step;
	const recommended = isAviation ? matchAircraft({
		travellers,
		distanceId: distance,
		category
	}) : [];
	const hasCategoryFit = recommended.length > 0;
	const displayedBudget = `$${budget.toLocaleString()}`;
	const contentTransition = reduced ? { duration: 0 } : {
		duration: .55,
		ease
	};
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
	const contentTitle = results ? "YOUR OPTIONS" : contentStep === 0 ? "WHAT ARE YOU LOOKING FOR?" : contentStep === 1 ? "HOW MANY TRAVELLERS?" : "WHAT'S YOUR PREFERRED BUDGET?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
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
		className: "flex h-[520px] w-full flex-col border border-ivory/15 bg-[oklch(0.09_0.008_275/0.84)] p-5 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.95)] backdrop-blur-md md:h-[540px] md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2 border-b border-ivory/10 pb-4",
				children: stepLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: index > step || results,
					onClick: () => setStep(index),
					className: `text-left whisper text-[0.52rem] tracking-[0.12em] transition-colors ${index === step && !results ? "text-champagne" : index < step || results ? "text-ivory/70" : "text-ivory/30"}`,
					children: [
						String(index + 1).padStart(2, "0"),
						" ",
						label
					]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					initial: false,
					children: !results ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						transition: contentTransition,
						className: "flex flex-1 flex-col pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-serif text-3xl font-light text-champagne",
								children: String(step + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-serif text-2xl font-light leading-tight text-ivory md:text-3xl",
								children: contentTitle
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-1 flex-col justify-start",
							children: [
								contentStep === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: serviceOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setService(option),
										"aria-pressed": service === option,
										className: `border px-3 py-3 text-left font-serif text-sm transition-colors ${service === option ? "border-champagne/80 bg-champagne/[0.08] text-ivory" : "border-ivory/10 text-ivory/55 hover:border-ivory/30 hover:text-ivory"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block",
											children: option
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-[0.62rem] text-ivory/35",
											children: option === "AVIATION" ? "Private Jets & Helicopters" : option === "MOBILITY" ? "Luxury Cars & Chauffeurs" : option === "YACHTS" ? "Yacht Charter & Marine Experiences" : option === "RESIDENCES" ? "Villas, Hotels & Private Stays" : option === "CONCIERGE" ? "Personal Assistance" : "Curated Moments & Lasting Memories"
										})]
									}, option))
								}),
								contentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-8 pt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTravellers((value) => Math.max(1, value - 1)),
											"aria-label": "Decrease travellers",
											className: "flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne",
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif text-5xl font-light text-ivory",
											children: travellers
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTravellers((value) => Math.min(50, value + 1)),
											"aria-label": "Increase travellers",
											className: "flex h-10 w-10 items-center justify-center border border-ivory/20 text-xl text-ivory/70 transition-colors hover:border-champagne hover:text-champagne",
											children: "+"
										})
									]
								}),
								contentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center font-serif text-4xl font-light text-ivory",
											children: displayedBudget
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"aria-label": "Preferred budget",
											type: "range",
											min: "10000",
											max: "150000",
											step: "5000",
											value: budget,
											onChange: (event) => setBudget(Number(event.target.value)),
											onPointerUp: () => window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } })),
											onKeyUp: (event) => {
												if (event.key === "ArrowLeft" || event.key === "ArrowRight") window.dispatchEvent(new CustomEvent("helitejet-budget-confirmed", { detail: { amount: budget } }));
											},
											className: "mt-10 h-1 w-full cursor-pointer appearance-none bg-[linear-gradient(90deg,oklch(0.72_0.1_80)_0%,oklch(0.72_0.1_80)_var(--progress),oklch(0.94_0.014_85/0.18)_var(--progress),oklch(0.94_0.014_85/0.18)_100%)] accent-champagne",
											style: { ["--progress"]: `${(budget - 1e4) / 14e4 * 100}%` }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex justify-between whisper text-ivory/35",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$10,000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$150,000" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-8 text-center whisper text-ivory/40",
											children: "Preferred budget"
										})
									]
								})
							]
						})]
					}, step) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						transition: contentTransition,
						className: "flex flex-1 flex-col pt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "whisper text-champagne",
									children: "YOUR OPTIONS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-serif text-2xl font-light leading-tight text-ivory",
									children: isAviation ? hasCategoryFit ? `${recommended.length} AIRCRAFT SUITED TO YOUR JOURNEY` : "YOUR PARTY MAY BE BETTER SUITED TO ANOTHER AIRCRAFT CATEGORY" : "YOUR REQUEST IS WITH THE CONCIERGE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid max-h-[224px] gap-2 overflow-y-auto pr-2 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]",
								children: isAviation ? recommended.slice(0, 4).map((aircraft) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "border border-ivory/10 bg-ivory/[0.03] p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-serif text-lg font-light text-ivory",
											children: aircraft.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 whisper text-ivory/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [aircraft.seats, " SEATS"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: aircraft.range }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: aircraft.cruise })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 font-serif text-sm italic text-ivory/60",
											children: aircraft.mission
										})
									]
								}, aircraft.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "border border-ivory/10 bg-ivory/[0.03] p-4 text-center font-serif text-sm italic text-ivory/60",
									children: [
										"Your selected ",
										service?.toLowerCase(),
										" enquiry will be shaped by the HELITEJET concierge team."
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/request-access",
								className: "mt-4 self-start border border-champagne/50 px-3 py-2 whisper text-[0.58rem] text-champagne transition-colors hover:border-champagne hover:bg-champagne/10 hover:text-ivory",
								children: "REQUEST ACCESS"
							}),
							!hasCategoryFit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCategory("Midsize Jet");
									setResults(false);
								},
								className: "mt-4 text-left whisper text-champagne hover:text-ivory",
								children: "EXPLORE SUITABLE AIRCRAFT →"
							})
						]
					}, "results")
				})
			}),
			!voiceEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-ivory/10 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: back,
					disabled: step === 0 && !results,
					className: "whisper text-ivory/55 transition-colors hover:text-champagne disabled:invisible",
					children: "← BACK"
				}), !results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: next,
					className: "group inline-flex items-center gap-3 whisper text-champagne transition-colors hover:text-ivory",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step === stepLabels.length - 1 ? "SHOW MY OPTIONS" : "NEXT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative block h-px w-10 overflow-hidden bg-gold/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceConcierge, {
				step,
				stepCount: stepLabels.length,
				service,
				category,
				travellers,
				distance,
				budget,
				onService: setService,
				onCategory: setCategory,
				onTravellers: setTravellers,
				onStep: setStep,
				onOpenDistance: openDistance,
				onShowOptions: () => {
					if (step === stepLabels.length - 1) setResults(true);
				},
				onVoiceModeChange: setVoiceEnabled
			})
		]
	});
}
function JourneyPlanner({ context, open = true, onClose, embedded = false }) {
	const { reduced } = useCinematicMotion();
	const config = inquiryConfig[context];
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const [travellers, setTravellers] = (0, import_react.useState)(context === "flights" ? 4 : 6);
	const [distance, setDistance] = (0, import_react.useState)(context === "flights" ? "regional" : "coastal");
	const [budget, setBudget] = (0, import_react.useState)(25e3);
	const [showResults, setShowResults] = (0, import_react.useState)(false);
	const panelRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const canClose = !embedded && !!onClose;
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (!open || embedded) return;
		closeRef.current?.focus({ preventScroll: true });
		const focusableSelector = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
				return;
			}
			if (event.key !== "Tab" || !panelRef.current) return;
			const focusables = Array.from(panelRef.current.querySelectorAll(focusableSelector)).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
			if (!focusables.length) {
				event.preventDefault();
				return;
			}
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const current = document.activeElement;
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
		}
	}, [open, context]);
	const currentStepMeta = config.steps[currentStep];
	const canProceed = currentStep === 0 ? travellers !== null : currentStep === 1 ? distance !== null : true;
	const flightResults = travellers && distance ? matchAircraft({
		travellers,
		distanceId: distance
	}) : [];
	const resultCards = context === "flights" ? flightResults.slice(0, 4) : [
		{
			name: "Harbour Collection",
			category: context === "yachts" ? "Explorer Yacht" : "Seaside Residence",
			seats: `${travellers ?? 4} guests`,
			range: distance ? config.distanceOptions.find((option) => option.id === distance)?.label ?? "Curated route" : "Curated route",
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
		if (currentStep > 0) setCurrentStep((step) => Math.max(step - 1, 0));
	};
	const title = showResults ? config.resultTitle : config.title;
	const intro = showResults ? config.resultSummary : config.intro;
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmbeddedJourneyCard, {});
	if (!open && !embedded) return null;
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: embedded ? false : reduced ? { opacity: 0 } : { opacity: 0 },
		animate: { opacity: 1 },
		exit: embedded ? void 0 : reduced ? { opacity: 0 } : { opacity: 0 },
		transition: {
			duration: embedded ? .8 : .7,
			ease
		},
		className: embedded ? "w-full max-w-[500px] border border-ivory/10 bg-[oklch(0.11_0.008_275/0.9)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-sm" : "fixed inset-0 z-[80] bg-[oklch(0.07_0.006_275/0.86)] backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
			ref: panelRef,
			role: embedded ? "region" : "dialog",
			"aria-modal": embedded ? void 0 : "true",
			"aria-label": "Travel planning inquiry",
			initial: embedded ? false : reduced ? false : {
				x: 80,
				opacity: 0
			},
			animate: embedded ? { opacity: 1 } : {
				x: 0,
				opacity: 1
			},
			exit: embedded ? void 0 : reduced ? { opacity: 0 } : {
				x: 80,
				opacity: 0
			},
			transition: {
				duration: .8,
				ease
			},
			className: embedded ? "relative flex w-full flex-col bg-[oklch(0.11_0.008_275/0.9)]" : "absolute inset-y-0 right-0 z-10 flex w-full max-w-[820px] flex-col border-l border-ivory/10 bg-[oklch(0.11_0.008_275)] shadow-[0_0_180px_-80px_rgba(0,0,0,0.9)] md:w-[54vw]",
			children: [!embedded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: scenes[context === "flights" ? "aviation" : context === "yachts" ? "yachts" : "residences"],
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,oklch(0.11_0.008_275/0.92),oklch(0.11_0.008_275/0.86)_40%,oklch(0.11_0.008_275/0.92))]" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative flex h-full flex-col ${embedded ? "px-4 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6" : "px-5 pb-6 pt-6 md:px-9 md:pb-10 md:pt-8"}`,
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
								onSelect: (index) => {
									if (showResults) return;
									setCurrentStep(Math.min(index, config.steps.length - 1));
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `flex ${embedded ? "min-h-[360px]" : "min-h-[420px]"} flex-col`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: showStep ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryStep, {
											step: currentStepMeta,
											context,
											travellers,
											selectedDistance: distance,
											budget,
											onTravellersChange: (value) => setTravellers(value),
											onDistanceChange: (value) => setDistance(value),
											onBudgetChange: (value) => setBudget(value),
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
												children: title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-px w-24 bg-gradient-to-r from-gold via-champagne to-transparent" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-serif text-3xl font-light text-ivory md:text-5xl",
												children: [resultCards.length, " AIRCRAFT SELECTED"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-ivory/70",
												children: intro
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 grid gap-4 md:grid-cols-2",
											children: resultCards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
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
													delay: index * .1,
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
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mt-6",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VIEW AIRCRAFT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "relative block h-px w-10 overflow-hidden bg-gold/50",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
																})]
															})
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
								disabled: showResults ? false : currentStep === 0,
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
	return embedded ? panel : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && panel });
}
//#endregion
export { JourneyPlanner as t };
