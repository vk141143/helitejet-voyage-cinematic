import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-nav-x79DDTxh.js
var import_jsx_runtime = require_jsx_runtime();
function PortalShell({ children, title, nav, onLogout }) {
	const { profile } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-obsidian p-5 text-ivory sm:p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-56 shrink-0 lg:flex lg:flex-col",
				style: { minHeight: "100vh" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 flex flex-col h-screen py-8 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-serif text-2xl tracking-[0.2em] text-ivory",
							children: "HJ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whisper text-champagne",
							children: profile?.role ?? "PORTAL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-ivory/40",
							children: profile?.full_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 flex-1 space-y-0.5",
							children: nav.map((item) => {
								const active = pathname === item.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: `block border px-3 py-2 text-xs transition-colors ${active ? "border-champagne/30 bg-champagne/10 text-champagne" : "border-transparent text-ivory/55 hover:border-white/10 hover:text-ivory"}`,
									children: item.label
								}, item.label);
							})
						}),
						onLogout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onLogout,
							className: "mt-6 whisper text-ivory/40 transition-colors hover:text-champagne text-left",
							children: "Logout →"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-8 border-b border-white/10 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "Private portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-serif text-5xl font-light",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ivory/50",
							children: profile?.email
						})
					]
				}), children]
			})]
		})
	});
}
var adminNav = [
	{
		label: "01 Dashboard",
		to: "/admin/dashboard"
	},
	{
		label: "02 Customers",
		to: "/admin/customers"
	},
	{
		label: "03 Sales Team",
		to: "/admin/sales-team"
	},
	{
		label: "04 Requests",
		to: "/admin/requests"
	},
	{
		label: "04A Support",
		to: "/admin/support"
	},
	{
		label: "05 Aircraft",
		to: "/admin/aircraft"
	},
	{
		label: "06 Yachts",
		to: "/admin/yachts"
	},
	{
		label: "07 Operators",
		to: "/admin/operators"
	},
	{
		label: "08 Quotes",
		to: "/admin/quotes"
	},
	{
		label: "09 Bookings",
		to: "/admin/bookings"
	},
	{
		label: "10 Voice Assistant",
		to: "/admin/voice"
	},
	{
		label: "11 Analytics",
		to: "/admin/analytics"
	},
	{
		label: "12 Pricing",
		to: "/admin/pricing"
	},
	{
		label: "13 Content",
		to: "/admin/content"
	},
	{
		label: "14 Notifications",
		to: "/admin/notifications"
	},
	{
		label: "15 Audit Logs",
		to: "/admin/audit"
	},
	{
		label: "16 Settings",
		to: "/admin/settings"
	}
];
var customerNav = [
	{
		label: "01 Dashboard",
		to: "/customer/dashboard"
	},
	{
		label: "01A Subscription & Credits",
		to: "/customer/subscriptions"
	},
	{
		label: "02 New Request",
		to: "/customer/requests/new"
	},
	{
		label: "02A Events",
		to: "/customer/events"
	},
	{
		label: "03 My Requests",
		to: "/customer/requests"
	},
	{
		label: "04 Quotes",
		to: "/customer/quotes"
	},
	{
		label: "05 Bookings",
		to: "/customer/bookings"
	},
	{
		label: "06 Notifications",
		to: "/customer/notifications"
	},
	{
		label: "07 Support",
		to: "/customer/support"
	},
	{
		label: "08 Documents",
		to: "/customer/documents"
	},
	{
		label: "09 Profile",
		to: "/customer/profile"
	}
];
var salesNav = [
	{
		label: "01 Dashboard",
		to: "/sales/dashboard"
	},
	{
		label: "02 Requests",
		to: "/sales/requests"
	},
	{
		label: "03 My Requests",
		to: "/sales/my-requests"
	},
	{
		label: "04 Customers",
		to: "/sales/customers"
	},
	{
		label: "05 Aviation",
		to: "/sales/aviation"
	},
	{
		label: "06 Yachts",
		to: "/sales/yachts"
	},
	{
		label: "07 Quotes",
		to: "/sales/quotes"
	},
	{
		label: "08 Bookings",
		to: "/sales/bookings"
	},
	{
		label: "09 Messages",
		to: "/sales/messages"
	},
	{
		label: "10 Follow-ups",
		to: "/sales/followups"
	},
	{
		label: "11 Documents",
		to: "/sales/documents"
	},
	{
		label: "12 Profile",
		to: "/sales/profile"
	},
	{
		label: "13 Support",
		to: "/sales/support"
	}
];
//#endregion
export { salesNav as i, adminNav as n, customerNav as r, PortalShell as t };
