import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCuisineDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    icon: string
}
