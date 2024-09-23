import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { GoogleStrategy, JwtStrategy, LocalStrategy, RefreshJwtStrategy, PhoneStrategy } from './strategies'
import jwtConfig from './configs/jwt.config'
import refreshJwtConfig from './configs/refresh-jwt.config'
import googleOauthConfig from './configs/google-oauth.config'
import { MailModule, MailService } from '../mail'

@Module({
    imports: [
        PassportModule,
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        ConfigModule.forFeature(googleOauthConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        MailModule,
    ],
    providers: [UsersService, GoogleStrategy, LocalStrategy, RefreshJwtStrategy, JwtStrategy, MailService, PhoneStrategy],
    controllers: [UsersController],
})
export class UsersModule {}
