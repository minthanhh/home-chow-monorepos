import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    image: string

    @IsNumber()
    @IsNotEmpty()
    carbohydrates: number

    @IsNumber()
    @IsNotEmpty()
    fat: number

    @IsNumber()
    @IsNotEmpty()
    protein: number
}
