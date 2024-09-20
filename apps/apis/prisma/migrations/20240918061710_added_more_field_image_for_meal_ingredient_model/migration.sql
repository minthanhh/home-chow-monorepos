/*
  Warnings:

  - You are about to drop the column `image` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
