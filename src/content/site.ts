import home from "@/assets/scenes/home.jpg";
import aviation from "@/assets/scenes/aviation.jpg";
import yachts from "@/assets/scenes/yachts.jpg";
import mobility from "@/assets/scenes/mobility.jpg";
import residences from "@/assets/scenes/residences.jpg";
import experiences from "@/assets/scenes/experiences.jpg";
import destinations from "@/assets/scenes/destinations.jpg";
import membership from "@/assets/scenes/membership.jpg";
import privateImg from "@/assets/scenes/private.jpg";
import concierge from "@/assets/scenes/concierge.jpg";
import about from "@/assets/scenes/about.jpg";
import access from "@/assets/scenes/access.jpg";

import yExplorer from "@/assets/yachts/explorer.jpg";
import yClassic from "@/assets/yachts/classic.jpg";
import ySail from "@/assets/yachts/sail.jpg";
import rComporta from "@/assets/residences/comporta.jpg";
import rMayfair from "@/assets/residences/mayfair.jpg";
import rGstaad from "@/assets/residences/gstaad.jpg";
import eGallery from "@/assets/experiences/gallery.jpg";
import eSpa from "@/assets/experiences/spa.jpg";
import dMonaco from "@/assets/destinations/monaco.jpg";
import dDubai from "@/assets/destinations/dubai.jpg";
import dMaldives from "@/assets/destinations/maldives.jpg";
import dMykonos from "@/assets/destinations/mykonos.jpg";
import dIbiza from "@/assets/destinations/ibiza.jpg";
import dLondon from "@/assets/destinations/london.jpg";
import dParis from "@/assets/destinations/paris.jpg";
import dNewYork from "@/assets/destinations/newyork.jpg";
import dTokyo from "@/assets/destinations/tokyo.jpg";
import dAlps from "@/assets/destinations/alps.jpg";

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */

export const scenes = {
  home,
  aviation,
  yachts,
  mobility,
  residences,
  experiences,
  destinations,
  membership,
  private: privateImg,
  concierge,
  about,
  access,
  yExplorer,
  yClassic,
  ySail,
  rComporta,
  rMayfair,
  rGstaad,
  eGallery,
  eSpa,
} as const;

export type SceneKey = keyof typeof scenes;

export type WorldPath =
  | "/"
  | "/aviation"
  | "/yachts"
  | "/mobility"
  | "/residences"
  | "/experiences"
  | "/destinations"
  | "/membership"
  | "/private"
  | "/concierge"
  | "/about"
  | "/request-access";

/* ------------------------------------------------------------------ */
/* Brand & navigation                                                  */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "HELITEJET",
  mark: "HJ",
  tagline: "Private aviation, reimagined.",
  email: "concierge@helitejet.com",
  phone: "+44 20 7946 0330",
  cities: "London · Monaco · Dubai · New York",
};

export const menu: { to: WorldPath; label: string; image: SceneKey; numeral: string }[] = [
  { to: "/", label: "Overture", image: "home", numeral: "01" },
  { to: "/aviation", label: "Aviation", image: "aviation", numeral: "02" },
  { to: "/yachts", label: "Yachts", image: "yachts", numeral: "03" },
  { to: "/mobility", label: "Mobility", image: "mobility", numeral: "04" },
  { to: "/residences", label: "Residences", image: "residences", numeral: "05" },
  { to: "/experiences", label: "Experiences", image: "experiences", numeral: "06" },
  { to: "/destinations", label: "Destinations", image: "destinations", numeral: "07" },
  { to: "/membership", label: "Membership", image: "membership", numeral: "08" },
  { to: "/private", label: "HELITEJET Private", image: "private", numeral: "09" },
  { to: "/concierge", label: "Concierge", image: "concierge", numeral: "10" },
  { to: "/about", label: "About", image: "about", numeral: "11" },
  { to: "/request-access", label: "Request Access", image: "access", numeral: "12" },
];

