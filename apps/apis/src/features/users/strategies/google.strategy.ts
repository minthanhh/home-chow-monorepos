import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users.service'
import { IProfile } from '../interfaces'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(_accessToken: string, _refreshToken: string, profile: IProfile, done: VerifyCallback): Promise<any> {
        const user = await this.userService.validateUserGoogle(profile)
        done(null, user)
    }
}
