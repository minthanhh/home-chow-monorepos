/*
  Warnings:

  - You are about to drop the column `icon` on the `Cuisine` table. All the data in the column will be lost.
  - Added the required column `iconId` to the `Cuisine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuisine" DROP COLUMN "icon",
ADD COLUMN     "iconId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cuisine" ADD CONSTRAINT "Cuisine_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
