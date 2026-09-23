import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { r as customerNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer.bookings-n61SeHpe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerBookings() {
	const { profile, logout } = useAuth();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [tracked, setTracked] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)(profile?.email ?? "");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function loadBookings() {
		const { data, error: err } = await supabase.from("requests").select("id,request_number,status,service_type,customer_details,service_details,created_at").eq("request_mode", "BOOKING").order("created_at", { ascending: false });
		if (err) setError(err.message);
		else setBookings(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		loadBookings();
		const channel = supabase.channel(`customer-bookings-${profile?.id ?? "unknown"}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "requests",
			filter: `customer_id=eq.${profile?.id ?? ""}`
		}, () => {
			loadBookings();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [profile?.id]);
	function continueBooking(booking) {
		const details = booking.customer_details ?? {};
		setSelected(booking);
		setName(String(details.name ?? ""));
		setEmail(String(details.email ?? profile?.email ?? ""));
		setMobile(String(details.mobile ?? ""));
		setError("");
	}
	async function submitBooking(event) {
		event.preventDefault();
		if (!selected || !name.trim() || !email.trim() || !mobile.trim()) {
			setError("Name, email and mobile number are required.");
			return;
		}
		setSaving(true);
		setError("");
		try {
			let identityDoc = selected.customer_details.identity_doc ?? null;
			if (file) {
				const extension = file.name.split(".").pop() ?? "bin";
				const path = `identity/${profile?.id}/${selected.id}-${Date.now()}.${extension}`;
				const { error: uploadError } = await supabase.storage.from("request-documents").upload(path, file);
				if (uploadError) throw uploadError;
				identityDoc = path;
			}
			const { error: updateError } = await supabase.from("requests").update({
				status: "SUBMITTED",
				customer_details: {
					...selected.customer_details,
					name: name.trim(),
					email: email.trim(),
					mobile: mobile.trim(),
					identity_doc: identityDoc
				},
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", selected.id);
			if (updateError) throw updateError;
			setSelected(null);
			setFile(null);
			await loadBookings();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to submit booking.");
		} finally {
			setSaving(false);
		}
	}
	async function handleLogout() {
		await logout();
		await navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Bookings",
		nav: customerNav,
		onLogout: () => void handleLogout(),
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 border border-red-300/30 p-3 text-sm text-red-200",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-ivory/10 bg-white/[0.03] p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "whisper text-champagne",
								children: [booking.request_number, " · AVIATION BOOKING"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-2xl text-ivory",
								children: "Flight booking request"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-ivory/50",
								children: ["Created ", new Date(booking.created_at).toLocaleDateString()]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border border-champagne/30 px-3 py-1 whisper text-xs text-champagne",
							children: booking.status
						})]
					}), booking.status === "DRAFT" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => continueBooking(booking),
						className: "mt-5 border border-champagne/50 px-4 py-2 whisper text-champagne",
						children: "CONTINUE BOOKING →"
					}) : booking.status === "BOOKED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTracked(booking),
						className: "mt-5 border border-champagne/50 bg-champagne/10 px-4 py-2 whisper text-champagne hover:bg-champagne/20",
						children: "TRACK FLIGHT →"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-ivory/60",
						children: "Sales is reviewing your booking. Status updates appear here automatically."
					})]
				}, booking.id)), !bookings.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-dashed border-ivory/10 p-10 text-center text-sm text-ivory/35",
					children: "No booking requests yet. Choose a subscription to begin."
				})]
			}),
			tracked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4",
				onClick: () => setTracked(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
					onClick: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-ivory/10 pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whisper text-champagne",
									children: "LIVE FLIGHT TRACKING"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-serif text-3xl text-ivory",
									children: String(tracked.service_details?.aircraft_model ?? "Booked flight")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-ivory/45",
									children: [tracked.request_number, " · BOOKED"]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTracked(null),
								className: "text-2xl text-ivory/50 hover:text-champagne",
								"aria-label": "Close tracking",
								children: "×"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-6 h-64 overflow-hidden border border-champagne/20 bg-[radial-gradient(circle_at_25%_30%,rgba(220,190,120,.14)_1px,transparent_2px),radial-gradient(circle_at_70%_65%,rgba(220,190,120,.12)_1px,transparent_2px)] bg-[length:34px_34px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[14%] top-[28%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[14%] bottom-[24%] h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(230,200,130,.8)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[17%] top-[35%] h-px w-[66%] rotate-[22deg] bg-champagne/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-champagne/40 bg-obsidian/80 px-3 py-2 whisper text-[0.55rem] text-champagne",
									children: "FLIGHT ROUTE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "absolute bottom-3 left-4 whisper text-[0.55rem] text-ivory/40",
									children: "DEPARTURE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "absolute right-4 top-3 whisper text-[0.55rem] text-ivory/40",
									children: "DESTINATION"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 border-t border-ivory/10 pt-4 text-sm text-ivory/60 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Aircraft: ", String(tracked.service_details?.aircraft_model ?? "Assigned by concierge")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Type: ", String(tracked.service_details?.aircraft_kind ?? "Private aviation")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Passengers: ", String(tracked.service_details?.travellers ?? "-")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Route: ", String(tracked.service_details?.route ?? "Confirmed with sales")] })
							]
						})
					]
				})
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitBooking,
					className: "w-full max-w-lg border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper text-champagne",
							children: "COMPLETE BOOKING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl text-ivory",
							children: "Remaining details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-6 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field mt-2",
								value: name,
								onChange: (event) => setName(event.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field mt-2",
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-ivory/50",
								children: "Mobile number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field mt-2",
								value: mobile,
								onChange: (event) => setMobile(event.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper text-ivory/50",
									children: "Identity proof"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => fileRef.current?.click(),
										className: "border border-ivory/20 px-4 py-2 whisper text-ivory/60",
										children: file?.name ?? "UPLOAD DOCUMENT"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: ".jpg,.jpeg,.png,.pdf",
									className: "hidden",
									onChange: (event) => setFile(event.target.files?.[0] ?? null)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-between border-t border-ivory/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelected(null),
								className: "whisper text-ivory/40",
								children: "CANCEL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: saving,
								className: "whisper text-champagne disabled:opacity-40",
								children: saving ? "SUBMITTING..." : "SUBMIT BOOKING →"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CustomerBookings as component };
