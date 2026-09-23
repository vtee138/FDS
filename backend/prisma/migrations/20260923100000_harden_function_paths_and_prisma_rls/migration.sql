-- Fix Supabase Advisor's mutable-search-path warning. These functions use only
-- built-ins and fully-qualified application objects, so public is unnecessary.
-- Listing pg_temp last prevents PostgreSQL from implicitly searching it first.
ALTER FUNCTION public.set_user_update_at() SET search_path = pg_catalog, pg_temp;
ALTER FUNCTION public.delete_expired_sessions() SET search_path = pg_catalog, pg_temp;

-- Prisma creates this migration-history table in public before applying any
-- migration. It is framework metadata, never browser-facing application data.
ALTER TABLE public."_prisma_migrations" ENABLE ROW LEVEL SECURITY;

DO $prisma_migration_grants$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL PRIVILEGES ON TABLE public."_prisma_migrations" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL PRIVILEGES ON TABLE public."_prisma_migrations" FROM authenticated;
  END IF;
END;
$prisma_migration_grants$;

REVOKE ALL PRIVILEGES ON TABLE public."_prisma_migrations" FROM PUBLIC;

-- No policy is intentional. Prisma connects as the database owner through the
-- server-only direct connection, which bypasses RLS; Data API clients cannot
-- read or change migration history.
