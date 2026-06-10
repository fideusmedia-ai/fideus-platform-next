"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import HeroDiagnosticPreview from "@/components/hero/HeroDiagnosticPreview";

interface Props {
  onLeadClick: () => void;
}

const BLOBS = [
  { type: "flow-streak", start: "#6B1158", mid: "#C9207A", end: "#E03870", dur: "22s", delay: "0s",   top: "-25%" },
  { type: "flow-wave",   start: "#C9207A", mid: "#DC4E94", end: "#F5D6F0", dur: "26s", delay: "-5s",  top: "-10%" },
  { type: "flow-streak", start: "#43093A", mid: "#6B1158", end: "#A84591", dur: "20s", delay: "-10s", top: "-15%" },
  { type: "flow-wave",   start: "#E03870", mid: "#C9207A", end: "#F7B0D4", dur: "30s", delay: "-2s",  top: "10%" },
  { type: "flow-streak", start: "#F5D6F0", mid: "#A84591", end: "#6B1158", dur: "24s", delay: "-8s",  top: "5%" },
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-ink-800 tracking-tighter leading-[0.95] max-w-2xl">
            <span className="animate-leak" style={{ ["--leak-duration" as string]: "20s", ["--leak-delay" as string]: "1s" } as React.CSSProperties}>Tu negocio no necesita más</span>{" "}
            <span className="font-serif italic font-medium text-ink-400">marketing</span>
            <span className="text-ink-800">.</span><br />
            <span className="animate-leak" style={{ ["--leak-duration" as string]: "22s", ["--leak-delay" as string]: "0s" } as React.CSSProperties}>Necesita</span>{" "}
            <span className="font-serif italic font-medium text-brand-gradient">estructura</span>
            <span className="text-ink-800">.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-500 max-w-xl leading-relaxed font-medium">
            Diagnosticamos <strong className="text-ink-700">marca, marketing, ventas, retención, operaciones y finanzas</strong> — y construimos los sistemas que cierran las brechas.
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
          <p className="text-[11px] font-bold text-ink-400 uppercase tracking-widest pt-2">≈10 minutos · reporte ejecutivo</p>
        </div>

        <HeroDiagnosticPreview />
      </div>
    </header>
  );
}
