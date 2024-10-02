import { NutritionalValuesService } from './nutritional-values.service';
import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto';
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto';
export declare class NutritionalValuesController {
    private readonly nutritionalValuesService;
    constructor(nutritionalValuesService: NutritionalValuesService);
    create(createNutritionalValueDto: CreateNutritionalValueDto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateNutritionalValueDto: UpdateNutritionalValueDto): Promise<string>;
    remove(id: string): Promise<string>;
}
