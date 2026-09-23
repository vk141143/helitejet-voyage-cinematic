import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { i as salesNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.dashboard-DKIJkpLJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesDashboard() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const [access, setAccess] = (0, import_react.useState)({
		customers: 0,
		subscriptions: 0,
		credits: 0
	});
	(0, import_react.useEffect)(() => {
		supabase.from("customer_entitlements").select("subscription_status,credits_remaining").then(({ data }) => {
			const rows = data ?? [];
			setAccess({
				customers: rows.length,
				subscriptions: rows.filter((row) => row.subscription_status === "ACTIVE").length,
				credits: rows.reduce((total, row) => total + (row.credits_remaining ?? 0), 0)
			});
		});
	}, []);
	async function handleLogout() {
		await logout();
		await navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: `Good evening, ${profile?.full_name?.split(" ")[0] ?? "concierge"}.`,
		nav: salesNav,
		onLogout: () => void handleLogout(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/sales/requests",
					className: "border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "Operations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-3xl",
						children: "Open requests →"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Active subscriptions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: access.subscriptions
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Credits held by customers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: access.credits.toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Customers with access"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: access.customers
					})]
				})
			]
		})
	});
}
//#endregion
export { SalesDashboard as component };
