import { r as __toESM } from "../_runtime.mjs";
import { f as requestServices } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
import { t as createRequest } from "./request-service-CAHVcKar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.requests.new-ChkTRJFJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	"TYPE",
	"PEOPLE",
	"BUDGET",
	"DETAILS",
	"CONTACT",
	"DOCUMENTS",
	"REVIEW"
];
var currencies = [
	"EUR",
	"USD",
	"GBP",
	"AED"
];
function CustomerRequestWizard({ profile }) {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [values, setValues] = (0, import_react.useState)({
		service: "",
		people: 4,
		budget: "",
		currency: "EUR",
		subtype: "",
		departure: "",
		destination: "",
		date: "",
		returnDate: "",
		requirements: "",
		name: profile?.full_name ?? "",
		email: profile?.email ?? "",
		mobile: profile?.mobile ?? "",
		country: profile?.country ?? ""
	});
	const update = (key) => (event) => setValues((current) => ({
		...current,
		[key]: event.target.value
	}));
	const service = requestServices.find((item) => item.key === values.service);
	const validate = () => {
		if (step === 0 && !values.service) return "Choose a service.";
		if (step === 2 && !values.budget) return "Enter a budget.";
		if (step === 3 && (!values.destination || !values.date)) return "Enter destination and date.";
		if (step === 4 && (!values.name || !values.email || !values.mobile)) return "Complete your contact details.";
		return "";
	};
	const next = () => {
		const problem = validate();
		if (problem) return setError(problem);
		setError("");
		setStep((current) => Math.min(current + 1, steps.length - 1));
	};
	async function submit(event) {
		event.preventDefault();
		const problem = validate();
		if (problem) return setError(problem);
		setPending(true);
		try {
			const request = await createRequest({
				serviceType: values.service,
				serviceSubtype: values.subtype || void 0,
				peopleCount: values.people,
				budget: Number(values.budget),
				currency: values.currency,
				departure: values.departure,
				destination: values.destination,
				startDate: values.date,
				endDate: values.returnDate,
				tripType: values.returnDate ? "ROUND_TRIP" : "ONE_WAY",
				additionalRequirements: values.requirements,
				customerDetails: {
					name: values.name,
					email: values.email,
					mobile: values.mobile,
					country: values.country
				},
				serviceDetails: {
					subtype: values.subtype,
					files: files.map((file) => ({
						name: file.name,
						type: file.type,
						size: file.size
					}))
				}
			});
			setSubmitted({
				id: request.id,
				number: request.request_number
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit request.");
		} finally {
			setPending(false);
		}
	}
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-champagne/30 bg-champagne/5 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whisper text-champagne",
				children: "REQUEST RECEIVED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-serif text-4xl font-light text-ivory",
				children: "Thank you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-ivory/60",
				children: "Our concierge team will review your requirements and get back to you shortly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-champagne",
				children: submitted.number
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({ to: "/customer/requests" }),
					className: "whisper text-champagne",
					children: "VIEW MY REQUEST"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({ to: "/customer/dashboard" }),
					className: "whisper text-ivory/60",
					children: "BACK TO DASHBOARD"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "whisper text-champagne",
					children: [
						String(step + 1).padStart(2, "0"),
						" ",
						steps[step]
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-ivory/40",
					children: [
						"Step ",
						step + 1,
						" of ",
						steps.length
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "border border-red-300/30 p-3 text-sm text-red-100",
				children: error
			}),
			step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: requestServices.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setValues((current) => ({
						...current,
						service: item.key
					})),
					className: `border p-4 text-left ${values.service === item.key ? "border-champagne bg-champagne/10" : "border-white/10"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-ivory",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-ivory/50",
						children: item.description
					})]
				}, item.key))
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "How many people?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "number",
					min: "1",
					max: "50",
					value: values.people,
					onChange: (event) => setValues((current) => ({
						...current,
						people: Number(event.target.value)
					}))
				})]
			}),
			step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "Budget"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					type: "number",
					required: true,
					value: values.budget,
					onChange: update("budget")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/50",
					children: "Currency"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "field",
					value: values.currency,
					onChange: update("currency"),
					children: currencies.map((currency) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: currency }, currency))
				})] })]
			}),
			step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Service type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: values.subtype,
						onChange: update("subtype"),
						placeholder: service?.label
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Departure / location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: values.departure,
						onChange: update("departure")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Destination"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						required: true,
						value: values.destination,
						onChange: update("destination")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "date",
						required: true,
						value: values.date,
						onChange: update("date")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Requirements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "field",
							rows: 4,
							value: values.requirements,
							onChange: update("requirements")
						})]
					})
				]
			}),
			step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Full name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						required: true,
						value: values.name,
						onChange: update("name")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "email",
						required: true,
						value: values.email,
						onChange: update("email")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Mobile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						required: true,
						value: values.mobile,
						onChange: update("mobile")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Country"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: values.country,
						onChange: update("country")
					})] })
				]
			}),
			step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/50",
						children: "Identity & documents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "file",
						multiple: true,
						accept: ".jpg,.jpeg,.png,.pdf",
						onChange: (event) => setFiles(Array.from(event.target.files ?? []).filter((file) => file.size <= 10485760))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 block text-xs text-ivory/40",
						children: files.length ? files.map((file) => file.name).join(", ") : "JPG, PNG or PDF up to 10 MB"
					})
				]
			}),
			step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					["Service", service?.label],
					["People", String(values.people)],
					["Budget", `${values.currency} ${values.budget}`],
					["Journey", `${values.departure} → ${values.destination} · ${values.date}`],
					["Customer", `${values.name} · ${values.email}`],
					["Documents", String(files.length)]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-white/10 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-ivory/40",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ivory",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between border-t border-white/10 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: step === 0,
					onClick: () => setStep((current) => Math.max(0, current - 1)),
					className: "whisper text-ivory/50 disabled:invisible",
					children: "BACK"
				}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: next,
					className: "whisper text-champagne",
					children: "NEXT →"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending,
					className: "whisper text-champagne",
					children: pending ? "SUBMITTING" : "SUBMIT REQUEST"
				})]
			})
		]
	});
}
function NewRequest() {
	const { profile } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "New request",
		nav: customerNav,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerRequestWizard, { profile })
	});
}
//#endregion
export { NewRequest as component };
