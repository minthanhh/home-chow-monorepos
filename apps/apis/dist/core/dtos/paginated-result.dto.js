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
exports.PaginatedResult = void 0;
const swagger_1 = require("@nestjs/swagger");
const paginated_meta_result_dto_1 = require("./paginated-meta-result.dto");
class PaginatedResult {
    constructor(paginatedResult) {
        this.data = paginatedResult.data;
        this.meta = paginatedResult.meta;
    }
}
exports.PaginatedResult = PaginatedResult;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], description: 'The data array' }),
    __metadata("design:type", Array)
], PaginatedResult.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pagination metadata',
        type: () => paginated_meta_result_dto_1.PaginatedMetaResult,
    }),
    __metadata("design:type", Object)
], PaginatedResult.prototype, "meta", void 0);
//# sourceMappingURL=paginated-result.dto.js.map