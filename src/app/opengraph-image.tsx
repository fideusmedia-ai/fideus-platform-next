import { ImageResponse } from "next/og";

// OG image generada (1200×630) para previews en WhatsApp/Twitter/LinkedIn.
// Estática (sin params) → Next la genera en build. Las rutas hijas heredan esta
// imagen salvo que definan la suya.

export const alt = "FideusMedia — Consultoría estratégica integral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundImage:
            "linear-gradient(135deg, #1c0719 0%, #5a0f4a 52%, #C9207A 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff5fb0", display: "flex" }} />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Consultoría estratégica integral
          </div>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            FideusMedia
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
              marginTop: 28,
              maxWidth: 940,
              lineHeight: 1.18,
            }}
          >
            Tu negocio no necesita más marketing. Necesita estructura.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
            Marca · Marketing · Ventas · Retención · Operaciones · Finanzas
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>fideusmedia.io</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
