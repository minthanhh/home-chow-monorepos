import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class RemoveIngredientsDto {
    @IsArray()
    @IsString({ each: true })
    @ApiProperty({ required: true, description: 'List ingredient id that can be removes' })
    ingredientIds: string[]
}
