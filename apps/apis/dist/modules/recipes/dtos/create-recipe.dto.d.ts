import { CreateIngredientDto } from 'src/modules/ingredients';
export declare class CreateRecipeDto {
    description: string;
    ingredients: (CreateIngredientDto | string)[];
}
