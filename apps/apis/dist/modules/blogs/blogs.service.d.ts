import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { PrismaService } from 'src/shareds';
export declare class BlogsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createBlogDto: CreateBlogDto): Promise<{
        id: string;
        title: string;
        description: string;
        content: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        description: string;
        content: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<void>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<void>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        content: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
