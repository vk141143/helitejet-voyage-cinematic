import { r as __toESM } from "../_runtime.mjs";
import { l as menu, m as scenes, r as brand } from "./site-DJwhRyAv.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useScroll, n as useSpring, s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as ScrollTrack, c as useCinematicMotion, l as worldHead, s as ease } from "./CinematicPage-DbieIfxY.mjs";
import { t as world } from "./about-BYrMha6g.mjs";
import { a as useAuth, i as requireRoleAccess, r as requireGuestAccess, t as AuthProvider } from "./auth-CCx8mEZN.mjs";
import { t as world$1 } from "./aviation-DKpHY_WM.mjs";
import { t as world$2 } from "./concierge-G_Gnrlfw.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as world$3 } from "./destinations-BDmrRg26.mjs";
import { t as world$4 } from "./experiences-C74kv2o_.mjs";
import { t as world$5 } from "./membership-aVJhJHfD.mjs";
import { t as world$6 } from "./mobility-BC7cjeA1.mjs";
import { t as world$7 } from "./private-BfOEVRDq.mjs";
import { t as world$8 } from "./request-access-DAf_TfCa.mjs";
import { t as world$9 } from "./residences-GSWxeq4I.mjs";
import { t as world$10 } from "./routes-BUbsxteS.mjs";
import { t as world$11 } from "./subscriptions-CuQFwPFy.mjs";
import { t as world$12 } from "./yachts-CgueWkMi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-By4gGJjC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DgIzagT-.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
/**
* Fullscreen navigation. Sits above every layer, locks the page behind it,
* scrolls independently so no choice is ever clipped, and keeps CLOSE in view.
*/
function NavigationOverlay({ open, current, onClose }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const { body, documentElement } = document;
		const gap = window.innerWidth - documentElement.clientWidth;
		const prev = {
			overflow: body.style.overflow,
			pad: body.style.paddingRight
		};
		body.style.overflow = "hidden";
		if (gap > 0) body.style.paddingRight = `${gap}px`;
		return () => {
			body.style.overflow = prev.overflow;
			body.style.paddingRight = prev.pad;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		current,
		onClose
	}) });
}
function Panel({ current, onClose }) {
	const { reduced } = useCinematicMotion();
	const [hover, setHover] = (0, import_react.useState)(null);
	const active = hover ?? menu.find((m) => m.to === current) ?? menu[0];
	const scrollRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({ container: scrollRef });
	(0, import_react.useEffect)(() => {
		closeRef.current?.focus({ preventScroll: true });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		id: "cinematic-menu",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Site menu",
		initial: reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" },
		animate: reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" },
		exit: reduced ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" },
		transition: {
			duration: .9,
			ease
		},
		className: "fixed inset-0 z-[60] bg-obsidian grain",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "sync",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: scenes[active.image],
						alt: "",
						width: 1920,
						height: 1080,
						loading: "lazy",
						decoding: "async",
						initial: {
							opacity: 0,
							scale: reduced ? 1 : 1.06
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: { opacity: 0 },
						transition: {
							duration: 1.4,
							ease
						},
						className: "absolute inset-0 h-full w-full object-cover"
					}, active.image)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-obsidian/75 md:bg-[linear-gradient(90deg,var(--obsidian)_0%,var(--obsidian)_42%,oklch(0.12_0.008_275/0.45)_100%)]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 py-7 md:px-10 md:py-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: onClose,
					className: "font-serif text-2xl font-light tracking-[0.18em] text-ivory",
					children: brand.mark
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: closeRef,
					type: "button",
					onClick: onClose,
					className: "whisper flex items-center gap-4 text-ivory outline-none focus-visible:text-champagne",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Close" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative block h-3 w-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "absolute inset-0 z-10 overflow-y-auto overscroll-contain pt-[88px] pb-[72px] md:pt-[104px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					className: "flex min-h-full flex-col justify-center px-7 py-6 md:px-[8vw]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-1 md:space-y-0",
						children: menu.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.li, {
							initial: reduced ? false : {
								opacity: 0,
								x: -24
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								duration: .8,
								ease,
								delay: .2 + i * .045
							},
							onMouseEnter: () => setHover(m),
							onMouseLeave: () => setHover(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: m.to,
								onClick: onClose,
								onFocus: () => setHover(m),
								className: "group flex items-baseline gap-5 py-1 outline-none md:gap-8",
								activeProps: { "aria-current": "page" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whisper w-6 text-gold/70",
									children: m.numeral
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-serif font-light leading-[1.08] transition-all duration-500 text-[8vw] md:text-[3.3vw] ${active.to === m.to ? "text-ivory md:translate-x-3" : "text-ivory/40 group-hover:text-ivory group-focus-visible:text-ivory"}`,
									children: m.label
								})]
							})
						}, m.to))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollTrack, {
				progress: scrollYProgress,
				className: "absolute right-6 top-1/2 z-10 -translate-y-1/2 md:right-10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: .9 },
				className: "absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-7 pb-6 pt-3 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whisper text-ivory/40",
					children: brand.tagline
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${brand.email}`,
					className: "whisper hidden text-ivory/40 hover:text-champagne md:block",
					children: brand.email
				})]
			})
		]
	});
}
var roleDashboard = {
	ADMIN: "/admin/dashboard",
	SALES: "/sales/dashboard",
	CUSTOMER: "/customer/dashboard"
};
function Chrome() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, {
		stiffness: 80,
		damping: 30
	});
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	const { role, isLoading } = useAuth();
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	const dashboardTo = role ? roleDashboard[role] : "/login";
	const dashboardLabel = role === "ADMIN" ? "Admin" : role === "SALES" ? "Sales" : role === "CUSTOMER" ? "Dashboard" : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-7 py-7 mix-blend-difference md:px-10 md:py-9",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				"aria-label": `${brand.name} home`,
				className: "pointer-events-auto font-serif text-2xl font-light tracking-[0.18em] text-ivory",
				children: brand.mark
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex items-center gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => window.dispatchEvent(new Event("helitejet-voice-activate")),
						"aria-label": "Open HELITEJET voice concierge",
						className: "whisper flex items-center gap-2 text-ivory/80 transition-colors hover:text-champagne",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2 w-2 rounded-full border border-current",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Voice" })]
					}),
					!isLoading && (dashboardLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: dashboardTo,
						className: "whisper flex items-center gap-2 text-ivory/80 transition-colors hover:text-champagne",
						children: dashboardLabel
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "whisper flex items-center gap-2 text-ivory/80 transition-colors hover:text-champagne",
						children: "Login"
					})),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(true),
						"aria-expanded": open,
						"aria-controls": "cinematic-menu",
						"aria-haspopup": "dialog",
						className: "whisper flex items-center gap-4 text-ivory",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative block h-3 w-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-0 h-px w-full bg-ivory" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 h-px w-full bg-ivory" })]
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: {
				scaleY: progress,
				originY: 0
			},
			className: "pointer-events-none fixed left-0 top-0 z-40 h-screen w-px bg-gradient-to-b from-gold via-champagne to-gold"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationOverlay, {
			open,
			current: pathname,
			onClose: close
		})
	] });
}
/**
* A restrained veil that closes over the old page and lifts from the new one.
* It never touches route rendering, so navigation stays instant and reliable.
*/
function PageTransition() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { reduced } = useCinematicMotion();
	const first = (0, import_react.useRef)(true);
	const [veil, setVeil] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		setVeil(pathname);
		const t = window.setTimeout(() => setVeil(null), reduced ? 250 : 1100);
		return () => window.clearTimeout(t);
	}, [pathname, reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: veil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"aria-hidden": true,
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: {
				duration: reduced ? .2 : .9,
				ease
			}
		},
		className: "pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-obsidian",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: {
				opacity: 0,
				letterSpacing: "0.6em"
			},
			animate: {
				opacity: 1,
				letterSpacing: "0.3em"
			},
			transition: {
				duration: .8,
				ease
			},
			className: "font-serif text-2xl font-light text-ivory/70",
			children: brand.mark
		}), !reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: { scaleX: 0 },
			animate: { scaleX: 1 },
			transition: {
				duration: .9,
				ease
			},
			className: "absolute left-[30%] right-[30%] top-1/2 mt-8 h-px origin-left bg-gold/60"
		})]
	}, veil) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$58 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "HELITEJET"
			},
			{
				name: "theme-color",
				content: "#141318"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpIvFH3O4dBsrab34JqzqW5qRKIetrXfnBtEtpT_Jg4--fEBjzkexT5Fw&s=10"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$58.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chrome, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		] })
	});
}
var $$splitComponentImporter$57 = () => import("./routes-C0gA9_8e.mjs");
var Route$57 = createFileRoute("/")({
	head: () => worldHead(world$10),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./about-CPmmtQKz.mjs");
var Route$56 = createFileRoute("/about")({
	head: () => worldHead(world),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./aviation-CNL6d90V.mjs");
var Route$55 = createFileRoute("/aviation")({
	head: () => worldHead(world$1),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var $$splitComponentImporter$54 = () => import("./concierge-Dn-XewCl.mjs");
var Route$54 = createFileRoute("/concierge")({
	head: () => worldHead(world$2),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./destinations-CmC3ypKJ.mjs");
var Route$53 = createFileRoute("/destinations")({
	head: () => worldHead(world$3),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./experiences-DMG2r68i.mjs");
var Route$52 = createFileRoute("/experiences")({
	head: () => worldHead(world$4),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var $$splitComponentImporter$51 = () => import("./forgot-password-DS0YFnVm.mjs");
var Route$51 = createFileRoute("/forgot-password")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireGuestAccess();
	},
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var $$splitComponentImporter$50 = () => import("./login-W_qnSL-3.mjs");
var Route$50 = createFileRoute("/login")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireGuestAccess();
	},
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var $$splitComponentImporter$49 = () => import("./membership-CBFJAGYR.mjs");
var Route$49 = createFileRoute("/membership")({
	head: () => worldHead(world$5),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var $$splitComponentImporter$48 = () => import("./mobility-Dbo0o4LT.mjs");
var Route$48 = createFileRoute("/mobility")({
	head: () => worldHead(world$6),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var $$splitComponentImporter$47 = () => import("./private-t3Cw23fY.mjs");
var Route$47 = createFileRoute("/private")({
	head: () => worldHead(world$7),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var $$splitComponentImporter$46 = () => import("./register-DlVQSYjx.mjs");
var Route$46 = createFileRoute("/register")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireGuestAccess();
	},
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var $$splitComponentImporter$45 = () => import("./request-access-bIYa82HI.mjs");
var Route$45 = createFileRoute("/request-access")({
	head: () => worldHead(world$8),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var $$splitComponentImporter$44 = () => import("./reset-password-D_3222FL.mjs");
var Route$44 = createFileRoute("/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$44, "component") });
var $$splitComponentImporter$43 = () => import("./residences-Q5lWN3gX.mjs");
var Route$43 = createFileRoute("/residences")({
	head: () => worldHead(world$9),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./subscriptions-vhjdiFw_.mjs");
var Route$42 = createFileRoute("/subscriptions")({
	head: () => worldHead(world$11),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./yachts-Ckgr6TEq.mjs");
var Route$41 = createFileRoute("/yachts")({
	head: () => worldHead(world$12),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./admin.aircraft-DccFCgU5.mjs");
var Route$40 = createFileRoute("/admin/aircraft")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./admin.analytics-B3d9nWwY.mjs");
var Route$39 = createFileRoute("/admin/analytics")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./admin.audit-aVTvcdMf.mjs");
var Route$38 = createFileRoute("/admin/audit")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./admin.bookings-CRF8lEkl.mjs");
var Route$37 = createFileRoute("/admin/bookings")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./admin.content-D0VD5i78.mjs");
var Route$36 = createFileRoute("/admin/content")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./admin.customers-DQXa8f4V.mjs");
var Route$35 = createFileRoute("/admin/customers")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./admin.dashboard-CvJhEoRD.mjs");
var Route$34 = createFileRoute("/admin/dashboard")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./admin.notifications-Bi3Im3vk.mjs");
var Route$33 = createFileRoute("/admin/notifications")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./admin.operators-DA-jAltp.mjs");
var Route$32 = createFileRoute("/admin/operators")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin.pricing-BmYY0w9p.mjs");
var Route$31 = createFileRoute("/admin/pricing")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.quotes-dhUBhr4t.mjs");
var Route$30 = createFileRoute("/admin/quotes")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.requests-Cajzj0Ik.mjs");
var Route$29 = createFileRoute("/admin/requests")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.sales-team-BdtWSZxG.mjs");
var Route$28 = createFileRoute("/admin/sales-team")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.settings-d9-2BW_q.mjs");
var Route$27 = createFileRoute("/admin/settings")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.support-pJVD7roK.mjs");
var Route$26 = createFileRoute("/admin/support")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.voice-CCbLgQAI.mjs");
var Route$25 = createFileRoute("/admin/voice")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.yachts-CDbGq_Uw.mjs");
var Route$24 = createFileRoute("/admin/yachts")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["ADMIN"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./customer.bookings-n61SeHpe.mjs");
var Route$23 = createFileRoute("/customer/bookings")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./customer.dashboard-Bg6Oq9A0.mjs");
var Route$22 = createFileRoute("/customer/dashboard")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./customer.documents-ps57OlyF.mjs");
var Route$21 = createFileRoute("/customer/documents")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./customer.events-C_U2wIo0.mjs");
var Route$20 = createFileRoute("/customer/events")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./customer.notifications-DTzcsYt8.mjs");
var Route$19 = createFileRoute("/customer/notifications")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./customer.profile-D_-y0vUw.mjs");
var Route$18 = createFileRoute("/customer/profile")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./customer.quotes-CqDksEjr.mjs");
var Route$17 = createFileRoute("/customer/quotes")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./customer.requests-Bq5uUF-Z.mjs");
var Route$16 = createFileRoute("/customer/requests")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./customer.subscriptions-B6ORsWJ4.mjs");
var Route$15 = createFileRoute("/customer/subscriptions")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./customer.support-CfrNXvfS.mjs");
var Route$14 = createFileRoute("/customer/support")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./sales.aviation-Bmf_y2PE.mjs");
var Route$13 = createFileRoute("/sales/aviation")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./sales.bookings-D3PXGQHz.mjs");
var Route$12 = createFileRoute("/sales/bookings")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./sales.customers-CEX7ZkBK.mjs");
var Route$11 = createFileRoute("/sales/customers")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./sales.dashboard-DKIJkpLJ.mjs");
var Route$10 = createFileRoute("/sales/dashboard")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./sales.documents-rg0oMY_T.mjs");
var Route$9 = createFileRoute("/sales/documents")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./sales.followups-CL-b0hgN.mjs");
var Route$8 = createFileRoute("/sales/followups")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./sales.messages-zfIW4OSl.mjs");
var Route$7 = createFileRoute("/sales/messages")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./sales.my-requests-DuErp8dg.mjs");
var Route$6 = createFileRoute("/sales/my-requests")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./sales.profile-D6leQsgg.mjs");
var Route$5 = createFileRoute("/sales/profile")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./sales.quotes-BxtsF2S0.mjs");
var Route$4 = createFileRoute("/sales/quotes")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./sales.requests-D022o-W3.mjs");
var Route$3 = createFileRoute("/sales/requests")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./sales.support-DFJJG6GH.mjs");
var Route$2 = createFileRoute("/sales/support")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./sales.yachts-Dpn-GJSL.mjs");
var Route$1 = createFileRoute("/sales/yachts")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["SALES"]);
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./customer.requests.new-ChkTRJFJ.mjs");
var Route = createFileRoute("/customer/requests/new")({
	beforeLoad: () => {
		if (typeof window !== "undefined") return requireRoleAccess(["CUSTOMER"]);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$57.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$58
});
var AboutRoute = Route$56.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$58
});
var AviationRoute = Route$55.update({
	id: "/aviation",
	path: "/aviation",
	getParentRoute: () => Route$58
});
var ConciergeRoute = Route$54.update({
	id: "/concierge",
	path: "/concierge",
	getParentRoute: () => Route$58
});
var DestinationsRoute = Route$53.update({
	id: "/destinations",
	path: "/destinations",
	getParentRoute: () => Route$58
});
var ExperiencesRoute = Route$52.update({
	id: "/experiences",
	path: "/experiences",
	getParentRoute: () => Route$58
});
var ForgotPasswordRoute = Route$51.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$58
});
var LoginRoute = Route$50.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$58
});
var MembershipRoute = Route$49.update({
	id: "/membership",
	path: "/membership",
	getParentRoute: () => Route$58
});
var MobilityRoute = Route$48.update({
	id: "/mobility",
	path: "/mobility",
	getParentRoute: () => Route$58
});
var PrivateRoute = Route$47.update({
	id: "/private",
	path: "/private",
	getParentRoute: () => Route$58
});
var RegisterRoute = Route$46.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$58
});
var RequestAccessRoute = Route$45.update({
	id: "/request-access",
	path: "/request-access",
	getParentRoute: () => Route$58
});
var ResetPasswordRoute = Route$44.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$58
});
var ResidencesRoute = Route$43.update({
	id: "/residences",
	path: "/residences",
	getParentRoute: () => Route$58
});
var SubscriptionsRoute = Route$42.update({
	id: "/subscriptions",
	path: "/subscriptions",
	getParentRoute: () => Route$58
});
var YachtsRoute = Route$41.update({
	id: "/yachts",
	path: "/yachts",
	getParentRoute: () => Route$58
});
var AdminAircraftRoute = Route$40.update({
	id: "/admin/aircraft",
	path: "/admin/aircraft",
	getParentRoute: () => Route$58
});
var AdminAnalyticsRoute = Route$39.update({
	id: "/admin/analytics",
	path: "/admin/analytics",
	getParentRoute: () => Route$58
});
var AdminAuditRoute = Route$38.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => Route$58
});
var AdminBookingsRoute = Route$37.update({
	id: "/admin/bookings",
	path: "/admin/bookings",
	getParentRoute: () => Route$58
});
var AdminContentRoute = Route$36.update({
	id: "/admin/content",
	path: "/admin/content",
	getParentRoute: () => Route$58
});
var AdminCustomersRoute = Route$35.update({
	id: "/admin/customers",
	path: "/admin/customers",
	getParentRoute: () => Route$58
});
var AdminDashboardRoute = Route$34.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => Route$58
});
var AdminNotificationsRoute = Route$33.update({
	id: "/admin/notifications",
	path: "/admin/notifications",
	getParentRoute: () => Route$58
});
var AdminOperatorsRoute = Route$32.update({
	id: "/admin/operators",
	path: "/admin/operators",
	getParentRoute: () => Route$58
});
var AdminPricingRoute = Route$31.update({
	id: "/admin/pricing",
	path: "/admin/pricing",
	getParentRoute: () => Route$58
});
var AdminQuotesRoute = Route$30.update({
	id: "/admin/quotes",
	path: "/admin/quotes",
	getParentRoute: () => Route$58
});
var AdminRequestsRoute = Route$29.update({
	id: "/admin/requests",
	path: "/admin/requests",
	getParentRoute: () => Route$58
});
var AdminSalesTeamRoute = Route$28.update({
	id: "/admin/sales-team",
	path: "/admin/sales-team",
	getParentRoute: () => Route$58
});
var AdminSettingsRoute = Route$27.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$58
});
var AdminSupportRoute = Route$26.update({
	id: "/admin/support",
	path: "/admin/support",
	getParentRoute: () => Route$58
});
var AdminVoiceRoute = Route$25.update({
	id: "/admin/voice",
	path: "/admin/voice",
	getParentRoute: () => Route$58
});
var AdminYachtsRoute = Route$24.update({
	id: "/admin/yachts",
	path: "/admin/yachts",
	getParentRoute: () => Route$58
});
var CustomerBookingsRoute = Route$23.update({
	id: "/customer/bookings",
	path: "/customer/bookings",
	getParentRoute: () => Route$58
});
var CustomerDashboardRoute = Route$22.update({
	id: "/customer/dashboard",
	path: "/customer/dashboard",
	getParentRoute: () => Route$58
});
var CustomerDocumentsRoute = Route$21.update({
	id: "/customer/documents",
	path: "/customer/documents",
	getParentRoute: () => Route$58
});
var CustomerEventsRoute = Route$20.update({
	id: "/customer/events",
	path: "/customer/events",
	getParentRoute: () => Route$58
});
var CustomerNotificationsRoute = Route$19.update({
	id: "/customer/notifications",
	path: "/customer/notifications",
	getParentRoute: () => Route$58
});
var CustomerProfileRoute = Route$18.update({
	id: "/customer/profile",
	path: "/customer/profile",
	getParentRoute: () => Route$58
});
var CustomerQuotesRoute = Route$17.update({
	id: "/customer/quotes",
	path: "/customer/quotes",
	getParentRoute: () => Route$58
});
var CustomerRequestsRoute = Route$16.update({
	id: "/customer/requests",
	path: "/customer/requests",
	getParentRoute: () => Route$58
});
var CustomerSubscriptionsRoute = Route$15.update({
	id: "/customer/subscriptions",
	path: "/customer/subscriptions",
	getParentRoute: () => Route$58
});
var CustomerSupportRoute = Route$14.update({
	id: "/customer/support",
	path: "/customer/support",
	getParentRoute: () => Route$58
});
var SalesAviationRoute = Route$13.update({
	id: "/sales/aviation",
	path: "/sales/aviation",
	getParentRoute: () => Route$58
});
var SalesBookingsRoute = Route$12.update({
	id: "/sales/bookings",
	path: "/sales/bookings",
	getParentRoute: () => Route$58
});
var SalesCustomersRoute = Route$11.update({
	id: "/sales/customers",
	path: "/sales/customers",
	getParentRoute: () => Route$58
});
var SalesDashboardRoute = Route$10.update({
	id: "/sales/dashboard",
	path: "/sales/dashboard",
	getParentRoute: () => Route$58
});
var SalesDocumentsRoute = Route$9.update({
	id: "/sales/documents",
	path: "/sales/documents",
	getParentRoute: () => Route$58
});
var SalesFollowupsRoute = Route$8.update({
	id: "/sales/followups",
	path: "/sales/followups",
	getParentRoute: () => Route$58
});
var SalesMessagesRoute = Route$7.update({
	id: "/sales/messages",
	path: "/sales/messages",
	getParentRoute: () => Route$58
});
var SalesMyRequestsRoute = Route$6.update({
	id: "/sales/my-requests",
	path: "/sales/my-requests",
	getParentRoute: () => Route$58
});
var SalesProfileRoute = Route$5.update({
	id: "/sales/profile",
	path: "/sales/profile",
	getParentRoute: () => Route$58
});
var SalesQuotesRoute = Route$4.update({
	id: "/sales/quotes",
	path: "/sales/quotes",
	getParentRoute: () => Route$58
});
var SalesRequestsRoute = Route$3.update({
	id: "/sales/requests",
	path: "/sales/requests",
	getParentRoute: () => Route$58
});
var SalesSupportRoute = Route$2.update({
	id: "/sales/support",
	path: "/sales/support",
	getParentRoute: () => Route$58
});
var SalesYachtsRoute = Route$1.update({
	id: "/sales/yachts",
	path: "/sales/yachts",
	getParentRoute: () => Route$58
});
var CustomerRequestsRouteChildren = { CustomerRequestsNewRoute: Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => CustomerRequestsRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AviationRoute,
	ConciergeRoute,
	DestinationsRoute,
	ExperiencesRoute,
	ForgotPasswordRoute,
	LoginRoute,
	MembershipRoute,
	MobilityRoute,
	PrivateRoute,
	RegisterRoute,
	RequestAccessRoute,
	ResetPasswordRoute,
	ResidencesRoute,
	SubscriptionsRoute,
	YachtsRoute,
	AdminAircraftRoute,
	AdminAnalyticsRoute,
	AdminAuditRoute,
	AdminBookingsRoute,
	AdminContentRoute,
	AdminCustomersRoute,
	AdminDashboardRoute,
	AdminNotificationsRoute,
	AdminOperatorsRoute,
	AdminPricingRoute,
	AdminQuotesRoute,
	AdminRequestsRoute,
	AdminSalesTeamRoute,
	AdminSettingsRoute,
	AdminSupportRoute,
	AdminVoiceRoute,
	AdminYachtsRoute,
	CustomerBookingsRoute,
	CustomerDashboardRoute,
	CustomerDocumentsRoute,
	CustomerEventsRoute,
	CustomerNotificationsRoute,
	CustomerProfileRoute,
	CustomerQuotesRoute,
	CustomerRequestsRoute: CustomerRequestsRoute._addFileChildren(CustomerRequestsRouteChildren),
	CustomerSubscriptionsRoute,
	CustomerSupportRoute,
	SalesAviationRoute,
	SalesBookingsRoute,
	SalesCustomersRoute,
	SalesDashboardRoute,
	SalesDocumentsRoute,
	SalesFollowupsRoute,
	SalesMessagesRoute,
	SalesMyRequestsRoute,
	SalesProfileRoute,
	SalesQuotesRoute,
	SalesRequestsRoute,
	SalesSupportRoute,
	SalesYachtsRoute
};
var routeTree = Route$58._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
