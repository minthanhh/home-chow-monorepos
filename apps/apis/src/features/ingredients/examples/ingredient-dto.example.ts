import { ApiProperty } from '@nestjs/swagger'
import { Ingredient } from '@prisma/client'

export class IngredientDto implements Ingredient {
    @ApiProperty({ example: '1', description: 'The ID of the ingredient' })
    id: string

    @ApiProperty({ example: 'Tomato', description: 'The name of the ingredient' })
    name: string

    @ApiProperty({ example: 'https://example.com/tomato.jpg', description: 'The image URL of the ingredient' })
    image: string

    @ApiProperty({ example: new Date(), description: 'When the ingredient was created' })
    createdAt: Date

    @ApiProperty({ example: new Date(), description: 'When the ingredient was last updated' })
    updatedAt: Date
}
