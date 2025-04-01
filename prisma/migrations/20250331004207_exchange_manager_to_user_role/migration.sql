/*
  Warnings:

  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BakeryManager" DROP CONSTRAINT "BakeryManager_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropTable
DROP TABLE "Manager";

-- AddForeignKey
ALTER TABLE "BakeryManager" ADD CONSTRAINT "BakeryManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
