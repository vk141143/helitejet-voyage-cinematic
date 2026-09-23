import { r as __toESM } from "../_runtime.mjs";
import { a as conciergeTypes, i as conciergeTimeframes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Kicker, o as SectionReveal, s as ease, t as CinematicPage } from "./CinematicPage-DbieIfxY.mjs";
import { t as world } from "./concierge-G_Gnrlfw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concierge-Dn-XewCl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A restrained architectural panel: charcoal glass, one hairline, no radius.
* Used sparingly — the request panel and the concierge brief.
*/
function GlassPanel({ children, className = "", glow = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative border border-ivory/10 bg-[oklch(0.16_0.008_275/0.72)] backdrop-blur-md transition-shadow duration-1000 ${glow ? "shadow-[0_40px_120px_-30px_oklch(0.72_0.1_80/0.45),0_0_0_1px_oklch(0.86_0.055_85/0.18)]" : "shadow-[0_40px_120px_-40px_oklch(0_0_0/0.8)]"} ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
		}), children]
	});
}
function useEnquiry(kind) {
	return useMutation({ mutationFn: async (_data) => {
		await Promise.resolve();
		return {
			ok: true,
			kind
		};
	} });
}
function friendlyError(err) {
	if (err instanceof Error && err.message && !err.message.includes("{") && !err.message.includes("Invalid")) return err.message;
	return "Please check your name, email and message, then try again.";
}
function Label({ children, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "whisper block text-ivory/45",
		children: [children, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gold",
			children: " *"
		})]
	});
}
var underline = "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100";
function TextField({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "group relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				required: props.required,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...props,
				className: "field"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: underline })
		]
	});
}
function TextArea({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "group relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				required: props.required,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 3,
				...props,
				className: "field resize-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: underline })
		]
	});
}
/** A row of selectable words — the site's alternative to radio buttons. */
function WordChoice({ label, options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "whisper mb-4 block text-ivory/45",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-x-7 gap-y-3",
		children: options.map((o) => {
			const on = value === o;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": on,
				onClick: () => onChange(on ? "" : o),
				className: `relative pb-1 font-serif text-xl font-light transition-colors duration-500 md:text-2xl ${on ? "text-ivory" : "text-ivory/45 hover:text-ivory/80"}`,
				children: [o, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute bottom-0 left-0 h-px w-full origin-left bg-champagne transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}` })]
			}, o);
		})
	})] });
}
function SubmitLine({ pending, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "submit",
		disabled: pending,
		className: "group inline-flex items-center gap-5 whisper text-ivory transition-colors hover:text-champagne disabled:opacity-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pending ? "Sending" : children }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative block h-px w-16 bg-gold/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute inset-0 origin-left bg-champagne",
				animate: pending ? {
					scaleX: [
						0,
						1,
						0
					],
					originX: [
						0,
						0,
						1
					]
				} : { scaleX: 0 },
				transition: pending ? {
					duration: 1.6,
					repeat: Infinity,
					ease: "easeInOut"
				} : { duration: .4 }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-hover:scale-x-100" })]
		})]
	});
}
/** Shared success state. */
function Received({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 24
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: 1.2,
			ease
		},
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whisper text-champagne",
				children: "Received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: { scaleX: 0 },
				animate: { scaleX: 1 },
				transition: {
					duration: 1.4,
					ease,
					delay: .3
				},
				className: "mx-auto mt-6 block h-px w-24 bg-gold"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-serif text-xl italic font-light text-ivory/60",
				children: body
			})
		]
	});
}
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
