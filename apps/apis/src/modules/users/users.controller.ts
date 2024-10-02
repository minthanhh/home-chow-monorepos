import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { GoogleOAuthGuard, JwtAuthGuard, LocalAuthGuard, PhoneAuthGuard, RefreshAuthGuard } from './guards'
import { CreateUserDto, LoginUserDto, VerifyOtpPhoneNumberDto } from './dtos'
import { UsersService } from './users.service'
import { CurrentUser } from 'src/shareds'
import { ApiBody, ApiTags, ApiParam } from '@nestjs/swagger'
import { User } from '@prisma/client'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginUserDto, required: true })
    @Post('login')
    async login(@CurrentUser() user: User) {
        return await this.usersService.login(user)
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh-token')
    async refreshToken(@CurrentUser() user: User) {
        console.log('called refreshToken')
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
        const formattedTime = user.refreshTokenExpiration.toLocaleTimeString() // Ví dụ: "1:18:18 PM"

        console.log('Formatted', formattedTime)
        return user
    }

    @ApiBody({ type: CreateUserDto, required: true })
    @Post('create-user')
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.usersService.createUser(createUser)
    }

    @ApiParam({ name: 'id', description: 'Id of the user', required: true })
    @Get('user-info/:id')
    async getUserInfo(@Param('id') userId: string) {
        return await this.usersService.getUser(userId)
    }

    @UseGuards(PhoneAuthGuard)
    @Post('login-with-phone-number')
    async loginWithPhoneNumber(@CurrentUser() user: User) {
        return await this.usersService.login(user)
    }

    @Post('verify-opt-phone-number')
    async verifyOtpPhoneNumber(@Body() verifyPhoneNumberDto: VerifyOtpPhoneNumberDto) {
        return await this.usersService.verifyOtpPhoneNumber(verifyPhoneNumberDto)
    }

    @Post('auto-verify-phone-number')
    async autoVerifyPhoneNumber() {}
}
