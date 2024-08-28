import { registerAs } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { JWT_KEY } from '../constanst'

export default registerAs(
    JWT_KEY,
    (): JwtModuleOptions => ({
        secret: process.env.ACCESS_JWT_SECRET,
        signOptions: {
            expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
        },
    }),
)
