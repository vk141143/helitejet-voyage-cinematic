import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { i as salesNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
import { r as listStaffRequests } from "./request-service-CAHVcKar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.requests-D022o-W3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesRequests() {
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)("");
	const [viewing, setViewing] = (0, import_react.useState)(null);
	async function load() {
		try {
			setRequests(await listStaffRequests());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to load requests.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function updateStatus(id, status) {
		setSaving(id);
		const { error: updateError } = await supabase.from("requests").update({
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (updateError) setError(updateError.message);
		else await load();
		setSaving("");
	}
	function displayValue(value, fallback = "Not provided") {
		return value === null || value === void 0 || value === "" ? fallback : String(value);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Requests",
		nav: salesNav,
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-red-300/30 p-4 text-red-100",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: requests.map((request) => {
					const customer = request.customer_details;
					request.service_details;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-white/10 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "whisper text-champagne",
									children: [
										String(request.request_number),
										" · ",
										String(request.request_mode ?? "ENQUIRY")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-serif text-2xl",
									children: String(request.service_type)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-ivory/50",
									children: [
										String(customer?.name ?? request.customer_id),
										" · ",
										String(customer?.email ?? "-")
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setViewing(request),
									className: "border border-ivory/30 px-3 py-2 whisper text-[0.6rem] text-ivory/70 hover:border-champagne hover:text-champagne",
									children: "VIEW"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: String(request.status),
									disabled: saving === String(request.id),
									onChange: (event) => void updateStatus(String(request.id), event.target.value),
									className: "h-10 min-w-48 border border-champagne/60 bg-midnight px-3 font-sans text-xs font-medium tracking-[0.12em] text-ivory outline-none focus:border-champagne disabled:opacity-50",
									"aria-label": `Update status for ${String(request.request_number)}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "DRAFT",
											children: "DRAFT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SUBMITTED",
											children: "SUBMITTED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "UNDER_REVIEW",
											children: "UNDER REVIEW"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SALES_CONTACTED",
											children: "SALES CONTACTED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "OPTIONS_FOUND",
											children: "OPTIONS FOUND"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "QUOTE_SENT",
											children: "QUOTE SENT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "BOOKED",
											children: "BOOKED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "COMPLETED",
											children: "COMPLETED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CANCELLED",
											children: "CANCELLED"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-ivory/50",
							children: "Status changes are visible to the customer and admin."
						})]
					}, String(request.id));
				})
			}),
			viewing && (() => {
				const event = viewing.service_details;
				const customer = viewing.customer_details;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4",
					onClick: () => setViewing(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex max-h-[75vh] w-full max-w-lg flex-col overflow-hidden border border-ivory/15 bg-[oklch(0.1_0.008_275)]",
						onClick: (clickEvent) => clickEvent.stopPropagation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-start justify-between border-b border-ivory/10 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "REQUEST DETAILS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-2xl text-ivory",
								children: String(viewing.request_number)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setViewing(null),
								className: "flex h-8 w-8 items-center justify-center border border-ivory/20 text-xl text-ivory/60 hover:border-champagne hover:text-champagne",
								"aria-label": "Close request details",
								children: "×"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 overflow-y-auto p-5 [scrollbar-color:var(--color-gold)_transparent] [scrollbar-width:thin]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 text-sm text-ivory/65 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Customer: ", displayValue(customer?.name ?? viewing.customer_id)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Email: ", displayValue(customer?.email)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Mobile: ", displayValue(customer?.mobile)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Status: ", displayValue(viewing.status)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Service: ", displayValue(viewing.service_type)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Passengers: ", displayValue(viewing.people_count)] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 border-t border-ivory/10 pt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whisper text-champagne",
										children: "EVENT / FLIGHT DETAILS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid gap-3 text-sm text-ivory/65 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Event type: ", displayValue(event?.event_type)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Timing: ", displayValue(event?.timing)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Date: ", displayValue(event?.event_date)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Time: ", displayValue(event?.event_time)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Aircraft: ", displayValue(event?.aircraft_model)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Aircraft type: ", displayValue(event?.aircraft_kind)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Capacity: ", displayValue(event?.aircraft_capacity)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Food: ", displayValue(event?.food)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Drinks: ", displayValue(event?.drinks)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Champagne: ", event?.champagne ? "Included" : "Not requested"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sm:col-span-2",
												children: ["Crew preferences: ", displayValue(event?.crew)]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-ivory/10 pt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whisper text-champagne",
										children: "CUSTOMER DETAILS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid gap-3 text-sm text-ivory/65 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Name: ", displayValue(customer?.name)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Email: ", displayValue(customer?.email)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Mobile: ", displayValue(customer?.mobile)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Identity proof: ", customer?.identity_doc ? "Uploaded" : "Not uploaded"] })
										]
									})]
								})
							]
						})]
					})
				});
			})()
		]
	});
}
//#endregion
export { SalesRequests as component };
