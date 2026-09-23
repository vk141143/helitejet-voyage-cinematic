import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Verify caller is ADMIN
    const callerToken = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!callerToken) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verify caller role
    const { data: { user: caller } } = await supabaseAdmin.auth.getUser(callerToken);
    if (!caller) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

    const { data: callerProfile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", caller.id)
      .single();

    if (callerProfile?.role !== "ADMIN") {
      return new Response(JSON.stringify({ error: "Forbidden: ADMIN role required" }), { status: 403, headers: corsHeaders });
    }

    const { email, password, full_name, mobile } = await req.json() as {
      email: string; password: string; full_name: string; mobile?: string;
    };

    if (!email || !password || !full_name) {
      return new Response(JSON.stringify({ error: "email, password and full_name are required" }), { status: 400, headers: corsHeaders });
    }

    // Create auth user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm so they can log in immediately
      user_metadata: { full_name, mobile: mobile ?? "" },
    });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), { status: 400, headers: corsHeaders });
    }

    // Set role to SALES in profiles (trigger creates it as CUSTOMER, we update)
    await supabaseAdmin
      .from("profiles")
      .update({ role: "SALES", full_name, mobile: mobile ?? null, updated_at: new Date().toISOString() })
      .eq("id", newUser.user!.id);

    return new Response(
      JSON.stringify({ user_id: newUser.user!.id, email: newUser.user!.email }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
