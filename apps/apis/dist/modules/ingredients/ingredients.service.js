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
exports.IngredientsService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
const utilities_1 = require("../../core/utilities");
let IngredientsService = class IngredientsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createIngredientDto) {
        console.log('createIngredientDto', createIngredientDto);
        const newIngredient = await this.prismaService.ingredient.create({
            data: {
                name: createIngredientDto.name,
                carbohydrates: parseInt(createIngredientDto.carbohydrates),
                quantity: parseInt(createIngredientDto.quantity),
                fat: parseInt(createIngredientDto.fat),
                protein: parseInt(createIngredientDto.protein),
                image: createIngredientDto.image,
            },
        });
        return { id: newIngredient.id };
    }
    async createManyAndReturn(createIngredientDtos) {
        return await this.prismaService.ingredient.createManyAndReturn({
            data: createIngredientDtos.map((ci) => ({
                ...ci,
                carbohydrates: parseInt(ci.carbohydrates),
                quantity: parseInt(ci.quantity),
                fat: parseInt(ci.fat),
                protein: parseInt(ci.protein),
            })),
        });
    }
    async createMany(createIngredientDtos) {
        return await this.prismaService.ingredient.createMany({
            data: createIngredientDtos.map((ci) => ({
                ...ci,
                carbohydrates: parseInt(ci.carbohydrates),
                quantity: parseInt(ci.quantity),
                fat: parseInt(ci.fat),
                protein: parseInt(ci.protein),
            })),
        });
    }
    async findAllByRecipeId(recipeId, paginationDto) {
        const ingredients = await (0, utilities_1.paginator)(paginationDto)(this.prismaService.recipeIngredient, {
            where: {
                recipeId: recipeId,
            },
            select: {
                ingredient: {
                    select: {
                        id: true,
                        image: true,
                        name: true,
                        carbohydrates: true,
                        fat: true,
                        protein: true,
                        quantity: true,
                        createdAt: true,
                    },
                },
            },
        });
        return { ...ingredients, data: ingredients.data.map((i) => i.ingredient) };
    }
    async findAll(ingredientIds, paginationDto) {
        let where;
        if (ingredientIds.length > 0)
            where = { id: { in: ingredientIds } };
        return (0, utilities_1.paginator)(paginationDto)(this.prismaService.ingredient, { where });
    }
    async findOne(id) {
        const exists = await this.prismaService.ingredient.findUnique({ where: { id: id } });
        if (!exists)
            throw new common_1.NotFoundException(`Ingredient  with id ${id} not found`);
        return exists;
    }
    async update(id, updateIngredientDto) {
        await this.findOne(id);
        return await this.prismaService.ingredient.update({
            where: { id: id },
            data: {
                name: updateIngredientDto.name,
                carbohydrates: parseInt(updateIngredientDto.carbohydrates),
                quantity: parseInt(updateIngredientDto.quantity),
                fat: parseInt(updateIngredientDto.fat),
                protein: parseInt(updateIngredientDto.protein),
                image: updateIngredientDto.image,
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return await this.prismaService.ingredient.delete({ where: { id } });
    }
    async deleteMany(ingredientIds) {
        return await this.prismaService.ingredient.deleteMany({
            where: {
                id: {
                    in: ingredientIds,
                },
            },
        });
    }
    async deleteManyByRecipeId(recipeId, ingredientIds) {
        return await this.prismaService.recipeIngredient.deleteMany({
            where: {
                recipeId: recipeId,
                ingredientId: {
                    in: ingredientIds,
                },
            },
        });
    }
};
exports.IngredientsService = IngredientsService;
exports.IngredientsService = IngredientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], IngredientsService);
//# sourceMappingURL=ingredients.service.js.map