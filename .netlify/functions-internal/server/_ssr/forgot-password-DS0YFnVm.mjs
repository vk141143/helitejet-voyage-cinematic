import { r as __toESM } from "../_runtime.mjs";
import { m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-DS0YFnVm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const { resetPassword } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setPending(true);
		try {
			await resetPassword(email);
		} catch {} finally {
			setPending(false);
			setSent(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-obsidian text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none fixed inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: scenes.access,
					alt: "",
					className: "h-full w-full object-cover opacity-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/90 to-obsidian/80" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-7 py-7 md:px-10 md:py-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-serif text-2xl font-light tracking-[0.18em] text-ivory",
					children: brand.mark
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "whisper text-ivory/60 transition-colors hover:text-champagne",
					children: "Sign in"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-md items-center justify-center px-5 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "w-full border border-champagne/20 bg-[oklch(0.1_0.008_275/0.85)] p-8 text-center backdrop-blur-md md:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-champagne",
								children: "Recovery Link Sent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-serif text-4xl font-light text-ivory",
								children: "Check your inbox."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-lg italic text-ivory/60",
								children: "If an account exists for this email, a secure password reset link has been sent."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								className: "mt-8 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RETURN TO SIGN IN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-10 bg-gold/50" })]
							})
						]
					}, "sent") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "w-full border border-ivory/10 bg-[oklch(0.1_0.008_275/0.85)] p-8 backdrop-blur-md md:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-champagne",
								children: "Password Recovery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-serif text-4xl font-light text-ivory",
								children: "Reset access."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-serif text-base italic text-ivory/50",
								children: "Enter your email and we'll send a secure recovery link."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "mt-10 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "group relative block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whisper block text-ivory/45",
											children: "Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											required: true,
											autoComplete: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "field"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: pending,
									className: "group mt-2 inline-flex w-full items-center justify-between border border-champagne/40 px-5 py-4 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pending ? "Sending…" : "SEND RESET LINK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative block h-px w-10 overflow-hidden bg-gold/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 border-t border-ivory/10 pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-serif text-sm text-ivory/50",
									children: [
										"Remember your password?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											className: "text-champagne transition-colors hover:text-ivory",
											children: "Sign in"
										})
									]
								})
							})
						]
					}, "form")
				})
			})
		]
	});
}
//#endregion
export { ForgotPasswordPage as component };
