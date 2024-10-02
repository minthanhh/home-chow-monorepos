import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
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
