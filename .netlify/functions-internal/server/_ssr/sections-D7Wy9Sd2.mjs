import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, r as useTransform } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { D as yachtsContent, S as subscriptionContent, b as residencesContent, c as aviationContent, f as destinationsContent, g as membershipContent, i as Lines, m as experiencesContent, n as Kicker, o as SectionReveal, p as ease, r as LineLink, s as aboutContent, v as mobilityContent, w as useCinematicMotion, x as scenes, y as privateContent } from "./CinematicPage-5SbnHwRf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sections-D7Wy9Sd2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* An image that drifts and settles as it passes through the viewport,
* giving flat photography a sense of depth. Wrap it in a sized container.
*/
function ParallaxImage({ src, alt = "", className = "", imgClassName = "", travel = 12, zoom = 1.15, width = 1920, height = 1080, priority = false }) {
	const ref = (0, import_react.useRef)(null);
	const { reduced } = useCinematicMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`${-travel}%`, `${travel}%`]);
	const scale = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], reduced ? [
		1,
		1,
		1
	] : [
		zoom,
		1 + (zoom - 1) / 2,
		1
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `relative overflow-hidden ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
			src,
			alt,
			width,
			height,
			loading: priority ? "eager" : "lazy",
			decoding: "async",
			style: {
				y,
				scale
			},
			className: `absolute inset-0 h-full w-full object-cover will-change-transform ${imgClassName}`
		})
	});
}
/**
* A tall portal. The photograph is held behind a narrow frame that widens as
* you hover, as if a door were opening onto the place.
*/
function DestinationCard({ index, name, region, season, line, image }) {
	const { reduced } = useCinematicMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
		initial: reduced ? false : {
			opacity: 0,
			y: 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-8% 0px"
		},
		transition: {
			duration: 1.2,
			ease,
			delay: index % 5 * .08
		},
		className: "group relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxImage, {
						src: image,
						alt: `${name}, ${region}`,
						className: "aspect-[3/4]",
						travel: 8,
						zoom: 1.12,
						width: 900,
						height: 1200
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-y-0 left-0 w-px bg-champagne/40 transition-all duration-1000 group-hover:left-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-y-0 right-0 w-px bg-champagne/40 transition-all duration-1000 group-hover:right-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper absolute left-5 top-5 text-ivory/60",
					children: String(index + 1).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper block text-champagne/80",
							children: region
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-serif text-4xl font-light leading-none text-ivory md:text-5xl",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-h-0 overflow-hidden font-serif text-base font-light leading-relaxed text-ivory/70 opacity-0 transition-all duration-1000 group-hover:max-h-40 group-hover:opacity-100 md:text-lg",
							children: line
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper !tracking-[0.2em] text-ivory/45",
								children: season
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/concierge",
								className: "whisper text-champagne opacity-0 transition-opacity duration-700 group-hover:opacity-100 focus:opacity-100",
								children: "Arrange"
							})]
						})
					]
				})
			]
		})
	});
}
/**
* A photographic tile with a hairline frame, a caption block and — on
* desktop — a gentle 3D float toward the cursor. Sharp corners, no chrome.
*/
function LuxuryCard({ image, alt = "", eyebrow, title, children, className = "", aspect = "aspect-[4/5]", float = true, width = 1280, height = 800 }) {
	const { reduced } = useCinematicMotion();
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const rx = useSpring(useTransform(my, [-.5, .5], [6, -6]), {
		stiffness: 120,
		damping: 20
	});
	const ry = useSpring(useTransform(mx, [-.5, .5], [-8, 8]), {
		stiffness: 120,
		damping: 20
	});
	const lift = useSpring(0, {
		stiffness: 120,
		damping: 20
	});
	const on = float && !reduced;
	const onMove = (e) => {
		if (!on) return;
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - r.left) / r.width - .5);
		my.set((e.clientY - r.top) / r.height - .5);
		lift.set(-10);
	};
	const onLeave = () => {
		mx.set(0);
		my.set(0);
		lift.set(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { perspective: 1400 },
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
			onMouseMove: onMove,
			onMouseLeave: onLeave,
			style: on ? {
				rotateX: rx,
				rotateY: ry,
				y: lift,
				transformStyle: "preserve-3d"
			} : {},
			className: "group relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative border border-ivory/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxImage, {
						src: image,
						alt,
						className: aspect,
						travel: 6,
						zoom: 1.1,
						width,
						height
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-6 md:p-8",
						style: on ? { transform: "translateZ(40px)" } : void 0,
						children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper block text-champagne/80",
							children: eyebrow
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-serif text-3xl font-light leading-tight text-ivory md:text-4xl",
							children: title
						})]
					})
				]
			}), children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-5",
				children
			})]
		})
	});
}
function Editorial({ kicker, title, body, children, align = "left", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${align === "right" ? "md:text-right md:ml-auto" : ""} max-w-xl ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
				align,
				children: kicker
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 font-serif text-[2.5rem] font-light leading-[1.02] text-ivory md:text-[3.8vw]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { text: title })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-7 font-serif text-lg font-light leading-relaxed text-ivory/70 md:text-[1.35rem] md:leading-[1.55]",
					children: body
				})
			}),
			children
		]
	});
}
function CTA({ to, label, className = "", onOpenInquiry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
		delay: .3,
		className,
		children: onOpenInquiry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onOpenInquiry,
			className: "text-left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineLink, { children: label })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineLink, { children: label })
		})
	});
}
function Split({ image, children, flip = false, imageKey, inquiryLabel, onOpenInquiry }) {
	const src = image ?? (imageKey ? scenes[imageKey] : scenes.home);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative grid items-center gap-12 px-7 py-[12vh] md:grid-cols-2 md:gap-[6vw] md:px-[7vw]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: flip ? "md:order-2" : "",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative ${flip ? "md:order-1" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxImage, {
				src,
				className: "aspect-[4/5] md:aspect-[3/4]"
			}), inquiryLabel && onOpenInquiry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpenInquiry,
				className: "group absolute -bottom-2 right-4 z-10 flex items-center gap-4 border border-champagne/40 bg-[oklch(0.13_0.01_275/0.82)] px-4 py-3 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:bg-[oklch(0.15_0.012_275/0.9)] md:right-8 md:px-5",
				"aria-label": inquiryLabel,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-champagne",
					children: inquiryLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative block h-px w-10 overflow-hidden bg-gold/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
				})]
			})]
		})]
	});
}
function AviationSections({ onOpenInquiry }) {
	const c = aviationContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "aviation",
			inquiryLabel: "Plan Your Journey",
			onOpenInquiry,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, { ...c.intro })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[8vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-ivory/10 border-y border-ivory/10",
				children: c.jets.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
					as: "li",
					delay: i * .08,
					className: "grid gap-3 py-8 md:grid-cols-[1fr_auto_auto_1.4fr] md:items-baseline md:gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-3xl font-light text-ivory md:text-4xl",
							children: j.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-champagne/80",
							children: j.range
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-ivory/50",
							children: j.seats
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-lg italic font-light text-ivory/60",
							children: j.note
						})
					]
				}, j.name))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "mobility",
			flip: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				kicker: c.helicopters.kicker,
				title: c.helicopters.title,
				body: c.helicopters.body,
				align: "right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
					delay: .3,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 space-y-2",
						children: c.helicopters.fleet.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "whisper !normal-case !tracking-[0.22em] !text-[0.72rem] text-ivory/45",
							children: f
						}, f))
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-7 py-[12vh] md:px-[7vw]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
					kicker: c.network.kicker,
					title: c.network.title,
					body: c.network.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-14 grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-4",
					children: c.network.lines.map(([k, v], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
						delay: i * .08,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "whisper text-champagne/80",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-3 font-serif text-xl font-light leading-snug text-ivory/80",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
					...c.cta,
					className: "mt-16",
					onOpenInquiry
				})
			]
		})
	] });
}
function YachtsSections({ onOpenInquiry }) {
	const c = yachtsContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 pt-[12vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, { ...c.intro })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "yachts",
			flip: true,
			inquiryLabel: "Explore Options",
			onOpenInquiry,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				kicker: "The Fleet",
				title: "Each passage, shaped by the desk.",
				body: "A yacht is chosen by mood, guest count, destination and day-to-day rhythm rather than a single brochure list.",
				align: "right"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-10 px-7 py-[10vh] md:grid-cols-3 md:gap-8 md:px-[7vw]",
			children: c.fleet.map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
				delay: i * .12,
				className: i === 1 ? "md:mt-20" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LuxuryCard, {
					image: scenes[y.image],
					alt: `${y.name}, ${y.type}`,
					eyebrow: `${y.type} · ${y.length}`,
					title: y.name,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whisper !normal-case !tracking-[0.18em] text-ivory/45",
							children: y.guests
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whisper !normal-case !tracking-[0.18em] text-champagne/70",
							children: y.waters
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-serif text-lg font-light leading-relaxed text-ivory/65",
							children: y.note
						})
					]
				})
			}, y.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "residences",
			flip: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				...c.arrival,
				align: "right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
					...c.cta,
					className: "mt-10",
					onOpenInquiry
				})
			})
		})
	] });
}
function MobilitySections() {
	const c = mobilityContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[8vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, {
				className: "flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ivory/10 pb-8",
				children: c.sequence.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-baseline gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-4xl font-light text-ivory md:text-6xl",
						children: s.stage
					}), i < c.sequence.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 self-center bg-gold/60" })]
				}, i))
			})
		}),
		c.sequence.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: s.image,
			flip: i % 2 === 1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				kicker: `${String(i + 1).padStart(2, "0")} — ${s.stage}`,
				title: s.title,
				body: s.body,
				align: i % 2 === 1 ? "right" : "left"
			})
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[12vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				...c.principle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
					...c.cta,
					className: "mt-10"
				})
			})
		})
	] });
}
function ResidencesSections({ onOpenInquiry }) {
	const c = residencesContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "residences",
			inquiryLabel: "Enquire",
			onOpenInquiry,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				kicker: "Residences",
				title: "A home that is already prepared.",
				body: "Choose the setting, guest count and rhythm of the stay, and the desk arranges the rest with the same discretion as the flight itself.",
				align: "left"
			})
		}),
		c.properties.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-screen overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxImage, {
					src: scenes[p.image],
					alt: `${p.name}, ${p.place}`,
					className: "absolute inset-0 h-full",
					travel: 10,
					zoom: 1.2,
					width: 1600,
					height: 900
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `relative flex min-h-screen items-end px-7 pb-[12vh] pt-[30vh] md:px-[7vw] ${i % 2 ? "md:justify-end" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-xl ${i % 2 ? "md:text-right" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
								align: i % 2 ? "right" : "left",
								children: `${String(i + 1).padStart(2, "0")} — ${p.place}`
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 font-serif text-5xl font-light leading-none text-ivory md:text-[5.5vw]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lines, { text: p.name })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
								delay: .2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whisper mt-5 text-ivory/50",
									children: p.sleeps
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-2",
									children: p.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "font-serif text-lg font-light text-ivory/75 md:text-xl",
										children: l
									}, l))
								})]
							})
						]
					})
				})
			]
		}, p.name)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[12vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				...c.stewardship,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
					...c.cta,
					className: "mt-10",
					onOpenInquiry
				})
			})
		})
	] });
}
function ExperiencesSections() {
	const c = experiencesContent;
	const span = (s) => s === "wide" ? "md:col-span-2 aspect-[16/9]" : s === "tall" ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 pt-[10vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
				className: "flex flex-wrap items-baseline justify-between gap-6 border-b border-ivory/10 pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-3xl font-light italic text-ivory/70",
					children: "Issue No. 12 — The Quiet Season"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/40",
					children: c.features.map((f) => f.category).join(" · ")
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-6 px-7 py-[8vh] md:grid-cols-3 md:px-[7vw]",
			children: c.features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
				delay: i % 3 * .1,
				className: `group relative overflow-hidden ${span(f.size)}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallaxImage, {
						src: scenes[f.image],
						alt: f.title,
						className: "absolute inset-0 h-full",
						travel: 6,
						zoom: 1.1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent transition-opacity duration-1000 group-hover:opacity-90" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-6 md:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whisper text-champagne/80",
								children: f.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-serif text-3xl font-light leading-tight text-ivory md:text-4xl",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-md font-serif text-base italic font-light leading-relaxed text-ivory/65 md:text-lg",
								children: f.dek
							})
						]
					})
				]
			}, f.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 pb-[8vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, { ...c.cta })
		})
	] });
}
function DestinationsSections() {
	const c = destinationsContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid grid-cols-2 gap-4 px-5 py-[10vh] md:grid-cols-5 md:gap-6 md:px-[5vw]",
		children: c.portals.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationCard, {
			index: i,
			...p
		}, p.name))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-7 pb-[10vh] md:px-[7vw]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, { ...c.cta })
	})] });
}
function MembershipSections() {
	const c = membershipContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "membership",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, { ...c.intro })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[10vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-12 md:grid-cols-4 md:gap-10",
				children: c.path.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
					as: "li",
					delay: i * .1,
					className: "border-t border-ivory/10 pt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-5xl font-light text-champagne/70",
							children: s.step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-serif text-3xl font-light text-ivory",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-serif text-lg font-light leading-relaxed text-ivory/65",
							children: s.body
						})
					]
				}, s.step))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-7 py-[10vh] md:px-[7vw]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-16 md:grid-cols-2 md:gap-[6vw]",
				children: c.tiers.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
					delay: i * .12,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: i === 0 ? "Tier One" : "Tier Two" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-serif text-4xl font-light text-ivory md:text-5xl",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-serif text-lg font-light leading-relaxed text-ivory/65 md:text-xl",
							children: t.body
						}),
						"to" in t && t.to && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: t.to,
							className: "mt-8 inline-block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineLink, { children: "Discover" })
						})
					]
				}, t.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
				...c.cta,
				className: "mt-20"
			})]
		})
	] });
}
function SubscriptionsSections() {
	const c = subscriptionContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
			imageKey: "membership",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, { ...c.intro })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-7 py-[10vh] md:px-[7vw]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-3 md:gap-6",
				children: c.clubs.map((club, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
					delay: i * .12,
					className: "group border border-ivory/10 bg-[oklch(0.12_0.008_275/0.8)] p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "whisper text-champagne/80",
							children: club.tag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-serif text-4xl font-light leading-tight text-ivory md:text-[2.5rem]",
							children: club.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-serif text-lg font-light leading-relaxed text-ivory/70",
							children: club.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-3",
							children: club.perks.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-ivory/65",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 h-1.5 w-1.5 rounded-full bg-gold",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-serif text-lg font-light leading-relaxed",
									children: perk
								})]
							}, perk))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 border-t border-ivory/10 pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/request-access",
								className: "group inline-flex items-center gap-4 whisper text-champagne transition-colors hover:text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apply" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative block h-px w-10 overflow-hidden bg-gold/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-out group-hover:scale-x-100" })
								})]
							})
						})
					]
				}, club.name))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-7 pb-[10vh] md:px-[7vw]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
				kicker: "The Standard",
				title: "A private desk,\nnot a sales funnel.",
				body: "Every club is backed by the same team, the same discretion, and the same resort-like certainty that the right answer arrives before urgency becomes noise."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
				...c.cta,
				className: "mt-12"
			})]
		})
	] });
}
function PrivateSections() {
	const c = privateContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-7 py-[14vh] md:px-[14vw]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-[18vh]",
			children: [c.statements.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionReveal, {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl font-light text-champagne/50",
						children: s.numeral
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 font-serif text-4xl font-light leading-tight text-ivory/90 md:text-6xl",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-8 max-w-xl font-serif text-lg font-light leading-relaxed text-ivory/50 md:text-xl",
						children: s.body
					})
				]
			}, s.numeral)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {
				...c.cta,
				className: "text-center"
			})]
		})
	});
}
function AboutSections() {
	const c = aboutContent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [c.sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		imageKey: s.image,
		flip: i % 2 === 1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editorial, {
			kicker: `${String(i + 1).padStart(2, "0")} — ${s.kicker}`,
			title: s.title,
			body: s.body,
			align: i % 2 === 1 ? "right" : "left"
		})
	}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-7 pb-[10vh] md:px-[7vw]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, { ...c.cta })
	})] });
}
//#endregion
export { MembershipSections as a, ResidencesSections as c, ExperiencesSections as i, SubscriptionsSections as l, AviationSections as n, MobilitySections as o, DestinationsSections as r, PrivateSections as s, AboutSections as t, YachtsSections as u };
