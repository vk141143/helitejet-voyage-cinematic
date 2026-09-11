import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as CinematicPage } from "./CinematicPage-5SbnHwRf.mjs";
import { n as AviationSections } from "./sections-D7Wy9Sd2.mjs";
import { t as world } from "./aviation-BT22Khii.mjs";
import { t as JourneyPlanner } from "./JourneyPlanner-DkZfG8Hd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aviation-CffWRZ1j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [inquiryOpen, setInquiryOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AviationSections, { onOpenInquiry: () => setInquiryOpen(true) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyPlanner, {
		context: "flights",
		open: inquiryOpen,
		onClose: () => setInquiryOpen(false)
	})] });
}
//#endregion
export { Page as component };
