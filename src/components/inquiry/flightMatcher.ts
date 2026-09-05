export type AircraftMatch = {
  name: string;
  category: string;
  seats: string;
  range: string;
  cruise: string;
  mission: string;
};

export type AircraftCategory =
  | "Light Jet"
  | "Midsize Jet"
  | "Super-Midsize Jet"
  | "Heavy / Large-Cabin Jet"
  | "VIP Airliner / Widebody";

const aircraftData = [
  { name: "Cessna Citation CJ3+", category: "Light Jet", seats: "6–8", range: "2,040 NM", cruise: "478 MPH", mission: "Regional / short domestic hops" },
  { name: "Embraer Phenom 300E", category: "Light Jet", seats: "6–10", range: "2,010 NM", cruise: "521 MPH", mission: "Fastest light jet; short-to-mid domestic" },
  { name: "Bombardier Learjet 75 Liberty", category: "Light Jet", seats: "6–8", range: "2,080 NM", cruise: "530 MPH", mission: "Quick regional business trips" },
  { name: "HondaJet Elite II", category: "Light Jet", seats: "5–6", range: "1,547 NM", cruise: "489 MPH", mission: "Short hops, owner-operator friendly" },
  { name: "Cessna Citation Latitude", category: "Midsize Jet", seats: "7–9", range: "2,700 NM", cruise: "514 MPH", mission: "Coast-to-coast domestic, flat floor cabin" },
  { name: "Hawker 900XP", category: "Midsize Jet", seats: "7–8", range: "2,930 NM", cruise: "518 MPH", mission: "Domestic transcon, value midsize" },
  { name: "Learjet 60XR", category: "Midsize Jet", seats: "7–8", range: "2,405 NM", cruise: "534 MPH", mission: "Fast midsize domestic" },
  { name: "Bombardier Challenger 350", category: "Super-Midsize Jet", seats: "8–10", range: "3,200 NM", cruise: "541 MPH", mission: "Transcontinental, short international" },
  { name: "Cessna Citation Longitude", category: "Super-Midsize Jet", seats: "8–12", range: "3,500 NM", cruise: "541 MPH", mission: "Transcon plus, quiet cabin" },
  { name: "Gulfstream G280", category: "Super-Midsize Jet", seats: "8–10", range: "3,600 NM", cruise: "559 MPH", mission: "Transcon, high-speed cruise" },
  { name: "Gulfstream G550", category: "Heavy / Large-Cabin Jet", seats: "14–19", range: "6,750 NM", cruise: "561 MPH", mission: "Nonstop intercontinental" },
  { name: "Gulfstream G650ER", category: "Heavy / Large-Cabin Jet", seats: "11–19", range: "7,500 NM", cruise: "610 MPH", mission: "Ultra-long-range, fastest in class" },
  { name: "Bombardier Global 6000", category: "Heavy / Large-Cabin Jet", seats: "13–17", range: "6,000 NM", cruise: "590 MPH", mission: "Long international routes" },
  { name: "Bombardier Global 7500", category: "Heavy / Large-Cabin Jet", seats: "14–19", range: "7,700 NM", cruise: "610 MPH", mission: "Ultra-long-range flagship, 4 living zones" },
  { name: "Dassault Falcon 8X", category: "Heavy / Large-Cabin Jet", seats: "12–16", range: "6,450 NM", cruise: "561 MPH", mission: "Long-range, short-field capability" },
  { name: "Dassault Falcon 7X", category: "Heavy / Large-Cabin Jet", seats: "12–16", range: "5,950 NM", cruise: "561 MPH", mission: "Long-range trijet, steep-approach capable" },
  { name: "Boeing Business Jet (BBJ)", category: "VIP Airliner / Widebody", seats: "25–50", range: "6,190 NM", cruise: "541 MPH", mission: "Heads of state, large delegations" },
  { name: "Airbus ACJ319/320", category: "VIP Airliner / Widebody", seats: "19–50", range: "6,000+ NM", cruise: "541 MPH", mission: "Corporate delegations, VVIP configuration" },
] as const;

const distanceThresholds = {
  "short-hop": 130,
  regional: 520,
  "cross-country": 1300,
  "long-range": 3030,
  intercontinental: 5200,
} as const;

function parseSeatRange(seats: string) {
  const [min, max] = seats.split("–").map((n) => Number.parseInt(n.replace(/[^0-9]/g, ""), 10));
  return { min, max };
}

function parseRangeNm(range: string) {
  return Number.parseInt(range.replace(/[^0-9]/g, ""), 10);
}

export function matchAircraft({ travellers, distanceId, category }: { travellers: number; distanceId: string; category?: AircraftCategory }) {
  const threshold = distanceThresholds[distanceId as keyof typeof distanceThresholds] ?? 130;

  const matches = aircraftData
    .filter((aircraft) => !category || aircraft.category === category)
    .map((aircraft) => {
      const { min, max } = parseSeatRange(aircraft.seats);
      const rangeNm = parseRangeNm(aircraft.range);
      const seatFit = travellers <= max && travellers >= min;
      const rangeFit = rangeNm >= threshold;
      const seatScore = Math.max(0, (max - travellers) * 1.4 + 12);
      const rangeScore = Math.max(0, (rangeNm - threshold) / 120);
      return { aircraft, seatFit, rangeFit, score: seatFit ? seatScore + rangeScore : 0 };
    })
    .filter((entry) => entry.seatFit && entry.rangeFit)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.aircraft);

  if (matches.length >= 4) return matches.slice(0, 4);

  const fallback = aircraftData
    .filter((aircraft) => !category || aircraft.category === category)
    .map((aircraft) => {
      const { min, max } = parseSeatRange(aircraft.seats);
      const rangeNm = parseRangeNm(aircraft.range);
      const seatFit = travellers <= max;
      const rangeFit = rangeNm >= threshold * 0.7;
      const score = Math.max(0, (travellers - min) * 2 + (rangeNm / 100));
      return { aircraft, seatFit, rangeFit, score };
    })
    .filter((entry) => entry.seatFit && entry.rangeFit)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.aircraft);

  return fallback.slice(0, 4);
}

export function getAircraftCategoryOptions(): { id: AircraftCategory; label: string }[] {
  return [
    { id: "Light Jet", label: "LIGHT JET" },
    { id: "Midsize Jet", label: "MIDSIZE JET" },
    { id: "Super-Midsize Jet", label: "SUPER-MIDSIZE JET" },
    { id: "Heavy / Large-Cabin Jet", label: "HEAVY / LARGE-CABIN JET" },
    { id: "VIP Airliner / Widebody", label: "VIP AIRLINER / WIDEBODY" },
  ];
}

export function getSuggestedFlightsForRange(distanceId: string) {
  const threshold = distanceThresholds[distanceId as keyof typeof distanceThresholds] ?? 130;
  return aircraftData
    .filter((aircraft) => parseRangeNm(aircraft.range) >= threshold)
    .slice(0, 4);
}
