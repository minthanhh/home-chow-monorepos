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
exports.PaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationDto {
    constructor(currentPage, pageSize, totalPage, totalRecord) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalPage = totalPage;
        this.totalRecord = totalRecord;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Trang hiện tại' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Kích thước trang (số lượng bản ghi trên một trang)' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Tổng số trang (không bắt buộc, thường được tính toán tự động)' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "totalPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Tổng số bản ghi (không bắt buộc, thường được tính toán tự động)' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "totalRecord", void 0);
//# sourceMappingURL=pagination.dto.js.map