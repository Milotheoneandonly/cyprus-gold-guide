-- slugify is a pure utility; switch to SECURITY INVOKER
ALTER FUNCTION public.slugify(text) SECURITY INVOKER;