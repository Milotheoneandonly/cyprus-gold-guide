import { useEffect } from "react";
import { SITE_URL, PUBLIC_INDEXING } from "@/config/site";

type SeoOptions = {
  title: string;
  description: string;
  canonicalPath?: string; // e.g. "/hotell/limassol"
  noindex?: boolean;
  image?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, canonicalPath, noindex, image }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
    if (canonicalPath) {
      upsertLink("canonical", `${SITE_URL}${canonicalPath}`);
    }
    // Global indexing kill-switch: if VITE_PUBLIC_INDEXING is false, ALL pages
    // emit noindex,nofollow regardless of per-page intent. Per-page noindex
    // (e.g. admin, empty category) always wins.
    const shouldNoindex = noindex || !PUBLIC_INDEXING;
    upsertMeta("name", "robots", shouldNoindex ? "noindex,nofollow" : "index,follow");
  }, [title, description, canonicalPath, noindex, image]);
}

export { SITE_URL };
