/*
  Warnings:

  - Added the required column `carbohydrates` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL;
