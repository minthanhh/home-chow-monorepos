import { CuisinesService } from './cuisines.service';
import { CreateCuisineDto } from './dtos/create-cuisine.dto';
import { UpdateCuisineDto } from './dtos/update-cuisine.dto';
export declare class CuisinesController {
    private readonly cuisinesService;
    constructor(cuisinesService: CuisinesService);
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
    findOne(id: string): Promise<{
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
