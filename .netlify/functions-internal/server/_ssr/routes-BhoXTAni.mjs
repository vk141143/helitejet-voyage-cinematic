import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as CinematicPage } from "./CinematicPage-Cr4gnA8c.mjs";
import { t as JourneyPlanner } from "./JourneyPlanner-B1trAify.mjs";
import { t as world } from "./routes-DkiVu9PZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhoXTAni.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicPage, {
		world,
		heroContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyPlanner, {
			context: "flights",
			open: true,
			embedded: true
		})
	});
}
//#endregion
export { Page as component };
