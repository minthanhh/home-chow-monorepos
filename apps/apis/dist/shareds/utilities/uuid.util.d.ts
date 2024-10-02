import { Ingredient } from '@prisma/client';
type IngredientType = Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt' | 'protein' | 'fat' | 'quantity' | 'carbohydrates'> & {
    protein: string;
    fat: string;
    carbohydrates: string;
    quantity: string;
};
type ReturnIngredientType = Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>;
type UuidNamePairsType = Array<string | Partial<IngredientType>>;
export declare function extractUuidAndNameArrays(l: UuidNamePairsType): [string[], ReturnIngredientType[]];
export {};
