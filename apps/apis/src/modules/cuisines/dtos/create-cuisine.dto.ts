import { Prisma } from '@prisma/client'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { Unique } from 'src/shareds'

export class CreateCuisineDto {
    @IsNotEmpty()
    @IsString()
    @Unique<Prisma.CuisineWhereInput>(['cuisine', (_, name) => ({ name })])
    @Length(3, 50)
    name: string

    @IsNotEmpty()
    @IsString()
    icon: string
}
