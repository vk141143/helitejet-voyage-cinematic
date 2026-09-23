import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { n as adminNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-CvJhEoRD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const navigate = useNavigate();
	const { logout } = useAuth();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Platform overview",
		nav: adminNav,
		onLogout: () => void handleLogout(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/requests",
					className: "border border-champagne/40 bg-champagne/10 p-6 transition-colors hover:bg-champagne/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "Administration"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-3xl",
						children: "All requests →"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 bg-white/[0.03] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-ivory/50",
						children: "Customers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: access.customers
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
						children: "Credits remaining"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-4xl",
						children: access.credits.toLocaleString()
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border border-ivory/10 bg-white/[0.02] p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "Admin Bootstrap"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-serif text-sm text-ivory/60",
					children: [
						"To create Sales accounts, use the Supabase dashboard or run the SQL below in the Supabase SQL editor. Sales users log in through ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-champagne",
							children: "/login"
						}),
						" and are redirected to their dashboard automatically."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto border border-ivory/10 bg-obsidian p-4 text-xs text-ivory/50",
					children: `-- Create a Sales user (run in Supabase SQL editor as service role)
-- 1. Create auth user via Supabase Auth dashboard or API
-- 2. Then update their profile role:
UPDATE public.profiles
SET role = 'SALES'
WHERE email = 'sales@example.com';`
				})
			]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
