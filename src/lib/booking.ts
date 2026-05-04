// Booking.com affiliate helpers.
// Existing affiliate ID detected from current active rows in the `hotels` table.
export const BOOKING_AFFILIATE_ID = "2311236";

/** Build a Booking.com search URL with our affiliate ID for a hotel name + destination. */
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
 * Swedish CTA label that adapts to the booking_url type.
 *  - search results URL → "Sök pris på Booking" (we don't know the exact hotel page)
 *  - exact hotel/deep link → "Se pris på Booking"
 */
export function getBookingCtaLabel(url: string | undefined | null): string {
  if (isBookingSearchUrl(url)) return "Sök pris på Booking";
  return "Se pris på Booking";
}
