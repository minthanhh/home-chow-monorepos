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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
let BlogsService = class BlogsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createBlogDto) {
        return await this.prismaService.blog.create({ data: createBlogDto });
    }
    async findAll() {
        return await this.prismaService.blog.findMany();
    }
    async findOne(id) {
        const existing = await this.prismaService.blog.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Cuisine with id ${id} not found`);
        return;
    }
    async update(id, updateBlogDto) {
        await this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prismaService.blog.delete({ where: { id } });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map