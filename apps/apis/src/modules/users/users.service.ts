import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dtos'
import * as bcrypt from 'bcrypt'
import { IProfile } from './interfaces'
import { JwtService } from '@nestjs/jwt'
import { Payload } from './@types'
import { PrismaService } from 'src/shareds'
import { ConfigType } from '@nestjs/config'
import refreshJwtConfig from './configs/refresh-jwt.config'
import { User } from '@prisma/client'
import { MailService } from '../mail'

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        @Inject(refreshJwtConfig.KEY) private readonly refreshJwtConfigure: ConfigType<typeof refreshJwtConfig>,
    ) {}

    async refreshToken(user: User) {
        const payload: Payload = { sub: user.id }
        const accessToken = this.jwtService.sign(payload)
        return { accessToken }
    }

    async login(user: User) {
        const payload: Payload = { sub: user.id }
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, this.refreshJwtConfigure)
        const refreshTokenExpiration = new Date(Date.now() + +this.refreshJwtConfigure.expiresIn)

        // this.mailService.send()

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { refreshToken, refreshTokenExpiration },
        })

        return { userId: user.id, accessToken, refreshToken }
    }

    async createUser(createUser: CreateUserDto) {
        const { email, username, password } = createUser

        const existingUser = await this.prismaService.user.findFirst({
            where: { OR: [{ username: username }, { email: email }] },
        })
        if (existingUser) throw new ConflictException(`User already exists`)

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prismaService.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        })

        const payload = { sub: user.id }
        const refreshToken = this.jwtService.sign(payload, this.refreshJwtConfigure)
        const refreshTokenExpiration = new Date(Date.now() + +this.refreshJwtConfigure.expiresIn)
        // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

        return await this.prismaService.user.update({
            where: { id: user.id },
            data: { refreshToken, refreshTokenExpiration },
        })
    }

    async getUser(userId: string) {
        return await this.prismaService.user.findUnique({ where: { id: userId } })
    }

    async validateUserByPhone(phone: string) {
        console.log('phone', phone)
        const existingUser = await this.prismaService.user.findUnique({ where: { phone: phone } })
        console.log('0867659309', existingUser)
        if (!existingUser) throw new NotFoundException(`Phone does not exist`)
        return existingUser
    }

    async validateUser(username: string, password: string) {
        const existingUser = await this.prismaService.user.findUnique({ where: { email: username } })
        if (!existingUser) throw new NotFoundException(`User ${username} does not exist`)

        const isPasswordMatching = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatching) throw new NotFoundException('Password or username does not match')

        return existingUser
    }

    async validateUserGoogle(profile: IProfile) {
        const { emails, photos, displayName } = profile
        const email = emails[0].value

        const exists = await this.prismaService.user.findUnique({ where: { email } })

        if (exists) return exists

        return await this.prismaService.user.create({
            data: {
                email,
                username: '',
                password: '',
                avatar: photos[0].value,
                fullName: displayName,
            },
        })
    }
}
