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
exports.RecipesController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const create_recipe_dto_1 = require("./dtos/create-recipe.dto");
const update_recipe_dto_1 = require("./dtos/update-recipe.dto");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../core/dtos");
const users_1 = require("../users");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async create(createRecipeDto) {
        return await this.recipesService.create(createRecipeDto);
    }
    async findAll(paginationDto) {
        return await this.recipesService.findAll(paginationDto);
    }
    async findOne(id) {
        return await this.recipesService.findOne(id, null, 'relation');
    }
    async update(id, updateRecipeDto) {
        return await this.recipesService.update(id, updateRecipeDto);
    }
    async delete(id) {
        return await this.recipesService.delete(id);
    }
};
exports.RecipesController = RecipesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_recipe_dto_1.CreateRecipeDto, required: true, description: 'Data of recipe to create new record' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_dto_1.CreateRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true, description: 'Id of the recipe to find record' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true, description: 'Id of the recipe to delete' }),
    (0, swagger_1.ApiBody)({ type: update_recipe_dto_1.UpdateRecipeDto, required: true, description: 'Data of recipe data to update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recipe_dto_1.UpdateRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, required: true, description: 'Id of the recipe to delete' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipesController.prototype, "delete", null);
exports.RecipesController = RecipesController = __decorate([
    (0, swagger_1.ApiTags)('recipes'),
    (0, common_1.Controller)('recipes'),
    (0, common_1.UseGuards)(users_1.JwtAuthGuard),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
//# sourceMappingURL=recipes.controller.js.map