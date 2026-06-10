"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  FrameworkVisual1, FrameworkVisual2, FrameworkVisual3, FrameworkVisual4,
} from "@/components/framework/FrameworkVisuals";

interface Fase {
  num: string;
  label: string;
  titulo: string;
  free?: boolean;
  intro: string;
  chips: { label: string; value: string }[];
  recibes: string[];
}

const FASES: Fase[] = [
  {
    num: "01", label: "Fase 1", titulo: "Diagnóstico.", free: true,
    intro: "Wizard de 83 preguntas que diagnostica las 6 áreas críticas. Scoring automatizado, banderas críticas detectadas, servicios prescritos según tu caso.",
    chips: [{ label: "Tu parte", value: "≈10 min" }, { label: "Tu sesión", value: "24-48h" }],
    recibes: [
      "Reporte ejecutivo con scores por área (0-100)",
      "Banderas rojas detectadas (urgentes y altas)",
      "Servicios sugeridos según tu diagnóstico",
    ],
  },
  {
    num: "02", label: "Fase 2", titulo: "Estrategia.",
    intro: "Sesión 1-a-1 con tu estratega. Repasamos el reporte, priorizamos áreas, construimos una hoja de ruta a 90 días con quick-wins y cimientos.",
    chips: [{ label: "Sesión", value: "1 a 1" }, { label: "Hoja de ruta", value: "≤5 días" }],
    recibes: [
      "Hoja de ruta priorizada a 90 días",
      "Presupuestos por intervención",
      "Estratega asignado a tu caso",
    ],
  },
  {
    num: "03", label: "Fase 3", titulo: "Sistemas.",
    intro: "Construimos lo prescrito por el diagnóstico — identidad, web, ERP, POS — lo que aplique a tu caso. Equipo asignado por proyecto, accesos en vivo al Workspace para revisar y aprobar.",
    chips: [{ label: "Implementación", value: "4-12 sem" }, { label: "Workspace", value: "24/7" }],
    recibes: [
      "Activos físicos / digitales según los servicios contratados",
      "Acceso al Workspace para entregables y aprobaciones",
      "Equipo asignado: estratega + creativos + devs",
    ],
  },
  {
    num: "04", label: "Fase 4", titulo: "Iteración.",
    intro: "Medimos los KPIs configurados al inicio. Sesión mensual con tu estratega para revisar lo que escala, ajustar lo que no, y decidir el siguiente movimiento. Data, no intuición.",
    chips: [{ label: "Ciclo", value: "Mensual" }, { label: "Contrato", value: "3 / 6 meses" }],
    recibes: [
      "Dashboard de progreso por área",
      "Sesión mensual de revisión con tu estratega",
      "Ajustes y nuevos proyectos según resultados",
    ],
  },
];

const VISUALS = [FrameworkVisual1, FrameworkVisual2, FrameworkVisual3, FrameworkVisual4];

interface Props {
  onLeadClick: () => void;
}

export default function Framework({ onLeadClick }: Props) {
  const [activeLayer, setActiveLayer] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const layer = parseInt(entry.target.getAttribute("data-layer") || "1");
          setActiveLayer(layer);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll(".layer-trigger").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="framework" className="py-20 md:py-32 px-6 relative bg-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 lg:mb-28 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            Metodología
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-ink-800 tracking-tighter leading-[0.95] mb-4">
            El Framework <span className="font-serif italic font-medium text-brand-gradient">Fideus</span>.
          </h2>
          <p className="text-base md:text-lg text-ink-500 font-medium">
            4 fases. Una metodología. <strong className="text-ink-700">Cero parches.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start relative">
          <div className="absolute left-5 top-10 bottom-[20vh] w-px hidden lg:block overflow-hidden">
            <div className="h-full w-full border-r border-dashed border-ink-200"></div>
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-shimmer" style={{ animationDuration: "4s" }}></div>
          </div>

          <div className="space-y-32 lg:space-y-[35vh] pb-0 lg:pb-[20vh] relative z-10 lg:pl-16">
            {FASES.map((f, i) => {
              const idx = i + 1;
              const Visual = VISUALS[i];
              return (
                <div key={f.num} className="layer-trigger group" data-layer={idx}>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className={`w-10 h-10 rounded-full border flex items-center justify-center font-black text-sm transition-all duration-500 ${activeLayer === idx ? "bg-brand-gradient text-white border-transparent shadow-lg shadow-primary/20" : "bg-white text-ink-300 border-ink-200"}`}>{f.num}</span>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-400">{f.label}</span>
                    {f.free && <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Gratis</span>}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-ink-800 mb-4 tracking-tighter leading-tight">{f.titulo}</h3>
                  <p className="text-lg text-ink-500 leading-relaxed font-medium mb-6 max-w-md">{f.intro}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5 max-w-md">
                    {f.chips.map((c) => (
                      <div key={c.label} className="bg-ink-50/60 border border-ink-100 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">{c.label}</p>
                        <p className="text-sm font-black text-ink-700 mt-1">{c.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="max-w-md">
                    <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2">Qué recibes</p>
                    <ul className="space-y-1.5">
                      {f.recibes.map((s) => (
                        <li key={s} className="text-sm text-ink-600 flex items-start gap-2">
                          <span className={`mt-1 font-black ${idx % 2 === 1 ? "text-primary-500" : "text-secondary-500"}`}>·</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Visual active={activeLayer === idx} mobile={true} />
                  {idx === 4 && (
                    <div className="mt-10 pt-8 border-t border-ink-100 max-w-md">
                      <button onClick={onLeadClick}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gradient text-white rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                        Empezar con la Fase 1 (gratis) <ArrowRight size={16} />
                      </button>
                      <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mt-3">
                        Sin compromiso de contratar. Recibes el reporte primero.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex sticky top-20 h-[80vh] items-center justify-center pointer-events-none">
            <div className="relative w-full h-[560px] flex items-center justify-center">
              {VISUALS.map((V, i) => (
                <V key={i} active={i === 3 ? activeLayer >= 4 : activeLayer === i + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
