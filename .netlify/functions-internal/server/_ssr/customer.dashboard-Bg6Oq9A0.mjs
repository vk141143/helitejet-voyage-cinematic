import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.dashboard-Bg6Oq9A0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerDashboard() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const [entitlement, setEntitlement] = (0, import_react.useState)(null);
	const [pendingBooking, setPendingBooking] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!profile?.id) return;
		supabase.from("customer_entitlements").select("subscription_status,subscription_plan,credits_remaining").eq("customer_id", profile.id).maybeSingle().then(({ data }) => setEntitlement(data));
		supabase.from("requests").select("id,request_number,status").eq("customer_id", profile.id).eq("request_mode", "BOOKING").in("status", [
			"DRAFT",
			"SUBMITTED",
			"UNDER_REVIEW",
			"SALES_CONTACTED",
			"OPTIONS_FOUND",
			"QUOTE_SENT"
		]).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => setPendingBooking(data));
		const channel = supabase.channel(`dashboard-entitlement-${profile.id}`).on("postgres_changes", {
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
	(0, import_react.useEffect)(() => {
		if (!profile?.id) return;
		const channel = supabase.channel(`dashboard-booking-${profile.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "requests",
			filter: `customer_id=eq.${profile.id}`
		}, (payload) => {
			if (payload.new && payload.new.request_mode === "BOOKING") setPendingBooking(payload.new);
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
		title: `Good evening, ${profile?.full_name?.split(" ")[0] ?? "member"}.`,
		nav: customerNav,
		onLogout: () => void handleLogout(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-champagne/30 bg-champagne/[0.06] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "ACCESS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-serif text-2xl",
							children: entitlement?.subscription_status === "ACTIVE" ? "Booking enabled" : `${entitlement?.credits_remaining ?? 0} enquiry credits`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-ivory/45",
							children: entitlement?.subscription_plan ?? "Choose a subscription or credits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/customer/subscriptions",
							className: "mt-4 inline-block whisper text-champagne hover:text-ivory",
							children: "VIEW ACCOUNT →"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Active requests"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Pending quotes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/customer/requests/new",
					className: "border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "Begin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-3xl",
						children: "New request →"
					})]
				})
			]
		}), pendingBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border border-champagne/30 bg-champagne/[0.06] p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "whisper text-champagne",
					children: ["PENDING BOOKING · ", pendingBooking.request_number]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-serif text-2xl text-ivory",
					children: "Your subscription is active. Continue your flight booking."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-ivory/50",
					children: ["Current status: ", pendingBooking.status]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/customer/bookings",
					className: "mt-5 inline-block border border-champagne/50 px-4 py-2 whisper text-champagne",
					children: "CONTINUE BOOKING →"
				})
			]
		})]
	});
}
//#endregion
export { CustomerDashboard as component };
