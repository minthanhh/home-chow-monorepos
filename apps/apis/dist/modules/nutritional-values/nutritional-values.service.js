"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionalValuesService = void 0;
const common_1 = require("@nestjs/common");
let NutritionalValuesService = class NutritionalValuesService {
    async create(createNutritionalValueDto) {
        return 'This action adds a new nutritionalValue';
    }
    async findAll() {
        return `This action returns all nutritionalValues`;
    }
    async findOne(id) {
        return `This action returns a #${id} nutritionalValue`;
    }
    async update(id, updateNutritionalValueDto) {
        return `This action updates a #${id} nutritionalValue`;
    }
    async remove(id) {
        return `This action removes a #${id} nutritionalValue`;
    }
};
exports.NutritionalValuesService = NutritionalValuesService;
exports.NutritionalValuesService = NutritionalValuesService = __decorate([
    (0, common_1.Injectable)()
], NutritionalValuesService);
//# sourceMappingURL=nutritional-values.service.js.map