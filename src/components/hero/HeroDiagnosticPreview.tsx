"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import MiniRadar from "./MiniRadar";

const TARGETS = [72, 45, 38, 55, 62, 64];
const AREAS = [
  { label: "Marca",       color: "bg-emerald-500" },
  { label: "Marketing",   color: "bg-amber-500" },
  { label: "Ventas",      color: "bg-red-500" },
  { label: "Retención",   color: "bg-amber-500" },
  { label: "Operaciones", color: "bg-emerald-500" },
  { label: "Finanzas",    color: "bg-emerald-500" },
];

export default function HeroDiagnosticPreview() {
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setScores(TARGETS.map((s) => Math.round(s * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const globalScore = Math.round(scores.reduce((a, b) => a + b, 0) / 6);

  return (
    <div className="relative group w-full lg:w-[50%] lg:ml-auto transform -translate-y-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-[2.5rem] rotate-3 transform origin-bottom-right transition-transform group-hover:rotate-6"></div>
      <div className="relative w-full rounded-[2rem] border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_40px_80px_-15px_rgba(107,17,88,0.10)] p-7 md:p-9 overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-ink-100/80 backdrop-blur-sm border border-ink-200/60">
          <span className="text-[9px] font-bold text-ink-500 uppercase tracking-[0.2em]">Vista del reporte</span>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-50 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 mt-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shadow-primary/20">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-black tracking-widest uppercase text-ink-800">Diagnóstico</h4>
              <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider mt-0.5">Reporte Ejecutivo</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider border border-amber-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="tabular-nums">Score {globalScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 items-center relative z-10">
          <div className="col-span-3"><MiniRadar scores={scores} /></div>
          <div className="col-span-2 space-y-2">
            {AREAS.map((a, i) => (
              <div key={a.label} className="flex items-center justify-between text-xs">
                <span className="text-ink-500 font-semibold">{a.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.color}`}></span>
                  <span className="font-bold text-ink-700 tabular-nums">{scores[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-6 pt-5 border-t border-ink-100 relative z-10 transition-opacity duration-700"
          style={{ opacity: done ? 1 : 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.2em]">Banderas activas</span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">3 críticas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Sin CRM", "Conversión <5%", "Marketing 0% del rev"].map((t) => (
              <span key={t} className="text-[10px] font-semibold text-red-700 bg-red-50/80 border border-red-100 px-2 py-0.5 rounded">
                🚩 {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
