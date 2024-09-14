import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCuisineDto } from './dtos/create-cuisine.dto'
import { UpdateCuisineDto } from './dtos/update-cuisine.dto'
import { PrismaService } from 'src/shareds'

@Injectable()
export class CuisinesService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCuisineDto: CreateCuisineDto) {
        return await this.prismaService.cuisine.create({ data: createCuisineDto })
    }

    async findAll() {
        return await this.prismaService.cuisine.findMany()
    }

    async findOneById(id: string) {
        const existing = await this.prismaService.cuisine.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException(`Cuisine with id ${id} not found`)
        return existing
    }

    async findOneByName(name: string) {
        const existing = await this.prismaService.cuisine.findUnique({ where: { name } })
        if (!existing) throw new NotFoundException(`Cuisine with name ${name} not found`)
        return existing
    }

    async update(id: string, updateCuisineDto: UpdateCuisineDto) {
        await this.findOneById(id)
        return await this.prismaService.cuisine.update({ where: { id }, data: updateCuisineDto })
    }

    async remove(id: string) {
        await this.findOneById(id)
        return await this.prismaService.cuisine.delete({ where: { id } })
    }
}
