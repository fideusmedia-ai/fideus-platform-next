import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { CASOS, CASOS_LIST } from "@/data/casos";
import LeadFormTrigger from "@/components/casos/LeadFormTrigger";

export async function generateStaticParams() {
  return CASOS_LIST.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caso = CASOS[slug];
  if (!caso) return { title: "Caso no encontrado" };

  const desc = caso.desafio[0]?.slice(0, 155) ?? caso.industria;

  return {
    title: `Caso: ${caso.nombre}`,
    description: desc,
    openGraph: {
      title: `${caso.nombre} — Caso de estudio FideusMedia`,
      description: desc,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caso.nombre} — Caso de estudio FideusMedia`,
      description: desc,
    },
  };
}

export default async function CasoPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caso = CASOS[slug];
  if (!caso) notFound();

  const isSecondary = caso.accent === "secondary";
  const accentBar = isSecondary ? "border-secondary-500" : "border-primary-500";
  const accentBg = isSecondary ? "bg-secondary-50" : "bg-primary-50";
  const accentText = isSecondary ? "text-secondary-700" : "text-primary-700";
  const accentNumber = isSecondary ? "text-secondary-600" : "text-primary-600";
  const accentDot = isSecondary ? "bg-secondary-500" : "bg-primary-500";
  const accentTopBar = isSecondary ? "bg-secondary-500" : "bg-primary-500";

  return (
    <main className="min-h-screen bg-white">
      <div className={`h-1.5 ${accentTopBar}`}></div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/#casos"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-500 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Volver a casos
        </Link>

        {/* Identidad */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${accentText} ${accentBg} px-2.5 py-1 rounded`}>
              Caso de estudio
            </span>
            <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">
              Cliente desde {caso.desde}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ink-800 tracking-tighter leading-[0.95] mb-3">
            {caso.nombre}
          </h1>
          <p className="text-base md:text-lg text-ink-500 font-semibold">{caso.industria}</p>
          <p className="text-xs text-ink-400 mt-1 inline-flex items-center gap-1">
            <MapPin size={11} /> {caso.ubicacion}
          </p>
        </header>

        {/* Servicios */}
        <section className="mb-12 pb-12 border-b border-ink-100">
          <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.2em] mb-3">
            Servicios prestados
          </p>
          <div className="flex flex-wrap gap-2">
            {caso.servicios.map((s) => (
              <span
                key={s}
                className={`text-xs font-bold ${accentText} ${accentBg} border border-ink-100 px-3 py-1.5 rounded-full`}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* El desafío */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-black text-ink-400 uppercase tracking-[0.2em]">01</span>
            <div className="h-px flex-1 bg-ink-100"></div>
            <h2 className="text-[11px] font-black text-ink-700 uppercase tracking-[0.2em]">El desafío</h2>
          </div>
          <div className={`pl-5 border-l-2 ${accentBar} space-y-3`}>
            {caso.desafio.map((p, i) => (
              <p key={i} className="text-base md:text-lg text-ink-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>

        {/* La solución */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-black text-ink-400 uppercase tracking-[0.2em]">02</span>
            <div className="h-px flex-1 bg-ink-100"></div>
            <h2 className="text-[11px] font-black text-ink-700 uppercase tracking-[0.2em]">La solución</h2>
          </div>
          <ul className="space-y-3">
            {caso.solucion.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-base md:text-lg text-ink-600 leading-relaxed">
                <span className={`flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${accentDot}`}></span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Los resultados */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-black text-ink-400 uppercase tracking-[0.2em]">03</span>
            <div className="h-px flex-1 bg-ink-100"></div>
            <h2 className="text-[11px] font-black text-ink-700 uppercase tracking-[0.2em]">Los resultados</h2>
          </div>
          <div className={`grid grid-cols-2 gap-3 ${caso.resultados.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
            {caso.resultados.map((r, i) => (
              <div key={i} className="bg-ink-50/60 border border-ink-100 rounded-2xl p-5">
                <p className={`text-3xl md:text-4xl font-black ${accentNumber} leading-none tabular-nums mb-2`}>
                  {r.metric}
                </p>
                <p className="text-xs font-bold text-ink-700 leading-snug">{r.label}</p>
                <p className="text-[10px] text-ink-400 mt-1 leading-snug">{r.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-gradient rounded-3xl p-8 md:p-12 text-center text-white mt-12 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-3">
              ¿Tu negocio se parece?
            </p>
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight mb-5">
              Diagnostiquemos qué{" "}
              <span className="font-serif italic font-medium">le falta</span> al tuyo.
            </h3>
            <LeadFormTrigger>
              <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 rounded-full font-black text-sm shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
                Empezar diagnóstico gratis <ArrowRight size={16} />
              </span>
            </LeadFormTrigger>
          </div>
        </div>

        {/* Otros casos */}
        <section className="mt-16 pt-12 border-t border-ink-100">
          <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.2em] mb-5">
            Otros casos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CASOS_LIST.filter((c) => c.slug !== caso.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/casos/${c.slug}`}
                className="group p-5 bg-white border border-ink-100 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1">
                  {c.industriaTag}
                </p>
                <h4 className="text-lg font-black text-ink-800 group-hover:text-primary transition-colors">
                  {c.nombre}
                </h4>
                <p className="text-xs text-ink-500 mt-2 flex items-center gap-1">
                  Ver caso{" "}
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
