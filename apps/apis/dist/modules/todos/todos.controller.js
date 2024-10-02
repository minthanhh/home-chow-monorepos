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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const dtos_1 = require("./dtos");
const shareds_1 = require("../../shareds");
let TodosController = class TodosController {
    constructor(todosService, prismaService) {
        this.todosService = todosService;
        this.prismaService = prismaService;
    }
    async getTodos() {
        console.log('getTodos');
        return await this.todosService.getTodos();
    }
    async getTodo(id) {
        console.log('getTodo');
        return await this.todosService.getTodo(id);
    }
    async createTodo(createTodoDto) {
        console.log('createTodo');
        return await this.todosService.createTodo(createTodoDto);
    }
    async updateTodo(id, updateTodoDto) {
        console.log('updateTodo');
        return await this.todosService.updateTodo(id, updateTodoDto);
    }
    async deleteTodo(id) {
        console.log('deleteTodo');
        return await this.todosService.deleteTodo(id);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Get)('get-todos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodos", null);
__decorate([
    (0, common_1.Get)('get-todo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodo", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('create-todo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "createTodo", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('update-todo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)('delete-todo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "deleteTodo", null);
exports.TodosController = TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService,
        shareds_1.PrismaService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map