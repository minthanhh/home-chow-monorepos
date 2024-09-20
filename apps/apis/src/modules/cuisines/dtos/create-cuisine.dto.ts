import { Prisma } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'
import { Unique } from 'src/shareds'

export class CreateCuisineDto {
    @IsNotEmpty()
    @IsString()
    @Unique<Prisma.CuisineWhereInput>(['cuisine', (_, name) => ({ name: name })])
    name: string
}
