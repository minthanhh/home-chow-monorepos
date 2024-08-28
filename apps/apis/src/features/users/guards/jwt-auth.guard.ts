import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JWT_KEY } from '../constanst'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_KEY) {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err, user) {
        if (err || !user) throw err || new UnauthorizedException()
        return user
    }
}
