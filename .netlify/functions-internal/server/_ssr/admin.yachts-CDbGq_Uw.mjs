import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { n as adminNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.yachts-CDbGq_Uw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminYachts() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [yachts, setYachts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [addMode, setAddMode] = (0, import_react.useState)("choose");
	const [sName, setSName] = (0, import_react.useState)("");
	const [sType, setSType] = (0, import_react.useState)("");
	const [sLength, setSLength] = (0, import_react.useState)("");
	const [sCapacity, setSCapacity] = (0, import_react.useState)("");
	const [sGuests, setSGuests] = (0, import_react.useState)("");
	const [sError, setSError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [jsonText, setJsonText] = (0, import_react.useState)("");
	const [jsonError, setJsonError] = (0, import_react.useState)("");
	const [jsonPreview, setJsonPreview] = (0, import_react.useState)([]);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function load() {
		setLoading(true);
		setError("");
		const { data, error: err } = await supabase.from("yachts").select("*").order("name");
		if (err) setError(err.message);
		else setYachts(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const filtered = yachts.filter((y) => !search || y.name.toLowerCase().includes(search.toLowerCase()) || (y.yacht_type ?? "").toLowerCase().includes(search.toLowerCase()));
	function openModal() {
		setShowModal(true);
		setAddMode("choose");
		setSName("");
		setSType("");
		setSLength("");
		setSCapacity("");
		setSGuests("");
		setSError("");
		setJsonText("");
		setJsonError("");
		setJsonPreview([]);
	}
	async function handleSingleSubmit(e) {
		e.preventDefault();
		if (!sName.trim()) return setSError("Enter a yacht name.");
		setSaving(true);
		setSError("");
		const { error: err } = await supabase.from("yachts").insert({
			name: sName.trim(),
			yacht_type: sType.trim() || null,
			length_m: sLength ? Number(sLength) : null,
			capacity: sCapacity.trim() || null,
			guests: sGuests ? Number(sGuests) : null
		});
		if (err) {
			setSError(err.message);
			setSaving(false);
			return;
		}
		setSaving(false);
		setShowModal(false);
		load();
	}
	function parseJsonInput(text) {
		setJsonText(text);
		setJsonError("");
		setJsonPreview([]);
		if (!text.trim()) return;
		try {
			const entries = (Array.isArray(JSON.parse(text)) ? JSON.parse(text) : [JSON.parse(text)]).map((item, i) => {
				const o = item;
				const name = String(o.name ?? o.yacht_name ?? "");
				if (!name) throw new Error(`Item ${i + 1}: missing "name" field`);
				return {
					name,
					yacht_type: o.yacht_type ? String(o.yacht_type) : o.type ? String(o.type) : null,
					length_m: o.length_m ? Number(o.length_m) : o.length ? Number(o.length) : null,
					capacity: o.capacity ? String(o.capacity) : null,
					guests: o.guests ? Number(o.guests) : null
				};
			});
			setJsonPreview(entries);
		} catch (err) {
			setJsonError(err instanceof Error ? err.message : "Invalid JSON");
		}
	}
	function handleFileUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => parseJsonInput(String(ev.target?.result ?? ""));
		reader.readAsText(file);
	}
	async function handleJsonImport() {
		if (!jsonPreview.length) return;
		setImporting(true);
		const { error: err } = await supabase.from("yachts").insert(jsonPreview);
		if (err) {
			setJsonError(err.message);
			setImporting(false);
			return;
		}
		setImporting(false);
		setShowModal(false);
		load();
	}
	async function handleDelete(id) {
		await supabase.from("yachts").delete().eq("id", id);
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Yachts",
		nav: adminNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "YACHT FLEET"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-serif text-2xl font-light text-ivory",
					children: [yachts.length, " yachts"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openModal,
					className: "inline-flex items-center gap-2 border border-champagne/50 px-5 py-2.5 whisper text-champagne transition-colors hover:bg-champagne/10",
					children: "+ ADD YACHT"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search name or type…",
					className: "border border-ivory/15 bg-transparent px-3 py-1.5 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60 w-full md:w-72"
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-red-300/30 p-3 text-sm text-red-200",
				children: error
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center font-serif italic text-ivory/30",
				children: "Loading yachts…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-ivory/10 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ivory/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "NAME"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "TYPE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "LENGTH"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "GUESTS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "CAPACITY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 whisper text-ivory/40 font-normal" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ivory/[0.06] hover:bg-ivory/[0.02] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-serif text-ivory",
								children: y.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: y.yacht_type ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: y.length_m ? `${y.length_m}m` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: y.guests ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: y.capacity ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleDelete(y.id),
									className: "whisper text-[0.6rem] text-ivory/30 hover:text-red-400 transition-colors",
									children: "REMOVE"
								})
							})
						]
					}, y.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-4 py-12 text-center font-serif italic text-ivory/30",
						children: yachts.length === 0 ? "No yachts yet. Click + ADD YACHT to get started." : "No yachts match your search."
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setShowModal(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "w-full max-w-lg border border-ivory/15 bg-[oklch(0.1_0.008_275)] p-7",
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: 10
					},
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-ivory/10 pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whisper text-champagne",
								children: "YACHT MANAGEMENT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-3xl font-light text-ivory",
								children: addMode === "choose" ? "Add Yacht" : addMode === "single" ? "Yacht Details" : "Import via JSON"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowModal(false),
								className: "text-2xl text-ivory/50 hover:text-champagne",
								children: "×"
							})]
						}),
						addMode === "choose" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ivory/50",
									children: "How would you like to add yachts?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAddMode("single"),
									className: "w-full border border-champagne/40 py-4 text-left px-5 transition-colors hover:bg-champagne/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-champagne block",
										children: "ADD ONE BY ONE →"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-xs text-ivory/40",
										children: "Enter yacht details manually"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setAddMode("json"),
									className: "w-full border border-ivory/20 py-4 text-left px-5 transition-colors hover:border-ivory/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-ivory/70 block",
										children: "IMPORT JSON →"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-xs text-ivory/40",
										children: "Paste or upload a JSON file with multiple yachts"
									})]
								})
							]
						}),
						addMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSingleSubmit,
							className: "mt-6 space-y-4",
							children: [
								sError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "border border-red-300/30 p-3 text-sm text-red-200",
									children: sError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "whisper text-ivory/50",
										children: ["Yacht name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-300",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1",
										value: sName,
										onChange: (e) => setSName(e.target.value),
										placeholder: "e.g. Serenity IV",
										autoFocus: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-ivory/50",
										children: "Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1",
										value: sType,
										onChange: (e) => setSType(e.target.value),
										placeholder: "e.g. Motor Yacht, Sailing Yacht"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whisper text-ivory/50",
											children: "Length (m)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field mt-1",
											type: "number",
											value: sLength,
											onChange: (e) => setSLength(e.target.value),
											placeholder: "e.g. 45"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whisper text-ivory/50",
											children: "Max guests"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field mt-1",
											type: "number",
											value: sGuests,
											onChange: (e) => setSGuests(e.target.value),
											placeholder: "e.g. 12"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-ivory/50",
										children: "Capacity note"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1",
										value: sCapacity,
										onChange: (e) => setSCapacity(e.target.value),
										placeholder: "e.g. 12 guests / 6 cabins"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-ivory/10 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setAddMode("choose"),
										className: "whisper text-ivory/40 hover:text-champagne",
										children: "← BACK"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: saving,
										className: "whisper text-champagne hover:text-ivory disabled:opacity-50",
										children: saving ? "SAVING…" : "ADD YACHT →"
									})]
								})
							]
						}),
						addMode === "json" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-ivory/40",
									children: [
										"Expected format: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
											className: "text-champagne/70",
											children: [
												"[",
												`{"name":"...","yacht_type":"Motor Yacht","length_m":45,"guests":12}`,
												"]"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Required: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-ivory/50",
											children: "name"
										}),
										" · Optional: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-ivory/50",
											children: "yacht_type, length_m, guests, capacity"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => fileRef.current?.click(),
									className: "border border-ivory/20 px-4 py-2 whisper text-xs text-ivory/60 hover:border-champagne hover:text-champagne transition-colors",
									children: "UPLOAD .JSON FILE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: ".json",
									className: "hidden",
									onChange: handleFileUpload
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: jsonText,
									onChange: (e) => parseJsonInput(e.target.value),
									placeholder: "[{\"name\":\"Serenity IV\",\"yacht_type\":\"Motor Yacht\",\"length_m\":45,\"guests\":12}]",
									rows: 6,
									className: "w-full border border-ivory/15 bg-transparent px-3 py-2 font-mono text-xs text-ivory outline-none placeholder:text-ivory/20 focus:border-champagne/60 resize-none"
								}),
								jsonError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "border border-red-300/30 p-3 text-sm text-red-200",
									children: jsonError
								}),
								jsonPreview.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-ivory/10 bg-ivory/[0.02] p-3 max-h-40 overflow-y-auto space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "whisper text-champagne text-[0.6rem] mb-2",
										children: [jsonPreview.length, " YACHTS READY TO IMPORT"]
									}), jsonPreview.map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-xs text-ivory/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif text-ivory",
												children: y.name
											}),
											y.yacht_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-ivory/40",
												children: y.yacht_type
											}),
											y.length_m && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-auto",
												children: [y.length_m, "m"]
											})
										]
									}, i))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-ivory/10 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setAddMode("choose"),
										className: "whisper text-ivory/40 hover:text-champagne",
										children: "← BACK"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleJsonImport,
										disabled: !jsonPreview.length || !!jsonError || importing,
										className: "whisper text-champagne hover:text-ivory disabled:opacity-40",
										children: importing ? "IMPORTING…" : `IMPORT ${jsonPreview.length > 0 ? `${jsonPreview.length} YACHTS` : ""} →`
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
export { AdminYachts as component };
