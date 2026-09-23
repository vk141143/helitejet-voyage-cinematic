import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.events-C_U2wIo0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerEvents() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [eventType, setEventType] = (0, import_react.useState)("SPECIAL");
	const [timing, setTiming] = (0, import_react.useState)("SCHEDULED");
	const [aircraftKind, setAircraftKind] = (0, import_react.useState)("flight");
	const [aircraft, setAircraft] = (0, import_react.useState)([]);
	const [aircraftId, setAircraftId] = (0, import_react.useState)("");
	const [eventName, setEventName] = (0, import_react.useState)("");
	const [eventDate, setEventDate] = (0, import_react.useState)("");
	const [eventTime, setEventTime] = (0, import_react.useState)("");
	const [people, setPeople] = (0, import_react.useState)(2);
	const [food, setFood] = (0, import_react.useState)("");
	const [champagne, setChampagne] = (0, import_react.useState)(false);
	const [drinks, setDrinks] = (0, import_react.useState)("");
	const [crew, setCrew] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)(profile?.full_name ?? "");
	const [email, setEmail] = (0, import_react.useState)(profile?.email ?? "");
	const [mobile, setMobile] = (0, import_react.useState)(profile?.mobile ?? "");
	const [identity, setIdentity] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.from("aircraft").select("id,kind,model,capacity").eq("kind", aircraftKind).order("model").then(({ data, error: err }) => {
			if (err) setError(err.message);
			else setAircraft(data ?? []);
		});
	}, [aircraftKind]);
	(0, import_react.useEffect)(() => {
		if (!aircraft.some((item) => item.id === aircraftId)) setAircraftId("");
	}, [aircraft, aircraftId]);
	async function submit(event) {
		event.preventDefault();
		if (!eventName.trim()) return setError("Enter the event details.");
		if (!aircraftId) return setError("Choose a flight or helicopter.");
		if (timing === "SCHEDULED" && (!eventDate || !eventTime)) return setError("Choose the scheduled date and time.");
		if (!name.trim() || !email.trim() || !mobile.trim()) return setError("Name, email and mobile number are required.");
		setSaving(true);
		setError("");
		try {
			const user = (await supabase.auth.getUser()).data.user;
			if (!user) throw new Error("Your session has expired. Please sign in again.");
			let identityPath = null;
			if (identity) {
				const extension = identity.name.split(".").pop() ?? "bin";
				identityPath = `identity/${user.id}/event-${Date.now()}.${extension}`;
				const { error: uploadError } = await supabase.storage.from("request-documents").upload(identityPath, identity);
				if (uploadError) throw uploadError;
			}
			const selected = aircraft.find((item) => item.id === aircraftId);
			const { data: requestNumber, error: numberError } = await supabase.rpc("next_request_number");
			if (numberError) throw numberError;
			const { error: insertError } = await supabase.from("requests").insert({
				request_number: requestNumber,
				customer_id: user.id,
				service_type: "EVENT_AVIATION",
				service_subtype: eventType,
				status: "SUBMITTED",
				request_mode: "BOOKING",
				people_count: people,
				currency: "USD",
				start_date: eventDate || null,
				additional_requirements: eventName.trim(),
				customer_details: {
					name: name.trim(),
					email: email.trim(),
					mobile: mobile.trim(),
					identity_doc: identityPath
				},
				service_details: {
					event_type: eventType,
					timing,
					event_date: eventDate || null,
					event_time: eventTime || null,
					aircraft_id: aircraftId,
					aircraft_kind: aircraftKind,
					aircraft_model: selected?.model,
					aircraft_capacity: selected?.capacity,
					food,
					champagne,
					drinks,
					crew
				}
			});
			if (insertError) throw insertError;
			setSubmitted(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit event request.");
		} finally {
			setSaving(false);
		}
	}
	async function handleLogout() {
		await logout();
		await navigate({ to: "/login" });
	}
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Events",
		nav: customerNav,
		onLogout: () => void handleLogout(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-champagne/30 bg-champagne/[0.05] p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "EVENT REQUEST RECEIVED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-serif text-4xl text-ivory",
					children: "Your event flight is with the desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-sm leading-6 text-ivory/60",
					children: "Sales will confirm the aircraft, timing, crew and service details. Track the request from My Requests."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({ to: "/customer/requests" }),
					className: "mt-6 border border-champagne/50 px-5 py-3 whisper text-champagne",
					children: "VIEW REQUEST →"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Events",
		nav: customerNav,
		onLogout: () => void handleLogout(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mx-auto max-w-4xl space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "EVENT AVIATION DESK"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl font-serif text-2xl text-ivory/80",
					children: "Arrange a flight or helicopter for a special occasion or an emergency."
				})] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-red-300/30 p-3 text-sm text-red-200",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Event type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: eventType,
							onChange: (e) => setEventType(e.target.value),
							className: "field mt-2 bg-midnight text-ivory",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SPECIAL",
								children: "Special event"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "EMERGENCY",
								children: "Emergency"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Timing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: timing,
							onChange: (e) => setTiming(e.target.value),
							className: "field mt-2 bg-midnight text-ivory",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "IMMEDIATE",
								children: "Immediate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SCHEDULED",
								children: "Scheduled"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Event details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: eventName,
								onChange: (e) => setEventName(e.target.value),
								rows: 3,
								className: "field mt-2 resize-none",
								placeholder: "Tell us about the event or emergency...",
								required: true
							})]
						}),
						timing === "SCHEDULED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: eventDate,
							onChange: (e) => setEventDate(e.target.value),
							className: "field mt-2",
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: eventTime,
							onChange: (e) => setEventTime(e.target.value),
							className: "field mt-2",
							required: true
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "People"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 500,
							value: people,
							onChange: (e) => setPeople(Number(e.target.value)),
							className: "field mt-2",
							required: true
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-5 border border-ivory/10 bg-white/[0.02] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "AIRCRAFT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ivory/50",
							children: "Choose a flight or helicopter, then select a model from the Supabase fleet."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAircraftKind("flight"),
								className: `border p-4 text-left font-serif ${aircraftKind === "flight" ? "border-champagne text-ivory" : "border-ivory/15 text-ivory/50"}`,
								children: "Flight"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAircraftKind("helicopter"),
								className: `border p-4 text-left font-serif ${aircraftKind === "helicopter" ? "border-champagne text-ivory" : "border-ivory/15 text-ivory/50"}`,
								children: "Helicopter"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: aircraftId,
							onChange: (e) => setAircraftId(e.target.value),
							className: "w-full border border-champagne/40 bg-midnight px-3 py-3 text-sm text-ivory",
							required: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "",
								children: [
									"Choose a ",
									aircraftKind,
									" model"
								]
							}), aircraft.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.model,
									" · ",
									item.capacity
								]
							}, item.id))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "ONBOARD SERVICE"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Food preferences"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: food,
							onChange: (e) => setFood(e.target.value),
							className: "field mt-2",
							placeholder: "Cuisine, dietary needs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Drinks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: drinks,
							onChange: (e) => setDrinks(e.target.value),
							className: "field mt-2",
							placeholder: "Wine, spirits, soft drinks"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm text-ivory/65",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: champagne,
								onChange: (e) => setChampagne(e.target.checked),
								className: "accent-[var(--champagne)]"
							}), " Champagne service"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Crew preferences"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: crew,
							onChange: (e) => setCrew(e.target.value),
							className: "field mt-2",
							placeholder: "Language, assistance, special crew needs"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 border border-ivory/10 bg-white/[0.02] p-6 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "CUSTOMER DETAILS"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "field mt-2",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "field mt-2",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: "Mobile number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: mobile,
							onChange: (e) => setMobile(e.target.value),
							className: "field mt-2",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Identity proof"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "mt-2 block border border-ivory/20 px-4 py-2 whisper text-ivory/60",
								children: identity?.name ?? "UPLOAD DOCUMENT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: ".jpg,.jpeg,.png,.pdf",
								className: "hidden",
								onChange: (e) => setIdentity(e.target.files?.[0] ?? null)
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: saving,
					className: "border border-champagne/50 px-6 py-3 whisper text-champagne disabled:opacity-40",
					children: saving ? "SUBMITTING..." : "SUBMIT EVENT REQUEST →"
				})
			]
		})
	});
}
//#endregion
export { CustomerEvents as component };
