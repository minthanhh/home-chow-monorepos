import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { PrismaService } from 'src/shareds'

@Injectable()
export class RecipesService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createRecipeDto: CreateRecipeDto) {
        return await this.prismaService.recipe.create({
            data: {
                description: createRecipeDto.description,
            },
        })
    }

    findAll() {
        return `This action returns all recipes`
    }

    async findOne(id: string) {
        return await this.prismaService.recipe.findUnique({ where: { id } })
    }

    async update(id: string, updateRecipeDto: UpdateRecipeDto) {
        const exists = await this.findOne(id)
        if (!exists) throw new NotFoundException('Recipe not found')
        return await this.prismaService.recipe.update({ where: { id }, data: updateRecipeDto })
    }

    remove(id: number) {
        return `This action removes a #${id} recipe`
    }
}
