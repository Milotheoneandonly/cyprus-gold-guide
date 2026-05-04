-- Add new destination values to hotel_area enum
ALTER TYPE public.hotel_area ADD VALUE IF NOT EXISTS 'protaras';
ALTER TYPE public.hotel_area ADD VALUE IF NOT EXISTS 'larnaca';
ALTER TYPE public.hotel_area ADD VALUE IF NOT EXISTS 'coral-bay';
ALTER TYPE public.hotel_area ADD VALUE IF NOT EXISTS 'polis-latchi';

-- Add optional columns to hotels (safe, with defaults; existing rows remain active)
ALTER TABLE public.hotels
  ADD COLUMN IF NOT EXISTS sub_area TEXT,
  ADD COLUMN IF NOT EXISTS official_website_url TEXT,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS traveller_tags TEXT[] NOT NULL DEFAULT '{}';

-- Helpful index for public queries that filter by active
CREATE INDEX IF NOT EXISTS idx_hotels_active ON public.hotels (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_hotels_area_category_active ON public.hotels (area, category, is_active);