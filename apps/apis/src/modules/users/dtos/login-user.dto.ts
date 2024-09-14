import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginUserDto {
    @ApiProperty({ example: 'example@gmail.com' })
    @IsString()
    @IsEmail()
    username: string

    @ApiProperty({ example: 'example' })
    @IsString()
    password: string
}
