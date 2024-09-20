import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMealDto } from './dtos/create-meal.dto'
import { UpdateMealDto } from './dtos/update-meal.dto'
import { PrismaService } from 'src/shareds'
import { extractUuidAndNameArrays } from 'src/shareds/utilities'
import { Ingredient, Recipe } from '@prisma/client'
import { PaginationDto } from 'src/core/dtos'
import { paginator } from 'src/core/utilities'
import { caculateNutritionalValue, calculateArrayOrNumberPercentage } from '../nutritional-values'

@Injectable()
export class MealsService {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     * @param {CreateMealDto} createMealDto - Data to create new meal record.
     * @returns - List of recipes.
     * @sql - SELECT * FROM "Ingredient" WHERE "Ingredient"."id" IN ('id1', 'id2', ...)
     *      - INSERT INTO "Ingredient" (name, image) ('{name}', '{image}') ('{name}', '{image}')
     *      - INSERT INTO "Recipe" (description) VALUES ('{description}')
     *      - INSERT INTO "ReipeIngredient" (recipeId, ingredientId) ('{recipeId}', '{ingredientId}') ('{recipeId}', '{ingredientId}')
     *      - INSERT INTO "Meal" (name, recipeId, cuisineId, createdBy) ('{name}', '{recipeId}', '{cuisineId}', '{createdBy}');
     */
    async create(createMealDto: CreateMealDto, userId: string, images: Express.Multer.File[]) {
        let recipe: Recipe
        const mealImageBuffer = images[0]
        const ingredientImagesBuffer = images.slice(1)
        const ingredientProcess = []

        await this.prismaService.$transaction(async (prisma) => {
            const [ingredientImages, mealImage] = await Promise.all([
                await prisma.image.createManyAndReturn({ data: ingredientImagesBuffer.map((ib) => ({ buffer: ib.buffer, mineType: ib.mimetype })) }),
                await prisma.image.create({ data: { buffer: mealImageBuffer.buffer, mineType: mealImageBuffer.mimetype } }),
            ])

            const [ingredientUuids, ingredientNames] = extractUuidAndNameArrays(createMealDto.ingredients, ingredientImages)

            if (ingredientUuids.length > 0) {
                ingredientProcess.push(prisma.ingredient.findMany({ where: { id: { in: ingredientUuids } } }))
            }

            if (ingredientNames.length > 0) {
                ingredientProcess.push(prisma.ingredient.createManyAndReturn({ data: ingredientNames }))
            }

            const ingredients: Ingredient[] = (await Promise.all(ingredientProcess)).flat()

            const { protein, fat, carbohydrates, totalMass } = caculateNutritionalValue(ingredients)
            const [proteinPercent, fatPercent, carbohydratesPercent] = calculateArrayOrNumberPercentage([protein, fat, carbohydrates], totalMass)
            const kcal = protein * 4 + fat * 9 + carbohydrates * 4

            const nutritionalValue = await prisma.nutritionalValue.create({
                data: { protein: proteinPercent, carbohydrates: carbohydratesPercent, fat: fatPercent, kcal: kcal },
            })

            if (!createMealDto.recipeId) {
                recipe = await prisma.recipe.create({
                    data: { description: createMealDto.recipeDescription, nutritionalValueId: nutritionalValue.id },
                })
            }

            const recipeId = createMealDto?.recipeId || recipe.id

            const recipeIngredients = ingredients.map((i) => ({ ingredientId: i.id, recipeId: recipeId }))

            await Promise.all([
                prisma.recipeIngredient.createMany({ data: recipeIngredients }),
                prisma.meal.create({
                    data: {
                        name: createMealDto.name,
                        cuisineId: createMealDto.cuisineId,
                        description: createMealDto.description,
                        imageId: mealImage.id,
                        recipeId: recipeId,
                        createdById: userId,
                    },
                }),
            ])
        })

        return 'Created meal successfully'
    }

