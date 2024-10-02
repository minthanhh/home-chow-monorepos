import { CreateIngredientDto } from 'src/modules/ingredients';
export declare class CreateMealDto {
    name: string;
    image: string;
    description: string;
    cuisineId: string;
    recipeId: string;
    recipeDescription: string;
    ingredients: (CreateIngredientDto | string)[];
}
