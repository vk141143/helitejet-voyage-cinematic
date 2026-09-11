import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, r as useTransform, s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { C as travelProfiles, h as interestOptions, o as SectionReveal, p as ease, t as CinematicPage, w as useCinematicMotion } from "./CinematicPage-5SbnHwRf.mjs";
import { a as TextArea, c as friendlyError, i as SubmitLine, l as useEnquiry, n as Received, o as TextField, r as SelectField, t as GlassPanel } from "./fields-DVSuQ7bh.mjs";
import { t as world } from "./request-access-DVt0AMPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-access-B1cpFqLp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARTICLES = Array.from({ length: 18 }, (_, i) => ({
	left: `${i * 37 % 100}%`,
	top: `${(i * 53 + 11) % 100}%`,
	size: 1 + i * 7 % 3,
	delay: i % 6 * 1.3,
	duration: 14 + i % 5 * 3
}));
/**
* The request panel: a floating charcoal-glass plane that leans toward the
* cursor and with the scroll, lit by a single champagne source, surrounded by
* slow fog and a few drifting motes. Focusing a field warms the whole panel.
*/
function RequestAccessForm() {
	const { reduced } = useCinematicMotion();
	const section = (0, import_react.useRef)(null);
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [v, setV] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		location: "",
		interest: "",
		travel_profile: "",
		message: ""
	});
	const mutation = useEnquiry("access");
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const rxMouse = useSpring(useTransform(my, [-.5, .5], [4, -4]), {
		stiffness: 60,
		damping: 18
	});
	const ryMouse = useSpring(useTransform(mx, [-.5, .5], [-5, 5]), {
		stiffness: 60,
		damping: 18
	});
	const { scrollYProgress } = useScroll({
		target: section,
		offset: ["start end", "end start"]
	});
	const rxScroll = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		6,
		0,
		-6
	]);
	const rotateX = useTransform([rxMouse, rxScroll], ([a, b]) => reduced ? 0 : a + b);
	const rotateY = useTransform(ryMouse, (a) => reduced ? 0 : a);
	const floatY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);
	const lightX = useTransform(mx, [-.5, .5], ["30%", "70%"]);
	const lightY = useTransform(my, [-.5, .5], ["20%", "60%"]);
	const onMove = (e) => {
		if (reduced) return;
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - r.left) / r.width - .5);
		my.set((e.clientY - r.top) / r.height - .5);
	};
	const onLeave = () => {
		mx.set(0);
		my.set(0);
	};
	const set = (k) => (e) => setV((s) => ({
		...s,
		[k]: e.target.value
	}));
	const onSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(v);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: section,
		onMouseMove: onMove,
		onMouseLeave: onLeave,
		className: "relative overflow-hidden bg-obsidian px-5 py-[14vh] md:px-[10vw] md:py-[18vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fog absolute -left-[20%] top-[10%] h-[70vh] w-[70vw] bg-[radial-gradient(ellipse,oklch(0.3_0.01_270/0.5),transparent_65%)] blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fog fog-slow absolute -right-[25%] bottom-[0%] h-[80vh] w-[80vw] bg-[radial-gradient(ellipse,oklch(0.28_0.02_262/0.5),transparent_65%)] blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fog fog-slower absolute left-[20%] top-[50%] h-[50vh] w-[60vw] bg-[radial-gradient(ellipse,oklch(0.72_0.1_80/0.08),transparent_65%)] blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					style: {
						left: lightX,
						top: lightY
					},
					className: "absolute h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,oklch(0.86_0.055_85/0.22),transparent_60%)] blur-2xl"
				}),
				!reduced && PARTICLES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mote absolute rounded-full bg-champagne/70",
					style: {
						left: p.left,
						top: p.top,
						width: p.size,
						height: p.size,
						animationDelay: `${p.delay}s`,
						animationDuration: `${p.duration}s`
					}
				}, i))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-3xl",
			style: { perspective: 1600 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
				className: "mb-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-champagne/80",
					children: "Request Access"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-5 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl",
					children: [
						"A conversation,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"not an application."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					rotateX,
					rotateY,
					y: floatY,
					transformStyle: "preserve-3d"
				},
				className: "will-change-transform",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					glow: focused,
					className: "px-6 py-10 md:px-14 md:py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						"aria-hidden": true,
						animate: { opacity: focused ? 1 : 0 },
						transition: { duration: 1 },
						className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.055_85/0.08),transparent_60%)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: mutation.isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							exit: { opacity: 0 },
							className: "py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Received, {
								title: "The desk will call you.",
								body: "Expect a quiet conversation within two days, at an hour of your choosing."
							})
						}, "done") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
							onSubmit,
							onFocus: () => setFocused(true),
							onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false),
							exit: {
								opacity: 0,
								y: -12,
								transition: {
									duration: .7,
									ease
								}
							},
							noValidate: true,
							className: "relative",
							style: { transform: reduced ? void 0 : "translateZ(30px)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-9 md:grid-cols-2 md:gap-x-10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											label: "Full name",
											name: "full_name",
											autoComplete: "name",
											required: true,
											value: v.full_name,
											onChange: set("full_name")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											label: "Email",
											name: "email",
											type: "email",
											autoComplete: "email",
											required: true,
											value: v.email,
											onChange: set("email")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											label: "Phone",
											name: "phone",
											type: "tel",
											autoComplete: "tel",
											value: v.phone,
											onChange: set("phone")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											label: "Location",
											name: "location",
											autoComplete: "address-level2",
											placeholder: "City, country",
											value: v.location,
											onChange: set("location")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
											label: "Interest",
											name: "interest",
											options: interestOptions,
											value: v.interest,
											onChange: set("interest")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
											label: "Travel profile",
											name: "travel_profile",
											options: travelProfiles,
											value: v.travel_profile,
											onChange: set("travel_profile")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "md:col-span-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
												label: "Message",
												name: "message",
												placeholder: "Anything the desk should know before calling.",
												value: v.message,
												onChange: set("message")
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitLine, {
										pending: mutation.isPending,
										children: "Request a call"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whisper !normal-case !tracking-[0.12em] text-ivory/35",
										children: "Held in confidence. Never shared."
									})]
								}),
								mutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "mt-6 font-serif text-lg italic text-destructive",
									children: friendlyError(mutation.error)
								})
							]
						}, "form")
					})]
				})
			})]
		})]
	});
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestAccessForm, {})
	});
}
//#endregion
export { Page as component };
