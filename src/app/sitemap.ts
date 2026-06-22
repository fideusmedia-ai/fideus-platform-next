import type { MetadataRoute } from "next";
import { CASOS_LIST } from "@/data/casos";

const BASE = "https://fideusmedia.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...CASOS_LIST.map((c) => ({
      url: `${BASE}/casos/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
