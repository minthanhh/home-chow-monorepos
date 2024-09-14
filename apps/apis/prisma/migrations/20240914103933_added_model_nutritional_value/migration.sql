-- CreateTable
CREATE TABLE "NutritionalValue" (
    "id" TEXT NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "Fat" DOUBLE PRECISION NOT NULL,
    "Carbohydrates" DOUBLE PRECISION NOT NULL,
    "kcal" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionalValue_pkey" PRIMARY KEY ("id")
);
