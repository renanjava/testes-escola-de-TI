/*
  Warnings:

  - You are about to drop the column `endTime` on the `Bakery` table. All the data in the column will be lost.
  - You are about to drop the column `startedTime` on the `Bakery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Bakery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `closeTime` to the `Bakery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openTime` to the `Bakery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bakery" DROP COLUMN "endTime",
DROP COLUMN "startedTime",
ADD COLUMN     "closeTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "openTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BakeryManager" (
    "id" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "bakeryId" TEXT NOT NULL,

    CONSTRAINT "BakeryManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bakery_cnpj_key" ON "Bakery"("cnpj");

-- AddForeignKey
ALTER TABLE "BakeryManager" ADD CONSTRAINT "BakeryManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BakeryManager" ADD CONSTRAINT "BakeryManager_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
