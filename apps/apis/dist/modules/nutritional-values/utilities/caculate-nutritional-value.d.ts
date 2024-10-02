import { Ingredient } from '@prisma/client';
export declare function caculateNutritionalValue(ingredients: Ingredient[]): {
    protein: number;
    carbohydrates: number;
    fat: number;
    totalMass: number;
};
