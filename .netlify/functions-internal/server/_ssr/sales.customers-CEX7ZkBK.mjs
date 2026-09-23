import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { i as salesNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.customers-CEX7ZkBK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesCustomersPage() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	async function loadCustomers() {
		const { data, error } = await supabase.from("profiles").select("id, full_name, email, mobile, country, company, created_at").eq("role", "CUSTOMER").order("created_at", { ascending: false });
		if (error || !data) {
			setLoading(false);
			return;
		}
		const ids = data.map((customer) => customer.id);
		const [{ data: entitlements }, { data: purchases }] = await Promise.all([supabase.from("customer_entitlements").select("customer_id,subscription_status,subscription_plan,credits_remaining").in("customer_id", ids), supabase.from("entitlement_purchases").select("customer_id,credits").in("customer_id", ids)]);
		const entitlementByCustomer = new Map((entitlements ?? []).map((item) => [item.customer_id, item]));
		const purchaseTotals = /* @__PURE__ */ new Map();
		(purchases ?? []).forEach((purchase) => {
			const current = purchaseTotals.get(purchase.customer_id) ?? {
				credits: 0,
				count: 0
			};
			purchaseTotals.set(purchase.customer_id, {
				credits: current.credits + (purchase.credits ?? 0),
				count: current.count + 1
			});
		});
		setCustomers(data.map((customer) => ({
			...customer,
			entitlement: entitlementByCustomer.get(customer.id) ?? null,
			purchasedCredits: purchaseTotals.get(customer.id)?.credits ?? 0,
			purchaseCount: purchaseTotals.get(customer.id)?.count ?? 0
		})));
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		loadCustomers();
		const channel = supabase.channel("sales-customer-access").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "customer_entitlements"
		}, () => {
			loadCustomers();
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "entitlement_purchases"
		}, () => {
			loadCustomers();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, []);
	const filtered = customers.filter((customer) => !search || customer.full_name.toLowerCase().includes(search.toLowerCase()) || customer.email.toLowerCase().includes(search.toLowerCase()) || (customer.country ?? "").toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Customers",
		nav: salesNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "whisper text-champagne",
				children: [customers.length, " registered"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Search name, email, country...",
				value: search,
				onChange: (event) => setSearch(event.target.value),
				className: "field w-64 text-sm"
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-sm italic text-ivory/40",
			children: "Loading..."
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-ivory/10 bg-white/[0.02] p-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif italic text-ivory/40",
				children: search ? "No customers match your search." : "No customers registered yet."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto border border-ivory/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-ivory/10 text-left",
					children: [
						"Name",
						"Email",
						"Mobile",
						"Subscription",
						"Credits",
						"Purchases",
						"Country",
						"Company",
						"Joined"
					].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 whisper text-ivory/40",
						children: heading
					}, heading))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ivory/5 hover:bg-white/[0.02]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-serif text-ivory",
							children: customer.full_name || "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.mobile ?? "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.entitlement?.subscription_status === "ACTIVE" ? customer.entitlement.subscription_plan ?? "Active" : "No subscription"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ivory",
								children: (customer.entitlement?.credits_remaining ?? 0).toLocaleString()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[0.65rem] text-ivory/35",
								children: [customer.purchasedCredits.toLocaleString(), " bought"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.purchaseCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.country ?? "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/60",
							children: customer.company ?? "-"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ivory/40",
							children: new Date(customer.created_at).toLocaleDateString()
						})
					]
				}, customer.id)) })]
			})
		})]
	});
}
//#endregion
export { SalesCustomersPage as component };
