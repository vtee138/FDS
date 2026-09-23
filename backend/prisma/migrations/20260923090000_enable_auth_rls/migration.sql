-- The application accesses authentication data only through the server-side
-- Prisma connection. Do not expose users, password hashes, or device sessions
-- through Supabase's browser-facing Data API.
ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."session" ENABLE ROW LEVEL SECURITY;

-- Supabase projects have these API roles. The conditional form keeps the same
-- migration compatible with the local PostgreSQL Docker service, which does
-- not create them by default.
DO $rls_grants$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL PRIVILEGES ON TABLE public."user" FROM anon;
    REVOKE ALL PRIVILEGES ON TABLE public."session" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL PRIVILEGES ON TABLE public."user" FROM authenticated;
    REVOKE ALL PRIVILEGES ON TABLE public."session" FROM authenticated;
  END IF;
END;
$rls_grants$;

-- No RLS policies are intentionally created. Browser clients must not access
-- these sensitive tables directly; the table owner used by Prisma bypasses RLS.
