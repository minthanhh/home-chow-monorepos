import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users.service'
import { PHONE_KEY } from '../constanst'

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, PHONE_KEY) {
    constructor(private readonly usersService: UsersService) {
        super({ usernameField: 'phone' })
    }

    async validate(phone: string, password: string) {
        console.log('password', password)
        const user = await this.usersService.validateUserByPhone(phone)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
