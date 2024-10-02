import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { PrismaService } from 'src/shareds';
export declare class TodosController {
    private readonly todosService;
    private readonly prismaService;
    constructor(todosService: TodosService, prismaService: PrismaService);
    getTodos(): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTodo(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createTodo(createTodoDto: CreateTodoDto): Promise<{
        message: string;
        todoId: string;
    }>;
    updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<{
        message: string;
    }>;
    deleteTodo(id: string): Promise<{
        message: string;
    }>;
}
