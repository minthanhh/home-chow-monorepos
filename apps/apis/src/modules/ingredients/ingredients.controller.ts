import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginatedResult, PaginationDto } from 'src/core/dtos'
import { CreateIngredientDto, RemoveIngredientsByRecipeDto, RemoveIngredientsDto, UpdateIngredientDto } from './dtos'
import { IngredientDto } from './examples'
import { JwtAuthGuard } from '../users'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('ingredients')
@Controller('ingredients')
@UseGuards(JwtAuthGuard)
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiBody({ type: CreateIngredientDto, required: true })
    async create(@Body() createIngredientDto: CreateIngredientDto, @UploadedFile() image: Express.Multer.File) {
        return await this.ingredientsService.create(createIngredientDto, image)
    }

    @Get()
    @ApiResponse({
        type: PaginatedResult<IngredientDto>,
    })
    async findAll(@Query() paginationDto?: PaginationDto) {
        return await this.ingredientsService.findAll([], paginationDto)
    }

    @Get('recipe/:recipeId')
    @ApiParam({ name: 'recipeId', type: String, required: true })
    async findAllByRecipeId(@Param('recipeId') recipeId: string, @Query() paginationDto?: PaginationDto) {
        return await this.ingredientsService.findAllByRecipeId(recipeId, paginationDto)
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    async findOne(@Param('id') id: string) {
        return await this.ingredientsService.findOne(id)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiBody({ type: UpdateIngredientDto, required: true })
    @UseInterceptors(FileInterceptor('image'))
    async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto, @UploadedFile() image: Express.Multer.File) {
        return await this.ingredientsService.update(id, updateIngredientDto, image)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    async delete(@Param('id') id: string) {
        return await this.ingredientsService.delete(id)
    }

    @Delete()
    @ApiBody({ type: RemoveIngredientsDto, required: true })
    async deleteIngredients(@Body() removeIngredientsDto: RemoveIngredientsDto) {
        return await this.ingredientsService.deleteMany(removeIngredientsDto.ingredientIds)
    }

    @Delete('recipe/:recipeId')
    @ApiParam({ name: 'recipeId', type: String, required: true })
    @ApiBody({ type: RemoveIngredientsByRecipeDto, required: true })
    async deleteIngredientsByRecipe(@Param('recipeId') recipeId: string, @Body() removeIngredientsByRecipeDto: RemoveIngredientsByRecipeDto) {
        return await this.ingredientsService.deleteManyByRecipeId(recipeId, removeIngredientsByRecipeDto.ingredientIds)
    }
}
