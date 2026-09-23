import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAuth } from "./auth-CCx8mEZN.mjs";
import { t as PortalShell } from "./portal-nav-x79DDTxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StubPage-Bo5gYBri.js
var import_jsx_runtime = require_jsx_runtime();
function StubPage({ title, nav }) {
	const { logout } = useAuth();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title,
		nav,
		onLogout: () => {
			logout().then(() => navigate({ to: "/login" }));
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-ivory/10 bg-white/[0.02] p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whisper text-champagne",
				children: "Coming soon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-serif text-lg text-ivory/50 italic",
				children: [title, " — this section is under construction."]
			})]
		})
	});
}
//#endregion
export { StubPage as t };