/* ------------------------------------------------------------------ */
/* World shells (hero / passage / next)                                */
/* ------------------------------------------------------------------ */

export type Chapter = {
  id: string;
  numeral: string;
  kicker: string;
  title: string;
  body: string;
  image?: SceneKey;
  details?: string[];
  align?: "left" | "right";
  link?: { to: WorldPath; label: string };
};

export type World = {
  key: SceneKey;
  path: WorldPath;
  name: string;
  seo: { title: string; description: string };
  opening: { eyebrow: string; headline: string; sub: string; caps?: boolean; quiet?: boolean };
  chapters?: Chapter[];
  passage: string;
  next: { to: WorldPath; name: string; image: SceneKey };
};

export const worlds = {
  home: {
    key: "home",
    path: "/",
    name: "Overture",
    seo: {
      title: "HELITEJET — Private Aviation, Reimagined",
      description:
        "Private jets, helicopters, yachts, residences and experiences composed as one seamless world for a small circle of members.",
    },
    opening: {
      eyebrow: "HELITEJET",
      headline: "Private aviation,\nreimagined.",
      sub: "One circle. Every horizon. Nothing in between.",
      caps: true,
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
        link: { to: "/aviation", label: "Enter Aviation" },
      },
      {
        id: "yachts",
        numeral: "II",
        kicker: "Yachts",
        title: "Anchor\nwhere the map ends.",
        body: "A curated fleet from forty to a hundred and twenty metres, each with a crew who already knows how you take your coffee.",
        image: "yachts",
        align: "right",
        link: { to: "/yachts", label: "Enter Yachts" },
      },
      {
        id: "mobility",
        numeral: "III",
        kicker: "Mobility",
        title: "Air. Ground.\nSea. Air.",
        body: "Chauffeurs, rotorcraft and tenders choreographed by one desk so the journey between journeys disappears.",
        image: "mobility",
        align: "left",
        link: { to: "/mobility", label: "Enter Mobility" },
      },
      {
        id: "residences",
        numeral: "IV",
        kicker: "Residences",
        title: "Homes that\nwait for you.",
        body: "Villas, penthouses and chalets kept warm, stocked and staffed in the places you return to.",
        image: "residences",
        align: "right",
        link: { to: "/residences", label: "Enter Residences" },
      },
      {
        id: "experiences",
        numeral: "V",
        kicker: "Experiences",
        title: "Evenings\nthat do not exist\nelsewhere.",
        body: "Closed museums, chefs flown in for one table, coastlines emptied for a single anchorage. Composed, never listed.",
        image: "experiences",
        align: "left",
        link: { to: "/experiences", label: "Enter Experiences" },
      },
      {
        id: "destinations",
        numeral: "VI",
        kicker: "Destinations",
        title: "Ten portals.\nKnown deeply.",
        body: "Monaco to Tokyo, the Maldives to the Alps: a private atlas with a person on the ground in each.",
        image: "destinations",
        align: "right",
        link: { to: "/destinations", label: "Enter Destinations" },
      },
      {
        id: "membership",
        numeral: "VII",
        kicker: "Membership",
        title: "A circle,\nnot a client list.",
        body: "Three hundred members, known by voice. Places open by introduction and by conversation, never by checkout.",
        image: "membership",
        align: "left",
        link: { to: "/membership", label: "Enter Membership" },
      },
      {
        id: "private",
        numeral: "VIII",
        kicker: "HELITEJET Private",
        title: "The inner\nroom.",
        body: "Forty seats. Guaranteed aircraft, permanent crew, a desk that never closes. By invitation only.",
        image: "private",
        align: "right",
        link: { to: "/private", label: "Enter Private" },
      },
      {
        id: "concierge",
        numeral: "IX",
        kicker: "Concierge",
        title: "Ask once.",
        body: "One person, one message, one answer within the hour. The desk is the whole company, spoken through a single voice.",
        image: "concierge",
        align: "left",
        link: { to: "/concierge", label: "Reach the Desk" },
      },
    ],
    passage:
      "Luxury is not the presence of more. It is the absence of everything that stands between you and the moment.",
    next: { to: "/request-access", name: "Request Access", image: "access" },
  },

  aviation: {
    key: "aviation",
    path: "/aviation",
    name: "Aviation",
    seo: {
      title: "Private Aviation — HELITEJET",
      description:
        "Long-range jets, helicopters and dedicated crews across a network of four continents, positioned for departure within the hour.",
    },
    opening: { eyebrow: "Chapter Two", headline: "Aviation", sub: "The sky, held in readiness." },
    passage: "The most valuable thing in the air is not speed. It is the certainty that nothing will need your attention.",
    next: { to: "/yachts", name: "Yachts", image: "yachts" },
  },

  yachts: {
    key: "yachts",
    path: "/yachts",
    name: "Yachts",
    seo: {
      title: "Yachts — HELITEJET",
      description: "A curated fleet of explorer, classic and sailing yachts from forty to one hundred and twenty metres, crewed for members.",
    },
    opening: { eyebrow: "Chapter Three", headline: "Yachts", sub: "Anchor where the map ends." },
    passage: "At sea, the only schedule is the one written by the light.",
    next: { to: "/mobility", name: "Mobility", image: "mobility" },
  },

  mobility: {
    key: "mobility",
    path: "/mobility",
    name: "Mobility",
    seo: {
      title: "Mobility — HELITEJET",
      description: "Air to ground to sea and back: chauffeured cars, rotorcraft and tenders choreographed by one desk.",
    },
    opening: { eyebrow: "Chapter Four", headline: "Mobility", sub: "Air. Ground. Sea. Air." },
    passage: "Movement, done properly, feels like standing still while the world rearranges itself.",
    next: { to: "/residences", name: "Residences", image: "residences" },
  },

  residences: {
    key: "residences",
    path: "/residences",
    name: "Residences",
    seo: {
      title: "Residences — HELITEJET",
      description: "Private villas, penthouses and chalets kept warm, stocked and staffed for members in the places they return to.",
    },
    opening: { eyebrow: "Chapter Five", headline: "Residences", sub: "Homes that wait for you." },
    passage: "A house becomes a home when it remembers you.",
    next: { to: "/experiences", name: "Experiences", image: "experiences" },
  },

  experiences: {
    key: "experiences",
    path: "/experiences",
    name: "Experiences",
    seo: {
      title: "Experiences — HELITEJET",
      description: "Gastronomy, art, wellness, adventure, sport, celebration and craft, composed privately for members and never listed.",
    },
    opening: { eyebrow: "Chapter Six", headline: "Experiences", sub: "An editorial of evenings that do not exist elsewhere." },
    passage: "The rarest luxury is a memory no one else has.",
    next: { to: "/destinations", name: "Destinations", image: "destinations" },
  },

  destinations: {
    key: "destinations",
    path: "/destinations",
    name: "Destinations",
    seo: {
      title: "Destinations — HELITEJET",
      description: "Ten portals: Monaco, Dubai, Maldives, Mykonos, Ibiza, London, Paris, New York, Tokyo and the Swiss Alps, each with a HELITEJET presence on the ground.",
    },
    opening: { eyebrow: "Chapter Seven", headline: "Destinations", sub: "Ten portals. Known deeply." },
    passage: "A destination is not a place. It is a person who knows it.",
    next: { to: "/membership", name: "Membership", image: "membership" },
  },

  membership: {
    key: "membership",
    path: "/membership",
    name: "Membership",
    seo: {
      title: "Membership — HELITEJET",
      description: "Membership of HELITEJET is by invitation and application. A circle of three hundred, one standard of discretion.",
    },
    opening: { eyebrow: "Chapter Eight", headline: "Membership", sub: "A circle, not a client list." },
    passage: "We would rather know three hundred people well than three thousand by name.",
    next: { to: "/private", name: "HELITEJET Private", image: "private" },
  },

  private: {
    key: "private",
    path: "/private",
    name: "HELITEJET Private",
    seo: {
      title: "HELITEJET Private",
      description: "The inner tier: guaranteed aircraft, permanently assigned crew and residences, and a desk that never closes. By invitation.",
    },
    opening: { eyebrow: "Chapter Nine", headline: "Private", sub: "The inner room.", quiet: true },
    passage: "Discretion is not a service. It is the room the service is delivered in.",
    next: { to: "/concierge", name: "Concierge", image: "concierge" },
  },

  concierge: {
    key: "concierge",
    path: "/concierge",
    name: "Concierge",
    seo: {
      title: "Concierge — HELITEJET",
      description: "Reach the HELITEJET desk. One request, one person, one answer within the hour.",
    },
    opening: { eyebrow: "Chapter Ten", headline: "Concierge", sub: "Ask once." },
    passage: "The right answer, once, is worth more than every option.",
    next: { to: "/about", name: "About", image: "about" },
  },

  about: {
    key: "about",
    path: "/about",
    name: "About",
    seo: {
      title: "About — HELITEJET",
      description: "The idea, the standard, the network, the people and the future of HELITEJET.",
    },
    opening: { eyebrow: "Chapter Eleven", headline: "About", sub: "Why this exists." },
    passage: "We built the company we wished had answered the phone.",
    next: { to: "/request-access", name: "Request Access", image: "access" },
  },

  access: {
    key: "access",
    path: "/request-access",
    name: "Request Access",
    seo: {
      title: "Request Access — HELITEJET",
      description: "Begin a conversation with the HELITEJET desk about membership.",
    },
    opening: { eyebrow: "Chapter Twelve", headline: "Request\nAccess", sub: "The door is ajar." },
    passage: "Every member arrived here the same way: someone picked up the phone.",
    next: { to: "/", name: "Overture", image: "home" },
  },
} satisfies Record<string, World>;

