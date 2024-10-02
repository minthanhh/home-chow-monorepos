import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { PrismaService } from 'src/shareds';
import { PaginationDto } from 'src/core/dtos';
import { Prisma } from '@prisma/client';
export declare class IngredientsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        id: string;
    }>;
    createManyAndReturn(createIngredientDtos: CreateIngredientDto[]): Promise<{
        id: string;
        name: string;
        image: string;
        protein: number;
        fat: number;
        carbohydrates: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createMany(createIngredientDtos: CreateIngredientDto[]): Promise<Prisma.BatchPayload>;
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
    findAll(ingredientIds?: string[], paginationDto?: PaginationDto): Promise<import("src/core/dtos").IPaginatedResult<unknown>>;
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
    deleteMany(ingredientIds: string[]): Promise<Prisma.BatchPayload>;
    deleteManyByRecipeId(recipeId: string, ingredientIds: string[]): Promise<Prisma.BatchPayload>;
}
