import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Every page except the homepage: compact ink-on-paper header above the content. */
export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="page" />
      {children}
    </>
  );
}
