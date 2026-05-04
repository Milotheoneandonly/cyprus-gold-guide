-- Add SEO + slug fields to hotels
ALTER TABLE public.hotels
  ADD COLUMN IF NOT EXISTS hotel_slug TEXT,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Slugify function: lowercase, strip diacritics, replace non-alnum with -
CREATE OR REPLACE FUNCTION public.slugify(input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  s TEXT;
BEGIN
  IF input IS NULL OR length(trim(input)) = 0 THEN
    RETURN NULL;
  END IF;
  s := lower(input);
  -- Common Scandinavian / European replacements before unaccent-style strip
  s := replace(s, 'å', 'a');
  s := replace(s, 'ä', 'a');
  s := replace(s, 'ö', 'o');
  s := replace(s, 'ø', 'o');
  s := replace(s, 'æ', 'ae');
  s := replace(s, 'ü', 'u');
  s := replace(s, 'é', 'e');
  s := replace(s, 'è', 'e');
  s := replace(s, 'ê', 'e');
  s := replace(s, 'á', 'a');
  s := replace(s, 'à', 'a');
  s := replace(s, 'â', 'a');
  s := replace(s, 'ñ', 'n');
  s := replace(s, 'ç', 'c');
  s := replace(s, '&', ' and ');
  -- Replace anything not a-z 0-9 with hyphen
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  s := regexp_replace(s, '^-+|-+$', '', 'g');
  RETURN s;
END;
$$;

-- Backfill slugs ensuring uniqueness per area
DO $$
DECLARE
  r RECORD;
  base TEXT;
  candidate TEXT;
  n INT;
BEGIN
  FOR r IN SELECT id, name, area FROM public.hotels WHERE hotel_slug IS NULL OR hotel_slug = '' LOOP
    base := public.slugify(r.name);
    IF base IS NULL OR base = '' THEN
      base := 'hotel';
    END IF;
    candidate := base;
    n := 2;
    WHILE EXISTS (
      SELECT 1 FROM public.hotels
      WHERE area = r.area AND hotel_slug = candidate AND id <> r.id
    ) LOOP
      candidate := base || '-' || n;
      n := n + 1;
    END LOOP;
    UPDATE public.hotels SET hotel_slug = candidate WHERE id = r.id;
  END LOOP;
END $$;

-- Make hotel_slug not null + unique per area
ALTER TABLE public.hotels ALTER COLUMN hotel_slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS hotels_area_slug_unique ON public.hotels(area, hotel_slug);