import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { i as salesNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.aviation-Bmf_y2PE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesAviation() {
	const { logout } = useAuth();
	const [aircraft, setAircraft] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.from("aircraft").select("id,kind,model,capacity,seats").order("kind").order("model").then(({ data, error: err }) => {
			if (err) setError(err.message);
			else setAircraft(data ?? []);
		});
	}, []);
	const filtered = aircraft.filter((row) => (filter === "all" || row.kind === filter) && row.model.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Aviation",
		nav: salesNav,
		onLogout: () => {
			logout();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "READ-ONLY FLEET CATALOGUE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ivory/50",
					children: "Flights and helicopters available for customer requests."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (event) => setSearch(event.target.value),
					placeholder: "Search model...",
					className: "border border-ivory/15 bg-transparent px-3 py-2 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60 md:w-64"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex flex-wrap gap-3",
				children: [
					"all",
					"flight",
					"helicopter"
				].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(option),
					className: `border px-4 py-1.5 whisper text-xs ${filter === option ? "border-champagne text-champagne" : "border-ivory/20 text-ivory/50"}`,
					children: option === "all" ? "ALL" : option === "flight" ? "FLIGHTS" : "HELICOPTERS"
				}, option))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-red-300/30 p-3 text-sm text-red-200",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: ["flight", "helicopter"].map((kind) => {
					const rows = filtered.filter((row) => row.kind === kind);
					if (filter !== "all" && filter !== kind) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-baseline justify-between border-b border-ivory/10 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl font-light text-ivory",
							children: kind === "flight" ? "Flights" : "Helicopters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "whisper text-ivory/40",
							children: [rows.length, " AVAILABLE"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border border-ivory/10 bg-white/[0.02] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-lg text-ivory",
									children: row.model
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-xs text-champagne",
									children: row.capacity
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-ivory/35",
								children: [row.seats ? `${row.seats} seats` : "Capacity on request", " · View only"]
							})]
						}, row.id)), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border border-dashed border-ivory/10 p-6 text-center text-sm text-ivory/35",
							children: "No aircraft found."
						})]
					})] }, kind);
				})
			})
		]
	});
}
//#endregion
export { SalesAviation as component };
