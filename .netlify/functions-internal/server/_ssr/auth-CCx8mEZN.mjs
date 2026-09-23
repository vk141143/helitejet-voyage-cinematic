import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-BuyXFJoz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CCx8mEZN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
async function loadProfile(_userId) {
	const { data, error } = await supabase.rpc("get_my_profile");
	if (error) throw error;
	if (!data || Array.isArray(data) && data.length === 0) throw new Error("Profile not found.");
	return Array.isArray(data) ? data[0] : data;
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [isLoading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") {
			setLoading(false);
			return;
		}
		let active = true;
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			if (data.session?.user) try {
				setProfile(await loadProfile(data.session.user.id));
			} catch {}
			setLoading(false);
		});
		const { data: listener } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
			if (event === "INITIAL_SESSION") return;
			setSession(nextSession);
			if (nextSession?.user) try {
				setProfile(await loadProfile(nextSession.user.id));
			} catch {
				setProfile(null);
			}
			else setProfile(null);
		});
		return () => {
			active = false;
			listener.subscription.unsubscribe();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user: session?.user ?? null,
		profile,
		session,
		role: profile?.role ?? null,
		isLoading,
		login: async (email, password) => {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) {
				if (error.message.toLowerCase().includes("invalid login")) throw new Error("Invalid email or password.");
				if (error.message.toLowerCase().includes("email not confirmed")) throw new Error("Please verify your email before signing in.");
				throw new Error(error.message);
			}
		},
		register: async (input) => {
			if (input.password !== input.confirmPassword) throw new Error("Passwords do not match.");
			if (input.password.length < 8) throw new Error("Password must be at least 8 characters.");
			const { data, error } = await supabase.auth.signUp({
				email: input.email,
				password: input.password,
				options: { data: {
					full_name: input.fullName,
					mobile: input.mobile
				} }
			});
			if (error) {
				if (error.message.toLowerCase().includes("already registered")) throw new Error("An account with this email already exists.");
				throw new Error(error.message);
			}
			return { needsConfirmation: !data.session && (!data.user?.identities || data.user.identities.length === 0 || !data.session) || !data.session };
		},
		resetPassword: async (email) => {
			const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "/reset-password";
			const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
			if (error) throw new Error(error.message);
		},
		logout: async () => {
			const { error } = await supabase.auth.signOut();
			if (error) throw new Error(error.message);
			setProfile(null);
			setSession(null);
		},
		refreshProfile: async () => {
			if (session?.user) try {
				setProfile(await loadProfile(session.user.id));
			} catch {}
		}
	}), [
		session,
		profile,
		isLoading
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const value = (0, import_react.useContext)(AuthContext);
	if (!value) throw new Error("useAuth must be used inside AuthProvider");
	return value;
}
function dashboardForRole(role) {
	if (role === "ADMIN") return "/admin/dashboard";
	if (role === "SALES") return "/sales/dashboard";
	return "/customer/dashboard";
}
/** Server-side / beforeLoad route guard — redirects if not authenticated or wrong role. */
async function requireRoleAccess(roles) {
	if (typeof window === "undefined") return;
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw redirect({ to: "/login" });
	try {
		const profile = await loadProfile(user.id);
		if (!roles.includes(profile.role)) throw redirect({ to: profile.role === "ADMIN" ? "/admin/dashboard" : profile.role === "SALES" ? "/sales/dashboard" : "/customer/dashboard" });
	} catch (e) {
		if (e && typeof e === "object" && "to" in e) throw e;
		throw redirect({ to: "/login" });
	}
}
/** Redirects authenticated users away from guest-only pages. */
async function requireGuestAccess() {
	if (typeof window === "undefined") return;
	const { data: { user } } = await supabase.auth.getUser();
	if (user) try {
		const profile = await loadProfile(user.id);
		throw redirect({ to: dashboardForRole(profile.role) });
	} catch (error) {
		if (error && typeof error === "object" && "to" in error) throw error;
		throw redirect({ to: "/customer/dashboard" });
	}
}
//#endregion
export { useAuth as a, requireRoleAccess as i, dashboardForRole as n, requireGuestAccess as r, AuthProvider as t };
