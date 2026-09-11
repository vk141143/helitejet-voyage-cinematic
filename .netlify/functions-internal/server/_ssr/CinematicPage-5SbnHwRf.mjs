import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useScroll, r as useTransform, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CinematicPage-5SbnHwRf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var home_default = "/assets/home-DtXOBe7V.jpg";
var aviation_default = "/assets/aviation-MupU8Ncx.jpg";
var yachts_default = "/assets/yachts-Dig2wsim.jpg";
var mobility_default = "/assets/mobility-DJrcLUpz.jpg";
var residences_default = "/assets/residences-n7kkIk-b.jpg";
var experiences_default = "/assets/experiences-Doo1rkly.jpg";
var destinations_default = "/assets/destinations-C7vJWGcV.jpg";
var membership_default = "/assets/membership-DQwR5k0P.jpg";
var private_default = "/assets/private--K0uMxwA.jpg";
var concierge_default = "/assets/concierge-DTCTJo3F.jpg";
var about_default = "/assets/about-CGPWYuJx.jpg";
var access_default = "/assets/access-Crfx9CM7.jpg";
var explorer_default = "/assets/explorer-DF5olU1x.jpg";
var classic_default = "/assets/classic-BGHU4rkA.jpg";
var sail_default = "/assets/sail-fmDsk5Pq.jpg";
var comporta_default = "/assets/comporta-CepshRVE.jpg";
var mayfair_default = "/assets/mayfair-B0Uq8Kwn.jpg";
var gstaad_default = "/assets/gstaad-DVU7fa-R.jpg";
var gallery_default = "/assets/gallery-B_NHU5dG.jpg";
var spa_default = "/assets/spa-BVomLf2v.jpg";
var monaco_default = "/assets/monaco-CDBM1iWa.jpg";
var dubai_default = "/assets/dubai-CtRdZ-Cw.jpg";
var maldives_default = "/assets/maldives-D5RNjB5g.jpg";
var mykonos_default = "/assets/mykonos-GRibaXHd.jpg";
var ibiza_default = "/assets/ibiza-Id2uQrdl.jpg";
var london_default = "/assets/london-CGcu7cgV.jpg";
var paris_default = "/assets/paris-C6CX0YJy.jpg";
var newyork_default = "/assets/newyork-BRLZczBt.jpg";
var tokyo_default = "/assets/tokyo-CFuvAx4l.jpg";
var alps_default = "/assets/alps-5puYEM5E.jpg";
var scenes = {
	home: home_default,
	aviation: aviation_default,
	yachts: yachts_default,
	mobility: mobility_default,
	residences: residences_default,
	experiences: experiences_default,
	destinations: destinations_default,
	membership: membership_default,
	private: private_default,
	concierge: concierge_default,
	about: about_default,
	access: access_default,
	yExplorer: explorer_default,
	yClassic: classic_default,
	ySail: sail_default,
	rComporta: comporta_default,
	rMayfair: mayfair_default,
	rGstaad: gstaad_default,
	eGallery: gallery_default,
	eSpa: spa_default
};
var brand = {
	name: "HELITEJET",
	mark: "HJ",
	tagline: "Private aviation, reimagined.",
	email: "concierge@helitejet.com",
	phone: "+44 20 7946 0330",
	cities: "London · Monaco · Dubai · New York"
};
var menu = [
	{
		to: "/",
		label: "Overture",
		image: "home",
		numeral: "01"
	},
	{
		to: "/aviation",
		label: "Aviation",
		image: "aviation",
		numeral: "02"
	},
	{
		to: "/yachts",
		label: "Yachts",
		image: "yachts",
		numeral: "03"
	},
	{
		to: "/mobility",
		label: "Mobility",
		image: "mobility",
		numeral: "04"
	},
	{
		to: "/residences",
		label: "Residences",
		image: "residences",
		numeral: "05"
	},
	{
		to: "/experiences",
		label: "Experiences",
		image: "experiences",
		numeral: "06"
	},
	{
		to: "/destinations",
		label: "Destinations",
		image: "destinations",
		numeral: "07"
	},
	{
		to: "/membership",
		label: "Membership",
		image: "membership",
		numeral: "08"
	},
	{
		to: "/subscriptions",
		label: "Subscriptions",
		image: "membership",
		numeral: "09"
	},
	{
		to: "/private",
		label: "HELITEJET Private",
		image: "private",
		numeral: "10"
	},
	{
		to: "/concierge",
		label: "Concierge",
		image: "concierge",
		numeral: "11"
	},
	{
		to: "/about",
		label: "About",
		image: "about",
		numeral: "12"
	},
	{
		to: "/request-access",
		label: "Request Access",
		image: "access",
		numeral: "13"
	}
];
var worlds = {
	home: {
		key: "home",
		path: "/",
		name: "Overture",
		seo: {
			title: "HELITEJET — Private Aviation, Reimagined",
			description: "Private jets, helicopters, yachts, residences and experiences composed as one seamless world for a small circle of members."
		},
		opening: {
			eyebrow: "HELITEJET",
			headline: "Private aviation,\nreimagined.",
			sub: "One circle. Every horizon. Nothing in between.",
			caps: true
		},
		chapters: [
			{
				id: "aviation",
				numeral: "I",
				kicker: "Aviation",
				title: "Wheels up\nwithin the hour.",
				body: "Long-range jets, helicopters and crews held in readiness across four continents. You name the hour; the sky adjusts.",
				image: "aviation",
				align: "left",
				link: {
					to: "/aviation",
					label: "Enter Aviation"
				}
			},
			{
				id: "yachts",
				numeral: "II",
				kicker: "Yachts",
				title: "Anchor\nwhere the map ends.",
				body: "A curated fleet from forty to a hundred and twenty metres, each with a crew who already knows how you take your coffee.",
				image: "yachts",
				align: "right",
				link: {
					to: "/yachts",
					label: "Enter Yachts"
				}
			},
			{
				id: "mobility",
				numeral: "III",
				kicker: "Mobility",
				title: "Air. Ground.\nSea. Air.",
				body: "Chauffeurs, rotorcraft and tenders choreographed by one desk so the journey between journeys disappears.",
				image: "mobility",
				align: "left",
				link: {
					to: "/mobility",
					label: "Enter Mobility"
				}
			},
			{
				id: "residences",
				numeral: "IV",
				kicker: "Residences",
				title: "Homes that\nwait for you.",
				body: "Villas, penthouses and chalets kept warm, stocked and staffed in the places you return to.",
				image: "residences",
				align: "right",
				link: {
					to: "/residences",
					label: "Enter Residences"
				}
			},
			{
				id: "experiences",
				numeral: "V",
				kicker: "Experiences",
				title: "Evenings\nthat do not exist\nelsewhere.",
				body: "Closed museums, chefs flown in for one table, coastlines emptied for a single anchorage. Composed, never listed.",
				image: "experiences",
				align: "left",
				link: {
					to: "/experiences",
					label: "Enter Experiences"
				}
			},
			{
				id: "destinations",
				numeral: "VI",
				kicker: "Destinations",
				title: "Ten portals.\nKnown deeply.",
				body: "Monaco to Tokyo, the Maldives to the Alps: a private atlas with a person on the ground in each.",
				image: "destinations",
				align: "right",
				link: {
					to: "/destinations",
					label: "Enter Destinations"
				}
			},
			{
				id: "membership",
				numeral: "VII",
				kicker: "Membership",
				title: "A circle,\nnot a client list.",
				body: "Three hundred members, known by voice. Places open by introduction and by conversation, never by checkout.",
				image: "membership",
				align: "left",
				link: {
					to: "/membership",
					label: "Enter Membership"
				}
			},
			{
				id: "private",
				numeral: "VIII",
				kicker: "HELITEJET Private",
				title: "The inner\nroom.",
				body: "Forty seats. Guaranteed aircraft, permanent crew, a desk that never closes. By invitation only.",
				image: "private",
				align: "right",
				link: {
					to: "/private",
					label: "Enter Private"
				}
			},
			{
				id: "concierge",
				numeral: "IX",
				kicker: "Concierge",
				title: "Ask once.",
				body: "One person, one message, one answer within the hour. The desk is the whole company, spoken through a single voice.",
				image: "concierge",
				align: "left",
				link: {
					to: "/concierge",
					label: "Reach the Desk"
				}
			}
		],
		passage: "Luxury is not the presence of more. It is the absence of everything that stands between you and the moment.",
		next: {
			to: "/request-access",
			name: "Request Access",
			image: "access"
		}
	},
	aviation: {
		key: "aviation",
		path: "/aviation",
		name: "Aviation",
		seo: {
			title: "Private Aviation — HELITEJET",
			description: "Long-range jets, helicopters and dedicated crews across a network of four continents, positioned for departure within the hour."
		},
		opening: {
			eyebrow: "Chapter Two",
			headline: "Aviation",
			sub: "The sky, held in readiness."
		},
		passage: "The most valuable thing in the air is not speed. It is the certainty that nothing will need your attention.",
		next: {
			to: "/yachts",
			name: "Yachts",
			image: "yachts"
		}
	},
	yachts: {
		key: "yachts",
		path: "/yachts",
		name: "Yachts",
		seo: {
			title: "Yachts — HELITEJET",
			description: "A curated fleet of explorer, classic and sailing yachts from forty to one hundred and twenty metres, crewed for members."
		},
		opening: {
			eyebrow: "Chapter Three",
			headline: "Yachts",
			sub: "Anchor where the map ends."
		},
		passage: "At sea, the only schedule is the one written by the light.",
		next: {
			to: "/mobility",
			name: "Mobility",
			image: "mobility"
		}
	},
	mobility: {
		key: "mobility",
		path: "/mobility",
		name: "Mobility",
		seo: {
			title: "Mobility — HELITEJET",
			description: "Air to ground to sea and back: chauffeured cars, rotorcraft and tenders choreographed by one desk."
		},
		opening: {
			eyebrow: "Chapter Four",
			headline: "Mobility",
			sub: "Air. Ground. Sea. Air."
		},
		passage: "Movement, done properly, feels like standing still while the world rearranges itself.",
		next: {
			to: "/residences",
			name: "Residences",
			image: "residences"
		}
	},
	residences: {
		key: "residences",
		path: "/residences",
		name: "Residences",
		seo: {
			title: "Residences — HELITEJET",
			description: "Private villas, penthouses and chalets kept warm, stocked and staffed for members in the places they return to."
		},
		opening: {
			eyebrow: "Chapter Five",
			headline: "Residences",
			sub: "Homes that wait for you."
		},
		passage: "A house becomes a home when it remembers you.",
		next: {
			to: "/experiences",
			name: "Experiences",
			image: "experiences"
		}
	},
	experiences: {
		key: "experiences",
		path: "/experiences",
		name: "Experiences",
		seo: {
			title: "Experiences — HELITEJET",
			description: "Gastronomy, art, wellness, adventure, sport, celebration and craft, composed privately for members and never listed."
		},
		opening: {
			eyebrow: "Chapter Six",
			headline: "Experiences",
			sub: "An editorial of evenings that do not exist elsewhere."
		},
		passage: "The rarest luxury is a memory no one else has.",
		next: {
			to: "/destinations",
			name: "Destinations",
			image: "destinations"
		}
	},
	destinations: {
		key: "destinations",
		path: "/destinations",
		name: "Destinations",
		seo: {
			title: "Destinations — HELITEJET",
			description: "Ten portals: Monaco, Dubai, Maldives, Mykonos, Ibiza, London, Paris, New York, Tokyo and the Swiss Alps, each with a HELITEJET presence on the ground."
		},
		opening: {
			eyebrow: "Chapter Seven",
			headline: "Destinations",
			sub: "Ten portals. Known deeply."
		},
		passage: "A destination is not a place. It is a person who knows it.",
		next: {
			to: "/membership",
			name: "Membership",
			image: "membership"
		}
	},
	membership: {
		key: "membership",
		path: "/membership",
		name: "Membership",
		seo: {
			title: "Membership — HELITEJET",
			description: "Membership of HELITEJET is by invitation and application. A circle of three hundred, one standard of discretion."
		},
		opening: {
			eyebrow: "Chapter Eight",
			headline: "Membership",
			sub: "A circle, not a client list."
		},
		passage: "We would rather know three hundred people well than three thousand by name.",
		next: {
			to: "/subscriptions",
			name: "Subscriptions",
			image: "membership"
		}
	},
	subscriptions: {
		key: "membership",
		path: "/subscriptions",
		name: "Subscriptions",
		seo: {
			title: "Subscriptions — HELITEJET",
			description: "Three HELITEJET subscription clubs, each designed for a different pace of life and access level."
		},
		opening: {
			eyebrow: "Club Access",
			headline: "Subscriptions",
			sub: "Three clubs. One standard."
		},
		passage: "The right club is the one that gives you access before you know you need it.",
		next: {
			to: "/private",
			name: "HELITEJET Private",
			image: "private"
		}
	},
	private: {
		key: "private",
		path: "/private",
		name: "HELITEJET Private",
		seo: {
			title: "HELITEJET Private",
			description: "The inner tier: guaranteed aircraft, permanently assigned crew and residences, and a desk that never closes. By invitation."
		},
		opening: {
			eyebrow: "Chapter Nine",
			headline: "Private",
			sub: "The inner room.",
			quiet: true
		},
		passage: "Discretion is not a service. It is the room the service is delivered in.",
		next: {
			to: "/concierge",
			name: "Concierge",
			image: "concierge"
		}
	},
	concierge: {
		key: "concierge",
		path: "/concierge",
		name: "Concierge",
		seo: {
			title: "Concierge — HELITEJET",
			description: "Reach the HELITEJET desk. One request, one person, one answer within the hour."
		},
		opening: {
			eyebrow: "Chapter Ten",
			headline: "Concierge",
			sub: "Ask once."
		},
		passage: "The right answer, once, is worth more than every option.",
		next: {
			to: "/about",
			name: "About",
			image: "about"
		}
	},
	about: {
		key: "about",
		path: "/about",
		name: "About",
		seo: {
			title: "About — HELITEJET",
			description: "The idea, the standard, the network, the people and the future of HELITEJET."
		},
		opening: {
			eyebrow: "Chapter Eleven",
			headline: "About",
			sub: "Why this exists."
		},
		passage: "We built the company we wished had answered the phone.",
		next: {
			to: "/request-access",
			name: "Request Access",
			image: "access"
		}
	},
	access: {
		key: "access",
		path: "/request-access",
		name: "Request Access",
		seo: {
			title: "Request Access — HELITEJET",
			description: "Begin a conversation with the HELITEJET desk about membership."
		},
		opening: {
			eyebrow: "Chapter Twelve",
			headline: "Request\nAccess",
			sub: "The door is ajar."
		},
		passage: "Every member arrived here the same way: someone picked up the phone.",
		next: {
			to: "/",
			name: "Overture",
			image: "home"
		}
	}
};
var aviationContent = {
	intro: {
		kicker: "Global Private Jets",
		title: "Twelve airframes.\nOne standard.",
		body: "Ultra-long-range for the Atlantic at dinner, mid-size for the Alps at dawn. Every cabin appointed in ivory hide and dark walnut; every crew flown with you before."
	},
	jets: [
		{
			name: "Global 7500",
			range: "7,700 nm",
			seats: "Up to 14",
			note: "London to Los Angeles, non-stop, with a full night's sleep."
		},
		{
			name: "Falcon 8X",
			range: "6,450 nm",
			seats: "Up to 12",
			note: "Short-field certified: Gstaad-Saanen and London City without compromise."
		},
		{
			name: "Praetor 600",
			range: "4,018 nm",
			seats: "Up to 9",
			note: "The European day-trip, flown in silence at 45,000 feet."
		}
	],
	helicopters: {
		kicker: "Helicopters",
		title: "The last\nthirty miles.",
		body: "Twin-engine rotorcraft with leather cabins and noise-cancelled headsets bridge rooftop to runway, vineyard to harbour, slope to spa. Nine minutes replaces ninety.",
		fleet: [
			"AW139 · Eight seats · IFR",
			"H160 · Six seats · Quietest in class",
			"Bell 429 · Six seats · Alpine rated"
		]
	},
	network: {
		kicker: "The Network",
		title: "Positioned,\nnot promised.",
		body: "Aircraft are pre-positioned to member movements each season. Crews rest on rotation in four hubs, customs is met on the apron, and slots are held before you decide.",
		lines: [
			["Hubs", "London · Monaco · Dubai · New York"],
			["Reach", "Four continents · 1,900 airfields"],
			["Readiness", "Sixty minutes from the call"],
			["Continuity", "Two captains and a cabin lead assigned for the year"]
		]
	},
	cta: {
		label: "Request an aircraft",
		to: "/request-access"
	}
};
var yachtsContent = {
	intro: {
		kicker: "The Fleet",
		title: "Three hulls\nfor three kinds of sea.",
		body: "Owner standard between charters, crew ratio never below one-to-one, and captains who draw the route only after they have listened."
	},
	fleet: [
		{
			name: "Meridian",
			type: "Explorer",
			length: "72 m",
			guests: "12 guests · 22 crew",
			waters: "High latitudes · Indian Ocean",
			image: "yExplorer",
			note: "Ice-class hull, helideck, submersible garage. Built for the coasts that appear on no brochure."
		},
		{
			name: "Sabine",
			type: "Classic Motor Yacht",
			length: "48 m",
			guests: "10 guests · 11 crew",
			waters: "Riviera · Balearics · Aegean",
			image: "yClassic",
			note: "Navy hull, teak decks, a cellar of 400 bottles and a chef who trained in Menton."
		},
		{
			name: "Aurelia",
			type: "Sailing Yacht",
			length: "56 m",
			guests: "8 guests · 9 crew",
			waters: "Caribbean · Atlantic crossings",
			image: "ySail",
			note: "Carbon rig, dark sails, silence at twelve knots. For those who prefer the wind to have a say."
		}
	],
	arrival: {
		kicker: "Arrival",
		title: "The jet lands.\nThe tender is already waiting.",
		body: "Aviation and yachts are one department here. Your luggage moves from cabin to stateroom without passing through your hands."
	},
	cta: {
		label: "Explore the fleet with the desk",
		to: "/concierge"
	}
};
var mobilityContent = {
	sequence: [
		{
			stage: "AIR",
			title: "Touchdown, 06:40.",
			body: "The jet taxis to a private apron. Immigration meets you in the cabin. The door opens onto a car, not a terminal.",
			image: "home"
		},
		{
			stage: "GROUND",
			title: "The quiet car.",
			body: "Armoured or unarmoured, driven by people trained in silence as much as evasive technique. Luggage and pets travel separately and arrive first.",
			image: "mobility"
		},
		{
			stage: "SEA",
			title: "Quay to stateroom.",
			body: "A tender idles at the harbour wall. The captain has your itinerary; the chef has your allergies; the cabin is at nineteen degrees.",
			image: "yachts"
		},
		{
			stage: "AIR",
			title: "Lift, again.",
			body: "A helicopter on the aft deck for the vineyard lunch. Nine minutes over water. You never touched a door handle all day.",
			image: "aviation"
		}
	],
	principle: {
		kicker: "Choreography",
		title: "You never\nwait for a door.",
		body: "Every handover, from villa to car to helideck to cabin to tender, is timed by one desk. You notice only that you have arrived."
	},
	cta: {
		label: "Arrange a journey",
		to: "/concierge"
	}
};
var residencesContent = {
	properties: [
		{
			name: "Casa das Dunas",
			place: "Comporta, Portugal",
			sleeps: "Sleeps 10",
			image: "rComporta",
			lines: [
				"Thatched pavilions among stone pines",
				"Private boardwalk to an empty Atlantic beach",
				"House manager, chef and rider for the estate's horses"
			]
		},
		{
			name: "The Curzon Penthouse",
			place: "Mayfair, London",
			sleeps: "Sleeps 6",
			image: "rMayfair",
			lines: [
				"Corner glass over Mayfair rooftops",
				"Walnut library, private lift, Steinway",
				"Housekeeper in residence, driver on call"
			]
		},
		{
			name: "Chalet Oberbort",
			place: "Gstaad, Switzerland",
			sleeps: "Sleeps 14",
			image: "rGstaad",
			lines: [
				"Ski-in from the Eggli via private trail",
				"Indoor pool, hammam, cinema, wine cave",
				"Alpine chef and guide for the season"
			]
		},
		{
			name: "Villa Penya",
			place: "Ibiza, Spain",
			sleeps: "Sleeps 8",
			image: "residences",
			lines: [
				"Travertine terrace above a dark sea",
				"Sunset to the west, silence to the east",
				"Boat and skipper moored below"
			]
		}
	],
	stewardship: {
		kicker: "House",
		title: "Staffed\nbefore you land.",
		body: "Managers, chefs and housekeepers arrive twenty-four hours ahead. Your wines are in the cellar, the linen thread count is correct, and the piano is tuned."
	},
	cta: {
		label: "Ask about a residence",
		to: "/concierge"
	}
};
var experiencesContent = {
	features: [
		{
			category: "Gastronomy",
			title: "One chef. One table. One night.",
			dek: "A three-star kitchen flown to a headland; a cellar opened for the first time in a decade.",
			image: "experiences",
			size: "wide"
		},
		{
			category: "Art & Culture",
			title: "After the museum has emptied.",
			dek: "Galleries, ateliers and archives opened privately, with the curator in the room and no one else.",
			image: "eGallery",
			size: "tall"
		},
		{
			category: "Wellness",
			title: "Steam, snow, silence.",
			dek: "An alpine spa closed for the week. Practitioners flown in. Nothing scheduled before ten.",
			image: "eSpa",
			size: "tall"
		},
		{
			category: "Adventure",
			title: "Wilderness with the difficulty removed.",
			dek: "Polar crossings and desert nights from private camps that did not exist the week before.",
			image: "destinations",
			size: "wide"
		},
		{
			category: "Sport & Motorsport",
			title: "Paddock, pit wall, podium.",
			dek: "Grand Prix weekends from the inside; a private circuit day with a works driver beside you.",
			image: "mobility",
			size: "square"
		},
		{
			category: "Celebrations",
			title: "A coastline, emptied.",
			dek: "Birthdays and weddings on a yacht, an island or a rooftop, staged so the only guests are yours.",
			image: "yachts",
			size: "square"
		},
		{
			category: "Fashion & Craft",
			title: "The atelier, after hours.",
			dek: "Bespoke commissions with the maker's hands in view: watchmakers, bootmakers, couturiers.",
			image: "membership",
			size: "square"
		},
		{
			category: "Nature & Wildlife",
			title: "The migration, from a private camp.",
			dek: "The Mara at dawn with no other vehicle in sight; the camp struck before anyone else arrives.",
			image: "about",
			size: "wide"
		}
	],
	cta: {
		label: "Compose an experience",
		to: "/concierge"
	}
};
var destinationsContent = {
	portals: [
		{
			name: "Monaco",
			region: "Côte d'Azur",
			season: "May — September",
			line: "Port Hercule berths held for the Grand Prix; a terrace above the Rock for the fireworks.",
			image: monaco_default
		},
		{
			name: "Dubai",
			region: "United Arab Emirates",
			season: "November — March",
			line: "Rooftop to desert camp by helicopter in eighteen minutes; the dunes emptied for dinner.",
			image: dubai_default
		},
		{
			name: "Maldives",
			region: "Indian Ocean",
			season: "December — April",
			line: "A private island in the Baa Atoll, reached by seaplane, with a reef that no one else dives.",
			image: maldives_default
		},
		{
			name: "Mykonos",
			region: "Cyclades",
			season: "June — September",
			line: "A villa above Agios Sostis, a caïque to Delos at dawn before the ferries arrive.",
			image: mykonos_default
		},
		{
			name: "Ibiza",
			region: "Balearics",
			season: "May — October",
			line: "The quiet north: a finca in the hills, a boat below, and Es Vedrà at sunset.",
			image: ibiza_default
		},
		{
			name: "London",
			region: "United Kingdom",
			season: "All year",
			line: "A Mayfair penthouse, a member's table at three houses, and a driver who knows the back streets.",
			image: london_default
		},
		{
			name: "Paris",
			region: "France",
			season: "All year",
			line: "A Left Bank apartment, private hours in the great museums, a couturier's atelier after six.",
			image: paris_default
		},
		{
			name: "New York",
			region: "United States",
			season: "September — December",
			line: "Downtown from the West 30th heliport in seven minutes; a Tribeca loft with a chef in residence.",
			image: newyork_default
		},
		{
			name: "Tokyo",
			region: "Japan",
			season: "March — April · November",
			line: "A ryokan in Aoyama, counters with eight seats, and a guide who has lived there thirty years.",
			image: tokyo_default
		},
		{
			name: "Swiss Alps",
			region: "Gstaad · St. Moritz · Zermatt",
			season: "December — April",
			line: "Chalet, heli-ski, spa and a table at the Chesery, all on one call.",
			image: alps_default
		}
	],
	cta: {
		label: "Ask about a destination",
		to: "/concierge"
	}
};
var membershipContent = {
	intro: {
		kicker: "The Circle",
		title: "Three hundred\nmembers. No more.",
		body: "We cap the circle so that every member is known to the desk by voice. Places open only as they are relinquished, and are offered by introduction."
	},
	path: [
		{
			step: "I",
			title: "Introduction",
			body: "By an existing member, or by your own request through this site. Either begins the same way."
		},
		{
			step: "II",
			title: "Conversation",
			body: "A call with a desk lead, at an hour you choose, to understand how you live and whether we can be useful. Nothing is sold on the call."
		},
		{
			step: "III",
			title: "Invitation",
			body: "If the fit is right, an invitation follows in writing. It is valid for a season and may be declined without consequence."
		},
		{
			step: "IV",
			title: "The Circle",
			body: "A single desk lead is assigned to you. From that day, one message moves anything in this world."
		}
	],
	tiers: [{
		name: "Member",
		body: "Every world in this site: aviation, yachts, mobility, residences, experiences and destinations, arranged by a dedicated desk lead."
	}, {
		name: "HELITEJET Private",
		body: "Guaranteed aircraft, permanent crew and residence, and a desk that never closes. Forty seats. By invitation after a year in the circle.",
		to: "/private"
	}],
	cta: {
		label: "Request access",
		to: "/request-access"
	}
};
var subscriptionContent = {
	intro: {
		kicker: "The Clubs",
		title: "Three access levels.\nOne unbroken standard.",
		body: "Each club is designed for a different pace of life. The common thread is the same: a single desk, discreet coordination, and access without friction."
	},
	clubs: [
		{
			name: "The Horizon Club",
			tag: "01 · Essential access",
			blurb: "For members who want rapid, assured access across aviation, mobility and destinations without a full estate portfolio.",
			perks: [
				"Priority aircraft planning",
				"Dedicated travel desk",
				"Preferred destination introductions",
				"Seasonal concierge scheduling"
			]
		},
		{
			name: "The Reserve Club",
			tag: "02 · Private reserve",
			blurb: "For households that move more often and want stronger preference across jets, yachts and personal logistics.",
			perks: [
				"Guaranteed aircraft preference",
				"Cabin and crew continuity",
				"Expanded yacht and residence support",
				"Expanded executive mobility roster"
			]
		},
		{
			name: "The House Club",
			tag: "03 · Full residence",
			blurb: "For members who require complete continuity across homes, tails, charter fleets, and multi-destination living.",
			perks: [
				"Residence planning and staffing",
				"Private fleet and fleet continuity",
				"Custom experiences and seasonal programming",
				"Family office level coordination"
			]
		}
	],
	cta: {
		label: "Begin your application",
		to: "/request-access"
	}
};
var privateContent = {
	statements: [
		{
			numeral: "I",
			title: "Your aircraft. Your crew. Your hour.",
			body: "Guaranteed lift on the fleet with no notice period. The same captains, the same cabin lead, the same aircraft where possible, for the year."
		},
		{
			numeral: "II",
			title: "One voice, at any hour.",
			body: "A single desk lead reachable every hour of every day, with authority to move anything in this world on your word alone."
		},
		{
			numeral: "III",
			title: "Forty seats. By invitation only.",
			body: "HELITEJET Private is not applied for. Members are invited after a year in the circle, or on the introduction of an existing Private member."
		}
	],
	cta: {
		label: "Begin with Membership",
		to: "/membership"
	}
};
var aboutContent = {
	sections: [
		{
			id: "idea",
			kicker: "The Idea",
			title: "Founded on\na missed connection.",
			body: "HELITEJET began when a founder's jet landed on time, the car did not come, and the yacht sailed without her. Every department here exists so that never happens to a member. Aviation, yachts, mobility, residences and experiences are one company because a life is one journey.",
			image: "about"
		},
		{
			id: "standard",
			kicker: "The Standard",
			title: "Owned.\nCapped.\nUnadvertised.",
			body: "We own what we fly and sail, so the standard is ours to keep. We cap who we serve, so every member is known. And we never advertise, because the people who should find us already have.",
			image: "aviation"
		},
		{
			id: "network",
			kicker: "The Network",
			title: "Four hubs.\nSixty places.",
			body: "London, Monaco, Dubai and New York hold the aircraft and the desks. Sixty destinations hold a person who lives there and answers before the phone rings.",
			image: "destinations"
		},
		{
			id: "people",
			kicker: "The People",
			title: "Two hundred\nand forty.",
			body: "Captains, crew, house managers, chefs and desk leads. Most have been with us since the first year. All are employed, not contracted, and every one of them can say no on your behalf.",
			image: "private"
		},
		{
			id: "future",
			kicker: "The Future",
			title: "Quieter,\nnot bigger.",
			body: "The next decade brings sustainable fuel across the fleet, two more residences a year, and no more than forty additional members. Growth is measured in how little you have to ask for.",
			image: "home"
		}
	],
	cta: {
		label: "Begin a conversation",
		to: "/request-access"
	}
};
var interestOptions = [
	"Private Aviation",
	"Yachts",
	"Mobility",
	"Residences",
	"Experiences",
	"Destinations",
	"Membership",
	"HELITEJET Private",
	"Concierge"
];
var travelProfiles = [
	"Occasional — a few journeys a year",
	"Frequent — monthly",
	"Constant — weekly or more",
	"Family office",
	"Corporate principal"
];
var conciergeTypes = [
	"Aviation",
	"Yachts",
	"Mobility",
	"Residences",
	"Experiences",
	"Destinations",
	"Other"
];
var conciergeTimeframes = [
	"Today",
	"Within the week",
	"Within the month",
	"Planning ahead"
];
/** Central place for the site's motion language. */
var ease = [
	.22,
	1,
	.36,
	1
];
function useCinematicMotion() {
	return { reduced: !!useReducedMotion() };
}
/** A breathing hairline inviting the visitor to scroll. */
function ScrollIndicator({ opacity, label = "Scroll" }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		style: opacity ? { opacity } : {},
		className: "absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whisper text-ivory/50",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "block h-12 w-px bg-gradient-to-b from-gold to-transparent",
			animate: reduced ? { scaleY: 1 } : {
				scaleY: [
					.2,
					1,
					.2
				],
				originY: 0
			},
			transition: {
				duration: 2.4,
				repeat: Infinity,
				ease: "easeInOut"
			}
		})]
	});
}
/** A vertical track with a thumb bound to a container's scroll progress (used by the menu). */
function ScrollTrack({ progress, className = "" }) {
	const top = useTransform(progress, [0, 1], ["0%", "75%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: `pointer-events-none relative h-40 w-px bg-ivory/15 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			style: { top },
			className: "absolute left-0 h-1/4 w-px bg-champagne"
		})
	});
}
/** Fades and lifts content into view once as it enters the frame. */
function SectionReveal({ children, delay = 0, className, y = 28, as = "div" }) {
	const { reduced } = useCinematicMotion();
	const Tag = motion[as];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		initial: reduced ? false : {
			opacity: 0,
			y,
			filter: "blur(6px)"
		},
		whileInView: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		},
		viewport: {
			once: true,
			margin: "-10% 0px"
		},
		transition: {
			duration: 1.3,
			delay,
			ease
		},
		children
	});
}
/** Splits a headline on \n and reveals each line with a slight stagger. */
function Lines({ text, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
		delay: delay + i * .12,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block",
			children: line
		})
	}, i)) });
}
/** Small tracked label with a hairline rule. */
function Kicker({ children, align = "left" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-5 ${align === "right" ? "md:flex-row-reverse" : align === "center" ? "justify-center" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-gold/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whisper text-champagne/80",
				children
			}),
			align === "center" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-gold/70" })
		]
	});
}
/** The site's single call-to-action treatment: a word and a drawn line. */
function LineLink({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative block h-px w-12 overflow-hidden bg-gold/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
		})]
	});
}
/**
* A scene chapter. Three depth planes move at different rates as the
* visitor scrolls: the photograph (far), a floating numeral (mid), and the
* text (near). The frame is pinned for the duration so it reads like a
* slow camera move rather than a page scroll.
*/
function Chapter({ chapter }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const off = reduced ? 0 : 1;
	const imgY = useTransform(scrollYProgress, [0, 1], [`${-10 * off}%`, `${10 * off}%`]);
	const imgScale = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		1.18,
		1.06,
		1
	].map((v) => reduced ? 1 : v));
	const imgO = useTransform(scrollYProgress, [
		0,
		.25,
		.75,
		1
	], [
		0,
		1,
		1,
		0
	]);
	const numeralY = useTransform(scrollYProgress, [0, 1], [180 * off, -180 * off]);
	const textY = useTransform(scrollYProgress, [
		.15,
		.5,
		.85
	], [
		90 * off,
		0,
		-90 * off
	]);
	const textO = useTransform(scrollYProgress, [
		.15,
		.4,
		.7,
		.9
	], [
		0,
		1,
		1,
		0
	]);
	const ruleScale = useTransform(scrollYProgress, [.25, .6], [0, 1]);
	const veil = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		.85,
		.5,
		.85
	]);
	const right = chapter.align === "right";
	const img = chapter.image ? scenes[chapter.image] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		id: chapter.id,
		className: "relative h-[170vh] md:h-[200vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: imgO },
					className: "absolute inset-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: img,
						alt: "",
						width: 1920,
						height: 1080,
						loading: "lazy",
						decoding: "async",
						style: {
							y: imgY,
							scale: imgScale
						},
						className: "absolute inset-0 h-full w-full object-cover will-change-transform"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: veil },
					className: "absolute inset-0 bg-obsidian"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${right ? "bg-[linear-gradient(270deg,var(--obsidian)_0%,transparent_55%)]" : "bg-[linear-gradient(90deg,var(--obsidian)_0%,transparent_55%)]"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": true,
					style: { y: numeralY },
					className: `pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif font-light leading-none text-ivory/[0.045] text-[52vw] md:text-[30vw] ${right ? "left-[4vw]" : "right-[4vw]"}`,
					children: chapter.numeral
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						y: textY,
						opacity: textO
					},
					className: `absolute inset-0 flex items-end pb-[14vh] md:items-center md:pb-0 ${right ? "justify-start md:justify-end" : "justify-start"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `w-full px-7 md:w-[46vw] md:px-[7vw] ${right ? "md:text-right" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-5 ${right ? "md:flex-row-reverse" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									style: {
										scaleX: ruleScale,
										originX: right ? 1 : 0
									},
									className: "h-px w-14 bg-gold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whisper text-champagne/80",
									children: [
										chapter.numeral,
										" — ",
										chapter.kicker
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-7 font-serif font-light leading-[1.02] tracking-[-0.01em] text-ivory text-[2.6rem] md:text-[4.2vw]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { text: chapter.title })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .25,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-7 max-w-md font-serif text-lg font-light leading-relaxed text-ivory/70 md:text-[1.35rem] md:leading-[1.55]",
									children: chapter.body
								})
							}),
							chapter.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: `mt-8 space-y-2 ${right ? "md:ml-auto" : ""}`,
									children: chapter.details.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "whisper text-ivory/45 !tracking-[0.22em] !normal-case !text-[0.72rem]",
										children: d
									}, d))
								})
							}),
							chapter.link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: chapter.link.to,
									className: "group mt-10 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: chapter.link.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative block h-px w-10 overflow-hidden bg-gold/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
									})]
								})
							})
						]
					})
				})
			]
		})
	});
}
/**
* The opening shot. A pinned frame: as the visitor scrolls, the camera pushes
* slowly into the image while the title lifts away and dissolves.
*/
function CinematicHero({ image, eyebrow, headline, sub, caps = false, quiet = false, inquiry }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const scale = useTransform(scrollYProgress, [0, 1], reduced || quiet ? [1.02, 1.06] : [1.08, 1.3]);
	const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "12%"]);
	const dim = useTransform(scrollYProgress, [0, .8], [quiet ? .6 : .35, .92]);
	const titleY = useTransform(scrollYProgress, [0, .6], reduced ? [0, 0] : [0, -160]);
	const titleO = useTransform(scrollYProgress, [0, .45], [1, 0]);
	const blur = useTransform(scrollYProgress, [0, .5], ["blur(0px)", reduced ? "blur(0px)" : "blur(10px)"]);
	const hintO = useTransform(scrollYProgress, [0, .12], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "relative h-[170vh] md:h-[200vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: image,
					alt: "",
					width: 1920,
					height: 1080,
					fetchPriority: "high",
					decoding: "async",
					style: {
						scale,
						y: imgY
					},
					className: "absolute inset-0 h-full w-full object-cover will-change-transform"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: dim },
					className: "absolute inset-0 bg-obsidian"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--obsidian)_110%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						y: titleY,
						opacity: titleO,
						filter: blur
					},
					className: "absolute inset-0 px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-full max-w-[1500px] flex-col items-center justify-center gap-8 md:flex-row md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[700px] text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: reduced ? false : {
										opacity: 0,
										letterSpacing: "0.7em"
									},
									animate: {
										opacity: 1,
										letterSpacing: "0.42em"
									},
									transition: {
										duration: 1.8,
										ease,
										delay: .3
									},
									className: "whisper text-champagne/80",
									children: eyebrow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: `mt-7 font-serif font-light text-ivory ${caps ? "uppercase tracking-[0.08em] leading-[1.05] text-[9.5vw] md:text-[5.6vw]" : "leading-[0.98] tracking-[-0.01em] text-[13vw] md:text-[7.2vw]"}`,
									children: headline.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "block",
										initial: reduced ? false : {
											opacity: 0,
											y: 40,
											filter: "blur(8px)"
										},
										animate: {
											opacity: 1,
											y: 0,
											filter: "blur(0px)"
										},
										transition: {
											duration: 1.6,
											ease,
											delay: .6 + i * .18
										},
										children: line
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: reduced ? false : { opacity: 0 },
									animate: { opacity: 1 },
									transition: {
										duration: 1.6,
										delay: 1.4
									},
									className: "mt-8 max-w-md font-serif text-xl italic font-light text-ivory/70 md:text-2xl",
									children: sub
								})
							]
						}), inquiry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: reduced ? false : {
								opacity: 0,
								x: 28,
								y: 18
							},
							animate: {
								opacity: 1,
								x: 0,
								y: 0
							},
							transition: {
								duration: 1.2,
								ease,
								delay: .8
							},
							className: "mt-2 block w-full max-w-[500px] md:mt-0",
							children: inquiry
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollIndicator, { opacity: hintO })
			]
		})
	});
}
/** Quiet colophon. Rendered inside the closing frame so every page ends the same way. */
function Footer({ overlay = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: `${overlay ? "absolute inset-x-0 bottom-0" : "relative border-t border-ivory/10 bg-obsidian"} px-7 pb-7 pt-6 md:px-10`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-serif text-lg tracking-[0.2em] text-ivory/80",
						children: brand.mark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper block text-ivory/40",
						children: brand.cities
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Footer",
					className: "hidden flex-wrap gap-x-5 gap-y-2 md:flex md:max-w-xl md:justify-end",
					children: menu.slice(1).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: m.to,
						className: "whisper text-ivory/40 transition-colors hover:text-champagne",
						children: m.label
					}, m.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${brand.email}`,
					className: "whisper text-ivory/40 transition-colors hover:text-champagne",
					children: brand.email
				})
			]
		})
	});
}
/**
* The final frame: the next world's image irises open from the centre as
* the visitor reaches the end, turning the page edge into a doorway.
*/
function Closing({ next }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"]
	});
	const clip = useTransform(scrollYProgress, [.1, .8], reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(48% 30% 48% 30%)", "inset(0% 0% 0% 0%)"]);
	const scale = useTransform(scrollYProgress, [.1, .9], reduced ? [1, 1] : [1.25, 1.02]);
	const textO = useTransform(scrollYProgress, [.55, .85], [0, 1]);
	const textY = useTransform(scrollYProgress, [.55, .85], reduced ? [0, 0] : [40, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "relative h-[150vh] bg-obsidian",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					style: { clipPath: clip },
					className: "absolute inset-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: scenes[next.image],
							alt: "",
							width: 1920,
							height: 1080,
							loading: "lazy",
							decoding: "async",
							style: { scale },
							className: "h-full w-full object-cover will-change-transform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-obsidian/55" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--obsidian)_100%)]" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					style: {
						opacity: textO,
						y: textY
					},
					className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-champagne/80",
						children: "Continue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: next.to,
						className: "group mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-serif font-light leading-none text-ivory text-[13vw] md:text-[7vw] transition-colors duration-700 group-hover:text-champagne",
							children: next.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto mt-6 block h-px w-24 origin-center scale-x-50 bg-gold transition-transform duration-700 group-hover:scale-x-100" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { overlay: true })
			]
		})
	});
}
function Word({ word, i, total, progress, reduced }) {
	const start = .15 + i / total * .6;
	const end = start + .6 / total;
	const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [.16, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
		style: { opacity },
		className: "inline-block",
		children: [word, "\xA0"]
	});
}
/** An interlude: a single sentence that is lit word by word as the reader passes through it. */
function Passage({ text }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const words = text.split(" ");
	const glow = useTransform(scrollYProgress, [
		.2,
		.5,
		.8
	], [
		0,
		1,
		0
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative flex min-h-[110vh] items-center justify-center bg-obsidian px-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: { opacity: glow },
			className: "pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.1_80/0.16),transparent_65%)] blur-3xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "relative max-w-4xl text-center font-serif text-3xl font-light italic leading-[1.3] text-ivory md:text-[3.4vw]",
			children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Word, {
				word: w,
				i,
				total: words.length,
				progress: scrollYProgress,
				reduced
			}, i))
		})]
	});
}
/**
* Reusable world composition: Hero → (chapters) → bespoke sections → Passage → Closing.
* Every route uses this shell so pages open, breathe and end the same way.
*/
function CinematicPage({ world, children, hideChapters = false, heroContent }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
		initial: reduced ? false : { opacity: 0 },
		animate: { opacity: 1 },
		transition: {
			duration: 1.2,
			ease
		},
		className: `relative ${world.opening.quiet ? "bg-[oklch(0.09_0.005_275)]" : "bg-obsidian"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicHero, {
				image: scenes[world.key],
				...world.opening,
				inquiry: heroContent
			}),
			!hideChapters && world.chapters?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chapter, { chapter: c }, c.id)),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Passage, { text: world.passage }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closing, { next: world.next })
		]
	});
}
function worldHead(world) {
	return { meta: [
		{ title: world.seo.title },
		{
			name: "description",
			content: world.seo.description
		},
		{
			property: "og:title",
			content: world.seo.title
		},
		{
			property: "og:description",
			content: world.seo.description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
//#endregion
export { travelProfiles as C, yachtsContent as D, worlds as E, subscriptionContent as S, worldHead as T, menu as _, ScrollTrack as a, residencesContent as b, aviationContent as c, conciergeTypes as d, destinationsContent as f, membershipContent as g, interestOptions as h, Lines as i, brand as l, experiencesContent as m, Kicker as n, SectionReveal as o, ease as p, LineLink as r, aboutContent as s, CinematicPage as t, conciergeTimeframes as u, mobilityContent as v, useCinematicMotion as w, scenes as x, privateContent as y };
