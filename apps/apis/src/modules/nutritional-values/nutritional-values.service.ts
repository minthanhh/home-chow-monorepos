import { Injectable } from '@nestjs/common'
import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto'
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto'

@Injectable()
export class NutritionalValuesService {
    async create(createNutritionalValueDto: CreateNutritionalValueDto) {
        return 'This action adds a new nutritionalValue'
    }

    async findAll() {
        return `This action returns all nutritionalValues`
    }

    async findOne(id: number) {
        return `This action returns a #${id} nutritionalValue`
    }

    async update(id: number, updateNutritionalValueDto: UpdateNutritionalValueDto) {
        return `This action updates a #${id} nutritionalValue`
    }

    async remove(id: number) {
        return `This action removes a #${id} nutritionalValue`
    }
}
