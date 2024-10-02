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
exports.NutritionalValuesController = void 0;
const common_1 = require("@nestjs/common");
const nutritional_values_service_1 = require("./nutritional-values.service");
const create_nutritional_value_dto_1 = require("./dtos/create-nutritional-value.dto");
const update_nutritional_value_dto_1 = require("./dtos/update-nutritional-value.dto");
let NutritionalValuesController = class NutritionalValuesController {
    constructor(nutritionalValuesService) {
        this.nutritionalValuesService = nutritionalValuesService;
    }
    async create(createNutritionalValueDto) {
        return await this.nutritionalValuesService.create(createNutritionalValueDto);
    }
    async findAll() {
        return await this.nutritionalValuesService.findAll();
    }
    async findOne(id) {
        return await this.nutritionalValuesService.findOne(+id);
    }
    async update(id, updateNutritionalValueDto) {
        return await this.nutritionalValuesService.update(+id, updateNutritionalValueDto);
    }
    async remove(id) {
        return await this.nutritionalValuesService.remove(+id);
    }
};
exports.NutritionalValuesController = NutritionalValuesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nutritional_value_dto_1.CreateNutritionalValueDto]),
    __metadata("design:returntype", Promise)
], NutritionalValuesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NutritionalValuesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NutritionalValuesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nutritional_value_dto_1.UpdateNutritionalValueDto]),
    __metadata("design:returntype", Promise)
], NutritionalValuesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NutritionalValuesController.prototype, "remove", null);
exports.NutritionalValuesController = NutritionalValuesController = __decorate([
    (0, common_1.Controller)('nutritional-values'),
    __metadata("design:paramtypes", [nutritional_values_service_1.NutritionalValuesService])
], NutritionalValuesController);
//# sourceMappingURL=nutritional-values.controller.js.map