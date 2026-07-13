"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Por qué requieren un diagnóstico al inicio?",
    a: "Porque no podemos prescribir sin diagnosticar primero. El reporte es nuestra carta de presentación: te dice exactamente dónde están las brechas en marca, marketing, ventas, retención, operaciones y finanzas. Si después decides trabajar con nosotros, ya partimos de una base común. Si decides no contratar, te quedas con un mapa accionable.",
  },
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "El diagnóstico está listo en 24-48 horas. La sesión de estrategia te da una hoja de ruta a 90 días. La implementación de los sistemas prescritos toma entre 4 y 12 semanas según el alcance. Los resultados medibles (ticket promedio, conversión, recompra, etc.) típicamente aparecen entre el mes 2 y el 4 de operación con los nuevos sistemas.",
  },
  {
    q: "¿Trabajan con cualquier industria?",
    a: "Nuestra metodología funciona en cualquier negocio con clientes finales (restaurantes, retail, clínicas, servicios profesionales, e-commerce). Lo que cambia son las preguntas específicas y los servicios prescritos. Si tu modelo es 100% B2B enterprise o si manejas commodities sin diferenciación, probablemente no somos el mejor fit.",
  },
  {
    q: "¿Cuánto cuesta el servicio?",
    a: "Depende totalmente de qué prescribe el diagnóstico. Una implementación de marca + web puede ser proyecto único; un plan mensual de gestión digital + producción visual es recurrente. En la sesión de estrategia te damos presupuestos concretos por intervención — sabes el costo total antes de firmar.",
  },
  {
    q: "¿Tienen contrato mínimo?",
    a: "Para proyectos únicos (identidad, web, sistema POS), no — pagas el proyecto y queda tuyo. Para servicios continuos (marketing mensual, gestión de redes, sistemas en operación) trabajamos en ciclos de 3 o 6 meses, porque medir resultados reales requiere ese horizonte. Sin permanencias engañosas.",
  },
  {
    q: "¿Qué pasa si después del diagnóstico decido no contratar?",
    a: "Te quedas con el reporte ejecutivo, la sesión de estrategia y la hoja de ruta. Es tuyo. Lo puedes usar para construir internamente, contratar a otros, o archivarlo. Cero compromiso de contratar, en serio. Eso sí: el reporte sale del wizard, no es opinión nuestra. La sesión 1-a-1 ya es nuestro tiempo, por eso solo abrimos pocos diagnósticos al mes.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 px-6 bg-ink-50/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
            Preguntas frecuentes
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-ink-800 tracking-tighter leading-[1.05]">
            Lo que <span className="font-serif italic font-medium text-brand-gradient">todos</span> preguntan.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${isOpen ? "border-primary-200 shadow-md shadow-primary/5" : "border-ink-100"}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 group"
                >
                  <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? "text-primary" : "text-ink-700 group-hover:text-ink-800"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-ink-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-ink-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
