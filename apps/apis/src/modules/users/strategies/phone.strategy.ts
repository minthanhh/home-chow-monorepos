import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users.service'
import { PHONE_KEY } from '../constanst'

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, PHONE_KEY) {
    constructor(private readonly usersService: UsersService) {
        super({ usernameField: PHONE_KEY })
    }

    async validate(phone: string) {
        console.log('phone', phone)
        const user = await this.usersService.validateUserByPhone(phone)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
