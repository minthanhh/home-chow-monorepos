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
exports.CuisinesService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
const utilities_1 = require("../../core/utilities");
let CuisinesService = class CuisinesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createCuisineDto) {
        try {
            return await this.prismaService.cuisine.create({ data: createCuisineDto });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An unexpected error occurred while processing the request.');
        }
    }
    async findAll() {
        return await (0, utilities_1.prismator)(this.prismaService).cuisine.findMany({
            cacheStrategy: { swr: 60, ttl: 120 },
        });
    }
    async findOneById(id) {
        const existing = await this.prismaService.cuisine.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Cuisine with id ${id} not found`);
        return existing;
    }
    async findOneByName(name) {
        const existing = await this.prismaService.cuisine.findUnique({ where: { name } });
        if (!existing)
            throw new common_1.NotFoundException(`Cuisine with name ${name} not found`);
        return existing;
    }
    async update(id, updateCuisineDto) {
        await this.findOneById(id);
        return await this.prismaService.cuisine.update({ where: { id }, data: updateCuisineDto });
    }
    async remove(id) {
        await this.findOneById(id);
        return await this.prismaService.cuisine.delete({ where: { id } });
    }
};
exports.CuisinesService = CuisinesService;
exports.CuisinesService = CuisinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], CuisinesService);
//# sourceMappingURL=cuisines.service.js.map