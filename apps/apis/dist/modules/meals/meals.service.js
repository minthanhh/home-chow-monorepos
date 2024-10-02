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
exports.MealsService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
const utilities_1 = require("../../core/utilities");
const nutritional_values_1 = require("../nutritional-values");
const utilities_2 = require("../ingredients/utilities");
let MealsService = class MealsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createMealDto, userId) {
        let recipe;
        await this.prismaService.$transaction(async (prisma) => {
            const ingredients = await (0, utilities_2.returnIngredients)(prisma, createMealDto.ingredients);
            const nutritionalValueId = await (0, nutritional_values_1.returnNutritionalValueId)(prisma, ingredients);
            if (!createMealDto.recipeId) {
                recipe = await prisma.recipe.create({
                    data: { description: createMealDto.recipeDescription, nutritionalValueId },
                });
            }
            const recipeId = createMealDto?.recipeId || recipe.id;
            const recipeIngredients = ingredients.map((i) => ({ ingredientId: i.id, recipeId: recipeId }));
            await Promise.all([
                prisma.recipeIngredient.createMany({ data: recipeIngredients }),
                prisma.meal.create({
                    data: {
                        name: createMealDto.name,
                        cuisineId: createMealDto.cuisineId,
                        description: createMealDto.description,
                        image: createMealDto.image,
                        recipeId: recipeId,
                        createdById: userId,
                    },
                }),
            ]);
        });
        return 'Created meal successfully';
    }
    async findAll(paginationDto) {
        return await (0, utilities_1.paginator)(paginationDto)(this.prismaService.meal);
    }
    async findOne(id) {
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
            });
        }
        catch (error) {
            if (error.code === 'P2025')
                throw new common_1.NotFoundException(`Recipe with id ${id} not found`);
            throw error;
        }
    }
    async update(id, updateMealDto) {
    }
    async remove(id) {
        try {
            await this.prismaService.meal.delete({ where: { id } });
            return 'Deleted successfully';
        }
        catch (error) {
            if (error.code === 'P2025')
                throw new common_1.NotFoundException(`Recipe with id ${id} not found`);
            throw error;
        }
    }
    async updateFavoriteMeal(mealId, userId) {
        const args = {
            where: {
                userId_mealId: { mealId, userId },
            },
        };
        const preferredByExists = await this.prismaService.userMeal.findUnique(args);
        if (preferredByExists)
            await this.prismaService.userMeal.delete(args);
        else
            await this.prismaService.userMeal.create({ data: { mealId, userId } });
        return 'Successfully updated favorite meal';
    }
};
exports.MealsService = MealsService;
exports.MealsService = MealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], MealsService);
//# sourceMappingURL=meals.service.js.map