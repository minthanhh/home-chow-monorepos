import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { PaginationDto } from 'src/core/dtos';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        nutritionalValueId: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<import("src/core/dtos").IPaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        ingredients: {
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
        nutritionalValue: {
            id: string;
            protein: number;
            fat: number;
            carbohydrates: number;
            kcal: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
    }>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        nutritionalValueId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        nutritionalValueId: string;
    }>;
}
