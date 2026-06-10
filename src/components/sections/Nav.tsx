"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const WORKSPACE_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL || "https://fideusmedia-portal.vercel.app";

interface Props {
  onLeadClick: () => void;
}

export default function Nav({ onLeadClick }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const open = () => { setIsMenuOpen(false); onLeadClick(); };
  const navItems = [
    { label: "Framework", id: "framework" },
    { label: "Casos", id: "casos" },
    { label: "Servicios", id: "servicios" },
  ];

  return (
    <nav className={`absolute top-0 w-full z-50 transition-all duration-500 bg-transparent ${scrolled ? "py-3" : "py-4"}`}>
      <div className="grid-lock-container flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer text-white">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg bg-white text-primary group-hover:rotate-12 transition-transform duration-500">F</div>
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-tighter text-xl text-white">
              Fideus<span className="text-white/60 font-normal lowercase"> Media</span>
            </span>
            <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-white/80">Consultoría Estratégica</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a key={item.label} href={`#${item.id}`}
              className="relative text-[11px] font-black uppercase tracking-[0.15em] text-white/80 hover:text-white transition-all duration-300 group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary-600 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </a>
          ))}
          <a href={WORKSPACE_URL} target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border text-white border-white/20 hover:bg-white/10 transition-all duration-500">Workspace</a>
          <button onClick={open}
            className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg bg-white text-ink-800 hover:bg-ink-50 shadow-white/10 transition-all duration-500">
            Diagnóstico <ArrowRight size={14} />
          </button>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden" aria-label="Menú">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 mx-4 bg-white rounded-2xl shadow-xl p-5 space-y-3">
          {navItems.map((item) => (
            <a key={item.label} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-bold text-ink-700 hover:text-primary">{item.label}</a>
          ))}
          <a href={WORKSPACE_URL} target="_blank" rel="noopener noreferrer"
            className="block text-sm font-bold text-ink-700 hover:text-primary">Workspace</a>
          <button onClick={open} className="w-full mt-2 px-4 py-2.5 bg-brand-gradient text-white rounded-full text-sm font-bold flex items-center justify-center gap-2">
            Diagnóstico <ArrowRight size={14} />
          </button>
        </div>
      )}
    </nav>
  );
}