/* ------------------------------------------------------------------ */
/* Page-specific editorial content                                     */
/* ------------------------------------------------------------------ */

export const aviationContent = {
  intro: {
    kicker: "Global Private Jets",
    title: "Twelve airframes.\nOne standard.",
    body: "Ultra-long-range for the Atlantic at dinner, mid-size for the Alps at dawn. Every cabin appointed in ivory hide and dark walnut; every crew flown with you before.",
  },
  jets: [
    { name: "Global 7500", range: "7,700 nm", seats: "Up to 14", note: "London to Los Angeles, non-stop, with a full night's sleep." },
    { name: "Falcon 8X", range: "6,450 nm", seats: "Up to 12", note: "Short-field certified: Gstaad-Saanen and London City without compromise." },
    { name: "Praetor 600", range: "4,018 nm", seats: "Up to 9", note: "The European day-trip, flown in silence at 45,000 feet." },
  ],
  helicopters: {
    kicker: "Helicopters",
    title: "The last\nthirty miles.",
    body: "Twin-engine rotorcraft with leather cabins and noise-cancelled headsets bridge rooftop to runway, vineyard to harbour, slope to spa. Nine minutes replaces ninety.",
    fleet: ["AW139 · Eight seats · IFR", "H160 · Six seats · Quietest in class", "Bell 429 · Six seats · Alpine rated"],
  },
  network: {
    kicker: "The Network",
    title: "Positioned,\nnot promised.",
    body: "Aircraft are pre-positioned to member movements each season. Crews rest on rotation in four hubs, customs is met on the apron, and slots are held before you decide.",
    lines: [
      ["Hubs", "London · Monaco · Dubai · New York"],
      ["Reach", "Four continents · 1,900 airfields"],
      ["Readiness", "Sixty minutes from the call"],
      ["Continuity", "Two captains and a cabin lead assigned for the year"],
    ],
  },
  cta: { label: "Request an aircraft", to: "/request-access" as WorldPath },
};

