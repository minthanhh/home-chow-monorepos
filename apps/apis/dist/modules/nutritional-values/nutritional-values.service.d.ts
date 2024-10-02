import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto';
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto';
export declare class NutritionalValuesService {
    create(createNutritionalValueDto: CreateNutritionalValueDto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    update(id: number, updateNutritionalValueDto: UpdateNutritionalValueDto): Promise<string>;
    remove(id: number): Promise<string>;
}
