import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { CreateIngredientDto } from 'src/modules/ingredients'
import { IsStringOrObject } from '../validators'
import { Type } from 'class-transformer'

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    cuisineId: string

    @IsString()
    recipeId: string

    @IsString()
    recipeDescription: string

    @IsArray()
    @IsNotEmpty()
    @Type(() => CreateIngredientDto)
    @IsStringOrObject({ message: 'Each element in the ingredients array must be a string or an object' })
    ingredients: (CreateIngredientDto | string)[]
}