    /**
     *
     * @returns - List of recipes.
     * @sql - SELECT * FROM "Meal";
     */
    async findAll(paginationDto: PaginationDto) {
        return await paginator(paginationDto)(this.prismaService.meal)
    }

    /**
     * @param {String} id - Id of the meal to get unique record.
     * @returns - List of recipes.
     * @sql
     *      SELECT
     *          m.id AS meal_id,
     *          m.name AS meal_name,
     *          r.id AS recipe_id,
     *          r.description AS recipe_description,
     *          r.ingredients AS recipe_ingredients,
     *          c.id AS cuisine_id,
     *          c.name AS cuisine_name,
     *          c.icon AS cuisine_icon,
     *          u.id AS user_id,
     *          u.avatar AS user_avatar,
     *          u.fullName AS user_full_name,
     *          u.username AS user_username,
     *          m.preferredBy AS meal_preferred_by,
     *          m.updatedAt AS meal_updated_at,
     *          m.createdAt AS meal_created_at
     *      FROM "Meal" m
     *      LEFT JOIN "Recipe" r ON m."recipeId" = r.id
     *      LEFT JOIN "Cuisine" c ON m."cuisineId" = c.id
     *      LEFT JOIN "User" u ON m."createdById" = u.id
     *      WHERE m.id = '{id}';
     */
    async findOne(id: string) {
        try {
            return await this.prismaService.meal.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    recipe: {
                        select: {
                            id: true,
                            description: true,
                            ingredients: {
                                select: {
                                    ingredient: {
                                        select: {
                                            id: true,
                                            name: true,
                                            image: true,
                                            carbohydrates: true,
                                            fat: true,
                                            protein: true,
                                        },
                                    },
                                },
                            },
                            nutritionalValue: true,
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
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException(`Recipe with id ${id} not found`)
            throw error
        }
    }

    /**
     *
     * @param id - Id of the meal to find record in "Meal"
     * @returns - Message Updated successfully
     * @sql - UPDATE SET FROM "Meal" (name, ...) VALUES ('{name}') WHERE id = '{id}' ;
     */
    async update(id: string, updateMealDto: UpdateMealDto) {
        // try {
        //     await this.prismaService.meal.update({
        //         where: { id },
        //         data: { ...updateMealDto, imageId: 'fadsf' },
        //     })
        //     return 'Updated successfully'
        // } catch (error) {
        //     if (error.code === 'P2025') throw new NotFoundException(`Recipe with id ${id} not found`)
        //     throw error
        // }
    }

    /**
     *
     * @param id - Id of the meal to find record in "Meal"
     * @returns - Message Deleted successfully
     * @sql - DELETE FROM "Meal" WHERE id = '{id}';
     */
    async remove(id: string) {
        try {
            await this.prismaService.meal.delete({ where: { id } })
            return 'Deleted successfully'
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException(`Recipe with id ${id} not found`)
            throw error
        }
    }

    /**
     *
     * @param mealId - Id of the meal to find record in "UserMeal"
     * @param userId - Id of the userId to find record in "UserMeal"
     * @returns - Message successfully updated favorite meal
     * @sql - SELECT * FROM "UserMeal" WHERE userId = '{userId}' AND mealId = '{mealId}'
     *      - DELETE FROM "UserMeal" WHERE userId = '{userId}' AND mealId = '{mealId}'
     *      - INSERT INTO "UserMeal" (mealId, userId) VALUES ('{mealId}', '{userId}');
     */
    async updateFavoriteMeal(mealId: string, userId: string) {
        const args = {
            where: {
                userId_mealId: { mealId, userId },
            },
        }

        const preferredByExists = await this.prismaService.userMeal.findUnique(args)

        if (preferredByExists) await this.prismaService.userMeal.delete(args)
        else await this.prismaService.userMeal.create({ data: { mealId, userId } })

        return 'Successfully updated favorite meal'
    }
}
