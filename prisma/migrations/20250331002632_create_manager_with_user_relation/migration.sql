/*
  Warnings:

  - You are about to drop the column `email` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Manager` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'MANAGER';

-- DropIndex
DROP INDEX "Manager_email_key";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
