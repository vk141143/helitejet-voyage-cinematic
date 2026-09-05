import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optional = z.string().trim().max(200).optional().or(z.literal(""));

const accessSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: optional,
  location: optional,
  interest: optional,
  travel_profile: optional,
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const conciergeSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: optional,
  request_type: optional,
  timeframe: optional,
  message: z.string().trim().min(4).max(4000),
});

export type AccessInput = z.infer<typeof accessSchema>;
export type ConciergeInput = z.infer<typeof conciergeSchema>;

const opt = (v: string | undefined) => (v ? v : null);

export const submitAccessRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => accessSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("access_requests").insert({
      full_name: data.full_name,
      email: data.email,
      phone: opt(data.phone),
      residence: opt(data.location),
      interest: opt(data.interest),
      travel_profile: opt(data.travel_profile),
      note: opt(data.message),
    });
    if (error) {
      console.error("access_requests insert failed", error);
      throw new Error("We could not record your request. Please try again.");
    }
    return { ok: true as const };
  });

export const submitConciergeRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => conciergeSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("concierge_requests").insert({
      full_name: data.full_name,
      email: data.email,
      phone: opt(data.phone),
      request_type: opt(data.request_type),
      timeframe: opt(data.timeframe),
      message: data.message,
    });
    if (error) {
      console.error("concierge_requests insert failed", error);
      throw new Error("We could not deliver your message. Please try again.");
    }
    return { ok: true as const };
  });
