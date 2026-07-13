"use client";

import { Check, X } from "lucide-react";

const SI = [
  "Negocios con marca propia y clientes finales (B2C / D2C)",
  "Restaurantes, cafés, retail, clínicas, servicios profesionales con identidad",
  "Dueños que ya intuyen que necesitan estructura, no más campañas",
  "Empresas listas para invertir en sistemas que escalan — no parches que caducan",
];

const NO = [
  "Commodities sin diferenciación (compites por precio, no por marca)",
  "B2B enterprise puro (ciclos de venta de meses, deals de millones)",
  "Quien busca campañas tácticas inmediatas sin pasar por diagnóstico",
  "Quien quiere agencia que ejecute sin involucrarse en la estrategia",
];

export default function ParaQuienEs() {
  return (
    <section className="py-20 md:py-24 bg-ink-50/30 border-y border-ink-100 relative overflow-hidden">
      <div className="absolute -left-[10%] top-[15%] w-[35%] h-[50%] bg-primary-50/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
            Trabajamos con un perfil específico
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-ink-800 tracking-tighter leading-[1.05]">
            ¿Encajamos con tu{" "}
            <span className="font-serif italic font-medium text-brand-gradient">negocio</span>?
          </h2>
          <p className="text-base md:text-lg text-ink-500 font-medium leading-relaxed mt-4">
            No somos para todos. Y eso es a propósito — así garantizamos profundidad en cada caso que tomamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sí */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-7 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Check size={20} className="text-emerald-600" strokeWidth={3} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-ink-800 tracking-tight">
                Sí — somos para ti
              </h3>
            </div>
            <ul className="space-y-3">
              {SI.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-sm md:text-base text-ink-600 leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* No */}
          <div className="bg-white border border-ink-100 rounded-3xl p-7 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-ink-50 flex items-center justify-center">
                <X size={20} className="text-ink-400" strokeWidth={3} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-ink-800 tracking-tight">
                No — buscas otra cosa
              </h3>
            </div>
            <ul className="space-y-3">
              {NO.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-sm md:text-base text-ink-500 leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-ink-300"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-400 italic mt-5 pt-4 border-t border-ink-100">
              Si estás en este lado, te recomendamos buscar una agencia de performance o una consultora B2B enterprise — no te haremos perder el tiempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
