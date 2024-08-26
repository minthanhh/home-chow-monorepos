import { IsEmail, IsString } from 'class-validator'

export class LoginUserDto {
    @IsString()
    @IsEmail()
    username: string

    password: string
}
