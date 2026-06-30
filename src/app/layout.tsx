import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fideusmedia.io"),
  title: {
    default: "FideusMedia — Consultoría estratégica integral",
    template: "%s · FideusMedia",
  },
  description:
    "Diagnosticamos tu negocio en 6 áreas críticas (marca, marketing, ventas, retención, operaciones, finanzas) y construimos los sistemas que cierran las brechas. Sin parches.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "FideusMedia",
    title: "FideusMedia — Consultoría estratégica integral",
    description:
      "Diagnosticamos 6 áreas críticas de tu negocio y construimos los sistemas que cierran las brechas reales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FideusMedia — Consultoría estratégica integral",
    description: "Tal vez tu negocio no necesita más publicidad. Necesita estructura.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
