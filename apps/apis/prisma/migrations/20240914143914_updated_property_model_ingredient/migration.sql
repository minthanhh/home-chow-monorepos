/*
  Warnings:

  - You are about to alter the column `carbohydrates` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fat` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `protein` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "carbohydrates" SET DATA TYPE INTEGER,
ALTER COLUMN "fat" SET DATA TYPE INTEGER,
ALTER COLUMN "protein" SET DATA TYPE INTEGER;
