import { createClient } from "@supabase/supabase-js";

const PROJECT_SUPABASE_URL = "https://vksysbzzyymomnvywrik.supabase.co";
const PROJECT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrc3lzYnp6eXltb21udnl3cmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4ODA3NzEsImV4cCI6MjEwNTQ1Njc3MX0.pEBojU5eSofOgRNeQXMv510_Woz8G1mauCOKsDDrJBY";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || PROJECT_SUPABASE_URL) as string;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || PROJECT_SUPABASE_ANON_KEY) as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
