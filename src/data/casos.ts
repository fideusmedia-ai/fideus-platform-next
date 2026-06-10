export type CasoAccent = "primary" | "secondary";

export interface CasoResult {
  metric: string;
  label: string;
  sub: string;
}

export interface Caso {
  slug: string;
  nombre: string;
  industria: string;
  industriaTag: string; // tag corto para tarjetas
  ubicacion: string;
  desde: number;
  accent: CasoAccent;
  servicios: string[];
  desafio: string[];
  solucion: string[];
  resultados: CasoResult[];
  // Métrica destacada para la card de la sección
  cardMetric: { value: string; label: string };
}

export const CASOS: Record<string, Caso> = {
  hidalgo: {
    slug: "hidalgo",
    nombre: "Hidalgo Restaurante",
    industria: "Restaurante de comida mexicana tradicional",
    industriaTag: "Restaurante",
    ubicacion: "Estado de México, México",
    desde: 2023,
    accent: "primary",
    servicios: ["Branding", "Marketing", "Producción visual", "Web"],
    desafio: [
      "Cocina excelente, mesa llena los fines de semana — pero la marca no contaba esa historia.",
      "La identidad visual era inconsistente entre el local, las redes y la web. Cada touchpoint se sentía como un negocio distinto, y nada conectaba con la tradición mexicana que se servía en el plato.",
      "Las redes sociales eran un álbum de fotos al teléfono. La página web parecía hecha años atrás por algún sobrino. Cero coherencia, cero narrativa.",
    ],
    solucion: [
      "Producción de contenido de alta calidad cada mes — foto, video corto, reels. Cada pieza refuerza el concepto.",
      "Rediseño completo del sitio web con foco en reservas digitales y la historia detrás del menú.",
      "Gestión integral de redes sociales con calendario editorial y voz consistente.",
      "Identidad refrescada que respeta lo tradicional sin sentirse anticuada.",
    ],
    resultados: [
      { metric: "+34%", label: "Ticket promedio", sub: "En los primeros 12 meses" },
      { metric: "3.2x", label: "Engagement Instagram", sub: "A 6 meses del relanzamiento" },
      { metric: "4.7", label: "Calificación Google", sub: "Subió desde 4.1" },
    ],
    cardMetric: { value: "+34%", label: "Ticket promedio en los primeros 12 meses tras el refresh de identidad." },
  },
  cafestesia: {
    slug: "cafestesia",
    nombre: "CAFESTESIA",
    industria: "Café de especialidad · Panadería artesanal · Pizza napolitana",
    industriaTag: "Café de especialidad",
    ubicacion: "Estado de México, México",
    desde: 2025,
    accent: "secondary",
    servicios: ["Identidad de marca", "POS / ERP a medida", "Web + e-commerce", "Sistema de lealtad"],
    desafio: [
      "Producto premium con obsesión por el proceso — café de especialidad, masas naturalmente fermentadas, pizza estilo napolitana. Pero la calidad dependía de los dueños presentes.",
      "Sin sistemas centralizados, cada turno podía perder consistencia. La merma de insumos era invisible: sabían que existía, no sabían dónde.",
      "Sin sistema de lealtad ni manera de saber quién era cliente recurrente, qué consumía o por qué dejaba de venir.",
    ],
    solucion: [
      "Identidad de marca diseñada para comunicar el nivel del producto — sin caer en café-hipster genérico.",
      "ERP a medida que centraliza procesos, manuales operativos y rotación de personal.",
      "POS con CFD configurado para trazabilidad por insumo — control de merma al gramo.",
      "Web con orden en línea y programa de lealtad gamificado: retos, rachas y recompensas configurables, no puntos genéricos.",
    ],
    resultados: [
      { metric: "3 sem", label: "POS + inventario + identidad", sub: "Tiempo total de implementación" },
      { metric: "<2%", label: "Merma de inventario", sub: "Trazabilidad por insumo" },
      { metric: "+42%", label: "Ticket miembro vs no-miembro", sub: "Lealtad por retos" },
      { metric: "35%", label: "De tickets vienen de membresía", sub: "En el primer trimestre" },
    ],
    cardMetric: { value: "3 semanas", label: "POS, inventario automatizado e identidad implementados de extremo a extremo." },
  },
};

export const CASOS_LIST: Caso[] = [CASOS.hidalgo, CASOS.cafestesia];
