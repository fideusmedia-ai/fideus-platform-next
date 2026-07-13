"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import HeroDiagnosticPreview from "@/components/hero/HeroDiagnosticPreview";

interface Props {
  onLeadClick: () => void;
}

// Versiones guardadas para referencia futura (no activas):
// VARIANT A — "Ember": rojo-naranja -> fucsia -> morado
//   { start: "#FF5A36", mid: "#E03870", end: "#842974" }, { start: "#FF8A3D", mid: "#C9207A", end: "#6B1158" },
//   { start: "#E03870", mid: "#A84591", end: "#3B0764" }, { start: "#FF5A36", mid: "#842974", end: "#4C1D95" },
//   { start: "#C9207A", mid: "#6B1158", end: "#FF8A3D" }
// VARIANT B — "Aurora": morado -> fucsia -> azul
//   { start: "#6B1158", mid: "#C9207A", end: "#4F46E5" }, { start: "#842974", mid: "#A84591", end: "#6366F1" },
//   { start: "#3B0764", mid: "#6B1158", end: "#3B82F6" }, { start: "#C9207A", mid: "#8B5CF6", end: "#4F46E5" },
//   { start: "#A84591", mid: "#6B1158", end: "#312E81" }
// VARIANT C — "Spectrum": rojo-naranja -> fucsia/morado -> azul (cada blob cruza TODO el rango,
//   por eso el color medio -fucsia/morado- domina ~80% del tiempo de animación)
//   { start: "#FF5A36", mid: "#E03870", end: "#4F46E5" }, { start: "#FF8A3D", mid: "#C9207A", end: "#6366F1" },
//   { start: "#E03870", mid: "#842974", end: "#3B82F6" }, { start: "#FF5A36", mid: "#A84591", end: "#4C1D95" },
//   { start: "#C9207A", mid: "#6B1158", end: "#312E81" }

// VARIANT D — "Balanced": cada blob vive en su propia franja (naranja / fucsia / morado / azul)
// en vez de converger todos al fucsia-morado, para que los 4 tonos se vean simultáneamente.
const BLOBS = [
  { type: "flow-streak", start: "#FF3B30", mid: "#FF8A3D", end: "#FFB347", dur: "11s", delay: "0s",   top: "-25%" },
  { type: "flow-wave",   start: "#FF8A3D", mid: "#E03870", end: "#C9207A", dur: "13s", delay: "-5s",  top: "-10%" },
  { type: "flow-streak", start: "#C9207A", mid: "#842974", end: "#6B1158", dur: "10s", delay: "-7s",  top: "-15%" },
  { type: "flow-wave",   start: "#6B1158", mid: "#6366F1", end: "#4F46E5", dur: "14s", delay: "-2s",  top: "10%" },
  { type: "flow-streak", start: "#4F46E5", mid: "#3B82F6", end: "#6366F1", dur: "12s", delay: "-9s",  top: "5%" },
];

export default function Hero({ onLeadClick }: Props) {
  return (
    <header className="pt-24 pb-4 md:pb-8 px-6 relative overflow-hidden">
      <div className="stripe-bg-container">
        <div className="flow-engine">
          {BLOBS.map((b, i) => (
            <div key={i} className={b.type} style={{
              ["--flow-dur" as string]: b.dur,
              ["--flow-delay" as string]: b.delay,
              ["--flow-top" as string]: b.top,
              ["--blob-start-color" as string]: b.start,
              ["--blob-mid-color" as string]: b.mid,
              ["--blob-end-color" as string]: b.end,
            } as React.CSSProperties} />
          ))}
        </div>
        <div className="hero-vivid-overlay">
          <div className="light-ray"></div>
          <div className="light-ray" style={{ animationDelay: "-5s", opacity: 0.1 }}></div>
        </div>
        <div className="diagonal-divider"></div>
      </div>

      <div className="grid-lock-container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pt-12">
        <div className="space-y-6 text-left w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-600 text-[10px] font-black tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
            Consultoría Estratégica
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] max-w-2xl">
            <span className="animate-leak" style={{ ["--leak-duration" as string]: "20s", ["--leak-delay" as string]: "1s" } as React.CSSProperties}>Tal vez tu negocio no necesita más</span>{" "}
            <span className="font-serif italic font-medium text-white/50">publicidad</span>
            <span className="text-white">.</span><br />
            <span className="animate-leak" style={{ ["--leak-duration" as string]: "22s", ["--leak-delay" as string]: "0s" } as React.CSSProperties}>Necesita</span>{" "}
            <span className="font-serif italic font-medium text-hero-accent-gradient">estructura</span>
            <span className="text-white">.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-xl leading-relaxed font-medium">
            Diagnosticamos <strong className="text-white">marca, marketing, ventas, retención, operaciones y finanzas</strong> — y construimos los sistemas que cierran las brechas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button onClick={onLeadClick}
              className="px-8 py-4 bg-brand-gradient text-white rounded-full font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all shadow-xl shadow-primary/20 group">
              Diagnóstico gratis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#framework"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-ink-600 border border-ink-200 rounded-full font-bold hover:border-primary-300 hover:text-primary transition flex items-center justify-center gap-2 group">
              Cómo funciona <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest pt-2">≈10 minutos · reporte ejecutivo</p>
        </div>

        <HeroDiagnosticPreview />
      </div>
    </header>
  );
}
