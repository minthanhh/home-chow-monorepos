import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { PrismaService } from 'src/shareds';
import { PaginationDto } from 'src/core/dtos';
import { IPrismaTransaction } from 'src/core/interfaces';
export declare class RecipesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createRecipeDto: CreateRecipeDto): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        nutritionalValueId: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<import("src/core/dtos").IPaginatedResult<unknown>>;
    findOne(id: string, transaction?: IPrismaTransaction, relation?: 'relation'): Promise<{
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
    update(recipeId: string, updateRecipeDto: UpdateRecipeDto): Promise<{
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
