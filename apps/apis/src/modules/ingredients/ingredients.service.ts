import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateIngredientDto } from './dtos/create-ingredient.dto'
import { UpdateIngredientDto } from './dtos/update-ingredient.dto'
import { PrismaService } from 'src/shareds'
import { PaginationDto } from 'src/core/dtos'
import { Prisma } from '@prisma/client'
import { paginator } from 'src/core/utilities'

@Injectable()
export class IngredientsService {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     *
     *  @param createIngredientDto - New ingredient data to insert in table Ingredient.
     *  @sql
            INSERT INTO "Ingredient" (name, image)
            VALUES ('{name}', '{image}');
        @returns - Return new data record created.
     */
    async create(createIngredientDto: CreateIngredientDto, image: Express.Multer.File) {
        // return await this.prismaService.ingredient.create({ data: createIngredientDto })
    }

    /**
     * Chèn nhiều nguyên liệu mới vào cơ sở dữ liệu và trả về các bản ghi mới chèn.
     *  @param createIngredientDtos - Mảng các đối tượng dữ liệu nguyên liệu cần chèn vào bảng Ingredient.
     *  @sql
            * -- Chèn nhiều bản ghi vào bảng Ingredient
                INSERT INTO "Ingredient" (name, image)
                VALUES
                    ('{name}', '{image}')
                    ('{name}', '{image}');
            * -- Truy vấn để lấy các bản ghi mới chèn (giả sử chúng được xác định bằng tên)
                SELECT * FROM "Ingredient"
                WHERE "name" IN ('{name1}', '{name2}', '{name3}');
        @returns - Trả về các bản ghi nguyên liệu mới được chèn.
     */
    async createManyAndReturn(createIngredientDtos: CreateIngredientDto[]) {
        // return await this.prismaService.ingredient.createManyAndReturn({ data: createIngredientDtos })
    }

    /**
     * Chèn nhiều nguyên liệu mới vào cơ sở dữ liệu và trả về các bản ghi mới chèn.
     *
     *  @param createIngredientDtos - Mảng các đối tượng dữ liệu nguyên liệu cần chèn vào bảng Ingredient.
     *  @sql
                INSERT INTO "Ingredient" (name, image)
                VALUES
                    ('{name}', '{image}')
                    ('{name}', '{image}');
        @returns - Trả về kết quả chèn nhiều bản ghi vào cơ sở dữ liệu.
     */
    async createMany(createIngredientDtos: CreateIngredientDto[]) {
        // return await this.prismaService.ingredient.createMany({ data: createIngredientDtos })
    }

    /**
     *
     *  @param recipeId
     *  @param paginationDto
     *  @sql
            SELECT i.id, i.name, i.image
            FROM "RecipeIngredient"
            JOIN "Ingredient" i ON "RecipeIngredient"."ingredientId" = i.id
            WHERE "RecipeIngredient"."recipeId" = 'a3fc15c8-ca96-4ad8-bb84-cd3cfce9edac'
     */
    async findAllByRecipeId(recipeId: string, paginationDto?: PaginationDto) {
        return await paginator(paginationDto)(this.prismaService.recipeIngredient, {
            where: {
                recipeId: recipeId,
            },
            select: {
                ingredient: {
                    select: {
                        id: true,
                        image: true,
                        name: true,
                        createdAt: true,
                    },
                },
            },
        })
    }

    /**
     *
     *  @param recipeId
     *  @param paginationDto
     *  @sql
        SELECT * FROM "Ingredient"
        WHERE "Ingredient".id IN (ingredientId[0], ingredientId[1], ..., ingredientId[n])
     */
    async findAll(ingredientIds?: string[], paginationDto?: PaginationDto) {
        let where: Prisma.IngredientWhereInput
        if (ingredientIds.length > 0) where = { id: { in: ingredientIds } }
        return paginator(paginationDto)(this.prismaService.ingredient, { where })
    }

    /**
     *
     * @param id
     * @sql
        SELECT * FROM "Ingredient" WHERE "id" = '{id}';
        @returns - Trả về bản ghi nguyên liệu có ID tương ứng nếu tìm thấy.
     */
    async findOne(id: string) {
        const exists = await this.prismaService.ingredient.findUnique({ where: { id: id } })
        if (!exists) throw new NotFoundException(`Ingredient  with id ${id} not found`)
        return exists
    }

    /**
     *  Cập nhật một nguyên liệu dựa trên ID với dữ liệu mới.
     *  @param id - ID của nguyên liệu cần cập nhật.
     *  @param updateIngredientDto - Dữ liệu cần cập nhật cho nguyên liệu.
     *  @sql
            UPDATE "Ingredient"
            SET
                "name" = '{name}',
                "image" = '{image}'
            WHERE "id" = '{id}';
     */
    async update(id: string, updateIngredientDto: UpdateIngredientDto, image: Express.Multer.File) {
        await this.findOne(id)
        return await this.prismaService.ingredient.update({ where: { id: id }, data: updateIngredientDto })
    }

    /**
     *  Xóa một nguyên liệu dựa trên ID.
     *  @param ingredientId - ID của nguyên liệu cần xóa.
     *  @sql
            DELETE FROM "Ingredient" WHERE "id" = '{ingredientId}';
     */
    async delete(id: string) {
        await this.findOne(id)
        return await this.prismaService.ingredient.delete({ where: { id } })
    }

    /**
     *  Xóa nhiều nguyên liệu dựa trên danh sách các ID.
     *  @param ingredientIds - Danh sách các ID của nguyên liệu cần xóa.
     *  @sql
            DELETE FROM "Ingredient"
            WHERE "id" IN ('{id1}', '{id2}', '{id3}');
     *  @returns - Trả về số lượng bản ghi đã bị xóa hoặc kết quả liên quan (tùy thuộc vào cách cấu hình).
     */
    async deleteMany(ingredientIds: string[]) {
        return await this.prismaService.ingredient.deleteMany({
            where: {
                id: {
                    in: ingredientIds,
                },
            },
        })
    }

    /**
     *  Xóa nhiều bản ghi trong bảng RecipeIngredient dựa trên recipeId và danh sách các ingredientIds.
     *
     *  @param recipeId - ID của công thức cần xóa các nguyên liệu.
     *  @param ingredientIds - Danh sách các ID của nguyên liệu cần xóa khỏi công thức.
     *  @sql
            DELETE FROM "RecipeIngredient"
            WHERE "recipeId" = '{recipeId}'
            AND "ingredientId" IN ('{ingredientId1}', '{ingredientId2}', '{ingredientId3}');
     *  @returns - Trả về số lượng bản ghi đã bị xóa hoặc kết quả liên quan (tùy thuộc vào cách cấu hình).
     */
    async deleteManyByRecipeId(recipeId: string, ingredientIds: string[]) {
        return await this.prismaService.recipeIngredient.deleteMany({
            where: {
                recipeId: recipeId,
                ingredientId: {
                    in: ingredientIds,
                },
            },
        })
    }
}
