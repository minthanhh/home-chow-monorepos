import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { CreateIngredientDto } from 'src/modules/ingredients'
import { Type } from 'class-transformer'
import { Exists } from 'src/shareds'
import { Prisma } from '@prisma/client'

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    @Exists<Prisma.CuisineWhereInput>(['cuisine', (_, id) => ({ id })])
    cuisineId: string

    @IsString()
    recipeId: string

    @IsString()
    recipeDescription: string

    // @IsArray()
    @ValidateIf((o) => o.ingredients.length > 0)
    @Type(() => CreateIngredientDto)
    ingredients: (CreateIngredientDto | string)[]
}
