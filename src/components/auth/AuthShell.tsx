import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { brand, scenes } from "@/content/site";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return <div className="min-h-screen bg-obsidian text-ivory"><div className="fixed inset-0"><img src={scenes.access} alt="" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-obsidian/80" /></div><div className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-12"><div className="w-full border border-ivory/15 bg-obsidian/80 p-6 backdrop-blur-md sm:p-10"><Link to="/" className="font-serif text-2xl tracking-[0.2em] text-ivory">{brand.mark}</Link><p className="mt-12 whisper text-champagne">Private portal</p><h1 className="mt-3 font-serif text-4xl font-light text-ivory">{title}</h1><p className="mt-3 text-sm text-ivory/60">{subtitle}</p><div className="mt-8">{children}</div><div className="mt-8 border-t border-ivory/10 pt-6 text-sm text-ivory/60">{footer}</div></div></div></div>;
}
