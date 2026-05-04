-- Enforce unique hotel_slug per area to match admin upsert logic
-- First, defensively dedupe: if any duplicate exists, keep the lowest sort_order/oldest
DELETE FROM public.hotels a
USING public.hotels b
WHERE a.area = b.area
  AND a.hotel_slug = b.hotel_slug
  AND a.id <> b.id
  AND (a.sort_order, a.created_at) > (b.sort_order, b.created_at);

CREATE UNIQUE INDEX IF NOT EXISTS hotels_area_slug_unique
  ON public.hotels (area, hotel_slug);