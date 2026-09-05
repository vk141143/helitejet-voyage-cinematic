import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ease } from "@/components/scene/motion";
import { submitAccessRequest, submitConciergeRequest, type AccessInput, type ConciergeInput } from "@/lib/enquiries.functions";

/* ---------- submission ---------- */

export function useEnquiry(kind: "access" | "concierge") {
  const access = useServerFn(submitAccessRequest);
  const concierge = useServerFn(submitConciergeRequest);
  return useMutation({
    mutationFn: (data: AccessInput | ConciergeInput) =>
      kind === "access" ? access({ data: data as AccessInput }) : concierge({ data: data as ConciergeInput }),
  });
}

export function friendlyError(err: unknown) {
  if (err instanceof Error && err.message && !err.message.includes("{") && !err.message.includes("Invalid")) return err.message;
  return "Please check your name, email and message, then try again.";
}

/* ---------- primitives ---------- */

function Label({ children, required }: { children: ReactNode; required?: boolean | undefined }) {
  return (
    <span className="whisper block text-ivory/45">
      {children}
      {required && <span className="text-gold"> *</span>}
    </span>
  );
}

const underline = "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-focus-within:scale-x-100";

export function TextField({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group relative block">
      <Label required={props.required}>{label}</Label>
      <input {...props} className="field" />
      <span className={underline} />
    </label>
  );
}

export function TextArea({ label, ...props }: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="group relative block">
      <Label required={props.required}>{label}</Label>
      <textarea rows={3} {...props} className="field resize-none" />
      <span className={underline} />
    </label>
  );
}

export function SelectField({ label, options, placeholder = "—", ...props }: { label: string; options: readonly string[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="group relative block">
      <Label required={props.required}>{label}</Label>
      <select {...props} className="field appearance-none bg-transparent pr-8">
        <option value="" className="bg-obsidian">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-obsidian">
            {o}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute bottom-5 right-0 h-2 w-2 rotate-45 border-b border-r border-ivory/40" />
      <span className={underline} />
    </label>
  );
}

/** A row of selectable words — the site's alternative to radio buttons. */
export function WordChoice({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="whisper mb-4 block text-ivory/45">{label}</legend>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? "" : o)}
              className={`relative pb-1 font-serif text-xl font-light transition-colors duration-500 md:text-2xl ${on ? "text-ivory" : "text-ivory/45 hover:text-ivory/80"}`}
            >
              {o}
              <span className={`absolute bottom-0 left-0 h-px w-full origin-left bg-champagne transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function SubmitLine({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={pending} className="group inline-flex items-center gap-5 whisper text-ivory transition-colors hover:text-champagne disabled:opacity-50">
      <span>{pending ? "Sending" : children}</span>
      <span className="relative block h-px w-16 bg-gold/50">
        <motion.span
          className="absolute inset-0 origin-left bg-champagne"
          animate={pending ? { scaleX: [0, 1, 0], originX: [0, 0, 1] } : { scaleX: 0 }}
          transition={pending ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
        />
        <span className="absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-out group-hover:scale-x-100" />
      </span>
    </button>
  );
}

/** Shared success state. */
export function Received({ title, body }: { title: string; body: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="text-center">
      <span className="whisper text-champagne">Received</span>
      <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease, delay: 0.3 }} className="mx-auto mt-6 block h-px w-24 bg-gold" />
      <p className="mt-8 font-serif text-4xl font-light leading-tight text-ivory md:text-6xl">{title}</p>
      <p className="mt-6 font-serif text-xl italic font-light text-ivory/60">{body}</p>
    </motion.div>
  );
}
