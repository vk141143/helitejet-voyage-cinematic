import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as CinematicPage } from "./CinematicPage-DbieIfxY.mjs";
import { l as SubscriptionsSections } from "./sections-DUj99Oqb.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { t as world } from "./subscriptions-CuQFwPFy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscriptions-vhjdiFw_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		code: "HORIZON",
		name: "The Horizon Club",
		price: 2500,
		description: "Priority access across aviation, mobility and destinations."
	},
	{
		code: "RESERVE",
		name: "The Reserve Club",
		price: 5e3,
		description: "Stronger preference across jets, yachts and personal logistics."
	},
	{
		code: "HOUSE",
		name: "The House Club",
		price: 1e4,
		description: "Complete continuity across homes, aircraft and multi-destination living."
	}
];
var creditOptions = [
	{
		credits: 1e3,
		price: 25
	},
	{
		credits: 2500,
		price: 60
	},
	{
		credits: 5e3,
		price: 110
	}
];
function SubscriptionPurchase() {
	const { user } = useAuth();
	const [current, setCurrent] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining").eq("customer_id", user.id).maybeSingle().then(({ data }) => setCurrent(data));
	}, [user]);
	async function subscribe(planCode) {
		if (!user) {
			setMessage("Sign in to choose a subscription.");
			return;
		}
		setBusy(planCode);
		setMessage("");
		const { error } = await supabase.rpc("purchase_subscription", { plan_code: planCode });
		setMessage(error ? error.message : "Subscription added to your account. Booking is now enabled.");
		if (!error) {
			const plan = plans.find((item) => item.code === planCode);
			setCurrent({
				subscription_status: "ACTIVE",
				subscription_plan: plan?.name ?? planCode,
				credits_remaining: current?.credits_remaining ?? 0
			});
		}
		setBusy("");
	}
	async function buyCredits(credits) {
		if (!user) {
			setMessage("Sign in to choose credits.");
			return;
		}
		setBusy(`credits-${credits}`);
		setMessage("");
		const { error } = await supabase.rpc("purchase_credits", { credit_amount: credits });
		setMessage(error ? error.message : `${credits.toLocaleString()} enquiry credits added to your account.`);
		if (!error) setCurrent({
			subscription_status: current?.subscription_status ?? "NONE",
			subscription_plan: current?.subscription_plan ?? null,
			credits_remaining: (current?.credits_remaining ?? 0) + credits
		});
		setBusy("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "plans",
				className: "scroll-mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-7 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "BOOKING ACCESS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-4xl font-light text-ivory",
						children: "Choose a subscription"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ivory/45",
						children: "Subscription access enables flight bookings."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 md:grid-cols-3",
					children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-ivory/10 bg-white/[0.03] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: plan.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-serif text-2xl text-ivory",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 min-h-12 text-sm leading-6 text-ivory/55",
								children: plan.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-7 font-serif text-3xl text-ivory",
								children: [
									"$",
									(plan.price / 100).toLocaleString(),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-ivory/40",
										children: " / year"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void subscribe(plan.code),
								disabled: !!busy,
								className: "mt-7 w-full border border-champagne/50 px-4 py-3 whisper text-champagne disabled:opacity-40",
								children: busy === plan.code ? "UPDATING..." : "CHOOSE PLAN ->"
							})
						]
					}, plan.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "credits",
				className: "scroll-mt-10 border-t border-ivory/10 pt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-7 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "ENQUIRY ACCESS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-4xl font-light text-ivory",
						children: "Buy enquiry credits"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ivory/45",
						children: "Credits let you send enquiries without booking access."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 md:grid-cols-3",
					children: creditOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-ivory/10 bg-white/[0.03] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-3xl text-ivory",
								children: option.credits.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whisper text-ivory/45",
								children: "ENQUIRY CREDITS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 font-serif text-2xl text-champagne",
								children: ["$", option.price]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-ivory/40",
								children: [
									"$",
									(option.price / option.credits * 100).toFixed(2),
									" per 100 credits"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void buyCredits(option.credits),
								disabled: !!busy,
								className: "mt-7 w-full border border-ivory/25 px-4 py-3 whisper text-ivory/70 disabled:opacity-40",
								children: busy === `credits-${option.credits}` ? "UPDATING..." : "ADD CREDITS ->"
							})
						]
					}, option.credits))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-champagne/20 bg-champagne/[0.04] p-5 text-sm text-ivory/60",
				children: [
					current ? `Current account: ${current.subscription_status === "ACTIVE" ? `${current.subscription_plan ?? "Active subscription"} · booking enabled` : `${current.credits_remaining.toLocaleString()} enquiry credits`}.` : "Sign in to view and update your account access.",
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-champagne",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-ivory/35",
						children: "Purchase buttons update your Supabase account entitlement. Connect Stripe or another payment provider before accepting live card payments."
					})
				]
			})
		]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CinematicPage, {
		world,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionsSections, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-ivory/10 bg-obsidian px-7 py-[10vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionPurchase, {})
		})]
	});
}
//#endregion
export { Page as component };
