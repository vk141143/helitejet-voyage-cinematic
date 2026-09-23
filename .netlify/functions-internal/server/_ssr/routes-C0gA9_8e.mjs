import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as CinematicPage } from "./CinematicPage-DbieIfxY.mjs";
import { t as JourneyPlanner } from "./JourneyPlanner-DOY5UKjx.mjs";
import { t as world } from "./routes-BUbsxteS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C0gA9_8e.js
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
