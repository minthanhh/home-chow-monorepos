import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    @ApiBody({ type: CreateRecipeDto, required: true })
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto)
    }

    @Get()
    findAll() {
        return this.recipesService.findAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    findOne(@Param('id') id: string) {
        return this.recipesService.findOne(id)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    @ApiBody({ type: UpdateRecipeDto, required: true })
    update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(id, updateRecipeDto)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, required: true })
    remove(@Param('id') id: string) {
        return this.recipesService.remove(+id)
    }
}