export const yachtsContent = {
  intro: {
    kicker: "The Fleet",
    title: "Three hulls\nfor three kinds of sea.",
    body: "Owner standard between charters, crew ratio never below one-to-one, and captains who draw the route only after they have listened.",
  },
  fleet: [
    { name: "Meridian", type: "Explorer", length: "72 m", guests: "12 guests · 22 crew", waters: "High latitudes · Indian Ocean", image: "yExplorer" as SceneKey, note: "Ice-class hull, helideck, submersible garage. Built for the coasts that appear on no brochure." },
    { name: "Sabine", type: "Classic Motor Yacht", length: "48 m", guests: "10 guests · 11 crew", waters: "Riviera · Balearics · Aegean", image: "yClassic" as SceneKey, note: "Navy hull, teak decks, a cellar of 400 bottles and a chef who trained in Menton." },
    { name: "Aurelia", type: "Sailing Yacht", length: "56 m", guests: "8 guests · 9 crew", waters: "Caribbean · Atlantic crossings", image: "ySail" as SceneKey, note: "Carbon rig, dark sails, silence at twelve knots. For those who prefer the wind to have a say." },
  ],
  arrival: {
    kicker: "Arrival",
    title: "The jet lands.\nThe tender is already waiting.",
    body: "Aviation and yachts are one department here. Your luggage moves from cabin to stateroom without passing through your hands.",
  },
  cta: { label: "Explore the fleet with the desk", to: "/concierge" as WorldPath },
};

