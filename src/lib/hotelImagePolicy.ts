// Hotel image licensing & launch-readiness helpers.
// Mirror of DB enum-by-trigger in supabase/migrations.

export const IMAGE_LICENSE_VALUES = [
  "licensed",
  "booking_partner_api",
  "hotel_permission",
  "own_photo",
  "stock_area_fallback",
  "unknown",
] as const;
export type ImageLicenseStatus = (typeof IMAGE_LICENSE_VALUES)[number];

export const APPROVED_LICENSES: ImageLicenseStatus[] = [
  "licensed",
  "booking_partner_api",
  "hotel_permission",
  "own_photo",
];

export type PhotoReadyInput = {
  image_url?: string | null;
  image_alt?: string | null;
  image_license_status?: string | null;
  image_verified_at?: string | null;
};

export function isPhotoReady(h: PhotoReadyInput): boolean {
  if (!h.image_url || h.image_url.trim() === "") return false;
  if (h.image_url.startsWith("seed:")) return false;
  if (!h.image_alt || h.image_alt.trim() === "") return false;
  if (!h.image_verified_at) return false;
  const status = (h.image_license_status || "unknown") as ImageLicenseStatus;
  return APPROVED_LICENSES.includes(status);
}

// Disallowed image hosts — never embed these as hotel-specific images.
const DISALLOWED_HOSTS = [
  "instagram.com",
  "tripadvisor.com",
  "tripadvisor.",
  "googleusercontent.com",
  "google.com/imgres",
];

export function imageUrlIsDisallowed(url: string | null | undefined): boolean {
  if (!url) return false;
  return DISALLOWED_HOSTS.some((h) => url.includes(h));
}

// Booking.com-hosted images outside the partner API flow are also not allowed.
export function looksLikeBookingHotlink(
  url: string | null | undefined,
  license: string | null | undefined,
): boolean {
  if (!url) return false;
  if (!/bstatic\.com|cf\.bstatic\.com|q-xx\.bstatic\.com/.test(url)) return false;
  return license !== "booking_partner_api";
}

export const MIN_PHOTO_READY_PER_AREA = 5;
