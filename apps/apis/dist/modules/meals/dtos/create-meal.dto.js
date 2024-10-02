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
exports.CreateMealDto = void 0;
const class_validator_1 = require("class-validator");
const ingredients_1 = require("../../ingredients");
const class_transformer_1 = require("class-transformer");
const shareds_1 = require("../../../shareds");
class CreateMealDto {
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, shareds_1.Exists)(['cuisine', (_, id) => ({ id })]),
    __metadata("design:type", String)
], CreateMealDto.prototype, "cuisineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "recipeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "recipeDescription", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.ingredients.length > 0),
    (0, class_transformer_1.Type)(() => ingredients_1.CreateIngredientDto),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "ingredients", void 0);
//# sourceMappingURL=create-meal.dto.js.map