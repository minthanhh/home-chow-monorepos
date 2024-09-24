import { PartialType } from '@nestjs/swagger'
import { CreateRecipeDto } from './create-recipe.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
    @IsString()
    @IsNotEmpty()
    nutritionalValueId: string
}
