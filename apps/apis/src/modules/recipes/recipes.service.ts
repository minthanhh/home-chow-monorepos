import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRecipeDto } from './dtos/create-recipe.dto'
import { UpdateRecipeDto } from './dtos/update-recipe.dto'
import { PrismaService } from 'src/shareds'
import { PaginationDto } from 'src/core/dtos'
import { paginator } from 'src/core/utilities'
import { returnNutritionalValueId } from '../nutritional-values'
import { returnIngredients } from '../ingredients/utilities'
import { IPrismaTransaction } from 'src/core/interfaces'

@Injectable()
export class RecipesService {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     *  @param createRecipeDto
     *  @returns - Trả về bản ghi đã tạo hoặc message thành công.
     *  @sql - INSERT INTO "Recipe" (description) VALUES ('Description example');
     */
    async create(createRecipeDto: CreateRecipeDto) {
        const result = await this.prismaService.$transaction(async (prisma) => {
            const ingredients = await returnIngredients(prisma, createRecipeDto.ingredients)
            const nutritionalValueId = await returnNutritionalValueId(prisma, ingredients)

            const recipe = await prisma.recipe.create({
                data: { description: createRecipeDto.description, nutritionalValueId },
            })

            const recipeIngredients = ingredients.map((i) => ({ ingredientId: i.id, recipeId: recipe.id }))

            await prisma.recipeIngredient.createMany({ data: recipeIngredients })

            return recipe
        })
        return result
    }

    /**
     *  @param paginationDto
     *  @returns - Trả về danh sách Recipes
     *  @sql - SELECT * FROM "Recipe" OFFSET '{paginationDto.currentPage}' LIMIT '{paginationDto.pageSize}';
     */
    async findAll(paginationDto: PaginationDto) {
        return await paginator(paginationDto)(this.prismaService.recipe)
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Returns the recipe record
     *  @sql - SELECT * FROM "Recipe" WHERE id = '{id}';
     */
    async findOne(id: string, transaction?: IPrismaTransaction, relation?: 'relation') {
        const prisma = transaction ? transaction : this.prismaService
        const exists = await prisma.recipe.findUnique({
            where: { id },
            ...(relation && {
                select: {
                    id: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                    nutritionalValue: {
                        select: {
                            id: true,
                            carbohydrates: true,
                            fat: true,
                            kcal: true,
                            protein: true,
                        },
                    },
                    ingredients: {
                        select: {
                            ingredient: true,
                        },
                    },
                },
            }),
        })
        if (!exists) throw new NotFoundException(`Recipe with id ${id} not found`)
        return { ...exists, ...(relation && { ingredients: exists.ingredients.map((i) => i.ingredient) }) }
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Returns the recipe record
     *  @sql - UPDATE SET "Recipe" (description) VALUES ('Example set descripition') WHERE id = '{id}';
     */
    async update(recipeId: string, updateRecipeDto: UpdateRecipeDto) {
        const result = await this.prismaService.$transaction(async (prisma) => {
            const existingRecipe = await this.findOne(recipeId, prisma)
            const ingredients = await returnIngredients(prisma, updateRecipeDto.ingredients)

            const [recipe] = await Promise.all([
                prisma.recipe.update({
                    where: { id: recipeId },
                    data: {
                        description: updateRecipeDto.description,
                        ingredients: {
                            // Xóa nguyên liệu không có trong danh sách mới
                            deleteMany: {
                                ingredientId: { notIn: ingredients.map((i) => i.id) },
                            },
                            // Thêm nguyên liệu mới
                            createMany: {
                                data: ingredients
                                    .filter((ingredient) => !existingRecipe.ingredients.some((ri) => ri.id === ingredient.id))
                                    .map((ingredient) => ({ ingredientId: ingredient.id })),
                            },
                        },
                    },
                }),
                returnNutritionalValueId(prisma, ingredients, updateRecipeDto.nutritionalValueId),
            ])
            return recipe
        })

        return result
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Message delete successfully or record deleted.
     *  @sql - DELETE FROM "Recipe" WHERE id = '{id}';
     */
    async delete(id: string) {
        await this.findOne(id)
        return await this.prismaService.recipe.delete({ where: { id } })
    }
}
