export type InquiryContext = "flights" | "yachts" | "residences";

export type DistanceOption = {
  id: string;
  label: string;
  subtitle: string;
  thresholdNm: number;
  thresholdMiles: number;
};

export type InquiryStep = {
  id: "people" | "where" | "budget";
  label: string;
  title: string;
  helper?: string;
};

export const flightDistanceOptions: DistanceOption[] = [
  { id: "short-hop", label: "Short hop", subtitle: "Up to 150 mi", thresholdNm: 130, thresholdMiles: 150 },
  { id: "regional", label: "Regional", subtitle: "Up to 600 mi", thresholdNm: 520, thresholdMiles: 600 },
  { id: "cross-country", label: "Cross country", subtitle: "Up to 1,500 mi", thresholdNm: 1300, thresholdMiles: 1500 },
  { id: "long-range", label: "Long range", subtitle: "Up to 3,500 mi", thresholdNm: 3030, thresholdMiles: 3500 },
  { id: "intercontinental", label: "Intercontinental", subtitle: "6,000 mi and beyond", thresholdNm: 5200, thresholdMiles: 6000 },
];

export const inquiryConfig = {
  flights: {
    title: "PLAN YOUR JOURNEY",
    intro: "Tell us what you're looking for.",
    resultTitle: "YOUR JOURNEY",
    resultSummary: "Based on your requirements, we've selected a collection of aircraft suited to your journey.",
    steps: [
      { id: "people", label: "People", title: "How many travellers?" },
      { id: "where", label: "Where", title: "Where are you going?" },
      { id: "budget", label: "Budget", title: "What would you like to invest in this journey?" },
    ] as InquiryStep[],
    peopleOptions: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20],
    distanceOptions: flightDistanceOptions,
    cta: "SHOW MY OPTIONS",
    concierge: "SPEAK TO A CONCIERGE",
  },
  yachts: {
    title: "PLAN YOUR ESCAPE",
    intro: "Tell us what kind of passage you have in mind.",
    resultTitle: "YOUR ESCAPE",
    resultSummary: "These charter profiles may suit the rhythm, guest count and style of your voyage.",
    steps: [
      { id: "people", label: "People", title: "How many guests?" },
      { id: "where", label: "Where", title: "What kind of escape?" },
      { id: "budget", label: "Budget", title: "What would you like to invest in this voyage?" },
    ] as InquiryStep[],
    peopleOptions: [2, 4, 6, 8, 10, 12, 16],
    distanceOptions: [
      { id: "weekender", label: "Weekender", subtitle: "Harbour to harbour", thresholdNm: 180, thresholdMiles: 200 },
      { id: "coastal", label: "Coastal", subtitle: "Mediterranean rhythm", thresholdNm: 900, thresholdMiles: 1000 },
      { id: "explorer", label: "Explorer", subtitle: "Cross-border passage", thresholdNm: 1800, thresholdMiles: 2000 },
      { id: "grand-voyage", label: "Grand voyage", subtitle: "Longer horizon", thresholdNm: 3600, thresholdMiles: 4000 },
    ],
    cta: "SHOW MY OPTIONS",
    concierge: "SPEAK TO A CONCIERGE",
  },
  residences: {
    title: "FIND YOUR RESIDENCE",
    intro: "Tell us how the stay should feel.",
    resultTitle: "YOUR RESIDENCE",
    resultSummary: "These residence profiles align with the scale, mood and pace of the stay you describe.",
    steps: [
      { id: "people", label: "People", title: "How many guests?" },
      { id: "where", label: "Where", title: "What kind of setting?" },
      { id: "budget", label: "Budget", title: "What would you like to invest in this stay?" },
    ] as InquiryStep[],
    peopleOptions: [2, 4, 6, 8, 10, 12, 16],
    distanceOptions: [
      { id: "coastal", label: "Coastal", subtitle: "Sea and light", thresholdNm: 250, thresholdMiles: 300 },
      { id: "city", label: "City", subtitle: "Cultural access", thresholdNm: 350, thresholdMiles: 400 },
      { id: "alpine", label: "Alpine", subtitle: "Winter calm", thresholdNm: 700, thresholdMiles: 800 },
      { id: "estate", label: "Estate", subtitle: "Private grounds", thresholdNm: 1200, thresholdMiles: 1300 },
    ],
    cta: "SHOW MY OPTIONS",
    concierge: "SPEAK TO A CONCIERGE",
  },
} as const;

export type InquiryConfig = (typeof inquiryConfig)[InquiryContext];
