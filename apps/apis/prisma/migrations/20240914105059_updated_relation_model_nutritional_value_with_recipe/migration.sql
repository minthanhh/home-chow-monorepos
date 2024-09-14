/*
  Warnings:

  - A unique constraint covering the columns `[nutritionalValueId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutritionalValueId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "nutritionalValueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_nutritionalValueId_key" ON "Recipe"("nutritionalValueId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_nutritionalValueId_fkey" FOREIGN KEY ("nutritionalValueId") REFERENCES "NutritionalValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
