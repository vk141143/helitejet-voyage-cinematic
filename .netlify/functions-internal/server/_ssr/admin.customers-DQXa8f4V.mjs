import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { n as adminNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers-DQXa8f4V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("profiles").select("id, full_name, email, mobile, country, company, created_at").eq("role", "CUSTOMER").order("created_at", { ascending: false });
			setCustomers(data ?? []);
			setLoading(false);
		})();
	}, []);
	const filtered = customers.filter((c) => !search || c.full_name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || (c.country ?? "").toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Customers",
		nav: adminNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "whisper text-champagne",
				children: [customers.length, " registered"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "group relative block w-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Search name, email, country…",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "field text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" })]
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-sm italic text-ivory/40",
			children: "Loading…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-ivory/10 bg-white/[0.02] p-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-ivory/40 italic",
				children: search ? "No customers match your search." : "No customers registered yet."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto border border-ivory/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ivory/10 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Mobile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Country"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Company"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: "Joined"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ivory/5 transition-colors hover:bg-white/[0.02]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-serif text-ivory",
							children: c.full_name || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: c.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: c.mobile ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: c.country ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: c.company ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/40",
							children: new Date(c.created_at).toLocaleDateString()
						})
					]
				}, c.id)) })]
			})
		})]
	});
}
//#endregion
export { CustomersPage as component };
