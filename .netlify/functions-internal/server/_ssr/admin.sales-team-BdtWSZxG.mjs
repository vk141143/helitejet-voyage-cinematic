import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { n as adminNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.sales-team-BdtWSZxG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesTeamPage() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const [members, setMembers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		password: "",
		mobile: "",
		department: "",
		notes: ""
	});
	const [docFile, setDocFile] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	async function loadMembers() {
		setLoading(true);
		const { data } = await supabase.from("sales_members").select("id, full_name, email, mobile, department, identity_doc_name, created_at").order("created_at", { ascending: false });
		setMembers(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		loadMembers();
	}, []);
	const update = (k) => (e) => setForm((c) => ({
		...c,
		[k]: e.target.value
	}));
	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSuccess("");
		setSubmitting(true);
		try {
			if (form.password.length < 8) throw new Error("Password must be at least 8 characters.");
			const { error: signUpError } = await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: { data: {
					full_name: form.full_name,
					mobile: form.mobile
				} }
			});
			if (signUpError) throw new Error(signUpError.message);
			let profileId = null;
			for (let i = 0; i < 5; i++) {
				const { data } = await supabase.rpc("promote_to_sales_by_email", { user_email: form.email });
				if (data) {
					profileId = data;
					break;
				}
				await new Promise((r) => setTimeout(r, 600));
			}
			let docPath = null;
			let docName = null;
			if (docFile && profileId) {
				const ext = docFile.name.split(".").pop();
				docPath = `${profileId}/identity.${ext}`;
				docName = docFile.name;
				const { error: uploadError } = await supabase.storage.from("staff-documents").upload(docPath, docFile, { upsert: true });
				if (uploadError) throw new Error("Account created but document upload failed: " + uploadError.message);
			}
			const { error: insertError } = await supabase.rpc("insert_sales_member", {
				p_profile_id: profileId,
				p_full_name: form.full_name,
				p_email: form.email,
				p_mobile: form.mobile || null,
				p_department: form.department || null,
				p_notes: form.notes || null,
				p_identity_doc_path: docPath,
				p_identity_doc_name: docName,
				p_created_by: profile?.id ?? null
			});
			if (insertError) throw new Error("Account created but record insert failed: " + insertError.message);
			setSuccess(`${form.full_name} added. They can log in at /login with their email and password.`);
			setForm({
				full_name: "",
				email: "",
				password: "",
				mobile: "",
				department: "",
				notes: ""
			});
			setDocFile(null);
			setOpen(false);
			loadMembers();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Sales Team",
		nav: adminNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "whisper text-champagne",
					children: [
						members.length,
						" member",
						members.length !== 1 ? "s" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setOpen(true);
						setError("");
						setSuccess("");
					},
					className: "inline-flex items-center gap-2 border border-champagne/40 px-5 py-3 whisper text-champagne transition-all hover:border-champagne hover:bg-champagne/10",
					children: "+ ADD SALES MEMBER"
				})]
			}),
			success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				className: "mb-4 border border-green-400/20 bg-green-900/10 px-4 py-3 font-serif text-sm text-green-300",
				children: success
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-sm italic text-ivory/40",
				children: "Loading…"
			}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-ivory/10 bg-white/[0.02] p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif italic text-ivory/40",
					children: "No sales members yet. Add your first one."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto border border-ivory/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-ivory/10 text-left",
						children: [
							"Name",
							"Email",
							"Mobile",
							"Department",
							"ID Doc",
							"Joined"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 whisper text-ivory/40",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ivory/5 hover:bg-white/[0.02]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-serif text-ivory",
								children: m.full_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: m.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: m.mobile ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: m.department ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: m.identity_doc_name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-champagne/70 text-xs",
									children: m.identity_doc_name
								}) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/40",
								children: new Date(m.created_at).toLocaleDateString()
							})
						]
					}, m.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4",
				onClick: (e) => {
					if (e.target === e.currentTarget) setOpen(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: 24
					},
					className: "w-full max-w-md border border-ivory/10 bg-[oklch(0.1_0.008_275)] p-8 max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "Sales Team"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-serif text-2xl font-light text-ivory",
								children: "Add Sales Member"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen(false),
								className: "text-xl leading-none text-ivory/40 hover:text-ivory",
								children: "✕"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 border border-red-300/20 bg-red-900/10 px-4 py-3 font-serif text-sm italic text-red-300",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-5",
							children: [
								[
									[
										"full_name",
										"Full name",
										"text",
										true
									],
									[
										"email",
										"Email address",
										"email",
										true
									],
									[
										"password",
										"Password (min 8 chars)",
										"password",
										true
									],
									[
										"mobile",
										"Mobile number",
										"tel",
										false
									],
									[
										"department",
										"Department (e.g. Aviation, Yachts)",
										"text",
										false
									]
								].map(([key, label, type, required]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "group relative block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whisper block text-ivory/45",
											children: label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type,
											required,
											value: form[key],
											onChange: update(key),
											className: "field"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-focus-within:scale-x-100" })
									]
								}, key)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "group relative block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper block text-ivory/45",
										children: "Notes (optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: form.notes,
										onChange: update("notes"),
										className: "field resize-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper block text-ivory/45",
										children: "Identity document (optional)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										onClick: () => fileRef.current?.click(),
										className: "mt-1 cursor-pointer border border-dashed border-ivory/20 px-4 py-5 text-center transition-colors hover:border-champagne/40",
										children: docFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-serif text-sm text-ivory/70",
											children: [
												docFile.name,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-ivory/30",
													children: [
														"(",
														(docFile.size / 1024).toFixed(0),
														" KB)"
													]
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-serif text-sm italic text-ivory/30",
											children: "Click to upload passport, ID card, or photo"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*,.pdf",
										className: "hidden",
										onChange: (e) => setDocFile(e.target.files?.[0] ?? null)
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-serif text-xs italic text-ivory/30",
									children: [
										"They log in at ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-champagne",
											children: "/login"
										}),
										" with this email and password → redirected to sales dashboard."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOpen(false),
										className: "flex-1 border border-ivory/20 px-4 py-3 whisper text-ivory/50 hover:border-ivory/40 hover:text-ivory",
										children: "CANCEL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submitting,
										className: "flex-1 border border-champagne/40 bg-champagne/10 px-4 py-3 whisper text-champagne hover:border-champagne hover:bg-champagne/20 disabled:opacity-50",
										children: submitting ? "CREATING…" : "CREATE LOGIN"
									})]
								})
							]
						})
					]
				})
			}) })
		]
	});
}
//#endregion
export { SalesTeamPage as component };
