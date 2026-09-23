import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { redirect } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "CUSTOMER" | "SALES" | "ADMIN";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  role: UserRole;
  country: string | null;
  company: string | null;
  avatar_url: string | null;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

type AuthValue = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<{ needsConfirmation: boolean }>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

async function loadProfile(_userId: string): Promise<Profile> {
  // Use security-definer RPC to avoid RLS recursion on profiles table
  const { data, error } = await supabase.rpc("get_my_profile");
  if (error) throw error;
  if (!data || (Array.isArray(data) && data.length === 0)) throw new Error("Profile not found.");
  return (Array.isArray(data) ? data[0] : data) as Profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let active = true;

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user) {
        try {
          setProfile(await loadProfile(data.session.user.id));
        } catch {
          // profile not yet created or RLS blocked — non-fatal
        }
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      // INITIAL_SESSION is handled above via getSession — skip to avoid double load
      if (event === "INITIAL_SESSION") return;
      setSession(nextSession);
      if (nextSession?.user) {
        try {
          setProfile(await loadProfile(nextSession.user.id));
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user: session?.user ?? null,
      profile,
      session,
      role: profile?.role ?? null,
      isLoading,

      login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.toLowerCase().includes("invalid login")) {
            throw new Error("Invalid email or password.");
          }
          if (error.message.toLowerCase().includes("email not confirmed")) {
            throw new Error("Please verify your email before signing in.");
          }
          throw new Error(error.message);
        }
      },

      register: async (input) => {
        if (input.password !== input.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        if (input.password.length < 8) {
          throw new Error("Password must be at least 8 characters.");
        }
        const { data, error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
          options: {
            data: {
              full_name: input.fullName,
              mobile: input.mobile,
            },
          },
        });
        if (error) {
          if (error.message.toLowerCase().includes("already registered")) {
            throw new Error("An account with this email already exists.");
          }
          throw new Error(error.message);
        }
        // If identities is empty, email confirmation is required
        const needsConfirmation =
          !data.session && (!data.user?.identities || data.user.identities.length === 0 || !data.session);
        return { needsConfirmation: needsConfirmation || !data.session };
      },

      resetPassword: async (email) => {
        const redirectTo =
          typeof window !== "undefined"
            ? `${window.location.origin}/reset-password`
            : "/reset-password";
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
        if (session?.user) {
          try {
            setProfile(await loadProfile(session.user.id));
          } catch {
            // ignore
          }
        }
      },
    }),
    [session, profile, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}

export function dashboardForRole(role: UserRole | null | undefined) {
  if (role === "ADMIN") return "/admin/dashboard" as const;
  if (role === "SALES") return "/sales/dashboard" as const;
  return "/customer/dashboard" as const;
}

/** Server-side / beforeLoad route guard — redirects if not authenticated or wrong role. */
export async function requireRoleAccess(roles: UserRole[]) {
  if (typeof window === "undefined") return; // skip on SSR
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw redirect({ to: "/login" });
  try {
    const profile = await loadProfile(user.id);
    if (!roles.includes(profile.role)) {
      throw redirect({
        to:
          profile.role === "ADMIN"
            ? "/admin/dashboard"
            : profile.role === "SALES"
              ? "/sales/dashboard"
              : "/customer/dashboard",
      });
    }
  } catch (e) {
    // If it's a redirect, re-throw it
    if (e && typeof e === "object" && "to" in e) throw e;
    // Profile missing or RLS error — send to login
    throw redirect({ to: "/login" });
  }
}

/** Redirects authenticated users away from guest-only pages. */
export async function requireGuestAccess() {
  if (typeof window === "undefined") return;
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    try {
      const profile = await loadProfile(user.id);
      throw redirect({ to: dashboardForRole(profile.role) });
    } catch (error) {
      if (error && typeof error === "object" && "to" in error) throw error;
      throw redirect({ to: "/customer/dashboard" });
    }
  }
}
