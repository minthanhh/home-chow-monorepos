import { Injectable } from '@nestjs/common'
import { CreateMealDto } from './dto/create-meal.dto'
import { UpdateMealDto } from './dto/update-meal.dto'
import { PrismaService } from 'src/shareds'
import { IngredientsService } from '../ingredients'
import { extractUuidAndNameArrays } from 'src/shareds/utilities'
import { RecipesService } from '../recipes'
import { Ingredient, Recipe, User } from '@prisma/client'

@Injectable()
export class MealsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly ingredientsService: IngredientsService,
        private readonly recipesService: RecipesService,
    ) {}

    async create(createMealDto: CreateMealDto, user: User) {
        let recipe: Recipe
        const [ingredientUuids, ingredientNames] = extractUuidAndNameArrays(createMealDto.ingredients)
        const ingredientProcess = []

        if (ingredientUuids.length > 0) ingredientProcess.push(this.ingredientsService.findAll(ingredientUuids))
        if (ingredientNames.length > 0) ingredientProcess.push(this.ingredientsService.createManyAndReturn(ingredientNames))

        const ingredients: Array<Ingredient[]> = await Promise.all(ingredientProcess)

        if (!createMealDto.recipeId) recipe = await this.recipesService.create({ description: createMealDto.recipeDescription })

        const recipeId = createMealDto?.recipeId || recipe.id

        const recipeIngredients = ingredients.flat().map((i) => ({
            ingredientId: i.id,
            recipeId: recipeId,
        }))

        await this.prismaService.recipeIngredient.createMany({ data: recipeIngredients })

        await this.prismaService.meal.create({
            data: {
                name: createMealDto.name,
                recipeId: recipeId,
                cuisineId: createMealDto.cuisineId,
                createdById: createMealDto.userId,
            },
        })
        return 'Created meal successfully'
    }

    findAll() {
        return `This action returns all meals`
    }

    async findOne(id: string) {
        return await this.prismaService.meal.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                recipe: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
                cuisine: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        avatar: true,
                        fullName: true,
                        username: true,
                    },
                },
                preferredBy: true,
                updatedAt: true,
                createdAt: true,
            },
        })
    }

    update(id: string, updateMealDto: UpdateMealDto) {
        return `This action updates a #${id} meal` + updateMealDto
    }

    remove(id: string) {
        return `This action removes a #${id} meal`
    }

    async updateFavoriteMeal(id: string, user: User) {
        const preferredByExists = await this.prismaService.userMeal.findFirst({ where: { AND: [{ mealId: id }, { userId: user.id }] } })

        // if (preferredByExists) await this.prismaService.meal.update({})
    }
}
