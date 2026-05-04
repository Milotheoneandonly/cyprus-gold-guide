/**
 * Single source of truth for the public site URL and indexing policy.
 *
 * Configure via Vite env vars (set in Lovable project env or .env):
 *   VITE_SITE_URL          e.g. "https://cypern-hotell.se"
 *   VITE_SITE_NAME         e.g. "Cypern Hotell"
 *   VITE_PUBLIC_INDEXING   "true" once the final domain is live; otherwise "false"
 *
 * For Node scripts (sitemap, audit) read process.env.SITE_URL instead.
 */

const env = (import.meta as any).env ?? {};

export const SITE_URL: string = (env.VITE_SITE_URL || "https://cypern-hotell.se").replace(/\/$/, "");
export const SITE_NAME: string = env.VITE_SITE_NAME || "Cypern Hotell";

/**
 * When PUBLIC_INDEXING is false, every public page emits robots noindex,nofollow.
 * Default: false (safe — prevents staging URLs from being indexed).
 */
export const PUBLIC_INDEXING: boolean = String(env.VITE_PUBLIC_INDEXING ?? "false").toLowerCase() === "true";
