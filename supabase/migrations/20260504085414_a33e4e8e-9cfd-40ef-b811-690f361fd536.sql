CREATE OR REPLACE FUNCTION public.slugify(input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  s TEXT;
BEGIN
  IF input IS NULL OR length(trim(input)) = 0 THEN
    RETURN NULL;
  END IF;
  s := lower(input);
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
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  s := regexp_replace(s, '^-+|-+$', '', 'g');
  RETURN s;
END;
$$;