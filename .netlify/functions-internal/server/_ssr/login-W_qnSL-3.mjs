import { r as __toESM } from "../_runtime.mjs";
import { m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth, n as dashboardForRole } from "./auth-CCx8mEZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-W_qnSL-3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function friendlyError(msg) {
	const m = msg.toLowerCase();
	if (m.includes("invalid login") || m.includes("invalid email") || m.includes("invalid password")) return "Invalid email or password.";
	if (m.includes("email not confirmed")) return "Please verify your email before signing in.";
	if (m.includes("network") || m.includes("fetch")) return "Network error. Please check your connection.";
	if (m.includes("too many")) return "Too many attempts. Please wait a moment and try again.";
	return msg || "Something went wrong. Please try again.";
}
function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [navigating, setNavigating] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setPending(true);
		setError("");
		try {
			await login(email, password);
			const { data, error: profileError } = await supabase.rpc("get_my_profile");
			if (profileError || !data) throw new Error("Unable to load your profile.");
			const profile = Array.isArray(data) ? data[0] : data;
			if (!profile) throw new Error("Unable to load your profile.");
			setNavigating(true);
			await navigate({
				to: dashboardForRole(profile.role),
				replace: true
			});
		} catch (err) {
			setError(friendlyError(err instanceof Error ? err.message : ""));
			setPending(false);
		}
	}
	if (navigating) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-obsidian" });
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
					to: "/register",
					className: "whisper text-ivory/60 transition-colors hover:text-champagne",
					children: "Register"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-md items-center justify-center px-5 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							children: "Private Portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-serif text-4xl font-light text-ivory",
							children: "Welcome back."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-base italic text-ivory/50",
							children: "Sign in to continue with your private travel desk."
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
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "group relative block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whisper block text-ivory/45",
											children: "Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											required: true,
											autoComplete: "current-password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "field"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between pt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/forgot-password",
										className: "whisper text-ivory/40 transition-colors hover:text-champagne",
										children: "Forgot password?"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: pending,
									className: "group mt-2 inline-flex w-full items-center justify-between border border-champagne/40 px-5 py-4 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pending ? "Signing in…" : "LOGIN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative block h-px w-10 overflow-hidden bg-gold/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 group-hover:scale-x-100" })
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 border-t border-ivory/10 pt-6 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-serif text-sm text-ivory/50",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/register",
										className: "text-champagne transition-colors hover:text-ivory",
										children: "Create account"
									})
								]
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LoginPage as component };
