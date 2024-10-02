import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogDto } from './dtos/create-blog.dto'
import { UpdateBlogDto } from './dtos/update-blog.dto'
import { PrismaService } from 'src/shareds'

@Injectable()
export class BlogsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createBlogDto: CreateBlogDto) {
        return await this.prismaService.blog.create({ data: createBlogDto })
    }

    async findAll() {
        return await this.prismaService.blog.findMany()
    }

    async findOne(id: string) {
        const existing = await this.prismaService.blog.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException(`Cuisine with id ${id} not found`)
        return
    }

    async update(id: string, updateBlogDto: UpdateBlogDto) {
        await this.findOne(id)
    }

    async remove(id: string) {
        await this.findOne(id)
        return await this.prismaService.blog.delete({ where: { id } })
    }
}
