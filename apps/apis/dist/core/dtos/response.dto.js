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
exports.ResponseDto = exports.MetaResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("./pagination.dto");
class MetaResponseDto {
    constructor(statusCode, message, error, pagination) {
        this.statusCode = statusCode;
        this.message = message ?? '';
        this.error = error ?? '';
        if (pagination) {
            this.pagination = new pagination_dto_1.PaginationDto(pagination.currentPage, pagination.pageSize, pagination.totalPage, pagination.totalRecord);
        }
    }
}
exports.MetaResponseDto = MetaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MetaResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MetaResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MetaResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", pagination_dto_1.PaginationDto)
], MetaResponseDto.prototype, "pagination", void 0);
class ResponseDto {
    constructor(data, meta) {
        this.meta = meta;
        if (!data) {
            data = null;
        }
        this.result = {
            data,
        };
    }
}
exports.ResponseDto = ResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ResponseDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: MetaResponseDto,
    }),
    __metadata("design:type", MetaResponseDto)
], ResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=response.dto.js.map