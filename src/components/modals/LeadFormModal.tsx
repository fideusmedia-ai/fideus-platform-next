"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { X, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import TurnstileWidget from "@/components/security/TurnstileWidget";

const PORTAL_API_URL =
  process.env.NEXT_PUBLIC_PORTAL_API_URL || "https://fideusmedia-portal.vercel.app";

const PRESUPUESTOS = [
  "Menos de $10K",
  "$10K - $30K",
  "$30K - $80K",
  "$80K - $200K",
  "Más de $200K",
  "No estoy seguro",
];

const TIMELINES = [
  "Lo antes posible (este mes)",
  "1 - 3 meses",
  "3 - 6 meses",
  "Más de 6 meses",
  "Solo exploro opciones",
];

function parseUtms() {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  const src = params.get("utm_source");
  const med = params.get("utm_medium");
  const cmp = params.get("utm_campaign");
  if (src) out.utm_source = src;
  if (med) out.utm_medium = med;
  if (cmp) out.utm_campaign = cmp;
  return out;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [industria, setIndustria] = useState("");
  const [sitio_web, setSitioWeb] = useState("");
  const [que_necesita, setQueNecesita] = useState("");
  const [presupuesto_rango, setPresupuesto] = useState("");
  const [timeline, setTimeline] = useState("");
  const [como_nos_conocio, setComoConocio] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const onTurnstileVerify = useCallback((token: string) => setTurnstileToken(token), []);

  useEffect(() => {
    if (!isOpen) return;
    setError(null);
    setSubmitted(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const utms = parseUtms();
      const payload: Record<string, string> = {
        nombre: nombre.trim(),
        email: email.trim(),
        ...utms,
      };
      if (telefono.trim()) payload.telefono = telefono.trim();
      if (empresa.trim()) payload.empresa = empresa.trim();
      if (industria.trim()) payload.industria = industria.trim();
      if (sitio_web.trim()) payload.sitio_web = sitio_web.trim();
      if (que_necesita.trim()) payload.que_necesita = que_necesita.trim();
      if (presupuesto_rango) payload.presupuesto_rango = presupuesto_rango;
      if (timeline) payload.timeline = timeline;
      if (como_nos_conocio.trim()) payload.como_nos_conocio = como_nos_conocio.trim();
      if (turnstileToken) payload.turnstile_token = turnstileToken;
      if (honeypot) payload.website_url = honeypot;

      const res = await fetch(`${PORTAL_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? `Error ${res.status}`);

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-ink-800 mb-2">¡Gracias!</h2>
            <p className="text-ink-500 text-sm leading-relaxed mb-6">
              Recibimos tu información. Un estratega te contactará en las próximas <strong>24-48 horas</strong> para enviarte el diagnóstico gratuito de tu negocio.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-brand-gradient text-white rounded-full font-bold text-sm hover:scale-[1.02] transition-transform"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            <header className="px-6 py-5 border-b border-ink-100 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-ink-800">Diagnóstico de Marca</h2>
                <p className="text-xs text-ink-500 mt-1">Cuéntanos sobre tu negocio. Te contactaremos en 24-48 hrs.</p>
              </div>
              <button onClick={onClose} disabled={submitting} className="text-ink-400 hover:text-ink-700 disabled:opacity-50" aria-label="Cerrar">
                <X size={20} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Honeypot — bots llenan campos invisibles, humanos no */}
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                    Nombre <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary"
                    required minLength={2} maxLength={200} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Empresa</label>
                  <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Nombre del negocio"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Teléfono</label>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="WhatsApp ideal"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Industria</label>
                  <input type="text" value={industria} onChange={(e) => setIndustria(e.target.value)} placeholder="Restaurante, retail, clínica…"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Sitio web</label>
                  <input type="url" value={sitio_web} onChange={(e) => setSitioWeb(e.target.value)} placeholder="https://"
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">¿En qué te podemos ayudar?</label>
                <textarea value={que_necesita} onChange={(e) => setQueNecesita(e.target.value)} rows={3}
                  placeholder="Cuéntanos brevemente tu reto principal."
                  className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary resize-none" maxLength={2000} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Presupuesto</label>
                  <select value={presupuesto_rango} onChange={(e) => setPresupuesto(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary bg-white">
                    <option value="">— Seleccionar —</option>
                    {PRESUPUESTOS.map((p) => (<option key={p} value={p}>{p}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">Timeline</label>
                  <select value={timeline} onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary bg-white">
                    <option value="">— Seleccionar —</option>
                    {TIMELINES.map((t) => (<option key={t} value={t}>{t}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">¿Cómo nos conociste?</label>
                <input type="text" value={como_nos_conocio} onChange={(e) => setComoConocio(e.target.value)}
                  placeholder="Redes, recomendación, Google…"
                  className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg focus:outline-none focus:border-primary" maxLength={200} />
              </div>

              <TurnstileWidget onVerify={onTurnstileVerify} />

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg text-sm">{error}</div>
              )}

              <button type="submit" disabled={submitting}
                className="w-full px-6 py-3 bg-brand-gradient text-white rounded-full font-bold text-sm hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                {submitting ? (<><Loader2 size={18} className="animate-spin" /> Enviando…</>) : (<>Solicitar diagnóstico <ArrowRight size={18} /></>)}
              </button>

              <p className="text-[10px] text-ink-400 text-center">Al enviar aceptas que te contactemos por email / WhatsApp.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
