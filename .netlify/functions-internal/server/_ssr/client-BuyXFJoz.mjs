import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BuyXFJoz.js
var supabase = createClient("https://vksysbzzyymomnvywrik.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrc3lzYnp6eXltb21udnl3cmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4ODA3NzEsImV4cCI6MjEwNTQ1Njc3MX0.pEBojU5eSofOgRNeQXMv510_Woz8G1mauCOKsDDrJBY", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	storage: typeof window !== "undefined" ? window.localStorage : void 0
} });
//#endregion
export { supabase as t };
