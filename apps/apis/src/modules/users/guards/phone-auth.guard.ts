import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PHONE_KEY } from '../constanst'

@Injectable()
export class PhoneAuthGuard extends AuthGuard(PHONE_KEY) {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err, user) {
        if (err || !user) throw err || new UnauthorizedException()
        return user
    }
}
