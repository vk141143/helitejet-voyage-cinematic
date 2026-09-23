import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  { code: "HORIZON", name: "The Horizon Club", price: 2500, description: "Priority access across aviation, mobility and destinations." },
  { code: "RESERVE", name: "The Reserve Club", price: 5000, description: "Stronger preference across jets, yachts and personal logistics." },
  { code: "HOUSE", name: "The House Club", price: 10000, description: "Complete continuity across homes, aircraft and multi-destination living." },
] as const;

const creditOptions = [
  { credits: 1000, price: 25 },
  { credits: 2500, price: 60 },
  { credits: 5000, price: 110 },
] as const;

export function SubscriptionPurchase() {
  const { user } = useAuth();
  const [current, setCurrent] = useState<{ subscription_status: string; subscription_plan: string | null; credits_remaining: number } | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState("");

  useEffect(() => {
    if (!user) return;
    void supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining").eq("customer_id", user.id).maybeSingle()
      .then(({ data }) => setCurrent(data));
  }, [user]);

  async function subscribe(planCode: string) {
    if (!user) { setMessage("Sign in to choose a subscription."); return; }
    setBusy(planCode); setMessage("");
    const { error } = await supabase.rpc("purchase_subscription", { plan_code: planCode });
    setMessage(error ? error.message : "Subscription added to your account. Booking is now enabled.");
    if (!error) {
      const plan = plans.find((item) => item.code === planCode);
      setCurrent({ subscription_status: "ACTIVE", subscription_plan: plan?.name ?? planCode, credits_remaining: current?.credits_remaining ?? 0 });
    }
    setBusy("");
  }

  async function buyCredits(credits: number) {
    if (!user) { setMessage("Sign in to choose credits."); return; }
    setBusy(`credits-${credits}`); setMessage("");
    const { error } = await supabase.rpc("purchase_credits", { credit_amount: credits });
    setMessage(error ? error.message : `${credits.toLocaleString()} enquiry credits added to your account.`);
    if (!error) setCurrent({ subscription_status: current?.subscription_status ?? "NONE", subscription_plan: current?.subscription_plan ?? null, credits_remaining: (current?.credits_remaining ?? 0) + credits });
    setBusy("");
  }

  return (
    <div className="space-y-16">
      <section id="plans" className="scroll-mt-10">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="whisper text-champagne">BOOKING ACCESS</p><h2 className="mt-2 font-serif text-4xl font-light text-ivory">Choose a subscription</h2></div>
          <p className="text-sm text-ivory/45">Subscription access enables flight bookings.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.code} className="border border-ivory/10 bg-white/[0.03] p-6">
              <p className="whisper text-champagne">{plan.code}</p>
              <h3 className="mt-6 font-serif text-2xl text-ivory">{plan.name}</h3>
              <p className="mt-4 min-h-12 text-sm leading-6 text-ivory/55">{plan.description}</p>
              <p className="mt-7 font-serif text-3xl text-ivory">${(plan.price / 100).toLocaleString()}<span className="text-sm text-ivory/40"> / year</span></p>
              <button type="button" onClick={() => void subscribe(plan.code)} disabled={!!busy} className="mt-7 w-full border border-champagne/50 px-4 py-3 whisper text-champagne disabled:opacity-40">
                {busy === plan.code ? "UPDATING..." : "CHOOSE PLAN ->"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="credits" className="scroll-mt-10 border-t border-ivory/10 pt-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="whisper text-champagne">ENQUIRY ACCESS</p><h2 className="mt-2 font-serif text-4xl font-light text-ivory">Buy enquiry credits</h2></div>
          <p className="text-sm text-ivory/45">Credits let you send enquiries without booking access.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {creditOptions.map((option) => (
            <article key={option.credits} className="border border-ivory/10 bg-white/[0.03] p-6">
              <p className="font-serif text-3xl text-ivory">{option.credits.toLocaleString()}</p>
              <p className="mt-2 whisper text-ivory/45">ENQUIRY CREDITS</p>
              <p className="mt-6 font-serif text-2xl text-champagne">${option.price}</p>
              <p className="mt-2 text-xs text-ivory/40">${(option.price / option.credits * 100).toFixed(2)} per 100 credits</p>
              <button type="button" onClick={() => void buyCredits(option.credits)} disabled={!!busy} className="mt-7 w-full border border-ivory/25 px-4 py-3 whisper text-ivory/70 disabled:opacity-40">
                {busy === `credits-${option.credits}` ? "UPDATING..." : "ADD CREDITS ->"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="border border-champagne/20 bg-champagne/[0.04] p-5 text-sm text-ivory/60">
        {current ? `Current account: ${current.subscription_status === "ACTIVE" ? `${current.subscription_plan ?? "Active subscription"} · booking enabled` : `${current.credits_remaining.toLocaleString()} enquiry credits`}.` : "Sign in to view and update your account access."}
        {message && <p className="mt-2 text-champagne">{message}</p>}
        <p className="mt-3 text-xs text-ivory/35">Purchase buttons update your Supabase account entitlement. Connect Stripe or another payment provider before accepting live card payments.</p>
      </div>
    </div>
  );
}
