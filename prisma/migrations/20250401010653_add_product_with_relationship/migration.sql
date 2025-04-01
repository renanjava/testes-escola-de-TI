-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SWEET', 'BREAD', 'CAKE', 'ICE_CREAM', 'PIZZA', 'SNACK', 'COLD_CUTS', 'DRINK', 'SAVORY');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "disponibility" BOOLEAN NOT NULL,
    "category" "ProductCategory"[],
    "bakeryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
