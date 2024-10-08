import { IsNotEmpty, IsString } from 'class-validator'
import { Unique } from 'src/shareds'
import { Prisma } from '@prisma/client'

export class CreateCuisineDto {
    @IsNotEmpty()
    @IsString()
    @Unique<Prisma.CuisineWhereInput>(['cuisine', (_, name) => ({ name: name })])
    name: string

    @IsNotEmpty()
    @IsString()
    icon: string
}
