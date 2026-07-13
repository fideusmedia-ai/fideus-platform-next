"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { CASOS_LIST, type Caso } from "@/data/casos";

interface Props {
  onLeadClick: () => void;
}

export default function Cases({ onLeadClick }: Props) {
  return (
    <section id="casos" className="py-20 md:py-24 border-y border-ink-100 bg-white relative overflow-hidden">
      <div className="absolute -left-[15%] top-[10%] w-[40%] h-[60%] bg-primary-50/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-[15%] bottom-[10%] w-[40%] h-[60%] bg-secondary-50/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            Casos · En operación
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-ink-800 tracking-tighter leading-[1.05]">
            Negocios escalando con <span className="font-serif italic font-medium text-brand-gradient">estructura</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASOS_LIST.map((c) => <CaseCard key={c.slug} caso={c} />)}
          <button onClick={onLeadClick}
            className="group relative border-2 border-dashed border-ink-200 rounded-3xl p-7 hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-14 h-14 rounded-2xl bg-ink-50 group-hover:bg-brand-gradient flex items-center justify-center mb-5 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20">
              <Plus size={22} className="text-ink-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <p className="text-base font-bold text-ink-700 group-hover:text-primary-700 transition-colors mb-1">Tu diagnóstico, aquí.</p>
            <p className="text-xs text-ink-400 max-w-[200px] mb-6">Cupos limitados — abrimos pocos diagnósticos al mes para garantizar profundidad.</p>
            <span className="text-[11px] font-black text-primary-600 uppercase tracking-widest inline-flex items-center gap-1.5">
              Empezar diagnóstico
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ caso }: { caso: Caso }) {
  const isSecondary = caso.accent === "secondary";
  const accentBorder = isSecondary ? "border-secondary-500" : "border-primary-500";
  const accentText = isSecondary ? "text-secondary-700" : "text-primary-700";
  const accentBg = isSecondary ? "bg-secondary-50" : "bg-primary-50";

  return (
    <Link href={`/casos/${caso.slug}`}
      className="group bg-white border border-ink-100 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col text-left">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">{caso.industriaTag}</span>
        <span className="text-[10px] font-bold text-ink-400 bg-ink-50 border border-ink-100 px-2 py-0.5 rounded">Desde {caso.desde}</span>
      </div>
      <h3 className="text-2xl font-black text-ink-800 tracking-tight mb-1">{caso.nombre}</h3>
      <p className="text-xs text-ink-400 font-semibold uppercase tracking-wider mb-6">{caso.ubicacion}</p>
      <div className={`border-l-2 ${accentBorder} pl-3 mb-6 flex-1`}>
        <p className="text-3xl font-black text-ink-800 leading-none tabular-nums">{caso.cardMetric.value}</p>
        <p className="text-xs text-ink-500 font-semibold mt-1.5 leading-snug">{caso.cardMetric.label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-ink-100">
        {caso.servicios.slice(0, 3).map((s) => (
          <span key={s} className={`text-[10px] font-bold ${accentText} ${accentBg} px-2 py-0.5 rounded`}>{s}</span>
        ))}
      </div>
      <span className={`mt-4 text-[10px] font-black ${accentText} uppercase tracking-widest inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
        Ver caso completo <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}
