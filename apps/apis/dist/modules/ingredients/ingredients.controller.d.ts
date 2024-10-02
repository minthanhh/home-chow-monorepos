import { IngredientsService } from './ingredients.service';
import { PaginationDto } from 'src/core/dtos';
import { CreateIngredientDto, RemoveIngredientsByRecipeDto, RemoveIngredientsDto, UpdateIngredientDto } from './dtos';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        id: string;
    }>;
    findAll(paginationDto?: PaginationDto): Promise<import("src/core/dtos").IPaginatedResult<unknown>>;
    findAllByRecipeId(recipeId: string, paginationDto?: PaginationDto): Promise<{
        data: {
            id: string;
            name: string;
            image: string;
            protein: number;
            fat: number;
            carbohydrates: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: import("src/core/dtos").IPaginatedMetaResult;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        image: string;
        protein: number;
        fat: number;
        carbohydrates: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<{
        id: string;
        name: string;
        image: string;
        protein: number;
        fat: number;
        carbohydrates: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        image: string;
        protein: number;
        fat: number;
        carbohydrates: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteIngredients(removeIngredientsDto: RemoveIngredientsDto): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteIngredientsByRecipe(recipeId: string, removeIngredientsByRecipeDto: RemoveIngredientsByRecipeDto): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
