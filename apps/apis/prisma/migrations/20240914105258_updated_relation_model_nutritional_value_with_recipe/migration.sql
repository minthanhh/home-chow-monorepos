/*
  Warnings:

  - You are about to drop the column `Carbohydrates` on the `NutritionalValue` table. All the data in the column will be lost.
  - You are about to drop the column `Fat` on the `NutritionalValue` table. All the data in the column will be lost.
  - Added the required column `carbohydrates` to the `NutritionalValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `NutritionalValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NutritionalValue" DROP COLUMN "Carbohydrates",
DROP COLUMN "Fat",
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL;
