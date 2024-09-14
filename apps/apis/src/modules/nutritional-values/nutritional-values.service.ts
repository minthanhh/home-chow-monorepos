import { Injectable } from '@nestjs/common'
import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto'
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto'

@Injectable()
export class NutritionalValuesService {
    create(createNutritionalValueDto: CreateNutritionalValueDto) {
        return 'This action adds a new nutritionalValue'
    }

    findAll() {
        return `This action returns all nutritionalValues`
    }

    findOne(id: number) {
        return `This action returns a #${id} nutritionalValue`
    }

    update(id: number, updateNutritionalValueDto: UpdateNutritionalValueDto) {
        return `This action updates a #${id} nutritionalValue`
    }

    remove(id: number) {
        return `This action removes a #${id} nutritionalValue`
    }
}
