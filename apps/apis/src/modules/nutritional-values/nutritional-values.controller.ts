import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { NutritionalValuesService } from './nutritional-values.service'
import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto'
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto'

@Controller('nutritional-values')
export class NutritionalValuesController {
    constructor(private readonly nutritionalValuesService: NutritionalValuesService) {}

    @Post()
    create(@Body() createNutritionalValueDto: CreateNutritionalValueDto) {
        return this.nutritionalValuesService.create(createNutritionalValueDto)
    }

    @Get()
    findAll() {
        return this.nutritionalValuesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.nutritionalValuesService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNutritionalValueDto: UpdateNutritionalValueDto) {
        return this.nutritionalValuesService.update(+id, updateNutritionalValueDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.nutritionalValuesService.remove(+id)
    }
}
