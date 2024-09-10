import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MealsService } from './meals.service'
import { CreateMealDto } from './dto/create-meal.dto'
import { UpdateMealDto } from './dto/update-meal.dto'
import { CurrentUser } from 'src/shareds'
import { User } from '@prisma/client'

@Controller('meals')
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Post()
    async create(@Body() createMealDto: CreateMealDto, @CurrentUser() user: User) {
        return await this.mealsService.create(createMealDto, user)
    }

    @Get()
    findAll() {
        return this.mealsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.mealsService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
        return this.mealsService.update(id, updateMealDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mealsService.remove(id)
    }

    @Patch(':id')
    updateFavoriteMeal() {}
}
