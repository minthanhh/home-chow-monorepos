import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { PrismaService } from 'src/shareds'

@Injectable()
export class IngredientsService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createIngredientDto: CreateIngredientDto) {
        return this.prismaService.ingredient.create({ data: createIngredientDto })
    }

    async createManyAndReturn(createIngredientDtos: CreateIngredientDto[]) {
        return await this.prismaService.ingredient.createManyAndReturn({ data: createIngredientDtos })
    }

    async createMany(createIngredientDtos: CreateIngredientDto[]) {
        return await this.prismaService.ingredient.createMany({ data: createIngredientDtos })
    }

    async findAll(ingredientId?: string[]) {
        return await this.prismaService.ingredient.findMany({
            where: {
                id: {
                    in: ingredientId,
                },
            },
        })
    }

    async findOne(id: string) {
        return await this.prismaService.ingredient.findUnique({ where: { id: id } })
    }

    async update(id: string, updateIngredientDto: UpdateIngredientDto) {
        const exists = this.findOne(id)
        if (!exists) throw new NotFoundException('Ingredient does not exist')
        return await this.prismaService.ingredient.update({ where: { id: id }, data: updateIngredientDto })
    }

    remove(id: number) {
        return `This action removes a #${id} ingredient`
    }
}
