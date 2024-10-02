import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { PrismaService } from 'src/shareds';
import { PaginationDto } from 'src/core/dtos';
export declare class MealsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createMealDto: CreateMealDto, userId: string): Promise<string>;
    findAll(paginationDto: PaginationDto): Promise<import("src/core/dtos").IPaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        recipe: {
            nutritionalValue: {
                id: string;
                protein: number;
                fat: number;
                carbohydrates: number;
                kcal: number;
                createdAt: Date;
                updatedAt: Date;
            };
            id: string;
            description: string;
            ingredients: {
                ingredient: {
                    name: string;
                    id: string;
                    image: string;
                    protein: number;
                    fat: number;
                    carbohydrates: number;
                };
            }[];
        };
        cuisine: {
            name: string;
            id: string;
            icon: string;
        };
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: {
            id: string;
            username: string;
            fullName: string;
            avatar: string;
        };
        preferredBy: {
            userId: string;
            mealId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update(id: string, updateMealDto: UpdateMealDto): Promise<void>;
    remove(id: string): Promise<string>;
    updateFavoriteMeal(mealId: string, userId: string): Promise<string>;
}
