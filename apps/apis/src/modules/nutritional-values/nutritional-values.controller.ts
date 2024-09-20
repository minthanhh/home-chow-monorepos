import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { NutritionalValuesService } from './nutritional-values.service'
import { CreateNutritionalValueDto } from './dtos/create-nutritional-value.dto'
import { UpdateNutritionalValueDto } from './dtos/update-nutritional-value.dto'

@Controller('nutritional-values')
export class NutritionalValuesController {
    constructor(private readonly nutritionalValuesService: NutritionalValuesService) {}

    @Post()
    async create(@Body() createNutritionalValueDto: CreateNutritionalValueDto) {
        return await this.nutritionalValuesService.create(createNutritionalValueDto)
    }

    @Get()
    async findAll() {
        return await this.nutritionalValuesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.nutritionalValuesService.findOne(+id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateNutritionalValueDto: UpdateNutritionalValueDto) {
        return await this.nutritionalValuesService.update(+id, updateNutritionalValueDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.nutritionalValuesService.remove(+id)
    }
}
