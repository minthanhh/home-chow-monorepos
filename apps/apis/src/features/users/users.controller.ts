import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { GoogleOAuthGuard, JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './guards'
import { CreateUserDto } from './dtos'
import { UsersService } from './users.service'
import { CurrentUser } from 'src/shareds'
import { User } from '@prisma/client'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@CurrentUser() user: User) {
        return await this.usersService.login(user)
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh-token')
    async refreshToken(@CurrentUser() user: User) {
        return await this.usersService.refreshToken(user)
    }

    @UseGuards(GoogleOAuthGuard)
    @Get('login-with-google')
    async loginWithGoogle() {}

    @UseGuards(GoogleOAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user
        if (!user) {
            return res.status(401).send('Authentication failed')
        }
        res.redirect(`http://localhost:3001?token=${user}`)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@CurrentUser() user: User) {
        const formattedDate = user.refreshTokenExpiration.toLocaleDateString() // Ví dụ: "8/28/2024"
        const formattedTime = user.refreshTokenExpiration.toLocaleTimeString() // Ví dụ: "1:18:18 PM"

        console.log('Formatted', formattedDate, formattedTime)
        return user
    }

    @Post('create-user')
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.usersService.createUser(createUser)
    }

    @Get('user-info/:id')
    async getUserInfo(@Param('id') userId: string) {
        return await this.usersService.getUser(userId)
    }
}
