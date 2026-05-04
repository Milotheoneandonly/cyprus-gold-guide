-- Image licensing & verification metadata
ALTER TABLE public.hotels
  ADD COLUMN IF NOT EXISTS image_alt TEXT,
  ADD COLUMN IF NOT EXISTS image_source TEXT,
  ADD COLUMN IF NOT EXISTS image_license_status TEXT NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS image_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS image_needs_review BOOLEAN NOT NULL DEFAULT true;

-- Constrain license status to allowed values via trigger (avoid CHECK rigidity)
CREATE OR REPLACE FUNCTION public.validate_hotel_image_license()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.image_license_status IS NULL THEN
    NEW.image_license_status := 'unknown';
  END IF;
  IF NEW.image_license_status NOT IN (
    'licensed','booking_partner_api','hotel_permission','own_photo','stock_area_fallback','unknown'
  ) THEN
    RAISE EXCEPTION 'Invalid image_license_status: %', NEW.image_license_status;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS hotels_validate_image_license ON public.hotels;
CREATE TRIGGER hotels_validate_image_license
BEFORE INSERT OR UPDATE ON public.hotels
FOR EACH ROW EXECUTE FUNCTION public.validate_hotel_image_license();
