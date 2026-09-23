import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { n as adminNav, t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.aircraft-DccFCgU5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminAircraft() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [aircraft, setAircraft] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [addMode, setAddMode] = (0, import_react.useState)("choose");
	const [kind, setKind] = (0, import_react.useState)(null);
	const [editingAircraft, setEditingAircraft] = (0, import_react.useState)(null);
	const [sModel, setSModel] = (0, import_react.useState)("");
	const [sCapacity, setSCapacity] = (0, import_react.useState)("");
	const [sError, setSError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [jsonText, setJsonText] = (0, import_react.useState)("");
	const [jsonError, setJsonError] = (0, import_react.useState)("");
	const [jsonPreview, setJsonPreview] = (0, import_react.useState)([]);
	const [importKind, setImportKind] = (0, import_react.useState)("flight");
	const [importing, setImporting] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function load() {
		setLoading(true);
		setError("");
		const { data, error: err } = await supabase.from("aircraft").select("*").order("kind").order("model");
		if (err) setError(err.message);
		else setAircraft(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const filtered = aircraft.filter((a) => {
		if (filter !== "all" && a.kind !== filter) return false;
		if (search && !a.model.toLowerCase().includes(search.toLowerCase())) return false;
		return true;
	});
	const allFilteredSelected = filtered.length > 0 && filtered.every((a) => selectedIds.includes(a.id));
	function openModal() {
		setShowModal(true);
		setAddMode("choose");
		setKind(null);
		setEditingAircraft(null);
		setSModel("");
		setSCapacity("");
		setSError("");
		setJsonText("");
		setJsonError("");
		setJsonPreview([]);
		setImportKind("flight");
	}
	function openEdit(row) {
		setShowModal(true);
		setAddMode("single");
		setKind(row.kind);
		setEditingAircraft(row);
		setSModel(row.model);
		setSCapacity(row.capacity);
		setSError("");
	}
	async function handleSingleSubmit(e) {
		e.preventDefault();
		if (!kind) return setSError("Select a type.");
		if (!sModel.trim()) return setSError("Enter a model name.");
		if (!sCapacity.trim()) return setSError("Enter seating capacity.");
		setSaving(true);
		setSError("");
		const seats = Number(sCapacity.match(/\d+/)?.[0]) || null;
		const payload = {
			kind,
			model: sModel.trim(),
			capacity: sCapacity.trim(),
			seats
		};
		const { error: err } = editingAircraft ? await supabase.from("aircraft").update(payload).eq("id", editingAircraft.id) : await supabase.from("aircraft").insert(payload);
		if (err) {
			setSError(err.message);
			setSaving(false);
			return;
		}
		setSaving(false);
		setShowModal(false);
		load();
	}
	function parseJsonInput(text, fallbackKind = importKind) {
		setJsonText(text);
		setJsonError("");
		setJsonPreview([]);
		if (!text.trim()) return;
		try {
			const parsed = JSON.parse(text);
			const entries = (Array.isArray(parsed) ? parsed : [parsed]).map((item, i) => {
				const o = item;
				const rawKind = String(o.kind ?? o.type ?? o["Aircraft Type"] ?? "").toLowerCase();
				const k = rawKind.includes("heli") || rawKind.includes("rw") || rawKind.includes("rotor") ? "helicopter" : rawKind.includes("flight") || rawKind.includes("fw") || rawKind.includes("fixed") ? "flight" : fallbackKind;
				const model = String(o.model ?? o.name ?? o.aircraft ?? o.Model ?? "");
				const capacity = String(o.capacity ?? o.seats ?? o.seating ?? o["Seating Capacity"] ?? "");
				if (!model) throw new Error(`Item ${i + 1}: missing "model" field`);
				return {
					kind: k,
					model,
					capacity,
					seats: Number(capacity.match(/\d+/)?.[0]) || null
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
		const { error: err } = await supabase.from("aircraft").insert(jsonPreview);
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
		const { error: err } = await supabase.from("aircraft").delete().eq("id", id);
		if (err) setError(err.message);
		else setSelectedIds((ids) => ids.filter((selectedId) => selectedId !== id));
		load();
	}
	function toggleSelected(id) {
		setSelectedIds((ids) => ids.includes(id) ? ids.filter((selectedId) => selectedId !== id) : [...ids, id]);
	}
	function toggleAllFiltered() {
		setSelectedIds((ids) => {
			if (allFilteredSelected) {
				const visibleIds = new Set(filtered.map((a) => a.id));
				return ids.filter((id) => !visibleIds.has(id));
			}
			return [.../* @__PURE__ */ new Set([...ids, ...filtered.map((a) => a.id)])];
		});
	}
	async function handleBulkDelete() {
		if (!selectedIds.length) return;
		if (!window.confirm(`Delete ${selectedIds.length} selected aircraft?`)) return;
		const idsToDelete = [...selectedIds];
		const { error: err } = await supabase.from("aircraft").delete().in("id", idsToDelete);
		if (err) setError(err.message);
		else setSelectedIds([]);
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Aircraft",
		nav: adminNav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whisper text-champagne",
					children: "FLEET INVENTORY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-serif text-2xl font-light text-ivory",
					children: [aircraft.length, " aircraft"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openModal,
					className: "inline-flex items-center gap-2 border border-champagne/50 px-5 py-2.5 whisper text-champagne transition-colors hover:bg-champagne/10",
					children: "+ ADD AIRCRAFT"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap items-center gap-3",
				children: [[
					"all",
					"flight",
					"helicopter"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f),
					className: `border px-4 py-1.5 whisper text-xs transition-colors ${filter === f ? "border-champagne text-champagne" : "border-ivory/20 text-ivory/50 hover:border-ivory/50"}`,
					children: f === "all" ? `ALL (${aircraft.length})` : f === "flight" ? `FLIGHTS (${aircraft.filter((a) => a.kind === "flight").length})` : `HELICOPTERS (${aircraft.filter((a) => a.kind === "helicopter").length})`
				}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search model…",
					className: "ml-auto border border-ivory/15 bg-transparent px-3 py-1.5 font-serif text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-champagne/60 md:w-56"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-3 border border-champagne/20 bg-champagne/[0.04] px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 whisper text-xs text-ivory/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: allFilteredSelected,
							onChange: toggleAllFiltered,
							disabled: !filtered.length,
							className: "accent-[var(--champagne)]"
						}),
						"SELECT ALL FILTERED (",
						filtered.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleBulkDelete,
					disabled: !selectedIds.length,
					className: "whisper text-xs text-red-300 transition-colors hover:text-red-200 disabled:opacity-30",
					children: [
						"DELETE SELECTED (",
						selectedIds.length,
						")"
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-red-300/30 p-3 text-sm text-red-200",
				children: error
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center font-serif italic text-ivory/30",
				children: "Loading fleet…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-ivory/10 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ivory/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-12 px-4 py-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "TYPE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "MODEL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 whisper text-ivory/40 font-normal",
								children: "SEATING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 whisper text-ivory/40 font-normal" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ivory/[0.06] hover:bg-ivory/[0.02] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: selectedIds.includes(a.id),
									onChange: () => toggleSelected(a.id),
									"aria-label": `Select ${a.model}`,
									className: "accent-[var(--champagne)]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `whisper text-[0.6rem] px-2 py-0.5 border ${a.kind === "flight" ? "border-champagne/40 text-champagne" : "border-ivory/30 text-ivory/60"}`,
									children: a.kind === "flight" ? "FLIGHT" : "HELICOPTER"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-serif text-ivory",
								children: a.model
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-ivory/60",
								children: a.capacity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openEdit(a),
									className: "mr-4 whisper text-[0.6rem] text-ivory/40 hover:text-champagne transition-colors",
									children: "EDIT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleDelete(a.id),
									className: "whisper text-[0.6rem] text-ivory/30 hover:text-red-400 transition-colors",
									children: "REMOVE"
								})]
							})
						]
					}, a.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-4 py-12 text-center font-serif italic text-ivory/30",
						children: aircraft.length === 0 ? "No aircraft yet. Click + ADD AIRCRAFT to get started." : "No aircraft match your filter."
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
								children: "FLEET MANAGEMENT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-3xl font-light text-ivory",
								children: editingAircraft ? "Edit Aircraft" : addMode === "choose" ? "Add Aircraft" : addMode === "single" ? kind ? `Add ${kind === "flight" ? "Flight" : "Helicopter"}` : "Select Type" : "Import via JSON"
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
									children: "How would you like to add aircraft?"
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
										children: "Enter model name and seating manually"
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
										children: "Paste or upload a JSON file with multiple aircraft"
									})]
								})
							]
						}),
						addMode === "single" && !kind && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ivory/50",
									children: "What type of aircraft?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setKind("flight"),
										className: "border border-ivory/20 py-6 text-left px-5 transition-colors hover:border-champagne/60 hover:bg-champagne/[0.05]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif text-lg text-ivory block",
											children: "Flight"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-ivory/35",
											children: "Fixed-wing aircraft"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setKind("helicopter"),
										className: "border border-ivory/20 py-6 text-left px-5 transition-colors hover:border-champagne/60 hover:bg-champagne/[0.05]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif text-lg text-ivory block",
											children: "Helicopter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-ivory/35",
											children: "Rotorcraft"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAddMode("choose"),
									className: "whisper text-ivory/40 hover:text-champagne text-xs",
									children: "← BACK"
								})
							]
						}),
						addMode === "single" && kind && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSingleSubmit,
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `whisper text-[0.6rem] px-2 py-0.5 border ${kind === "flight" ? "border-champagne/40 text-champagne" : "border-ivory/30 text-ivory/60"}`,
										children: kind === "flight" ? "FLIGHT" : "HELICOPTER"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKind(null),
										className: "whisper text-[0.6rem] text-ivory/30 hover:text-champagne",
										children: "CHANGE"
									})]
								}),
								sError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "border border-red-300/30 p-3 text-sm text-red-200",
									children: sError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-ivory/50",
										children: "Model name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1",
										value: sModel,
										onChange: (e) => setSModel(e.target.value),
										placeholder: kind === "flight" ? "e.g. Gulfstream G550" : "e.g. Bell 407",
										autoFocus: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "whisper text-ivory/50",
										children: "Seating capacity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field mt-1",
										value: sCapacity,
										onChange: (e) => setSCapacity(e.target.value),
										placeholder: "e.g. 8"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-ivory/10 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setKind(null),
										className: "whisper text-ivory/40 hover:text-champagne",
										children: "← BACK"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: saving,
										className: "whisper text-champagne hover:text-ivory disabled:opacity-50",
										children: saving ? "SAVING…" : editingAircraft ? "UPDATE AIRCRAFT →" : "ADD AIRCRAFT →"
									})]
								})
							]
						}),
						addMode === "json" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whisper text-ivory/50",
									children: "Import type for rows without a type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: ["flight", "helicopter"].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setImportKind(option);
											parseJsonInput(jsonText, option);
										},
										className: `border py-2 whisper text-xs transition-colors ${importKind === option ? "border-champagne text-champagne" : "border-ivory/20 text-ivory/50 hover:border-ivory/50"}`,
										children: option === "flight" ? "FLIGHTS" : "HELICOPTERS"
									}, option))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-ivory/40",
									children: [
										"Expected format: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
											className: "text-champagne/70",
											children: [
												"[",
												`{"kind":"flight","model":"...","capacity":"8"}`,
												"]"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-ivory/50",
											children: "kind"
										}),
										": \"flight\" or \"helicopter\" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-ivory/50",
											children: "model"
										}),
										" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "text-ivory/50",
											children: "capacity"
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
									placeholder: "[{\"kind\":\"flight\",\"model\":\"Gulfstream G550\",\"capacity\":\"8\"}]",
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
										children: [jsonPreview.length, " AIRCRAFT READY TO IMPORT"]
									}), jsonPreview.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-xs text-ivory/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `whisper text-[0.55rem] px-1.5 border ${a.kind === "flight" ? "border-champagne/30 text-champagne/70" : "border-ivory/20"}`,
												children: a.kind === "flight" ? "FW" : "RW"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif text-ivory",
												children: a.model
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-auto",
												children: a.capacity
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
										children: importing ? "IMPORTING…" : `IMPORT ${jsonPreview.length > 0 ? `${jsonPreview.length} AIRCRAFT` : ""} →`
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
export { AdminAircraft as component };
