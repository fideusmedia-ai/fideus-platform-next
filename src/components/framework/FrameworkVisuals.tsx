"use client";

import type { ReactNode } from "react";
import { Activity, Layers, LayoutGrid, TrendingUp, FileText } from "lucide-react";

interface WrapperProps {
  active: boolean;
  mobile: boolean;
  children: ReactNode;
}

function VisualWrapper({ active, mobile, children }: WrapperProps) {
  if (mobile) return <div className="lg:hidden mt-8 max-w-md mx-auto">{children}</div>;
  return (
    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${active ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none"}`}>
      {children}
    </div>
  );
}

interface VisualProps {
  active: boolean;
  mobile?: boolean;
}

const AREAS_RADAR = [
  { l: "Marca",       s: 72, c: "bg-emerald-500" },
  { l: "Marketing",   s: 45, c: "bg-amber-500" },
  { l: "Ventas",      s: 38, c: "bg-red-500" },
  { l: "Retención",   s: 55, c: "bg-amber-500" },
  { l: "Operaciones", s: 62, c: "bg-emerald-500" },
  { l: "Finanzas",    s: 64, c: "bg-emerald-500" },
];

export function FrameworkVisual1({ active, mobile = false }: VisualProps) {
  return (
    <VisualWrapper active={active} mobile={mobile}>
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-ink-100 shadow-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Activity size={16} />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest uppercase text-ink-800">Diagnóstico</p>
              <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider">Reporte Ejecutivo</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase border border-amber-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Score 56
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {AREAS_RADAR.map((a) => (
            <div key={a.l} className="flex items-center gap-3 text-xs">
              <span className="w-24 font-semibold text-ink-600">{a.l}</span>
              <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div className={`h-full ${a.c} rounded-full`} style={{ width: `${a.s}%` }}></div>
              </div>
              <span className="w-7 text-right font-bold text-ink-700 tabular-nums">{a.s}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-ink-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Banderas activas</span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">3 críticas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Sin CRM", "Conversión <5%", "Marketing 0% del rev"].map((t) => (
              <span key={t} className="text-[10px] font-semibold text-red-700 bg-red-50/80 border border-red-100 px-2 py-0.5 rounded">🚩 {t}</span>
            ))}
          </div>
        </div>
      </div>
    </VisualWrapper>
  );
}

const HORIZONTES = [
  { t: "Días 1-30",  sub: "Quick wins",   items: ["GBP completo + reseñas", "Setup MercadoPago", "CRM básico"],          tone: "primary"   as const },
  { t: "Días 31-60", sub: "Cimientos",    items: ["Refresh identidad", "Sitio web nuevo", "Producción visual"],          tone: "secondary" as const },
  { t: "Días 61-90", sub: "Crecimiento",  items: ["Ads + retargeting", "Programa fidelización"],                         tone: "tertiary"  as const },
];

export function FrameworkVisual2({ active, mobile = false }: VisualProps) {
  return (
    <VisualWrapper active={active} mobile={mobile}>
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-ink-100 shadow-2xl p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Layers size={16} />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest uppercase text-ink-800">Hoja de Ruta</p>
              <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider">Prioridades · 90 días</p>
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          {HORIZONTES.map((h) => {
            const toneBg   = h.tone === "primary" ? "bg-primary-50/40 border-primary-100" : h.tone === "secondary" ? "bg-secondary-50/40 border-secondary-100" : "bg-tertiary-100 border-tertiary-100";
            const toneText = h.tone === "primary" ? "text-primary-700" : h.tone === "secondary" ? "text-secondary-700" : "text-tertiary-900";
            const toneDot  = h.tone === "primary" ? "bg-primary-500" : h.tone === "secondary" ? "bg-secondary-500" : "bg-tertiary";
            return (
              <div key={h.t} className={`p-3.5 rounded-2xl border ${toneBg}`}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${toneText}`}>{h.t}</span>
                  <span className="text-[10px] font-bold text-ink-500 uppercase">{h.sub}</span>
                </div>
                <ul className="space-y-1">
                  {h.items.map((i) => (
                    <li key={i} className="text-xs text-ink-700 font-medium flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${toneDot}`}></span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </VisualWrapper>
  );
}

const ENTREGABLES = [
  { name: "Logotipo principal v3",  state: "APROBADO",     color: "emerald" as const },
  { name: "Manual de marca",        state: "EN REVISIÓN",  color: "amber"   as const },
  { name: "Aplicación en empaques", state: "PUBLICADO",    color: "blue"    as const },
  { name: "Tipografía sistema",     state: "EN REVISIÓN",  color: "amber"   as const },
];

export function FrameworkVisual3({ active, mobile = false }: VisualProps) {
  return (
    <VisualWrapper active={active} mobile={mobile}>
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-ink-100 shadow-2xl p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-primary/20">
              <LayoutGrid size={16} />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest uppercase text-ink-800">Workspace</p>
              <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider">Proyecto · Identidad</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded">v2.1</span>
        </div>
        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-3">Entregables</p>
        <ul className="space-y-2">
          {ENTREGABLES.map((e) => {
            const stateClass = e.color === "emerald" ? "bg-emerald-50 text-emerald-700" : e.color === "amber" ? "bg-amber-50 text-amber-700" : "bg-primary-50 text-primary-700";
            return (
              <li key={e.name} className="flex items-center justify-between bg-ink-50/40 border border-ink-100 rounded-xl p-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={14} className="text-ink-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ink-700 truncate">{e.name}</span>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${stateClass}`}>{e.state}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400 font-bold uppercase tracking-widest">
          <span>4 entregables · 2 pendientes</span>
          <span className="text-emerald-600">2 aprobados</span>
        </div>
      </div>
    </VisualWrapper>
  );
}

const TREND = [42, 48, 52, 56, 61, 66];
const KPIS = [
  { l: "Marca",  from: 56, to: 72, tone: "primary"   as const },
  { l: "Ventas", from: 38, to: 51, tone: "secondary" as const },
];

export function FrameworkVisual4({ active, mobile = false }: VisualProps) {
  return (
    <VisualWrapper active={active} mobile={mobile}>
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-ink-100 shadow-2xl p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-primary/20">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest uppercase text-ink-800">Métricas</p>
              <p className="text-[10px] text-ink-400 font-bold uppercase tracking-wider">Q1 · 6 meses</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">↑ +57%</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {KPIS.map((k) => (
            <div key={k.l} className="p-3 rounded-2xl bg-ink-50/60 border border-ink-100">
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">{k.l}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-2xl font-black ${k.tone === "primary" ? "text-primary-600" : "text-secondary-600"} tabular-nums`}>{k.to}</span>
                <span className="text-xs text-ink-400 line-through tabular-nums">{k.from}</span>
                <TrendingUp size={12} className="text-emerald-500 ml-auto" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-3">Score Global · tendencia</p>
        <div className="flex items-end gap-2 h-20 mb-3">
          {TREND.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-brand-gradient rounded-t transition-all duration-700"
                style={{ height: `${h}%`, transitionDelay: `${i * 80}ms` }}></div>
              <span className="text-[8px] text-ink-400 font-bold">M{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400 font-bold uppercase tracking-widest">
          <span>Próxima sesión</span><span>12 jul</span>
        </div>
      </div>
    </VisualWrapper>
  );
}
