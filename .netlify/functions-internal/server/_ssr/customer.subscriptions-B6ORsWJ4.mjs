import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.subscriptions-B6ORsWJ4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerSubscriptions() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const [entitlement, setEntitlement] = (0, import_react.useState)(null);
	const [purchases, setPurchases] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!profile?.id) return;
		async function load() {
			const [access, history] = await Promise.all([supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining,updated_at").eq("customer_id", profile.id).maybeSingle(), supabase.from("entitlement_purchases").select("id,purchase_type,product_code,credits,amount_usd,status,created_at").eq("customer_id", profile.id).order("created_at", { ascending: false })]);
			if (access.error || history.error) setError(access.error?.message ?? history.error?.message ?? "Unable to load account access.");
			setEntitlement(access.data);
			setPurchases(history.data ?? []);
		}
		load();
		const channel = supabase.channel(`customer-subscriptions-${profile.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "customer_entitlements",
			filter: `customer_id=eq.${profile.id}`
		}, (payload) => {
			if (payload.new) setEntitlement(payload.new);
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [profile?.id]);
	async function handleLogout() {
		await logout();
		await navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Subscription & credits",
		nav: customerNav,
		onLogout: () => void handleLogout(),
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 border border-red-300/30 p-3 text-sm text-red-200",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-champagne/30 bg-champagne/[0.06] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "SUBSCRIPTION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-2xl text-ivory",
								children: entitlement?.subscription_status === "ACTIVE" ? entitlement.subscription_plan ?? "Active" : "No active plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-ivory/45",
								children: entitlement?.subscription_status === "ACTIVE" ? "Booking access enabled" : "Credits enable enquiries"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-ivory/10 bg-white/[0.03] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-ivory/50",
								children: "ENQUIRY CREDITS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-4xl text-ivory",
								children: (entitlement?.credits_remaining ?? 0).toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-ivory/45",
								children: "Available for flight and service enquiries"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/subscriptions#plans",
						className: "border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "MANAGE ACCESS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-serif text-2xl text-ivory",
							children: "View plans & credits →"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-baseline justify-between border-b border-ivory/10 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "ACCOUNT HISTORY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-2xl text-ivory",
						children: "Your purchases"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-ivory/40",
						children: [purchases.length, " records"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [purchases.map((purchase) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-wrap items-center justify-between gap-3 border border-ivory/10 bg-white/[0.02] px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-ivory",
							children: purchase.purchase_type === "SUBSCRIPTION" ? `Subscription · ${purchase.product_code}` : `${purchase.credits.toLocaleString()} enquiry credits`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-ivory/40",
							children: [
								new Date(purchase.created_at).toLocaleString(),
								" · ",
								purchase.status
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-champagne",
							children: ["$", Number(purchase.amount_usd).toFixed(2)]
						})]
					}, purchase.id)), !purchases.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-dashed border-ivory/10 p-8 text-center text-sm text-ivory/35",
						children: "No purchases yet."
					})]
				})]
			})
		]
	});
}
//#endregion
export { CustomerSubscriptions as component };
