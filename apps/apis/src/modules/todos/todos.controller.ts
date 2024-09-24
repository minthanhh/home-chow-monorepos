import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto, UpdateTodoDto } from './dtos'
import { PrismaService } from 'src/shareds'

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosService: TodosService,
        private readonly prismaService: PrismaService,
    ) {}

    @Get('get-todos')
    async getTodos() {
        console.log('getTodos')
        return await this.todosService.getTodos()
    }

    @Get('get-todo/:id')
    async getTodo(@Param('id') id: string) {
        console.log('getTodo')
        return await this.todosService.getTodo(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create-todo')
    async createTodo(@Body() createTodoDto: CreateTodoDto) {
        console.log('createTodo')
        return await this.todosService.createTodo(createTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Put('update-todo/:id')
    async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        console.log('updateTodo')
        return await this.todosService.updateTodo(id, updateTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete-todo/:id')
    async deleteTodo(@Param('id') id: string) {
        console.log('deleteTodo')
        return await this.todosService.deleteTodo(id)
    }
}
