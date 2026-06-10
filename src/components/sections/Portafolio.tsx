"use client";

import type { ReactNode } from "react";
import {
  ArrowRight, Activity, BarChart3, Cpu, Fingerprint, RefreshCw, TrendingUp,
} from "lucide-react";

interface AreaCard {
  area: string;
  titulo: string;
  accent: "primary" | "secondary";
  icon: ReactNode;
  pregunta: string;
  servicios: string[];
}

const AREAS: AreaCard[] = [
  { area: "MARCA",       titulo: "Marca & Posicionamiento",  accent: "primary",   icon: <Fingerprint size={20} />, pregunta: "¿El mercado entiende quiénes son y por qué elegirlos?", servicios: ["Identidad de marca", "Refresh de identidad", "Manual de marca"] },
  { area: "MARKETING",   titulo: "Marketing & Captación",    accent: "secondary", icon: <Activity size={20} />,    pregunta: "¿Llegan suficientes prospectos calificados?",            servicios: ["Web institucional", "GBP + SEO local", "Gestión digital + Ads", "Producción visual mensual", "Podcast / Influencers"] },
  { area: "VENTAS",      titulo: "Ventas & Conversión",      accent: "primary",   icon: <TrendingUp size={20} />,  pregunta: "¿Convierten lo que llega en clientes?",                 servicios: ["CRM básico", "Web e-commerce", "Modelo de precios y rentabilidad"] },
  { area: "RETENCION",   titulo: "Retención & Experiencia",  accent: "secondary", icon: <RefreshCw size={20} />,   pregunta: "¿Los clientes vuelven y recomiendan?",                  servicios: ["Mystery shopper", "Programa de fidelización", "Capacitación equipo"] },
  { area: "OPERACIONES", titulo: "Operaciones & Tecnología", accent: "primary",   icon: <Cpu size={20} />,         pregunta: "¿La operación interna escala?",                          servicios: ["Sistema POS", "Sistema ERP", "Dashboard BI", "Automatizaciones"] },
  { area: "FINANZAS",    titulo: "Finanzas & Salud",         accent: "secondary", icon: <BarChart3 size={20} />,   pregunta: "¿El negocio es financieramente sano?",                  servicios: ["Diagnóstico financiero", "Setup contable", "Modelo de precios"] },
];

interface Props {
  onLeadClick: () => void;
}

export default function Portafolio({ onLeadClick }: Props) {
  return (
    <section id="servicios" className="py-24 bg-white border-y border-ink-100 relative overflow-hidden">
      <div className="absolute -left-[15%] top-0 w-[45%] h-[60%] bg-primary-50/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-[15%] bottom-0 w-[45%] h-[60%] bg-secondary-50/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 text-secondary-600 text-[10px] font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse"></span>
            Servicios · Por área
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ink-800 tracking-tighter leading-[1.05] mb-5">
            21 servicios. Una sola <span className="font-serif italic font-medium text-brand-gradient">disciplina</span>.
          </h2>
          <p className="text-lg text-ink-500 font-medium leading-relaxed">
            Lo que sale del diagnóstico se traduce en intervenciones concretas — distribuidas por las áreas que tu negocio necesita estructurar. No es un menú de servicios sueltos; es un sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((a) => {
            const isPrimary = a.accent === "primary";
            const accentBg = isPrimary ? "bg-primary-50" : "bg-secondary-50";
            const accentText = isPrimary ? "text-primary-700" : "text-secondary-700";
            const accentBorder = isPrimary ? "hover:border-primary-200" : "hover:border-secondary-200";
            const dotColor = isPrimary ? "bg-primary-500" : "bg-secondary-500";
            return (
              <article key={a.area} className={`group relative bg-white border border-ink-100 ${accentBorder} rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-primary/10 group-hover:scale-110 transition-transform">{a.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${accentText} ${accentBg} px-2 py-1 rounded`}>{a.area}</span>
                </div>
                <h3 className="text-xl font-black text-ink-800 tracking-tight mb-2 leading-tight">{a.titulo}</h3>
                <p className="text-sm text-ink-500 font-medium leading-relaxed italic mb-5">&ldquo;{a.pregunta}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-ink-100">
                  <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2.5">Servicios disponibles</p>
                  <ul className="space-y-1.5">
                    {a.servicios.map((s) => (
                      <li key={s} className="text-sm text-ink-600 font-medium flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${dotColor} flex-shrink-0`}></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm text-ink-500 leading-relaxed mb-5">
            No tienes que elegir. <strong className="text-ink-700">El diagnóstico te dice qué áreas atacar primero</strong> — nosotros prescribimos los servicios concretos que mueven la aguja en tu caso.
          </p>
          <button onClick={onLeadClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gradient text-white rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
            Empezar con el diagnóstico <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
