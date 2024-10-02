"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCuisineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cuisine_dto_1 = require("./create-cuisine.dto");
class UpdateCuisineDto extends (0, swagger_1.PartialType)(create_cuisine_dto_1.CreateCuisineDto) {
}
exports.UpdateCuisineDto = UpdateCuisineDto;
//# sourceMappingURL=update-cuisine.dto.js.map