import { IsNotEmpty, IsString } from 'class-validator'

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    carbohydrates: string

    @IsString()
    @IsNotEmpty()
    fat: string

    @IsString()
    @IsNotEmpty()
    protein: string

    @IsString()
    @IsNotEmpty()
    quantity: string
}
