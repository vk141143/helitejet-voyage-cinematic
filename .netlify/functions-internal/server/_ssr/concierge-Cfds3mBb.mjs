import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { d as conciergeTypes, l as brand, n as Kicker, o as SectionReveal, p as ease, t as CinematicPage, u as conciergeTimeframes } from "./CinematicPage-5SbnHwRf.mjs";
import { t as world } from "./concierge-B7W2aILR.mjs";
import { a as TextArea, c as friendlyError, i as SubmitLine, l as useEnquiry, n as Received, o as TextField, s as WordChoice, t as GlassPanel } from "./fields-DVSuQ7bh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concierge-Cfds3mBb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* The desk. You choose the nature and the timing in words, the brief writes
* itself as you go, and a person answers within the hour.
*/
function ConciergeForm() {
	const [v, setV] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		request_type: "",
		timeframe: "",
		message: ""
	});
	const mutation = useEnquiry("concierge");
	const set = (k) => (val) => setV((s) => ({
		...s,
		[k]: val
	}));
	const brief = [
		v.request_type ? `A ${v.request_type.toLowerCase()} request` : "A request",
		v.timeframe ? v.timeframe.toLowerCase() : null,
		v.full_name ? `for ${v.full_name}` : null
	].filter(Boolean).join(", ");
	const onSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(v);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-obsidian px-7 py-[14vh] md:px-[8vw]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "Write to the Desk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-7 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl",
				children: [
					"Tell us once.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"We will do the rest."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: mutation.isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "mt-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Received, {
						title: "The desk has your brief.",
						body: "A person, not an auto-reply, will be in touch within the hour."
					})
				}, "done") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					onSubmit,
					exit: {
						opacity: 0,
						y: -12,
						transition: {
							duration: .7,
							ease
						}
					},
					noValidate: true,
					className: "mt-14 space-y-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
							delay: .1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordChoice, {
								label: "Nature of request",
								options: conciergeTypes,
								value: v.request_type,
								onChange: set("request_type")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
							delay: .15,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordChoice, {
								label: "Timeframe",
								options: conciergeTimeframes,
								value: v.timeframe,
								onChange: set("timeframe")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
							delay: .2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								label: "Your request",
								name: "message",
								required: true,
								rows: 4,
								placeholder: "Where, when, for whom, and anything the desk should know.",
								value: v.message,
								onChange: (e) => set("message")(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-9 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Full name",
									name: "full_name",
									autoComplete: "name",
									required: true,
									value: v.full_name,
									onChange: (e) => set("full_name")(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Email",
									name: "email",
									type: "email",
									autoComplete: "email",
									required: true,
									value: v.email,
									onChange: (e) => set("email")(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Phone",
									name: "phone",
									type: "tel",
									autoComplete: "tel",
									value: v.phone,
									onChange: (e) => set("phone")(e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitLine, {
								pending: mutation.isPending,
								children: "Send to the desk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper !normal-case !tracking-[0.12em] text-ivory/35",
								children: "Answered by a person within the hour."
							})]
						}),
						mutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "font-serif text-lg italic text-destructive",
							children: friendlyError(mutation.error)
						})
					]
				}, "form")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "md:sticky md:top-[18vh] md:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
					delay: .2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
						className: "px-8 py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-champagne/80",
								children: "Your brief"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-serif text-3xl font-light leading-snug text-ivory md:text-4xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
										initial: { opacity: 0 },
										animate: { opacity: 1 },
										exit: { opacity: 0 },
										transition: { duration: .5 },
										className: "block",
										children: [brief, "."]
									}, brief)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 min-h-[3.5rem] font-serif text-lg italic font-light leading-relaxed text-ivory/55",
								children: v.message ? `“${v.message.slice(0, 160)}${v.message.length > 160 ? "…" : ""}”` : "Your words will appear here as you write."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 space-y-3 border-t border-ivory/10 pt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper block text-ivory/40",
										children: "Or speak to someone now"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${brand.phone.replace(/\s/g, "")}`,
										className: "block font-serif text-2xl font-light text-ivory transition-colors hover:text-champagne",
										children: brand.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${brand.email}`,
										className: "whisper block text-ivory/50 transition-colors hover:text-champagne",
										children: brand.email
									})
								]
							})
						]
					})
				})
			})]
		})
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConciergeForm, {})
	});
}
//#endregion
export { Page as component };
