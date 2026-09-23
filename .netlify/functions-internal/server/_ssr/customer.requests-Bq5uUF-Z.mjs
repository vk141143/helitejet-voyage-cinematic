import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
import { n as listCustomerRequests } from "./request-service-CAHVcKar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.requests-Bq5uUF-Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerRequests() {
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [tracked, setTracked] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listCustomerRequests().then((data) => setRequests(data)).catch((err) => setError(err instanceof Error ? err.message : "Unable to load requests."));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "My requests",
		nav: customerNav,
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-red-300/30 p-4 text-sm text-red-100",
				children: error
			}),
			!error && !requests.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-dashed border-white/15 p-10 text-center text-sm text-ivory/50",
				children: "No requests found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: requests.map((request) => {
					const details = request.service_details;
					const customerDetails = request.customer_details;
					const isEvent = request.service_type === "EVENT_AVIATION";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-white/10 bg-white/[0.03] p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "whisper text-champagne",
										children: [
											String(request.request_number),
											" · ",
											isEvent ? "EVENT AVIATION" : String(request.service_type)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-serif text-2xl",
										children: isEvent ? String(details?.event_type ?? "Event flight") : String(request.service_type)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-ivory/50",
										children: [
											String(request.destination ?? "Destination to be confirmed"),
											" · ",
											String(request.people_count),
											" people"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-champagne/30 px-3 py-1 whisper text-xs text-champagne",
									children: String(request.status)
								})]
							}),
							isEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-2 border-t border-white/10 pt-3 text-xs text-ivory/50 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Aircraft: ", String(details?.aircraft_model ?? "Pending assignment")] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Timing: ", String(details?.timing ?? "Pending")] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Food: ", String(details?.food ?? "Not specified")] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Crew: ", String(details?.crew ?? "Standard crew")] })
								]
							}),
							isEvent && request.status === "BOOKED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTracked(request),
								className: "mt-5 border border-champagne/50 bg-champagne/10 px-4 py-2 whisper text-champagne hover:bg-champagne/20",
								children: "TRACK EVENT SERVICE →"
							}),
							request.status !== "BOOKED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-ivory/40",
								children: "Status updates from the sales desk will appear here."
							}),
							customerDetails?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-ivory/35",
								children: ["Submitted for ", String(customerDetails.name)]
							})
						]
					}, String(request.id));
				})
			}),
			tracked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4",
				onClick: () => setTracked(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
					onClick: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-ivory/10 pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whisper text-champagne",
									children: "BOOKED EVENT SERVICE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-serif text-3xl text-ivory",
									children: String(tracked.service_details?.aircraft_model ?? "Aircraft assigned")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-ivory/45",
									children: [String(tracked.request_number), " · BOOKED"]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTracked(null),
								className: "text-2xl text-ivory/50 hover:text-champagne",
								"aria-label": "Close event tracking",
								children: "×"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-6 h-56 overflow-hidden border border-champagne/20 bg-[radial-gradient(circle_at_25%_30%,rgba(220,190,120,.14)_1px,transparent_2px),radial-gradient(circle_at_70%_65%,rgba(220,190,120,.12)_1px,transparent_2px)] bg-[length:34px_34px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[14%] top-[30%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[14%] bottom-[25%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[17%] top-[37%] h-px w-[66%] rotate-[22deg] bg-champagne/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-champagne/40 bg-obsidian/80 px-3 py-2 whisper text-[0.55rem] text-champagne",
									children: "SERVICE ROUTE"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 border-t border-ivory/10 pt-4 text-sm text-ivory/60 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Event: ", String(tracked.service_details?.event_type ?? "Special event")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Date: ", String(tracked.service_details?.event_date ?? "Confirmed with sales")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Food: ", String(tracked.service_details?.food ?? "Not specified")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Drinks: ", String(tracked.service_details?.drinks ?? "Not specified")] })
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CustomerRequests as component };
