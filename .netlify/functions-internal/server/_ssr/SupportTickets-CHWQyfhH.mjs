import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SupportTickets-CHWQyfhH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SupportTickets({ role, nav }) {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("OPEN");
	const [response, setResponse] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function loadTickets() {
		const { data, error: err } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
		if (err) setError(err.message);
		else setTickets(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		loadTickets();
	}, []);
	async function createTicket(event) {
		event.preventDefault();
		if (!subject.trim() || !message.trim() || !profile) return;
		setSaving(true);
		setError("");
		const { error: err } = await supabase.from("support_tickets").insert({
			requester_id: profile.id,
			requester_role: role,
			subject: subject.trim(),
			message: message.trim()
		});
		if (err) setError(err.message);
		else {
			setSubject("");
			setMessage("");
			await loadTickets();
		}
		setSaving(false);
	}
	async function updateTicket(ticket) {
		const { error: err } = await supabase.from("support_tickets").update({
			status: ticket.status,
			admin_response: response[ticket.id] ?? ticket.admin_response ?? null,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", ticket.id);
		if (err) setError(err.message);
		else await loadTickets();
	}
	async function handleLogout() {
		await logout();
		await navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Support",
		nav,
		onLogout: () => void handleLogout(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
			children: [role !== "ADMIN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: createTicket,
				className: "border border-champagne/25 bg-champagne/[0.04] p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "OPEN A SUPPORT TICKET"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Subject"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: subject,
							onChange: (event) => setSubject(event.target.value),
							required: true,
							className: "field mt-2",
							placeholder: "What do you need help with?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: message,
							onChange: (event) => setMessage(event.target.value),
							required: true,
							rows: 6,
							className: "field mt-2 resize-none",
							placeholder: "Describe the request..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving,
						className: "mt-5 border border-champagne/50 px-5 py-2.5 whisper text-champagne disabled:opacity-40",
						children: saving ? "SENDING..." : "SEND TO ADMIN ->"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex items-baseline justify-between border-b border-ivory/10 pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: role === "ADMIN" ? "SUPPORT INBOX" : "YOUR TICKETS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 font-serif text-2xl font-light text-ivory",
						children: [
							tickets.length,
							" ",
							tickets.length === 1 ? "ticket" : "tickets"
						]
					})] })
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 border border-red-300/30 p-3 text-sm text-red-200",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [tickets.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-ivory/10 bg-white/[0.02] p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whisper text-xs text-champagne",
									children: [
										ticket.requester_role,
										" · ",
										new Date(ticket.created_at).toLocaleDateString()
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-serif text-xl text-ivory",
									children: ticket.subject
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-ivory/20 px-2 py-1 whisper text-[0.6rem] text-ivory/60",
									children: ticket.status.replace("_", " ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-6 text-ivory/65",
								children: ticket.message
							}),
							ticket.admin_response && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 border-l border-champagne/50 pl-3 text-sm text-champagne/80",
								children: ["Admin: ", ticket.admin_response]
							}),
							role === "ADMIN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-3 border-t border-ivory/10 pt-4 md:grid-cols-[auto_1fr_auto]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: ticket.status,
										onChange: (event) => setTickets((current) => current.map((item) => item.id === ticket.id ? {
											...item,
											status: event.target.value
										} : item)),
										className: "field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "OPEN",
												children: "Open"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "IN_PROGRESS",
												children: "In progress"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "RESOLVED",
												children: "Resolved"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CLOSED",
												children: "Closed"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: response[ticket.id] ?? ticket.admin_response ?? "",
										onChange: (event) => setResponse((current) => ({
											...current,
											[ticket.id]: event.target.value
										})),
										className: "field",
										placeholder: "Reply to requester..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void updateTicket(ticket),
										className: "border border-champagne/50 px-4 py-2 whisper text-champagne",
										children: "UPDATE"
									})
								]
							})
						]
					}, ticket.id)), !tickets.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-dashed border-ivory/10 p-10 text-center text-sm text-ivory/35",
						children: "No support tickets yet."
					})]
				})
			] })]
		})
	});
}
//#endregion
export { SupportTickets as t };
