import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { CreateRecipeDto } from './dtos/create-recipe.dto'
import { UpdateRecipeDto } from './dtos/update-recipe.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { PaginationDto } from 'src/core/dtos'
import { JwtAuthGuard } from '../users'

@ApiTags('recipes')
@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    @ApiBody({ type: CreateRecipeDto, required: true, description: 'Data of recipe to create new record' })
    async create(@Body() createRecipeDto: CreateRecipeDto) {
        return await this.recipesService.create(createRecipeDto)
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return await this.recipesService.findAll(paginationDto)
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'Id of the recipe to find record' })
    async findOne(@Param('id') id: string) {
        return await this.recipesService.findOne(id)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'Id of the recipe to delete' })
    @ApiBody({ type: UpdateRecipeDto, required: true, description: 'Data of recipe data to update' })
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return await this.recipesService.update(id, updateRecipeDto)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true, description: 'Id of the recipe to delete' })
    async delete(@Param('id') id: string) {
        return await this.recipesService.delete(id)
    }
}
