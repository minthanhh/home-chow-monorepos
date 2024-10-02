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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const shareds_1 = require("../../shareds");
let TodosService = class TodosService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getTodos() {
        return this.prismaService.todo.findMany();
    }
    async createTodo(createTodo) {
        const todo = await this.prismaService.todo.create({
            data: {
                title: createTodo.title,
            },
        });
        return { message: 'Todo created successfully', todoId: todo.id };
    }
    async updateTodo(todoId, updateTodo) {
        const todo = await this.getTodo(todoId);
        if (!todo)
            throw new common_1.NotFoundException('Todo not found');
        await this.prismaService.todo.update({
            where: { id: todo.id },
            data: { title: updateTodo.title },
        });
        return { message: 'Todo updated successfully' };
    }
    async deleteTodo(todoId) {
        const todo = await this.getTodo(todoId);
        if (!todo)
            throw new common_1.NotFoundException('Todo not found');
        await this.prismaService.todo.delete({ where: { id: todo.id } });
        return { message: 'Todo deleted successfully' };
    }
    async getTodo(todoId) {
        return await this.prismaService.todo.findUnique({ where: { id: todoId } });
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shareds_1.PrismaService])
], TodosService);
//# sourceMappingURL=todos.service.js.map