import { Ingredient } from '@prisma/client';
export declare class IngredientDto implements Ingredient {
    imageId: string;
    quantity: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    id: string;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
