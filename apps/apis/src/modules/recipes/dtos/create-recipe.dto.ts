import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Description of the recipe', example: 'Recipe example description.' })
    description: string
}
