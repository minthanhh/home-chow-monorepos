import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Payload } from '../@types'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { REFRESH_JWT_KEY } from '../constanst'
import refreshJwtConfig from '../configs/refresh-jwt.config'
import { ConfigType } from '@nestjs/config'
import { UsersService } from '../users.service'
import { User } from '@prisma/client'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, REFRESH_JWT_KEY) {
    constructor(
        @Inject(refreshJwtConfig.KEY) refreshJwtConfigure: ConfigType<typeof refreshJwtConfig>,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: refreshJwtConfigure.secret,
        })
    }

    async validate(payload: Payload): Promise<User> {
        const user = await this.usersService.getUser(payload.sub)
        if (!user) throw new UnauthorizedException()
        return user
    }
}
