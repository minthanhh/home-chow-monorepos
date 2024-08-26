import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { GoogleOAuthGuard, JwtAuthGuard, LocalAuthGuard } from './guards'
import { CreateUserDto } from './dtos'
import { UsersService } from './users.service'
import { RefreshJwtStrategy } from './strategies'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.usersService.login(req.user.id)
    }

    @Post('create-user')
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.usersService.createUser(createUser)
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

    @Get('user-info/:id')
    async getUserInfo(@Param('id') userId: string) {
        return await this.usersService.getUser(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request) {
        return req.user
    }

    @UseGuards(RefreshJwtStrategy)
    @Post('refresh-token')
    async refreshToken(@Req() req) {
        return await this.usersService.refreshToken(req.user.id)
    }
}