export const mobilityContent = {
  sequence: [
    { stage: "AIR", title: "Touchdown, 06:40.", body: "The jet taxis to a private apron. Immigration meets you in the cabin. The door opens onto a car, not a terminal.", image: "home" as SceneKey },
    { stage: "GROUND", title: "The quiet car.", body: "Armoured or unarmoured, driven by people trained in silence as much as evasive technique. Luggage and pets travel separately and arrive first.", image: "mobility" as SceneKey },
    { stage: "SEA", title: "Quay to stateroom.", body: "A tender idles at the harbour wall. The captain has your itinerary; the chef has your allergies; the cabin is at nineteen degrees.", image: "yachts" as SceneKey },
    { stage: "AIR", title: "Lift, again.", body: "A helicopter on the aft deck for the vineyard lunch. Nine minutes over water. You never touched a door handle all day.", image: "aviation" as SceneKey },
  ],
  principle: {
    kicker: "Choreography",
    title: "You never\nwait for a door.",
    body: "Every handover, from villa to car to helideck to cabin to tender, is timed by one desk. You notice only that you have arrived.",
  },
  cta: { label: "Arrange a journey", to: "/concierge" as WorldPath },
};

export const residencesContent = {
  properties: [
    { name: "Casa das Dunas", place: "Comporta, Portugal", sleeps: "Sleeps 10", image: "rComporta" as SceneKey, lines: ["Thatched pavilions among stone pines", "Private boardwalk to an empty Atlantic beach", "House manager, chef and rider for the estate's horses"] },
    { name: "The Curzon Penthouse", place: "Mayfair, London", sleeps: "Sleeps 6", image: "rMayfair" as SceneKey, lines: ["Corner glass over Mayfair rooftops", "Walnut library, private lift, Steinway", "Housekeeper in residence, driver on call"] },
    { name: "Chalet Oberbort", place: "Gstaad, Switzerland", sleeps: "Sleeps 14", image: "rGstaad" as SceneKey, lines: ["Ski-in from the Eggli via private trail", "Indoor pool, hammam, cinema, wine cave", "Alpine chef and guide for the season"] },
    { name: "Villa Penya", place: "Ibiza, Spain", sleeps: "Sleeps 8", image: "residences" as SceneKey, lines: ["Travertine terrace above a dark sea", "Sunset to the west, silence to the east", "Boat and skipper moored below"] },
  ],
  stewardship: {
    kicker: "House",
    title: "Staffed\nbefore you land.",
    body: "Managers, chefs and housekeepers arrive twenty-four hours ahead. Your wines are in the cellar, the linen thread count is correct, and the piano is tuned.",
  },
  cta: { label: "Ask about a residence", to: "/concierge" as WorldPath },
};

