ALTER TABLE public.access_requests ADD COLUMN IF NOT EXISTS travel_profile TEXT;
ALTER TABLE public.concierge_requests ADD COLUMN IF NOT EXISTS timeframe TEXT;