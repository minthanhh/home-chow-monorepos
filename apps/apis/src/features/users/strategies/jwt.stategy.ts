import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import jwtConfig from '../configs/jwt.config'
import { JWT_KEY } from '../constanst'
import { Payload } from '../@types'
import { UsersService } from '../users.service'
import { User } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_KEY) {
    constructor(
        @Inject(jwtConfig.KEY) jwtConfigure: ConfigType<typeof jwtConfig>,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfigure.secret,
        })
    }

    async validate(payload: Payload): Promise<User> {
        const user = await this.usersService.getUser(payload.sub)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
