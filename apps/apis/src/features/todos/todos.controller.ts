import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto, UpdateTodoDto } from './dtos'

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get('get-todos')
    async getTodos() {
        return await this.todosService.getTodos()
    }

    @Get('get-todo/:id')
    async getTodo(@Param('id') id: string) {
        return await this.todosService.deleteTodo(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create-todo')
    async createTodo(@Body() createTodoDto: CreateTodoDto) {
        return await this.todosService.createTodo(createTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Put('update-todo/:id')
    async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return await this.todosService.updateTodo(id, updateTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete-todo/:id')
    async deleteTodo(@Param('id') id: string) {
        return await this.todosService.deleteTodo(id)
    }
}
