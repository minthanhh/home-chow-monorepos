"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
const utilities_1 = require("../../core/utilities");
const nutritional_values_1 = require("../nutritional-values");
const utilities_2 = require("../ingredients/utilities");
let RecipesService = class RecipesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createRecipeDto) {
        const result = await this.prismaService.$transaction(async (prisma) => {
            const ingredients = await (0, utilities_2.returnIngredients)(prisma, createRecipeDto.ingredients);
            const nutritionalValueId = await (0, nutritional_values_1.returnNutritionalValueId)(prisma, ingredients);
            const recipe = await prisma.recipe.create({
                data: { description: createRecipeDto.description, nutritionalValueId },
            });
            const recipeIngredients = ingredients.map((i) => ({ ingredientId: i.id, recipeId: recipe.id }));
            await prisma.recipeIngredient.createMany({ data: recipeIngredients });
            return recipe;
        });
        return result;
    }
    async findAll(paginationDto) {
        return await (0, utilities_1.paginator)(paginationDto)(this.prismaService.recipe);
    }
    async findOne(id, transaction, relation) {
        const prisma = transaction ? transaction : this.prismaService;
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
        });
        if (!exists)
            throw new common_1.NotFoundException(`Recipe with id ${id} not found`);
        return { ...exists, ...(relation && { ingredients: exists.ingredients.map((i) => i.ingredient) }) };
    }
    async update(recipeId, updateRecipeDto) {
        const result = await this.prismaService.$transaction(async (prisma) => {
            const existingRecipe = await this.findOne(recipeId, prisma);
            const ingredients = await (0, utilities_2.returnIngredients)(prisma, updateRecipeDto.ingredients);
            const [recipe] = await Promise.all([
                prisma.recipe.update({
                    where: { id: recipeId },
                    data: {
                        description: updateRecipeDto.description,
                        ingredients: {
                            deleteMany: {
                                ingredientId: { notIn: ingredients.map((i) => i.id) },
                            },
                            createMany: {
                                data: ingredients
                                    .filter((ingredient) => !existingRecipe.ingredients.some((ri) => ri.id === ingredient.id))
                                    .map((ingredient) => ({ ingredientId: ingredient.id })),
                            },
                        },
                    },
                }),
                (0, nutritional_values_1.returnNutritionalValueId)(prisma, ingredients, updateRecipeDto.nutritionalValueId),
            ]);
            return recipe;
        });
        return result;
    }
    async delete(id) {
        await this.findOne(id);
        return await this.prismaService.recipe.delete({ where: { id } });
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map