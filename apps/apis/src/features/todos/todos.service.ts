import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shareds'
import { CreateTodoDto, UpdateTodoDto } from './dtos'

@Injectable()
export class TodosService {
    constructor(private readonly prismaService: PrismaService) {}

    async getTodos() {
        return this.prismaService.todo.findMany()
    }

    async createTodo(createTodo: CreateTodoDto) {
        const todo = await this.prismaService.todo.create({
            data: {
                title: createTodo.title,
            },
        })
        return { message: 'Todo created successfully', todoId: todo.id }
    }

    async updateTodo(todoId: string, updateTodo: UpdateTodoDto) {
        const todo = await this.getTodo(todoId)
        if (!todo) throw new NotFoundException('Todo not found')

        await this.prismaService.todo.update({
            where: { id: todo.id },
            data: { title: updateTodo.title },
        })
        return { message: 'Todo updated successfully' }
    }

    async deleteTodo(todoId: string) {
        const todo = await this.getTodo(todoId)
        if (!todo) throw new NotFoundException('Todo not found')

        await this.prismaService.todo.delete({ where: { id: todo.id } })
        return { message: 'Todo deleted successfully' }
    }

    async getTodo(todoId: string) {
        return await this.prismaService.todo.findUnique({ where: { id: todoId } })
    }
}
