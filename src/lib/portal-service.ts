// Portal service — stub for public inquiry submissions (no Supabase dependency)

export type RequestPayload = {
  customerId: string;
  service: string;
  serviceType: string;
  modelOrOption: string;
  passengersOrGuests: number;
  departure?: string;
  destination: string;
  startDate: string;
  endDate?: string;
  travelTime?: string;
  tripType: "ONE_WAY" | "ROUND_TRIP";
  budget?: number;
  currency: string;
  requirements?: string;
  customerDetails: { name: string; email: string; phone: string; country: string };
  documents: { name: string; type: string; mimeType: string; size: number }[];
  source: string;
};

export type RequestRecord = RequestPayload & { id: string; createdAt: string };

export const requestRepository = {
  async create(payload: RequestPayload): Promise<RequestRecord> {
    // In production wire this to your backend / Supabase edge function.
    // For now we simulate a successful submission so the UI flow works end-to-end.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      ...payload,
      id: `HJ-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
  },
};
