import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: 'example' })
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty({ example: 'example@gmail.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ example: 'example' })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string
}
