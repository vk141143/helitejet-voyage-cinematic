import { r as __toESM } from "../_runtime.mjs";
import { l as menu, m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useScroll, r as useTransform, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CinematicPage-DbieIfxY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Central place for the site's motion language. */
var ease = [
	.22,
	1,
	.36,
	1
];
function useCinematicMotion() {
	return { reduced: !!useReducedMotion() };
}
/** A breathing hairline inviting the visitor to scroll. */
function ScrollIndicator({ opacity, label = "Scroll" }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		style: opacity ? { opacity } : {},
		className: "absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whisper text-ivory/50",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "block h-12 w-px bg-gradient-to-b from-gold to-transparent",
			animate: reduced ? { scaleY: 1 } : {
				scaleY: [
					.2,
					1,
					.2
				],
				originY: 0
			},
			transition: {
				duration: 2.4,
				repeat: Infinity,
				ease: "easeInOut"
			}
		})]
	});
}
/** A vertical track with a thumb bound to a container's scroll progress (used by the menu). */
function ScrollTrack({ progress, className = "" }) {
	const top = useTransform(progress, [0, 1], ["0%", "75%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: `pointer-events-none relative h-40 w-px bg-ivory/15 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			style: { top },
			className: "absolute left-0 h-1/4 w-px bg-champagne"
		})
	});
}
/** Fades and lifts content into view once as it enters the frame. */
function SectionReveal({ children, delay = 0, className, y = 28, as = "div" }) {
	const { reduced } = useCinematicMotion();
	const Tag = motion[as];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		initial: reduced ? false : {
			opacity: 0,
			y,
			filter: "blur(6px)"
		},
		whileInView: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		},
		viewport: {
			once: true,
			margin: "-10% 0px"
		},
		transition: {
			duration: 1.3,
			delay,
			ease
		},
		children
	});
}
/** Splits a headline on \n and reveals each line with a slight stagger. */
function Lines({ text, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
		delay: delay + i * .12,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block",
			children: line
		})
	}, i)) });
}
/** Small tracked label with a hairline rule. */
function Kicker({ children, align = "left" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-5 ${align === "right" ? "md:flex-row-reverse" : align === "center" ? "justify-center" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-gold/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "whisper text-champagne/80",
				children
			}),
			align === "center" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-gold/70" })
		]
	});
}
/** The site's single call-to-action treatment: a word and a drawn line. */
function LineLink({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative block h-px w-12 overflow-hidden bg-gold/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
		})]
	});
}
/**
* A scene chapter. Three depth planes move at different rates as the
* visitor scrolls: the photograph (far), a floating numeral (mid), and the
* text (near). The frame is pinned for the duration so it reads like a
* slow camera move rather than a page scroll.
*/
function Chapter({ chapter }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const off = reduced ? 0 : 1;
	const imgY = useTransform(scrollYProgress, [0, 1], [`${-10 * off}%`, `${10 * off}%`]);
	const imgScale = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		1.18,
		1.06,
		1
	].map((v) => reduced ? 1 : v));
	const imgO = useTransform(scrollYProgress, [
		0,
		.25,
		.75,
		1
	], [
		0,
		1,
		1,
		0
	]);
	const numeralY = useTransform(scrollYProgress, [0, 1], [180 * off, -180 * off]);
	const textY = useTransform(scrollYProgress, [
		.15,
		.5,
		.85
	], [
		90 * off,
		0,
		-90 * off
	]);
	const textO = useTransform(scrollYProgress, [
		.15,
		.4,
		.7,
		.9
	], [
		0,
		1,
		1,
		0
	]);
	const ruleScale = useTransform(scrollYProgress, [.25, .6], [0, 1]);
	const veil = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		.85,
		.5,
		.85
	]);
	const right = chapter.align === "right";
	const img = chapter.image ? scenes[chapter.image] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		id: chapter.id,
		className: "relative h-[170vh] md:h-[200vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: imgO },
					className: "absolute inset-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: img,
						alt: "",
						width: 1920,
						height: 1080,
						loading: "lazy",
						decoding: "async",
						style: {
							y: imgY,
							scale: imgScale
						},
						className: "absolute inset-0 h-full w-full object-cover will-change-transform"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: veil },
					className: "absolute inset-0 bg-obsidian"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${right ? "bg-[linear-gradient(270deg,var(--obsidian)_0%,transparent_55%)]" : "bg-[linear-gradient(90deg,var(--obsidian)_0%,transparent_55%)]"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": true,
					style: { y: numeralY },
					className: `pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif font-light leading-none text-ivory/[0.045] text-[52vw] md:text-[30vw] ${right ? "left-[4vw]" : "right-[4vw]"}`,
					children: chapter.numeral
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						y: textY,
						opacity: textO
					},
					className: `absolute inset-0 flex items-end pb-[14vh] md:items-center md:pb-0 ${right ? "justify-start md:justify-end" : "justify-start"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `w-full px-7 md:w-[46vw] md:px-[7vw] ${right ? "md:text-right" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-5 ${right ? "md:flex-row-reverse" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									style: {
										scaleX: ruleScale,
										originX: right ? 1 : 0
									},
									className: "h-px w-14 bg-gold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whisper text-champagne/80",
									children: [
										chapter.numeral,
										" — ",
										chapter.kicker
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-7 font-serif font-light leading-[1.02] tracking-[-0.01em] text-ivory text-[2.6rem] md:text-[4.2vw]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { text: chapter.title })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .25,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-7 max-w-md font-serif text-lg font-light leading-relaxed text-ivory/70 md:text-[1.35rem] md:leading-[1.55]",
									children: chapter.body
								})
							}),
							chapter.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: `mt-8 space-y-2 ${right ? "md:ml-auto" : ""}`,
									children: chapter.details.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "whisper text-ivory/45 !tracking-[0.22em] !normal-case !text-[0.72rem]",
										children: d
									}, d))
								})
							}),
							chapter.link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
								delay: .5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: chapter.link.to,
									className: "group mt-10 inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: chapter.link.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative block h-px w-10 overflow-hidden bg-gold/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
									})]
								})
							})
						]
					})
				})
			]
		})
	});
}
/**
* The opening shot. A pinned frame: as the visitor scrolls, the camera pushes
* slowly into the image while the title lifts away and dissolves.
*/
function CinematicHero({ image, eyebrow, headline, sub, caps = false, quiet = false, inquiry }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const scale = useTransform(scrollYProgress, [0, 1], reduced || quiet ? [1.02, 1.06] : [1.08, 1.3]);
	const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "12%"]);
	const dim = useTransform(scrollYProgress, [0, .8], [quiet ? .6 : .35, .92]);
	const titleY = useTransform(scrollYProgress, [0, .6], reduced ? [0, 0] : [0, -160]);
	const titleO = useTransform(scrollYProgress, [0, .45], [1, 0]);
	const blur = useTransform(scrollYProgress, [0, .5], ["blur(0px)", reduced ? "blur(0px)" : "blur(10px)"]);
	const hintO = useTransform(scrollYProgress, [0, .12], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "relative h-[170vh] md:h-[200vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: image,
					alt: "",
					width: 1920,
					height: 1080,
					fetchPriority: "high",
					decoding: "async",
					style: {
						scale,
						y: imgY
					},
					className: "absolute inset-0 h-full w-full object-cover will-change-transform"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: { opacity: dim },
					className: "absolute inset-0 bg-obsidian"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--obsidian)_110%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						y: titleY,
						opacity: titleO,
						filter: blur
					},
					className: "absolute inset-0 px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-full max-w-[1500px] flex-col items-center justify-center gap-8 md:flex-row md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[700px] text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: reduced ? false : {
										opacity: 0,
										letterSpacing: "0.7em"
									},
									animate: {
										opacity: 1,
										letterSpacing: "0.42em"
									},
									transition: {
										duration: 1.8,
										ease,
										delay: .3
									},
									className: "whisper text-champagne/80",
									children: eyebrow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: `mt-7 font-serif font-light text-ivory ${caps ? "uppercase tracking-[0.08em] leading-[1.05] text-[9.5vw] md:text-[5.6vw]" : "leading-[0.98] tracking-[-0.01em] text-[13vw] md:text-[7.2vw]"}`,
									children: headline.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "block",
										initial: reduced ? false : {
											opacity: 0,
											y: 40,
											filter: "blur(8px)"
										},
										animate: {
											opacity: 1,
											y: 0,
											filter: "blur(0px)"
										},
										transition: {
											duration: 1.6,
											ease,
											delay: .6 + i * .18
										},
										children: line
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: reduced ? false : { opacity: 0 },
									animate: { opacity: 1 },
									transition: {
										duration: 1.6,
										delay: 1.4
									},
									className: "mt-8 max-w-md font-serif text-xl italic font-light text-ivory/70 md:text-2xl",
									children: sub
								})
							]
						}), inquiry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: reduced ? false : {
								opacity: 0,
								x: 28,
								y: 18
							},
							animate: {
								opacity: 1,
								x: 0,
								y: 0
							},
							transition: {
								duration: 1.2,
								ease,
								delay: .8
							},
							className: "mt-2 block w-full max-w-[500px] md:mt-0",
							children: inquiry
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollIndicator, { opacity: hintO })
			]
		})
	});
}
/** Quiet colophon. Rendered inside the closing frame so every page ends the same way. */
function Footer({ overlay = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: `${overlay ? "absolute inset-x-0 bottom-0" : "relative border-t border-ivory/10 bg-obsidian"} px-7 pb-7 pt-6 md:px-10`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-serif text-lg tracking-[0.2em] text-ivory/80",
						children: brand.mark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper block text-ivory/40",
						children: brand.cities
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Footer",
					className: "hidden flex-wrap gap-x-5 gap-y-2 md:flex md:max-w-xl md:justify-end",
					children: menu.slice(1).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: m.to,
						className: "whisper text-ivory/40 transition-colors hover:text-champagne",
						children: m.label
					}, m.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${brand.email}`,
					className: "whisper text-ivory/40 transition-colors hover:text-champagne",
					children: brand.email
				})
			]
		})
	});
}
/**
* The final frame: the next world's image irises open from the centre as
* the visitor reaches the end, turning the page edge into a doorway.
*/
function Closing({ next }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"]
	});
	const clip = useTransform(scrollYProgress, [.1, .8], reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(48% 30% 48% 30%)", "inset(0% 0% 0% 0%)"]);
	const scale = useTransform(scrollYProgress, [.1, .9], reduced ? [1, 1] : [1.25, 1.02]);
	const textO = useTransform(scrollYProgress, [.55, .85], [0, 1]);
	const textY = useTransform(scrollYProgress, [.55, .85], reduced ? [0, 0] : [40, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		className: "relative h-[150vh] bg-obsidian",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-screen overflow-hidden grain",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					style: { clipPath: clip },
					className: "absolute inset-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: scenes[next.image],
							alt: "",
							width: 1920,
							height: 1080,
							loading: "lazy",
							decoding: "async",
							style: { scale },
							className: "h-full w-full object-cover will-change-transform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-obsidian/55" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--obsidian)_100%)]" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					style: {
						opacity: textO,
						y: textY
					},
					className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whisper text-champagne/80",
						children: "Continue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: next.to,
						className: "group mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-serif font-light leading-none text-ivory text-[13vw] md:text-[7vw] transition-colors duration-700 group-hover:text-champagne",
							children: next.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto mt-6 block h-px w-24 origin-center scale-x-50 bg-gold transition-transform duration-700 group-hover:scale-x-100" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { overlay: true })
			]
		})
	});
}
function Word({ word, i, total, progress, reduced }) {
	const start = .15 + i / total * .6;
	const end = start + .6 / total;
	const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [.16, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
		style: { opacity },
		className: "inline-block",
		children: [word, "\xA0"]
	});
}
/** An interlude: a single sentence that is lit word by word as the reader passes through it. */
function Passage({ text }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const words = text.split(" ");
	const glow = useTransform(scrollYProgress, [
		.2,
		.5,
		.8
	], [
		0,
		1,
		0
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative flex min-h-[110vh] items-center justify-center bg-obsidian px-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: { opacity: glow },
			className: "pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.1_80/0.16),transparent_65%)] blur-3xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "relative max-w-4xl text-center font-serif text-3xl font-light italic leading-[1.3] text-ivory md:text-[3.4vw]",
			children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Word, {
				word: w,
				i,
				total: words.length,
				progress: scrollYProgress,
				reduced
			}, i))
		})]
	});
}
/**
* Reusable world composition: Hero → (chapters) → bespoke sections → Passage → Closing.
* Every route uses this shell so pages open, breathe and end the same way.
*/
function CinematicPage({ world, children, hideChapters = false, heroContent }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
		initial: reduced ? false : { opacity: 0 },
		animate: { opacity: 1 },
		transition: {
			duration: 1.2,
			ease
		},
		className: `relative ${world.opening.quiet ? "bg-[oklch(0.09_0.005_275)]" : "bg-obsidian"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicHero, {
				image: scenes[world.key],
				...world.opening,
				inquiry: heroContent
			}),
			!hideChapters && world.chapters?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chapter, { chapter: c }, c.id)),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Passage, { text: world.passage }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closing, { next: world.next })
		]
	});
}
function worldHead(world) {
	return { meta: [
		{ title: world.seo.title },
		{
			name: "description",
			content: world.seo.description
		},
		{
			property: "og:title",
			content: world.seo.title
		},
		{
			property: "og:description",
			content: world.seo.description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
//#endregion
export { ScrollTrack as a, useCinematicMotion as c, Lines as i, worldHead as l, Kicker as n, SectionReveal as o, LineLink as r, ease as s, CinematicPage as t };
