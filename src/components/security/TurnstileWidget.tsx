"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile — bot detection invisible.
 *
 * Setup:
 * 1. Crear sitio en https://dash.cloudflare.com → Turnstile
 * 2. Tipo: "Invisible" o "Managed" (recomendado Managed)
 * 3. Site key → .env.local:  NEXT_PUBLIC_TURNSTILE_SITE_KEY=tu-site-key
 * 4. Secret key → Vercel env del portal:  TURNSTILE_SECRET_KEY=tu-secret
 *
 * Sin site key → no se renderiza nada (lead form sigue funcionando sin
 * verificación, útil para dev local).
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface Props {
  onVerify: (token: string) => void;
}

export default function TurnstileWidget({ onVerify }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !ref.current) return;

    // Inyectar script Cloudflare una sola vez
    const existing = document.getElementById("cf-turnstile-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let cancelled = false;
    const tryRender = () => {
      if (cancelled || !ref.current) return;
      if (window.turnstile) {
        widgetIdRef.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme: "light",
          callback: onVerify,
        });
      } else {
        setTimeout(tryRender, 200);
      }
    };
    tryRender();

    return () => {
      cancelled = true;
    };
  }, [siteKey, onVerify]);

  // Si no hay site key, el widget no renderiza nada — graceful fallback dev
  if (!siteKey) return null;

  return <div ref={ref} className="my-3" />;
}
