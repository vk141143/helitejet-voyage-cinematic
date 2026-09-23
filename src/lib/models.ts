// Shared domain models — extend as the backend schema grows.

export type ServiceKey =
  | "AVIATION"
  | "YACHTS"
  | "MOBILITY"
  | "RESIDENCES"
  | "EXPERIENCES"
  | "CONCIERGE";

export type TripType = "ONE_WAY" | "ROUND_TRIP";

export type RequestStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "QUOTED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";
