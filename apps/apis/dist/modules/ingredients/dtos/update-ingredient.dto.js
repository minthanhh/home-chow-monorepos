"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIngredientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_ingredient_dto_1 = require("./create-ingredient.dto");
class UpdateIngredientDto extends (0, swagger_1.PartialType)(create_ingredient_dto_1.CreateIngredientDto) {
}
exports.UpdateIngredientDto = UpdateIngredientDto;
//# sourceMappingURL=update-ingredient.dto.js.map