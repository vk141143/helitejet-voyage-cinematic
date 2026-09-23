import { r as __toESM } from "../_runtime.mjs";
import { m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-DlVQSYjx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function friendlyError(msg) {
	const m = msg.toLowerCase();
	if (m.includes("already registered") || m.includes("already exists")) return "An account with this email already exists.";
	if (m.includes("password")) return msg;
	if (m.includes("network") || m.includes("fetch")) return "Network error. Please check your connection.";
	return msg || "Something went wrong. Please try again.";
}
function RegisterPage() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		email: "",
		mobile: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [adminMode, setAdminMode] = (0, import_react.useState)(false);
	const update = (key) => (e) => setForm((c) => ({
		...c,
		[key]: e.target.value
	}));
	async function submit(e, asAdmin = false) {
		e.preventDefault();
		setError("");
		setPending(true);
		try {
			const { needsConfirmation } = await register(form);
			if (needsConfirmation) {
				setConfirmed(true);
				return;
			}
			if (asAdmin) {
				const { error: rpcError } = await supabase.rpc("promote_to_admin_by_email", { user_email: form.email });
				if (rpcError) throw new Error("Admin promotion failed: " + rpcError.message);
				await navigate({ to: "/admin/dashboard" });
				return;
			}
			await navigate({ to: "/customer/dashboard" });
		} catch (err) {
			setError(friendlyError(err instanceof Error ? err.message : ""));
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
					children: confirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								children: "Account Created"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-serif text-4xl font-light text-ivory",
								children: "Check your email."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 font-serif text-lg italic text-ivory/60",
								children: [
									"We've sent a verification link to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-ivory",
										children: form.email
									}),
									". Please verify your email to activate your account."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-sm text-ivory/40",
								children: "Once verified, return here to sign in."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								className: "mt-8 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SIGN IN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-10 bg-gold/50" })]
							})
						]
					}, "confirmed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-champagne",
									children: adminMode ? "Admin Account" : "Customer Account"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setAdminMode((v) => !v);
										setError("");
									},
									className: "whisper text-xs text-ivory/30 transition-colors hover:text-champagne",
									children: adminMode ? "← Back to Customer" : "Register as Admin"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-serif text-4xl font-light text-ivory",
								children: "Create account."
							}),
							adminMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-serif text-sm italic text-amber-400/70",
								children: [
									"Dev only — requires ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-amber-300/80",
										children: "promote_self_to_admin()"
									}),
									" SQL function."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => submit(e, adminMode),
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
									[
										[
											"fullName",
											"Full name",
											"text",
											"name"
										],
										[
											"email",
											"Email",
											"email",
											"email"
										],
										[
											"mobile",
											"Mobile number",
											"tel",
											"tel"
										],
										[
											"password",
											"Password",
											"password",
											"new-password"
										],
										[
											"confirmPassword",
											"Confirm password",
											"password",
											"new-password"
										]
									].map(([key, label, type, autoComplete]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "group relative block",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "whisper block text-ivory/45",
												children: label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type,
												required: true,
												autoComplete,
												value: form[key],
												onChange: update(key),
												className: "field"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100" })
										]
									}, key)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: pending,
										className: "group mt-2 inline-flex w-full items-center justify-between border border-champagne/40 px-5 py-4 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pending ? "Creating account…" : adminMode ? "REGISTER AS ADMIN" : "CREATE ACCOUNT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative block h-px w-10 overflow-hidden bg-gold/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 border-t border-ivory/10 pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-serif text-sm text-ivory/50",
									children: [
										"Already have an account?",
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
export { RegisterPage as component };
