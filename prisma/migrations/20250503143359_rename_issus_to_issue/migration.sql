/*
  Warnings:

  - You are about to drop the `Issus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issus" DROP CONSTRAINT "Issus_assigneToUserId_fkey";

-- DropTable
DROP TABLE "Issus";

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedt" TIMESTAMP(3) NOT NULL,
    "assigneToUserId" VARCHAR(255),

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assigneToUserId_fkey" FOREIGN KEY ("assigneToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
