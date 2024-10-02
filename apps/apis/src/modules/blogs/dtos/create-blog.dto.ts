import { IsNotEmpty, IsString } from 'class-validator'
export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    description: string
}
