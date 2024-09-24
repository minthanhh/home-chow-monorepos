import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { CreateIngredientDto } from 'src/modules/ingredients'

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Description of the recipe', example: 'Recipe example description.' })
    description: string

    @ValidateIf((o) => o.ingredients.length > 0)
    @Type(() => CreateIngredientDto)
    ingredients: (CreateIngredientDto | string)[]
}
