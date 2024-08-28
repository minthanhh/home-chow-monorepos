import { registerAs } from '@nestjs/config'
import { JwtSignOptions } from '@nestjs/jwt'
import { REFRESH_JWT_KEY } from '../constanst'

export default registerAs(
    REFRESH_JWT_KEY,
    (): JwtSignOptions => ({
        secret: process.env.REFRESH_JWT_SECRET,
        expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    }),
)
