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
exports.PaginatedMetaResult = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginatedMetaResult {
    constructor(meta) {
        this.total = meta.total;
        this.lastPage = meta.lastPage;
        this.currentPage = meta.currentPage;
        this.pageSize = meta.pageSize;
        this.prevPage = meta.prevPage;
        this.nextPage = meta.nextPage;
    }
}
exports.PaginatedMetaResult = PaginatedMetaResult;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of items' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last page number' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "lastPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Previous page number or null' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "prevPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Next page number or null' }),
    __metadata("design:type", Number)
], PaginatedMetaResult.prototype, "nextPage", void 0);
//# sourceMappingURL=paginated-meta-result.dto.js.map