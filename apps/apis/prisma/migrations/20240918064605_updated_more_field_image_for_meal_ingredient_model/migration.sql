/*
  Warnings:

  - You are about to drop the column `contentType` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.
  - Added the required column `mineType` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "contentType",
DROP COLUMN "filename",
ADD COLUMN     "mineType" TEXT NOT NULL;
