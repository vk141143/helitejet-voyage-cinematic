import { r as __toESM } from "../_runtime.mjs";
import { m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-D_3222FL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { data: listener } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setReady(true);
		});
		return () => listener.subscription.unsubscribe();
	}, []);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if (password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}
		setPending(true);
		try {
			const { error: updateError } = await supabase.auth.updateUser({ password });
			if (updateError) throw new Error(updateError.message);
			setDone(true);
		} catch {
			setError("This recovery link is invalid or expired. Request a new link and try again.");
		} finally {
			setPending(false);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "relative z-10 flex items-center justify-between px-7 py-7 md:px-10 md:py-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-serif text-2xl font-light tracking-[0.18em] text-ivory",
					children: brand.mark
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-md items-center justify-center px-5 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								children: "Password Updated"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-serif text-4xl font-light text-ivory",
								children: "Access restored."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-lg italic text-ivory/60",
								children: "Your password has been updated. You can now sign in with your new credentials."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void navigate({ to: "/login" }),
								className: "mt-8 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SIGN IN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-10 bg-gold/50" })]
							})
						]
					}, "done") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								children: "New Password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-serif text-4xl font-light text-ivory",
								children: "Set new password."
							}),
							!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-serif text-sm italic text-ivory/40",
								children: [
									"Waiting for recovery session… If this persists,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/forgot-password",
										className: "text-champagne",
										children: "request a new link."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "mt-10 space-y-6",
								children: [
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										initial: {
											opacity: 0,
											y: -8
										},
										animate: {
											opacity: 1,
											y: 0
										},
										role: "alert",
										className: "border border-red-300/30 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-200",
										children: error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "group relative block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "whisper block text-ivory/45",
												children: "New password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												required: true,
												autoComplete: "new-password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												className: "field"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "group relative block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "whisper block text-ivory/45",
												children: "Confirm new password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												required: true,
												autoComplete: "new-password",
												value: confirm,
												onChange: (e) => setConfirm(e.target.value),
												className: "field"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: pending || !ready,
										className: "group mt-2 inline-flex w-full items-center justify-between border border-champagne/40 px-5 py-4 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pending ? "Updating…" : "UPDATE PASSWORD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative block h-px w-10 overflow-hidden bg-gold/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 border-t border-ivory/10 pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "whisper text-ivory/40 transition-colors hover:text-champagne",
									children: "← Back to sign in"
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
export { ResetPasswordPage as component };
