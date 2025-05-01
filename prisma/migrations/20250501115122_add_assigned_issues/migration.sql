-- AlterTable
ALTER TABLE "Issus" ADD COLUMN     "assigneToUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issus" ADD CONSTRAINT "Issus_assigneToUserId_fkey" FOREIGN KEY ("assigneToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
