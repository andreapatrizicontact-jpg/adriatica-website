import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Every public page. "/" carries the six homepage blocks (#inizio … #contatti);
// the long-form content that used to live on the old homepage now has its own URL.
const routes = [
  "/",
  "/progetti",
  "/bollino",
  "/metodo",
  "/consulenza",
  "/analisi",
  "/contatti",
  "/privacy",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
