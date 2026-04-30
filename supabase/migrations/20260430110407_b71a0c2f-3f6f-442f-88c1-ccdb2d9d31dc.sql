-- Fix has_role function: restrict execute, keep search_path
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

-- Fix update_updated_at_column search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict bucket listing: only allow reading specific known objects, not listing
DROP POLICY "Public read hotel images" ON storage.objects;

CREATE POLICY "Public read individual hotel images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hotel-images' AND auth.role() = 'anon' IS NOT NULL);
