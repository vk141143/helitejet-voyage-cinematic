import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { requestServices } from "@/content/site";
import { createRequest } from "@/lib/request-service";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "hj_pending_request";
const currencies = ["EUR", "USD", "GBP", "AED"] as const;

type Step = "TYPE" | "PEOPLE" | "BUDGET" | "CONTACT" | "MOBILE" | "AUTH" | "SUBMITTING" | "DONE";

type Draft = {
  service: string;
  people: number;
  budget: string;
  currency: string;
  name: string;
  email: string;
  mobile: string;
};

const empty: Draft = { service: "", people: 2, budget: "", currency: "EUR", name: "", email: "", mobile: "" };

function saveDraft(d: Draft) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}
function loadDraft(): Draft {
  try {
    if (typeof window === "undefined") return empty;
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
function clearDraft() {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}

export function PublicRequestWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("TYPE");
  const [draft, setDraft] = useState<Draft>(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  // auth fields
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // On mount: if user is already logged in and there's a pending draft, submit immediately
  useEffect(() => {
    const saved = loadDraft();
    if (saved.service) setDraft(saved);

    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && saved.service && saved.budget) {
        setStep("SUBMITTING");
        try {
          await submitRequest(saved, data.session.user.email ?? "");
          clearDraft();
          setStep("DONE");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Submission failed.");
          setStep("AUTH");
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upd = (key: keyof Draft) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  async function submitRequest(d: Draft, _email: string) {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated.");
    const { data: num, error: numErr } = await supabase.rpc("next_request_number");
    if (numErr) throw numErr;
    const { error: insErr } = await supabase.from("requests").insert({
      request_number: num,
      customer_id: auth.user.id,
      service_type: d.service,
      status: "SUBMITTED",
      people_count: d.people,
      budget: Number(d.budget),
      currency: d.currency,
      customer_details: { name: d.name, email: d.email, mobile: d.mobile },
      service_details: {},
    });
    if (insErr) throw insErr;
  }

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      if (isRegister) {
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email: draft.email,
          password,
          options: { data: { full_name: draft.name, mobile: draft.mobile } },
        });
        if (signUpErr) throw new Error(signUpErr.message);
        if (!data.session) throw new Error("Please check your email to confirm your account, then return here.");
      } else {
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email: draft.email, password });
        if (signInErr) throw new Error("Invalid email or password.");
      }
      // Now submit
      setStep("SUBMITTING");
      await submitRequest(draft, draft.email);
      clearDraft();
      setStep("DONE");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
      setStep("AUTH");
    } finally {
      setPending(false);
    }
  }

  const stepNumerals: Record<Step, string> = {
    TYPE: "01 TYPE", PEOPLE: "02 PEOPLE", BUDGET: "03 BUDGET",
    CONTACT: "04 CONTACT", MOBILE: "05 MOBILE", AUTH: "06 ACCESS",
    SUBMITTING: "SUBMITTING", DONE: "DONE",
  };

  const publicSteps: Step[] = ["TYPE", "PEOPLE", "BUDGET", "CONTACT", "MOBILE", "AUTH"];
  const stepIndex = publicSteps.indexOf(step);

  function goNext() {
    setError("");
    if (step === "TYPE" && !draft.service) return setError("Choose a service.");
    if (step === "BUDGET" && !draft.budget) return setError("Enter a budget.");
    if (step === "CONTACT") {
      if (!draft.name.trim()) return setError("Enter your name.");
      if (!draft.email.trim() || !draft.email.includes("@")) return setError("Enter a valid email.");
    }
    if (step === "MOBILE" && !draft.mobile.trim()) return setError("Enter your mobile number.");
    saveDraft(draft);
    const next = publicSteps[stepIndex + 1];
    if (next) setStep(next);
  }

  function goBack() {
    setError("");
    const prev = publicSteps[stepIndex - 1];
    if (prev) setStep(prev);
  }

  if (step === "SUBMITTING") {
    return (
      <div className="py-16 text-center">
        <p className="whisper text-champagne animate-pulse">SUBMITTING YOUR REQUEST…</p>
      </div>
    );
  }

  if (step === "DONE") {
    return (
      <div className="border border-champagne/30 bg-champagne/5 p-10 text-center space-y-4">
        <p className="whisper text-champagne">REQUEST RECEIVED</p>
        <h2 className="font-serif text-4xl font-light text-ivory">We will be in touch.</h2>
        <p className="text-sm text-ivory/60 max-w-sm mx-auto">
          Our concierge team will review your requirements and reach out within the hour.
        </p>
        <button
          type="button"
          onClick={() => void navigate({ to: "/customer/dashboard" })}
          className="mt-4 whisper text-champagne"
        >
          VIEW MY PORTAL →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="whisper text-champagne">{stepNumerals[step]}</span>
        {stepIndex >= 0 && (
          <span className="text-xs text-ivory/40">Step {stepIndex + 1} of {publicSteps.length}</span>
        )}
      </div>

      {error && <p role="alert" className="border border-red-300/30 p-3 text-sm text-red-100">{error}</p>}

      {/* TYPE */}
      {step === "TYPE" && (
        <div>
          <p className="font-serif text-2xl text-ivory/70 mb-6">What are you looking for?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {requestServices.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, service: item.key }))}
                className={`border p-5 text-left transition-colors ${
                  draft.service === item.key
                    ? "border-champagne bg-champagne/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <span className="font-serif text-xl text-ivory">{item.label}</span>
                <span className="mt-1 block text-xs text-ivory/50">{item.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PEOPLE */}
      {step === "PEOPLE" && (
        <label className="block space-y-3">
          <span className="whisper text-ivory/50">How many people?</span>
          <input
            className="field"
            type="number"
            min="1"
            max="50"
            value={draft.people}
            onChange={(e) => setDraft((d) => ({ ...d, people: Number(e.target.value) }))}
          />
        </label>
      )}

      {/* BUDGET */}
      {step === "BUDGET" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label>
            <span className="whisper text-ivory/50">Approximate budget</span>
            <input className="field" type="number" value={draft.budget} onChange={upd("budget")} placeholder="e.g. 25000" />
          </label>
          <label>
            <span className="whisper text-ivory/50">Currency</span>
            <select className="field" value={draft.currency} onChange={upd("currency")}>
              {currencies.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
      )}

      {/* CONTACT */}
      {step === "CONTACT" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="whisper text-ivory/50">Full name</span>
            <input className="field" value={draft.name} onChange={upd("name")} placeholder="Your full name" />
          </label>
          <label className="sm:col-span-2">
            <span className="whisper text-ivory/50">Email address</span>
            <input className="field" type="email" value={draft.email} onChange={upd("email")} placeholder="you@example.com" />
          </label>
        </div>
      )}

      {/* MOBILE */}
      {step === "MOBILE" && (
        <label className="block space-y-3">
          <span className="whisper text-ivory/50">Mobile number</span>
          <input className="field" type="tel" value={draft.mobile} onChange={upd("mobile")} placeholder="+44 7700 000000" />
        </label>
      )}

      {/* AUTH */}
      {step === "AUTH" && (
        <form onSubmit={handleAuth} className="space-y-5">
          <p className="text-sm text-ivory/60">
            {isRegister
              ? "Create your account to submit your request."
              : "Sign in to submit your request. Your details have been saved."}
          </p>
          <label>
            <span className="whisper text-ivory/50">Email</span>
            <input className="field" type="email" value={draft.email} disabled />
          </label>
          <label>
            <span className="whisper text-ivory/50">Password</span>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </label>
          {isRegister && (
            <label>
              <span className="whisper text-ivory/50">Confirm password</span>
              <input
                className="field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          )}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <button type="button" onClick={goBack} className="whisper text-ivory/50">BACK</button>
            <button type="submit" disabled={pending} className="whisper text-champagne">
              {pending ? "PLEASE WAIT…" : isRegister ? "CREATE & SUBMIT →" : "SIGN IN & SUBMIT →"}
            </button>
          </div>
          <p className="text-xs text-ivory/40 text-center">
            {isRegister ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              className="text-champagne underline"
              onClick={() => { setIsRegister((v) => !v); setError(""); }}
            >
              {isRegister ? "Sign in instead" : "Create an account"}
            </button>
          </p>
        </form>
      )}

      {/* Nav buttons (all steps except AUTH which has its own) */}
      {step !== "AUTH" && (
        <div className="flex justify-between border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="whisper text-ivory/50 disabled:invisible"
          >
            BACK
          </button>
          <button type="button" onClick={goNext} className="whisper text-champagne">
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
