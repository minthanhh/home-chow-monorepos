import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRecipeDto } from './dtos/create-recipe.dto'
import { UpdateRecipeDto } from './dtos/update-recipe.dto'
import { PrismaService } from 'src/shareds'
import { PaginationDto } from 'src/core/dtos'
import { paginator } from 'src/core/utilities'

@Injectable()
export class RecipesService {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     *  @param createRecipeDto
     *  @returns - Trả về bản ghi đã tạo hoặc message thành công.
     *  @sql - INSERT INTO "Recipe" (description) VALUES ('Description example');
     */
    async create(createRecipeDto: CreateRecipeDto) {
        // return await this.prismaService.recipe.create({
        //     data: {
        //         description: createRecipeDto.description,
        //     },
        // })
    }

    /**
     *  @param paginationDto
     *  @returns - Trả về danh sách Recipes
     *  @sql - SELECT * FROM "Recipe" OFFSET '{paginationDto.currentPage}' LIMIT '{paginationDto.pageSize}';
     */
    async findAll(paginationDto: PaginationDto) {
        return await paginator({ pageSize: paginationDto.pageSize, currentPage: paginationDto.currentPage })(this.prismaService.recipe)
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Returns the recipe record
     *  @sql - SELECT * FROM "Recipe" WHERE id = '{id}';
     */
    async findOne(id: string) {
        const exists = await this.prismaService.recipe.findUnique({ where: { id } })
        if (!exists) throw new NotFoundException(`Recipe with id ${id} not found`)
        return exists
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Returns the recipe record
     *  @sql - UPDATE SET "Recipe" (description) VALUES ('Example set descripition') WHERE id = '{id}';
     */
    async update(id: string, updateRecipeDto: UpdateRecipeDto) {
        await this.findOne(id)
        return await this.prismaService.recipe.update({ where: { id }, data: updateRecipeDto })
    }

    /**
     *  @param id - Id of the recipe.
     *  @returns - Message delete successfully or record deleted.
     *  @sql - DELETE FROM "Recipe" WHERE id = '{id}';
     */
    async delete(id: string) {
        await this.findOne(id)
        return await this.prismaService.recipe.delete({ where: { id } })
    }
}
