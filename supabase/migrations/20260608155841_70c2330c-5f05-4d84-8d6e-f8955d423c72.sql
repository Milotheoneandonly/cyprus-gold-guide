
-- 1) Fix broken public read policy on storage.objects for hotel-images bucket
DROP POLICY IF EXISTS "Public read individual hotel images" ON storage.objects;
CREATE POLICY "Public read individual hotel images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'hotel-images');

-- 2) Lock down has_role SECURITY DEFINER function: only authenticated/service_role may execute.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
