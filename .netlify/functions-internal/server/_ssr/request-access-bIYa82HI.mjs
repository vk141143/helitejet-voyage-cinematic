import { r as __toESM } from "../_runtime.mjs";
import { f as requestServices } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CinematicPage } from "./CinematicPage-DbieIfxY.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { t as world } from "./request-access-DAf_TfCa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-access-bIYa82HI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "hj_pending_request";
var currencies = [
	"EUR",
	"USD",
	"GBP",
	"AED"
];
var empty = {
	service: "",
	people: 2,
	budget: "",
	currency: "EUR",
	name: "",
	email: "",
	mobile: ""
};
function saveDraft(d) {
	if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}
function loadDraft() {
	try {
		if (typeof window === "undefined") return empty;
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? {
			...empty,
			...JSON.parse(raw)
		} : empty;
	} catch {
		return empty;
	}
}
function clearDraft() {
	if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}
function PublicRequestWizard() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("TYPE");
	const [draft, setDraft] = (0, import_react.useState)(empty);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [isRegister, setIsRegister] = (0, import_react.useState)(false);
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const saved = loadDraft();
		if (saved.service) setDraft(saved);
		(async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session && saved.service && saved.budget) {
				setStep("SUBMITTING");
				try {
					await submitRequest(saved, data.session.user.email ?? "");
					clearDraft();
					setStep("DONE");
				} catch (err) {
					setError(err instanceof Error ? err.message : "Submission failed.");
					setStep("AUTH");
				}
			}
		})();
	}, []);
	const upd = (key) => (e) => setDraft((d) => ({
		...d,
		[key]: e.target.value
	}));
	async function submitRequest(d, _email) {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) throw new Error("Not authenticated.");
		const { data: num, error: numErr } = await supabase.rpc("next_request_number");
		if (numErr) throw numErr;
		const { error: insErr } = await supabase.from("requests").insert({
			request_number: num,
			customer_id: auth.user.id,
			service_type: d.service,
			status: "SUBMITTED",
			people_count: d.people,
			budget: Number(d.budget),
			currency: d.currency,
			customer_details: {
				name: d.name,
				email: d.email,
				mobile: d.mobile
			},
			service_details: {}
		});
		if (insErr) throw insErr;
	}
	async function handleAuth(e) {
		e.preventDefault();
		setError("");
		setPending(true);
		try {
			if (isRegister) {
				if (password !== confirmPassword) throw new Error("Passwords do not match.");
				if (password.length < 8) throw new Error("Password must be at least 8 characters.");
				const { data, error: signUpErr } = await supabase.auth.signUp({
					email: draft.email,
					password,
					options: { data: {
						full_name: draft.name,
						mobile: draft.mobile
					} }
				});
				if (signUpErr) throw new Error(signUpErr.message);
				if (!data.session) throw new Error("Please check your email to confirm your account, then return here.");
			} else {
				const { error: signInErr } = await supabase.auth.signInWithPassword({
					email: draft.email,
					password
				});
				if (signInErr) throw new Error("Invalid email or password.");
			}
			setStep("SUBMITTING");
			await submitRequest(draft, draft.email);
			clearDraft();
			setStep("DONE");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Authentication failed.");
			setStep("AUTH");
		} finally {
			setPending(false);
		}
	}
	const stepNumerals = {
		TYPE: "01 TYPE",
		PEOPLE: "02 PEOPLE",
		BUDGET: "03 BUDGET",
		CONTACT: "04 CONTACT",
		MOBILE: "05 MOBILE",
		AUTH: "06 ACCESS",
		SUBMITTING: "SUBMITTING",
		DONE: "DONE"
	};
	const publicSteps = [
		"TYPE",
		"PEOPLE",
		"BUDGET",
		"CONTACT",
		"MOBILE",
		"AUTH"
	];
	const stepIndex = publicSteps.indexOf(step);
	function goNext() {
		setError("");
		if (step === "TYPE" && !draft.service) return setError("Choose a service.");
		if (step === "BUDGET" && !draft.budget) return setError("Enter a budget.");
		if (step === "CONTACT") {
			if (!draft.name.trim()) return setError("Enter your name.");
			if (!draft.email.trim() || !draft.email.includes("@")) return setError("Enter a valid email.");
		}
		if (step === "MOBILE" && !draft.mobile.trim()) return setError("Enter your mobile number.");
		saveDraft(draft);
		const next = publicSteps[stepIndex + 1];
		if (next) setStep(next);
	}
	function goBack() {
		setError("");
		const prev = publicSteps[stepIndex - 1];
		if (prev) setStep(prev);
	}
	if (step === "SUBMITTING") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whisper text-champagne animate-pulse",
			children: "SUBMITTING YOUR REQUEST…"
		})
	});
	if (step === "DONE") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-champagne/30 bg-champagne/5 p-10 text-center space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whisper text-champagne",
				children: "REQUEST RECEIVED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-4xl font-light text-ivory",
				children: "We will be in touch."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ivory/60 max-w-sm mx-auto",
				children: "Our concierge team will review your requirements and reach out within the hour."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void navigate({ to: "/customer/dashboard" }),
				className: "mt-4 whisper text-champagne",
				children: "VIEW MY PORTAL →"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-champagne",
					children: stepNumerals[step]
				}), stepIndex >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-ivory/40",
					children: [
						"Step ",
						stepIndex + 1,
						" of ",
						publicSteps.length
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "border border-red-300/30 p-3 text-sm text-red-100",
				children: error
			}),
			step === "TYPE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl text-ivory/70 mb-6",
				children: "What are you looking for?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: requestServices.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDraft((d) => ({
						...d,
						service: item.key
					})),
					className: `border p-5 text-left transition-colors ${draft.service === item.key ? "border-champagne bg-champagne/10" : "border-white/10 hover:border-white/30"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-xl text-ivory",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-ivory/50",
						children: item.description
					})]
				}, item.key))
			})] }),
			step === "PEOPLE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "How many people?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "number",
					min: "1",
					max: "50",
					value: draft.people,
					onChange: (e) => setDraft((d) => ({
						...d,
						people: Number(e.target.value)
					}))
				})]
			}),
			step === "BUDGET" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "Approximate budget"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "number",
					value: draft.budget,
					onChange: upd("budget"),
					placeholder: "e.g. 25000"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "Currency"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "field",
					value: draft.currency,
					onChange: upd("currency"),
					children: currencies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
				})] })]
			}),
			step === "CONTACT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Full name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: draft.name,
						onChange: upd("name"),
						placeholder: "Your full name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Email address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "email",
						value: draft.email,
						onChange: upd("email"),
						placeholder: "you@example.com"
					})]
				})]
			}),
			step === "MOBILE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "Mobile number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "tel",
					value: draft.mobile,
					onChange: upd("mobile"),
					placeholder: "+44 7700 000000"
				})]
			}),
			step === "AUTH" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAuth,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ivory/60",
						children: isRegister ? "Create your account to submit your request." : "Sign in to submit your request. Your details have been saved."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "email",
						value: draft.email,
						disabled: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						required: true,
						autoFocus: true
					})] }),
					isRegister && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Confirm password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						value: confirmPassword,
						onChange: (e) => setConfirmPassword(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-white/10 pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: goBack,
							className: "whisper text-ivory/50",
							children: "BACK"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: pending,
							className: "whisper text-champagne",
							children: pending ? "PLEASE WAIT…" : isRegister ? "CREATE & SUBMIT →" : "SIGN IN & SUBMIT →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-ivory/40 text-center",
						children: [
							isRegister ? "Already have an account?" : "New here?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-champagne underline",
								onClick: () => {
									setIsRegister((v) => !v);
									setError("");
								},
								children: isRegister ? "Sign in instead" : "Create an account"
							})
						]
					})
				]
			}),
			step !== "AUTH" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between border-t border-white/10 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: goBack,
					disabled: stepIndex === 0,
					className: "whisper text-ivory/50 disabled:invisible",
					children: "BACK"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: goNext,
					className: "whisper text-champagne",
					children: "NEXT →"
				})]
			})
		]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicRequestWizard, {})
	});
}
//#endregion
export { Page as component };
