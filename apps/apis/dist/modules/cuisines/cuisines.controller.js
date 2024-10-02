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
exports.CuisinesController = void 0;
const common_1 = require("@nestjs/common");
const cuisines_service_1 = require("./cuisines.service");
const create_cuisine_dto_1 = require("./dtos/create-cuisine.dto");
const update_cuisine_dto_1 = require("./dtos/update-cuisine.dto");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const users_1 = require("../users");
let CuisinesController = class CuisinesController {
    constructor(cuisinesService) {
        this.cuisinesService = cuisinesService;
    }
    async create(createCuisineDto) {
        return await this.cuisinesService.create(createCuisineDto);
    }
    async findAll() {
        return await this.cuisinesService.findAll();
    }
    async findOne(id) {
        return await this.cuisinesService.findOneById(id);
    }
    async update(id, updateCuisineDto) {
        return await this.cuisinesService.update(id, updateCuisineDto);
    }
    async remove(id) {
        return await this.cuisinesService.remove(id);
    }
};
exports.CuisinesController = CuisinesController;
__decorate([
    (0, swagger_1.ApiBody)({ type: create_cuisine_dto_1.CreateCuisineDto, required: true }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cuisine_dto_1.CreateCuisineDto]),
    __metadata("design:returntype", Promise)
], CuisinesController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheTTL)(600),
    (0, cache_manager_1.CacheKey)('CACHE_CUISINES'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CuisinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CuisinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: String }),
    (0, swagger_1.ApiBody)({ type: update_cuisine_dto_1.UpdateCuisineDto, required: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cuisine_dto_1.UpdateCuisineDto]),
    __metadata("design:returntype", Promise)
], CuisinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CuisinesController.prototype, "remove", null);
exports.CuisinesController = CuisinesController = __decorate([
    (0, swagger_1.ApiTags)('cuisines'),
    (0, common_1.Controller)('cuisines'),
    (0, common_1.UseGuards)(users_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cuisines_service_1.CuisinesService])
], CuisinesController);
//# sourceMappingURL=cuisines.controller.js.map