import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as CinematicPage } from "./CinematicPage-Cr4gnA8c.mjs";
import { l as YachtsSections } from "./sections--n-L4sut.mjs";
import { t as JourneyPlanner } from "./JourneyPlanner-B1trAify.mjs";
import { t as world } from "./yachts-Dfngw9hC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/yachts-CYRwyafc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [inquiryOpen, setInquiryOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YachtsSections, { onOpenInquiry: () => setInquiryOpen(true) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyPlanner, {
		context: "yachts",
		open: inquiryOpen,
		onClose: () => setInquiryOpen(false)
	})] });
}
//#endregion
export { Page as component };
