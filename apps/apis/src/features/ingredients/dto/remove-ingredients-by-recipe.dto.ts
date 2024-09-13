import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { RemoveIngredientsDto } from './remove-ingredients.dto'

export class RemoveIngredientsByRecipeDto extends PartialType(RemoveIngredientsDto) {
    @IsString()
    @ApiProperty({ required: true, description: 'Recipe is required' })
    recipeId: string
}
