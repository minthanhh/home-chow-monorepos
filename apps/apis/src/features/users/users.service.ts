import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shareds'
import { CreateUserDto } from './dtos'
import * as bcrypt from 'bcrypt'
import { IProfile } from './interfaces'
import { JwtService } from '@nestjs/jwt'
import { Payload } from './@types'

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async refreshToken(userId: string) {
        const payload: Payload = { sub: userId }
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN })
        return { accessToken }
    }

    async login(userId: string) {
        const payload: Payload = {
            sub: userId,
        }

        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN })
        const refreshToken = this.jwtService.sign(payload, { secret: process.env.REFRESH_JWT_SECRET, expiresIn: process.env.REFRESH_JWT_EXPIRES_IN })
        return { userId, accessToken, refreshToken }
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
                hashedPassword,
            },
        })

        return user
    }

    async getUser(userId: string) {
        return await this.prismaService.user.findUnique({ where: { id: userId } })
    }

    async validateUser(username: string, password: string) {
        const existingUser = await this.prismaService.user.findUnique({ where: { email: username } })
        if (!existingUser) throw new NotFoundException(`User ${username} does not exist`)

        const isPasswordMatching = await bcrypt.compare(password, existingUser.hashedPassword)
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
                hashedPassword: '',
                avatar: photos[0].value,
                fullName: displayName,
            },
        })
    }
}
