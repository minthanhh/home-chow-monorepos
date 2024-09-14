import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { CurrentUser } from 'src/shareds'
import { MealsService } from './meals.service'
import { PaginationDto } from 'src/core/dtos'
import { JwtAuthGuard } from '../users'
import { CreateMealDto, UpdateMealDto } from './dtos'

@ApiTags('meals')
@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Post()
    @ApiBody({ type: CreateMealDto, required: true })
    async create(@Body() createMealDto: CreateMealDto, @CurrentUser() user: User) {
        return await this.mealsService.create(createMealDto, user.id)
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.mealsService.findAll(paginationDto)
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    async findOne(@Param('id') id: string) {
        return await this.mealsService.findOne(id)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiBody({ type: UpdateMealDto, required: true })
    update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
        return this.mealsService.update(id, updateMealDto)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    remove(@Param('id') id: string) {
        return this.mealsService.remove(id)
    }

    @Patch(':id/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiParam({ name: 'userId', type: String, required: true })
    async updateFavoriteMeal(@Param('id') id: string, @Param('userId') userId: string) {
        return await this.mealsService.updateFavoriteMeal(id, userId)
    }
}