export const experiencesContent = {
  features: [
    { category: "Gastronomy", title: "One chef. One table. One night.", dek: "A three-star kitchen flown to a headland; a cellar opened for the first time in a decade.", image: "experiences" as SceneKey, size: "wide" },
    { category: "Art & Culture", title: "After the museum has emptied.", dek: "Galleries, ateliers and archives opened privately, with the curator in the room and no one else.", image: "eGallery" as SceneKey, size: "tall" },
    { category: "Wellness", title: "Steam, snow, silence.", dek: "An alpine spa closed for the week. Practitioners flown in. Nothing scheduled before ten.", image: "eSpa" as SceneKey, size: "tall" },
    { category: "Adventure", title: "Wilderness with the difficulty removed.", dek: "Polar crossings and desert nights from private camps that did not exist the week before.", image: "destinations" as SceneKey, size: "wide" },
    { category: "Sport & Motorsport", title: "Paddock, pit wall, podium.", dek: "Grand Prix weekends from the inside; a private circuit day with a works driver beside you.", image: "mobility" as SceneKey, size: "square" },
    { category: "Celebrations", title: "A coastline, emptied.", dek: "Birthdays and weddings on a yacht, an island or a rooftop, staged so the only guests are yours.", image: "yachts" as SceneKey, size: "square" },
    { category: "Fashion & Craft", title: "The atelier, after hours.", dek: "Bespoke commissions with the maker's hands in view: watchmakers, bootmakers, couturiers.", image: "membership" as SceneKey, size: "square" },
    { category: "Nature & Wildlife", title: "The migration, from a private camp.", dek: "The Mara at dawn with no other vehicle in sight; the camp struck before anyone else arrives.", image: "about" as SceneKey, size: "wide" },
  ],
  cta: { label: "Compose an experience", to: "/concierge" as WorldPath },
};

export const destinationsContent = {
  portals: [
    { name: "Monaco", region: "Côte d'Azur", season: "May — September", line: "Port Hercule berths held for the Grand Prix; a terrace above the Rock for the fireworks.", image: dMonaco },
    { name: "Dubai", region: "United Arab Emirates", season: "November — March", line: "Rooftop to desert camp by helicopter in eighteen minutes; the dunes emptied for dinner.", image: dDubai },
    { name: "Maldives", region: "Indian Ocean", season: "December — April", line: "A private island in the Baa Atoll, reached by seaplane, with a reef that no one else dives.", image: dMaldives },
    { name: "Mykonos", region: "Cyclades", season: "June — September", line: "A villa above Agios Sostis, a caïque to Delos at dawn before the ferries arrive.", image: dMykonos },
    { name: "Ibiza", region: "Balearics", season: "May — October", line: "The quiet north: a finca in the hills, a boat below, and Es Vedrà at sunset.", image: dIbiza },
    { name: "London", region: "United Kingdom", season: "All year", line: "A Mayfair penthouse, a member's table at three houses, and a driver who knows the back streets.", image: dLondon },
    { name: "Paris", region: "France", season: "All year", line: "A Left Bank apartment, private hours in the great museums, a couturier's atelier after six.", image: dParis },
    { name: "New York", region: "United States", season: "September — December", line: "Downtown from the West 30th heliport in seven minutes; a Tribeca loft with a chef in residence.", image: dNewYork },
    { name: "Tokyo", region: "Japan", season: "March — April · November", line: "A ryokan in Aoyama, counters with eight seats, and a guide who has lived there thirty years.", image: dTokyo },
    { name: "Swiss Alps", region: "Gstaad · St. Moritz · Zermatt", season: "December — April", line: "Chalet, heli-ski, spa and a table at the Chesery, all on one call.", image: dAlps },
  ],
  cta: { label: "Ask about a destination", to: "/concierge" as WorldPath },
};

