"use client";

import { ArrowRight } from "lucide-react";

const WORKSPACE_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL || "https://fideusmedia-portal.vercel.app";

interface Props {
  onLeadClick: () => void;
}

export default function Footer({ onLeadClick }: Props) {
  return (
    <footer className="bg-ink-900 text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* CTA hero antes del footer puro */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.05] mb-5">
            ¿Listo para diagnosticar tu{" "}
            <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
              negocio
            </span>?
          </h2>
          <p className="text-white/60 leading-relaxed mb-7">
            10 minutos del wizard. 24-48 horas para tu reporte ejecutivo. Cero compromiso.
          </p>
          <button
            onClick={onLeadClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-full font-black text-sm shadow-2xl hover:scale-[1.02] transition-transform"
          >
            Empezar diagnóstico gratis <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid: branding + links + workspace */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg bg-white text-primary">
                F
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold tracking-tighter text-xl text-white">
                  Fideus<span className="text-white/60 font-normal lowercase"> Media</span>
                </span>
                <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-white/60">
                  Consultoría Estratégica
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              Diagnosticamos 6 áreas críticas de tu negocio y construimos los sistemas que cierran las brechas. Sin parches.
            </p>
          </div>

          {/* Producto */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Producto</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#framework" className="hover:text-white transition-colors">Framework</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios por área</a></li>
              <li><a href="#casos" className="hover:text-white transition-colors">Casos en operación</a></li>
              <li>
                <a href={WORKSPACE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Workspace (clientes)
                </a>
              </li>
            </ul>
          </div>

          {/* Casos */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Casos</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="/casos/hidalgo" className="hover:text-white transition-colors">Hidalgo Restaurante</a></li>
              <li><a href="/casos/cafestesia" className="hover:text-white transition-colors">CAFESTESIA</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
            © {new Date().getFullYear()} FideusMedia · Consultoría Estratégica Integral
          </p>
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
            Estado de México, México
          </p>
        </div>
      </div>
    </footer>
  );
}
