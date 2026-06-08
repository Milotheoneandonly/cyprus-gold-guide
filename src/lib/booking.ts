// Booking.com link helpers.
export const BOOKING_AFFILIATE_ID = "2311236";

/** Build a Booking.com search URL for a hotel name + destination. */
export function buildBookingSearchUrl(hotelName: string, destination: string): string {
  const ss = encodeURIComponent(`${hotelName} ${destination}`);
  return `https://www.booking.com/searchresults.en-gb.html?ss=${ss}&aid=${BOOKING_AFFILIATE_ID}`;
}

/** True if the URL is a Booking.com search results URL (vs a hotel deep link). */
export function isBookingSearchUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return url.includes("booking.com/searchresults");
}

/** True if the URL is a Booking.com hotel deep link (e.g. /hotel/cy/...). */
export function isBookingDeepLink(url: string | undefined | null): boolean {
  if (!url) return false;
  return /booking\.com\/hotel\//.test(url);
}

/**
 * English CTA label that adapts to the booking_url type.
 *  - search results URL → "Search on Booking"
 *  - exact hotel/deep link → "See price on Booking"
 */
export function getBookingCtaLabel(url: string | undefined | null): string {
  if (isBookingSearchUrl(url)) return "Search on Booking";
  return "See price on Booking";
}