export const membershipContent = {
  intro: {
    kicker: "The Circle",
    title: "Three hundred\nmembers. No more.",
    body: "We cap the circle so that every member is known to the desk by voice. Places open only as they are relinquished, and are offered by introduction.",
  },
  path: [
    { step: "I", title: "Introduction", body: "By an existing member, or by your own request through this site. Either begins the same way." },
    { step: "II", title: "Conversation", body: "A call with a desk lead, at an hour you choose, to understand how you live and whether we can be useful. Nothing is sold on the call." },
    { step: "III", title: "Invitation", body: "If the fit is right, an invitation follows in writing. It is valid for a season and may be declined without consequence." },
    { step: "IV", title: "The Circle", body: "A single desk lead is assigned to you. From that day, one message moves anything in this world." },
  ],
  tiers: [
    { name: "Member", body: "Every world in this site: aviation, yachts, mobility, residences, experiences and destinations, arranged by a dedicated desk lead." },
    { name: "HELITEJET Private", body: "Guaranteed aircraft, permanent crew and residence, and a desk that never closes. Forty seats. By invitation after a year in the circle.", to: "/private" as WorldPath },
  ],
  cta: { label: "Request access", to: "/request-access" as WorldPath },
};

export const privateContent = {
  statements: [
    { numeral: "I", title: "Your aircraft. Your crew. Your hour.", body: "Guaranteed lift on the fleet with no notice period. The same captains, the same cabin lead, the same aircraft where possible, for the year." },
    { numeral: "II", title: "One voice, at any hour.", body: "A single desk lead reachable every hour of every day, with authority to move anything in this world on your word alone." },
    { numeral: "III", title: "Forty seats. By invitation only.", body: "HELITEJET Private is not applied for. Members are invited after a year in the circle, or on the introduction of an existing Private member." },
  ],
  cta: { label: "Begin with Membership", to: "/membership" as WorldPath },
};

export const aboutContent = {
  sections: [
    { id: "idea", kicker: "The Idea", title: "Founded on\na missed connection.", body: "HELITEJET began when a founder's jet landed on time, the car did not come, and the yacht sailed without her. Every department here exists so that never happens to a member. Aviation, yachts, mobility, residences and experiences are one company because a life is one journey.", image: "about" as SceneKey },
    { id: "standard", kicker: "The Standard", title: "Owned.\nCapped.\nUnadvertised.", body: "We own what we fly and sail, so the standard is ours to keep. We cap who we serve, so every member is known. And we never advertise, because the people who should find us already have.", image: "aviation" as SceneKey },
    { id: "network", kicker: "The Network", title: "Four hubs.\nSixty places.", body: "London, Monaco, Dubai and New York hold the aircraft and the desks. Sixty destinations hold a person who lives there and answers before the phone rings.", image: "destinations" as SceneKey },
    { id: "people", kicker: "The People", title: "Two hundred\nand forty.", body: "Captains, crew, house managers, chefs and desk leads. Most have been with us since the first year. All are employed, not contracted, and every one of them can say no on your behalf.", image: "private" as SceneKey },
    { id: "future", kicker: "The Future", title: "Quieter,\nnot bigger.", body: "The next decade brings sustainable fuel across the fleet, two more residences a year, and no more than forty additional members. Growth is measured in how little you have to ask for.", image: "home" as SceneKey },
  ],
  cta: { label: "Begin a conversation", to: "/request-access" as WorldPath },
};

export const interestOptions = [
  "Private Aviation",
  "Yachts",
  "Mobility",
  "Residences",
  "Experiences",
  "Destinations",
  "Membership",
  "HELITEJET Private",
  "Concierge",
] as const;

export const travelProfiles = [
  "Occasional — a few journeys a year",
  "Frequent — monthly",
  "Constant — weekly or more",
  "Family office",
  "Corporate principal",
] as const;

export const conciergeTypes = ["Aviation", "Yachts", "Mobility", "Residences", "Experiences", "Destinations", "Other"] as const;
export const conciergeTimeframes = ["Today", "Within the week", "Within the month", "Planning ahead"] as const;
