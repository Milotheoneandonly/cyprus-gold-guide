import { useEffect } from "react";
import { SITE_URL, SITE_NAME } from "@/config/site";

/**
 * Injects a JSON-LD <script> tag into <head> with a stable id, replacing
 * any previous tag of the same id. Removed when the component unmounts.
 *
 * IMPORTANT: never include aggregateRating or Review here. We do not have
 * verified review data and must not fabricate any.
 */
function useJsonLd(id: string, data: Record<string, unknown> | null) {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (!data) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      const e = document.getElementById(id);
      if (e) e.remove();
    };
  }, [id, JSON.stringify(data)]);
}

export const OrganizationSchema = () => {
  useJsonLd("ld-organization", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  });
  return null;
};

export const WebSiteSchema = () => {
  useJsonLd("ld-website", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "sv-SE",
  });
  return null;
};

type Crumb = { name: string; path: string };

export const BreadcrumbSchema = ({ items }: { items: Crumb[] }) => {
  useJsonLd("ld-breadcrumb", {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  });
  return null;
};
