import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'
import { PrismaService } from 'src/shareds'

@Injectable()
export class CuisinesService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCuisineDto: CreateCuisineDto) {
        const exists = await this.findOneByName(createCuisineDto.name)

        if (exists) throw new ConflictException(`${createCuisineDto.name} already exists`)

        return await this.prismaService.cuisine.create({
            data: createCuisineDto,
        })
    }

    findAll() {
        return `This action returns all cuisines`
    }

    async findOneById(id: string) {
        return await this.prismaService.cuisine.findUnique({ where: { id } })
    }

    async findOneByName(name: string) {
        return await this.prismaService.cuisine.findUnique({ where: { name } })
    }

    async update(id: string, updateCuisineDto: UpdateCuisineDto) {
        await this.recordExists(id)
        return await this.prismaService.cuisine.update({ where: { id }, data: updateCuisineDto })
    }

    async remove(id: string) {
        await this.recordExists(id)
        return await this.prismaService.cuisine.delete({ where: { id } })
    }

    private async recordExists(id: string) {
        const exists = await this.findOneById(id)
        if (!exists) throw new NotFoundException(`Cuisine ${id} not found`)
    }
}
