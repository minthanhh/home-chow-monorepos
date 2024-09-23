import { Injectable } from '@nestjs/common'
import { CreateBlogDto } from './dtos/create-blog.dto'
import { UpdateBlogDto } from './dtos/update-blog.dto'

@Injectable()
export class BlogsService {
    create(createBlogDto: CreateBlogDto) {
        return 'This action adds a new blog'
    }

    findAll() {
        return `This action returns all blogs`
    }

    findOne(id: number) {
        return `This action returns a #${id} blog`
    }

    update(id: number, updateBlogDto: UpdateBlogDto) {
        return `This action updates a #${id} blog`
    }

    remove(id: number) {
        return `This action removes a #${id} blog`
    }
}
