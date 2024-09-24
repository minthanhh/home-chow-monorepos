import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shareds'
import { prismator } from 'src/core/utilities'
import { CreateCuisineDto, UpdateCuisineDto } from './dtos'

@Injectable()
export class CuisinesService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCuisineDto: CreateCuisineDto) {
        try {
            return await this.prismaService.cuisine.create({ data: createCuisineDto })
        } catch (error) {
            throw new InternalServerErrorException('An unexpected error occurred while processing the request.')
        }
    }

    async findAll() {
        return await prismator(this.prismaService).cuisine.findMany({
            cacheStrategy: { swr: 60, ttl: 120 },
        })
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
