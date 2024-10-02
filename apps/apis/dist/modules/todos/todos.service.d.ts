import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { PrismaService } from 'src/shareds';
export declare class TodosService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getTodos(): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createTodo(createTodo: CreateTodoDto): Promise<{
        message: string;
        todoId: string;
    }>;
    updateTodo(todoId: string, updateTodo: UpdateTodoDto): Promise<{
        message: string;
    }>;
    deleteTodo(todoId: string): Promise<{
        message: string;
    }>;
    getTodo(todoId: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
