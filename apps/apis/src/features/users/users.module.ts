import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/shareds'
import { PassportModule } from '@nestjs/passport'
import { GoogleStrategy, JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    providers: [UsersService, PrismaService, GoogleStrategy, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
    controllers: [UsersController],
})
export class UsersModule {}
