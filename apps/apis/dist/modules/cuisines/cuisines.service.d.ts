import { PrismaService } from 'src/shareds';
import { CreateCuisineDto, UpdateCuisineDto } from './dtos';
export declare class CuisinesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCuisineDto: CreateCuisineDto): Promise<{
        id: string;
        name: string;
        icon: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        icon: string;
    }[]>;
    findOneById(id: string): Promise<{
        id: string;
        name: string;
        icon: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByName(name: string): Promise<{
        id: string;
        name: string;
        icon: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateCuisineDto: UpdateCuisineDto): Promise<{
        id: string;
        name: string;
        icon: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        icon: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
