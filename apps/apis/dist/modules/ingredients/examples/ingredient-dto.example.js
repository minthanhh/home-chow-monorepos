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
exports.IngredientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class IngredientDto {
}
exports.IngredientDto = IngredientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'The ID of the ingredient' }),
    __metadata("design:type", String)
], IngredientDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tomato', description: 'The name of the ingredient' }),
    __metadata("design:type", String)
], IngredientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/tomato.jpg', description: 'The image URL of the ingredient' }),
    __metadata("design:type", String)
], IngredientDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date(), description: 'When the ingredient was created' }),
    __metadata("design:type", Date)
], IngredientDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date(), description: 'When the ingredient was last updated' }),
    __metadata("design:type", Date)
], IngredientDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=ingredient-dto.example.js.map