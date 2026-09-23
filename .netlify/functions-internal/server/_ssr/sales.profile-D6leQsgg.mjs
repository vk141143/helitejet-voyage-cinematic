import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { i as salesNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales.profile-D6leQsgg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesProfilePage() {
	const { profile, logout, refreshProfile } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)(profile?.full_name ?? "");
	const [mobile, setMobile] = (0, import_react.useState)(profile?.mobile ?? "");
	const [profileMsg, setProfileMsg] = (0, import_react.useState)("");
	const [profileErr, setProfileErr] = (0, import_react.useState)("");
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [pwMsg, setPwMsg] = (0, import_react.useState)("");
	const [pwErr, setPwErr] = (0, import_react.useState)("");
	const [savingPw, setSavingPw] = (0, import_react.useState)(false);
	async function saveProfile(e) {
		e.preventDefault();
		setProfileMsg("");
		setProfileErr("");
		setSavingProfile(true);
		try {
			const { error } = await supabase.from("profiles").update({
				full_name: name,
				mobile: mobile || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", profile.id);
			if (error) throw new Error(error.message);
			await refreshProfile();
			setProfileMsg("Profile updated successfully.");
		} catch (err) {
			setProfileErr(err instanceof Error ? err.message : "Update failed.");
		} finally {
			setSavingProfile(false);
		}
	}
	async function changePassword(e) {
		e.preventDefault();
		setPwMsg("");
		setPwErr("");
		setSavingPw(true);
		try {
			if (newPassword.length < 8) throw new Error("New password must be at least 8 characters.");
			if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: profile.email,
				password: currentPassword
			});
			if (signInError) throw new Error("Current password is incorrect.");
			const { error } = await supabase.auth.updateUser({ password: newPassword });
			if (error) throw new Error(error.message);
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setPwMsg("Password changed successfully.");
		} catch (err) {
			setPwErr(err instanceof Error ? err.message : "Password change failed.");
		} finally {
			setSavingPw(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "My Profile",
		nav: salesNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-ivory/10 bg-white/[0.02] p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "Account details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-xl font-light text-ivory",
						children: "Personal information"
					}),
					profileMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "mt-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300",
						children: profileMsg
					}),
					profileErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "mt-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300",
						children: profileErr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: saveProfile,
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "group relative block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper block text-ivory/45",
										children: "Full name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: name,
										onChange: (e) => setName(e.target.value),
										className: "field"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "group relative block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper block text-ivory/45",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									disabled: true,
									value: profile?.email ?? "",
									className: "field opacity-40 cursor-not-allowed"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "group relative block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper block text-ivory/45",
										children: "Mobile"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										value: mobile,
										onChange: (e) => setMobile(e.target.value),
										className: "field"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: savingProfile,
								className: "w-full border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50",
								children: savingProfile ? "SAVING…" : "SAVE CHANGES"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-ivory/10 bg-white/[0.02] p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whisper text-champagne",
						children: "Security"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-xl font-light text-ivory",
						children: "Change password"
					}),
					pwMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "mt-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300",
						children: pwMsg
					}),
					pwErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "mt-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300",
						children: pwErr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: changePassword,
						className: "mt-6 space-y-5",
						children: [[
							[
								"Current password",
								currentPassword,
								setCurrentPassword
							],
							[
								"New password",
								newPassword,
								setNewPassword
							],
							[
								"Confirm new password",
								confirmPassword,
								setConfirmPassword
							]
						].map(([label, val, setter]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "group relative block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper block text-ivory/45",
									children: label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: val,
									onChange: (e) => setter(e.target.value),
									className: "field"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" })
							]
						}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: savingPw,
							className: "w-full border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50",
							children: savingPw ? "UPDATING…" : "UPDATE PASSWORD"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { SalesProfilePage as component };
