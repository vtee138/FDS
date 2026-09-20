-- AlterTable: make password optional (idempotent)
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- AddColumn (idempotent - skip if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'User' AND column_name = 'googleId'
  ) THEN
    ALTER TABLE "User" ADD COLUMN "googleId" TEXT;
  END IF;
END $$;

-- CreateIndex (idempotent - skip if already exists)
CREATE UNIQUE INDEX IF NOT EXISTS "User_googleId_key" ON "User"("googleId");
