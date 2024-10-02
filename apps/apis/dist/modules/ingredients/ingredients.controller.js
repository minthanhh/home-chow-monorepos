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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsController = void 0;
const common_1 = require("@nestjs/common");
const ingredients_service_1 = require("./ingredients.service");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../core/dtos");
const dtos_2 = require("./dtos");
const users_1 = require("../users");
let IngredientsController = class IngredientsController {
    constructor(ingredientsService) {
        this.ingredientsService = ingredientsService;
    }
    async create(createIngredientDto) {
        return await this.ingredientsService.create(createIngredientDto);
    }
    async findAll(paginationDto) {
        return await this.ingredientsService.findAll([], paginationDto);
    }
    async findAllByRecipeId(recipeId, paginationDto) {
        return await this.ingredientsService.findAllByRecipeId(recipeId, paginationDto);
    }
    async findOne(id) {
        return await this.ingredientsService.findOne(id);
    }
    async update(id, updateIngredientDto) {
        return await this.ingredientsService.update(id, updateIngredientDto);
    }
    async delete(id) {
        return await this.ingredientsService.delete(id);
    }
    async deleteIngredients(removeIngredientsDto) {
        return await this.ingredientsService.deleteMany(removeIngredientsDto.ingredientIds);
    }
    async deleteIngredientsByRecipe(recipeId, removeIngredientsByRecipeDto) {
        return await this.ingredientsService.deleteManyByRecipeId(recipeId, removeIngredientsByRecipeDto.ingredientIds);
    }
};
exports.IngredientsController = IngredientsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: dtos_2.CreateIngredientDto, required: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_2.CreateIngredientDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: (dtos_1.PaginatedResult),
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('recipe/:recipeId'),
    (0, swagger_1.ApiParam)({ name: 'recipeId', type: String, required: true }),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findAllByRecipeId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true }),
    (0, swagger_1.ApiBody)({ type: dtos_2.UpdateIngredientDto, required: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_2.UpdateIngredientDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBody)({ type: dtos_2.RemoveIngredientsDto, required: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_2.RemoveIngredientsDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "deleteIngredients", null);
__decorate([
    (0, common_1.Delete)('recipe/:recipeId'),
    (0, swagger_1.ApiParam)({ name: 'recipeId', type: String, required: true }),
    (0, swagger_1.ApiBody)({ type: dtos_2.RemoveIngredientsByRecipeDto, required: true }),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_2.RemoveIngredientsByRecipeDto]),
    __metadata("design:returntype", Promise)
], IngredientsController.prototype, "deleteIngredientsByRecipe", null);
exports.IngredientsController = IngredientsController = __decorate([
    (0, swagger_1.ApiTags)('ingredients'),
    (0, common_1.Controller)('ingredients'),
    (0, common_1.UseGuards)(users_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ingredients_service_1.IngredientsService])
], IngredientsController);
//# sourceMappingURL=ingredients.controller.js.map