import { r as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { p as ease } from "./CinematicPage-Cr4gnA8c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-DjM_JVZJ.js
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
function SelectField({ label, options, placeholder = "—", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "group relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				required: props.required,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				...props,
				className: "field appearance-none bg-transparent pr-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					className: "bg-obsidian",
					children: placeholder
				}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o,
					className: "bg-obsidian",
					children: o
				}, o))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute bottom-5 right-0 h-2 w-2 rotate-45 border-b border-r border-ivory/40"
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
//#endregion
export { TextArea as a, friendlyError as c, SubmitLine as i, useEnquiry as l, Received as n, TextField as o, SelectField as r, WordChoice as s, GlassPanel as t };
