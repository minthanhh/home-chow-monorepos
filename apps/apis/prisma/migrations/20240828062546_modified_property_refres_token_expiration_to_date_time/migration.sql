/*
  Warnings:

  - The `refreshTokenExpiration` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshTokenExpiration",
ADD COLUMN     "refreshTokenExpiration" TIMESTAMP(3);
