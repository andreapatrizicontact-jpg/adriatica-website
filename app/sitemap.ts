import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

const routes = ["/", "/metodo", "/consulenza", "/analisi", "/contatti", "/privacy", "/cookie-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
